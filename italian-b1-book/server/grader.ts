import Anthropic from "@anthropic-ai/sdk";

/**
 * "Giáo viên AI" chấm bài. Đây là chỗ duy nhất gọi API Claude.
 * Đặt ANTHROPIC_API_KEY trong file .env để bật.
 */

const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5-5";
const EFFORT = (process.env.CLAUDE_EFFORT || "low") as "low" | "medium" | "high";

let client: Anthropic | null = null;

export function aiEnabled() {
  return !!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

function getClient() {
  if (!aiEnabled()) throw new GradingError(503, "AI chưa được bật: thiếu ANTHROPIC_API_KEY trong .env");
  client ??= new Anthropic();
  return client;
}

export class GradingError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

type Lang = "vi" | "en";
const langName = (l: Lang) => (l === "en" ? "English" : "Vietnamese (tiếng Việt)");

const TEACHER = `You are a warm but rigorous Italian teacher grading a student who is studying a CEFR B1 Italian coursebook.
- Grade fairly for B1 level. Accept valid alternatives (synonyms, different but correct word order, contractions) unless the exercise explicitly targets a specific form.
- Be precise about WHY something is wrong: name the grammar rule (e.g. concordanza del participio, preposizione articolata, congiuntivo dopo "penso che"), and give the corrected Italian.
- Ignore capitalisation and trailing punctuation. Flag accent mistakes (è/e, perché) as minor errors.
- Explanations must be short (1–3 sentences), concrete and encouraging.`;

async function askJSON<T>(system: string, user: string, schema: Record<string, unknown>): Promise<T> {
  const c = getClient();
  try {
    const msg = await c.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: EFFORT, format: { type: "json_schema", schema } },
      system,
      messages: [{ role: "user", content: user }],
    });
    if (msg.stop_reason === "refusal") throw new GradingError(422, "AI từ chối chấm yêu cầu này.");
    const text = msg.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
    return JSON.parse(text) as T;
  } catch (e) {
    if (e instanceof GradingError) throw e;
    if (e instanceof Anthropic.AuthenticationError) throw new GradingError(401, "API key không hợp lệ.");
    if (e instanceof Anthropic.RateLimitError) throw new GradingError(429, "Gọi API quá nhanh, thử lại sau ít giây.");
    if (e instanceof Anthropic.APIError) throw new GradingError(502, `Lỗi API: ${e.message}`);
    throw e;
  }
}

// ---------- Chấm bài tập ----------

const exerciseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "items", "summary", "tips"],
  properties: {
    score: { type: "integer", description: "0-100 overall score" },
    items: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "correct", "userAnswer", "correctAnswer", "explanation"],
        properties: {
          id: { type: "string" },
          correct: { type: "boolean" },
          userAnswer: { type: "string" },
          correctAnswer: { type: "string", description: "The correct / improved Italian answer" },
          explanation: { type: "string", description: "Why it is wrong (empty string if fully correct)" },
        },
      },
    },
    summary: { type: "string", description: "2-3 sentence overall feedback" },
    tips: { type: "array", items: { type: "string" }, description: "Up to 3 study tips" },
  },
} as const;

type ExerciseBody = {
  lang: Lang;
  exercise: { id: string; kind: string; instruction: string } & Record<string, unknown>;
  responses: Record<string, string>;
  context?: string;
};

export async function gradeExercise(body: ExerciseBody) {
  const { lang = "vi", exercise, responses = {}, context } = body ?? ({} as ExerciseBody);
  if (!exercise?.id || !exercise.kind) throw new GradingError(400, "Thiếu dữ liệu bài tập.");

  const kindNote: Record<string, string> = {
    fill: "Fill-in-the-blank. Each '___' is a blank; multiple blanks in one item are joined with the character ␟ in the student's answer. 'answers' lists the key (alternatives separated by |).",
    choice: "Multiple choice. The student's answer is the option index (0-based).",
    truefalse: "True/false (Vero/Falso). The student's answer is 'true' or 'false'.",
    match: "Matching. Student's answer maps each left id to a right id.",
    write: "Free writing / sentence transformation. Grade grammar, vocabulary, spelling and whether it fulfils the task. 'sample' (if given) is only a model answer, not the only correct one. Give the corrected version of the student's text in correctAnswer. Mark correct=true only if it has no real errors.",
    speak: "Speaking task. The student's answer is a speech-to-text transcript of what they said, so ignore punctuation/capitalisation and obvious recognition glitches; grade task fulfilment, grammar, vocabulary range and coherence for B1. Give an improved version in correctAnswer.",
  };

  const user = `Write every explanation, summary and tip in ${langName(lang)}. Italian examples stay in Italian.

Exercise type: ${exercise.kind}. ${kindNote[exercise.kind] ?? ""}
${context ? `\nReference text from the page:\n"""${context}"""\n` : ""}
Exercise (JSON):
${JSON.stringify(exercise, null, 2)}

Student answers (JSON, keyed by item id):
${JSON.stringify(responses, null, 2)}

Return one entry in "items" per item id of the exercise (for matching: per left id). For an unanswered item use userAnswer "" and correct false.`;

  return askJSON(TEACHER, user, exerciseSchema);
}

// ---------- Chấm luyện đọc / phát âm ----------

const readingSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "words", "feedback", "tips"],
  properties: {
    score: { type: "integer", description: "0-100 pronunciation/reading score" },
    words: {
      type: "array",
      description: "Every word of the TARGET text in order",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["word", "status"],
        properties: {
          word: { type: "string" },
          status: { type: "string", enum: ["ok", "wrong", "missing"] },
        },
      },
    },
    feedback: { type: "string" },
    tips: { type: "array", items: { type: "string" } },
  },
} as const;

type ReadingBody = { lang: Lang; target: string; transcript: string; confidence?: number | null };

export async function gradeReading(body: ReadingBody) {
  const { lang = "vi", target, transcript, confidence } = body ?? ({} as ReadingBody);
  if (!target) throw new GradingError(400, "Thiếu đoạn văn cần đọc.");

  const system = `You are an Italian pronunciation coach. You cannot hear audio: you receive the TARGET text and what an Italian (it-IT) speech recogniser understood when the student read it aloud.
Infer pronunciation problems from the mismatches: e.g. "pesca"→"pesa" suggests a dropped /k/; "anno"→"ano" missing double consonant (geminate); "chi"→"ci" c/ch confusion; "gli" / "gn" / "sc" sounds; open/closed vowels; stress position.
Score 0-100 for how faithfully and intelligibly the text was read. Mark each target word ok / wrong (recognised as something else) / missing (not recognised at all).
Give specific articulation advice a ${langName(lang)} speaker can apply (mouth position, comparison with familiar sounds), not generic encouragement.`;

  const user = `Answer in ${langName(lang)}.
TARGET: """${target}"""
RECOGNISED: """${transcript || "(nothing recognised)"}"""
${confidence != null ? `Recogniser confidence: ${confidence.toFixed(2)}` : ""}`;

  return askJSON(system, user, readingSchema);
}
