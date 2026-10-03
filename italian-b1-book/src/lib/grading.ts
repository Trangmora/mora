import type { BookPage, Exercise, Lang } from "../types";
import { clozeBlanks } from "./cloze";
import type { ExerciseResult, ItemResult, Mistake } from "./store";
import { setNeuralVoice } from "./speech";

// ---------- So khớp đáp án (không cần API) ----------

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(/[.,!?;:«»"“”()\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Bỏ dấu để nhận ra lỗi chỉ sai trọng âm (è/é, à...). */
function stripAccents(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function blanksOf(prompt: string): number {
  return (prompt.match(/___/g) ?? []).length || 1;
}

/** Giá trị của nhiều ô trống được lưu chung, ngăn cách bởi ký tự này. */
export const SEP = "␟";

export function gradeByKey(ex: Exercise, responses: Record<string, string>, lang: Lang): ExerciseResult {
  const items: ItemResult[] = [];
  const accentNote = lang === "vi" ? "Gần đúng — chú ý dấu trọng âm." : "Almost — watch the accent.";

  switch (ex.kind) {
    case "fill":
      for (const it of ex.items) {
        const given = (responses[it.id] ?? "").split(SEP);
        const n = blanksOf(it.prompt);
        let ok = true;
        let accentOnly = false;
        for (let b = 0; b < n; b++) {
          const accepted = (it.answers[b] ?? "").split("|").map(normalize);
          const g = normalize(given[b] ?? "");
          if (!accepted.includes(g)) {
            ok = false;
            if (accepted.map(stripAccents).includes(stripAccents(g)) && g) accentOnly = true;
          }
        }
        items.push({
          id: it.id,
          correct: ok,
          userAnswer: given.slice(0, n).join(" / "),
          correctAnswer: it.answers.map((a) => a.split("|")[0]).join(" / "),
          explanation: !ok && accentOnly ? accentNote : undefined,
        });
      }
      break;
    case "choice":
      for (const it of ex.items) {
        const g = responses[it.id];
        items.push({
          id: it.id,
          correct: g !== undefined && Number(g) === it.answer,
          userAnswer: g !== undefined ? it.options[Number(g)] ?? "" : "",
          correctAnswer: it.options[it.answer],
        });
      }
      break;
    case "truefalse":
      for (const it of ex.items) {
        const g = responses[it.id];
        items.push({
          id: it.id,
          correct: g !== undefined && (g === "true") === it.answer,
          userAnswer: g === undefined ? "" : g === "true" ? "Vero" : "Falso",
          correctAnswer: it.answer ? "Vero" : "Falso",
        });
      }
      break;
    case "match":
      for (const l of ex.left) {
        const g = responses[l.id];
        const right = (id?: string) => ex.right.find((r) => r.id === id)?.text ?? "";
        items.push({
          id: l.id,
          correct: g === ex.answer[l.id],
          userAnswer: right(g),
          correctAnswer: right(ex.answer[l.id]),
        });
      }
      break;
    case "cloze":
      for (const b of clozeBlanks(ex)) {
        const g = responses[b.id] ?? "";
        const accepted = b.answers.map(normalize);
        const ok = accepted.includes(normalize(g));
        items.push({
          id: b.id,
          correct: ok,
          userAnswer: g,
          correctAnswer: b.answers[0],
          explanation: !ok && g && accepted.map(stripAccents).includes(stripAccents(normalize(g))) ? accentNote : undefined,
        });
      }
      break;
    case "form":
      for (const f of ex.items) {
        if (f.given) continue;
        const g = responses[f.id] ?? "";
        if (f.options) {
          items.push({
            id: f.id,
            correct: g !== "" && Number(g) === f.answer,
            userAnswer: g !== "" ? f.options[Number(g)] ?? "" : "",
            correctAnswer: f.answer !== undefined ? f.options[f.answer] : undefined,
          });
        } else {
          const accepted = (f.answers ?? "").split("|").filter(Boolean);
          const ok = accepted.some((a) => looseMatch(g, a));
          items.push({
            id: f.id,
            correct: ok,
            userAnswer: g,
            correctAnswer: accepted[0],
            explanation: !ok && accepted.some((a) => stripAccents(normalize(a)) === stripAccents(normalize(g))) && g ? accentNote : undefined,
          });
        }
      }
      break;
    case "write":
    case "speak":
      // Không có đáp án cố định — cần AI chấm.
      for (const it of ex.items) {
        items.push({ id: it.id, correct: false, userAnswer: responses[it.id] ?? "", correctAnswer: it.sample });
      }
      return { score: 0, items, by: "key", at: new Date().toISOString() };
  }

  const score = items.length ? Math.round((items.filter((i) => i.correct).length / items.length) * 100) : 0;
  return { score, items, by: "key", at: new Date().toISOString() };
}

export function needsAI(ex: Exercise) {
  if (ex.kind === "form") return ex.items.some((f) => !f.given && !f.answers && f.answer === undefined);
  return ex.kind === "write" || ex.kind === "speak";
}

/** So khớp mềm cho ô điền thông tin: bỏ dấu câu, khoảng trắng trong số, chấp nhận câu trả lời chứa đáp án. */
export function looseMatch(given: string, key: string): boolean {
  const g = normalize(given);
  const k = normalize(key);
  if (!g) return false;
  if (g === k) return true;
  const compact = (s: string) => s.replace(/[\s/.\-]/g, "");
  if (/\d/.test(k) && compact(g) === compact(k)) return true;
  // "Washington DC" cho đáp án "Washington", "ha studiato arte" cho "arte"…
  return k.length >= 3 && (` ${g} `.includes(` ${k} `) || (g.length >= 4 && ` ${k} `.includes(` ${g} `) && g.length >= k.length * 0.6));
}

/** Đề của từng câu, để hiển thị trong sổ lỗi. */
export function itemPrompt(ex: Exercise, itemId: string): string {
  if (ex.kind === "match") return ex.left.find((l) => l.id === itemId)?.text ?? itemId;
  if (ex.kind === "form") return ex.items.find((f) => f.id === itemId)?.label ?? itemId;
  if (ex.kind === "cloze") return clozeBlanks(ex).find((b) => b.id === itemId)?.context ?? itemId;
  const it = (ex.items as { id: string; prompt: string }[]).find((i) => i.id === itemId);
  return it?.prompt ?? itemId;
}

export function toMistakes(page: BookPage, ex: Exercise, result: ExerciseResult): Mistake[] {
  return result.items
    .filter((i) => !i.correct && i.userAnswer.trim() !== "")
    .map((i) => ({
      key: `${ex.id}:${i.id}`,
      pageId: page.id,
      pageNumber: page.number,
      exerciseId: ex.id,
      exerciseNumber: ex.number,
      prompt: itemPrompt(ex, i.id),
      userAnswer: i.userAnswer,
      correctAnswer: i.correctAnswer,
      explanation: i.explanation,
      at: result.at,
    }));
}

// ---------- Gọi AI (server/index.ts) ----------

let aiAvailable: boolean | null = null;

export async function checkAI(): Promise<boolean> {
  try {
    const r = await fetch("/api/health");
    const j = await r.json();
    aiAvailable = !!j.ai;
    setNeuralVoice(!!j.tts);
  } catch {
    aiAvailable = false;
  }
  return aiAvailable;
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
  return j as T;
}

export async function gradeWithAI(
  ex: Exercise,
  responses: Record<string, string>,
  lang: Lang,
  context?: string,
): Promise<ExerciseResult> {
  const j = await post<Omit<ExerciseResult, "by" | "at">>("/api/grade/exercise", {
    lang,
    exercise: ex,
    responses,
    context,
  });
  return { ...j, by: "ai", at: new Date().toISOString() };
}

export type ReadingResult = {
  score: number;
  words: { word: string; status: "ok" | "wrong" | "missing" }[];
  feedback: string;
  tips: string[];
  by: "local" | "ai";
};

/** Chấm đọc to tại chỗ: so khớp từng từ giữa văn bản gốc và những gì máy nghe được. */
export function gradeReadingLocal(target: string, transcript: string): ReadingResult {
  const targetWords = target.split(/\s+/).filter(Boolean);
  const said = normalize(transcript).split(" ").filter(Boolean);
  const tw = targetWords.map((w) => normalize(w));
  // LCS để căn hai chuỗi từ
  const n = tw.length;
  const m = said.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  const eq = (a: string, b: string) => a === b || stripAccents(a) === stripAccents(b);
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = eq(tw[i], said[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const matched = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (eq(tw[i], said[j])) {
      matched.add(i);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  const words = targetWords.map((w, k) => ({
    word: w,
    status: (matched.has(k) ? "ok" : said.length ? "wrong" : "missing") as "ok" | "wrong" | "missing",
  }));
  const score = n ? Math.round((matched.size / tw.filter(Boolean).length) * 100) : 0;
  return { score, words, feedback: "", tips: [], by: "local" };
}

export async function gradeReadingAI(
  target: string,
  transcript: string,
  confidence: number | null,
  lang: Lang,
): Promise<ReadingResult> {
  const j = await post<Omit<ReadingResult, "by">>("/api/grade/reading", { lang, target, transcript, confidence });
  return { ...j, by: "ai" };
}

export function isAIAvailable() {
  return aiAvailable;
}
