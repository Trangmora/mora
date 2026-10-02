import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cleanText, voiceKey, type Voice } from "../src/lib/voiceText";

/**
 * Giọng đọc tiếng Ý tự nhiên (giọng AI thần kinh) thay cho giọng máy của trình duyệt.
 * Dùng nhà cung cấp đầu tiên có key trong .env:
 *   GOOGLE_TTS_API_KEY  → Google Cloud Text-to-Speech (giọng it-IT Neural2, có hạn mức miễn phí hằng tháng)
 *   AZURE_SPEECH_KEY + AZURE_SPEECH_REGION → Azure Neural (gói F0 miễn phí hằng tháng)
 *   ELEVENLABS_API_KEY  → giọng tự nhiên nhất, gói miễn phí nhỏ
 * Mỗi câu chỉ tạo MỘT LẦN rồi lưu thành file mp3 trong public/voices (commit lên repo),
 * kèm public/voices/manifest.json. Sau đó trình duyệt phát thẳng file, không gọi API nữa.
 */

export type { Voice };

export const VOICES_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../public/voices");
const MANIFEST = path.join(VOICES_DIR, "manifest.json");

let manifest: Record<string, string> | null = null;
let writing = Promise.resolve();

export async function loadManifest(): Promise<Record<string, string>> {
  if (!manifest) {
    try {
      manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
    } catch {
      manifest = {};
    }
  }
  return manifest!;
}

function saveManifest() {
  // Ghi tuần tự để không làm hỏng file khi nhiều câu được tạo cùng lúc.
  writing = writing.then(() =>
    writeFile(MANIFEST, JSON.stringify(Object.fromEntries(Object.entries(manifest!).sort()), null, 1) + "\n"),
  );
  return writing;
}

export async function hasVoice(text: string, voice: Voice) {
  return !!(await loadManifest())[voiceKey(text, voice)];
}

export function ttsProvider(): "elevenlabs" | "google" | "azure" | null {
  if (process.env.GOOGLE_TTS_API_KEY) return "google";
  if (process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION) return "azure";
  if (process.env.ELEVENLABS_API_KEY) return "elevenlabs";
  return null;
}

export class TTSError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function synthesize(text: string, voice: Voice): Promise<Buffer> {
  const clean = cleanText(text);
  if (!clean) throw new TTSError(400, "Thiếu nội dung cần đọc");
  if (clean.length > 3000) throw new TTSError(400, "Đoạn văn quá dài (tối đa 3000 ký tự)");

  // Đã tạo trước đó → đọc file, không gọi API.
  const key = voiceKey(clean, voice);
  const m = await loadManifest();
  if (m[key]) {
    try {
      return await readFile(path.join(VOICES_DIR, m[key]));
    } catch {
      /* file bị xoá — tạo lại */
    }
  }

  const provider = ttsProvider();
  if (!provider) throw new TTSError(503, "Chưa có key giọng đọc (GOOGLE_TTS_API_KEY / AZURE_SPEECH_KEY / ELEVENLABS_API_KEY)");
  const audio =
    provider === "elevenlabs" ? await elevenlabs(clean, voice) : provider === "google" ? await google(clean, voice) : await azure(clean, voice);
  const name = `${createHash("sha1").update(key).digest("hex").slice(0, 16)}.mp3`;
  await mkdir(VOICES_DIR, { recursive: true });
  await writeFile(path.join(VOICES_DIR, name), audio);
  m[key] = name;
  await saveManifest();
  return audio;
}

function voiceName(provider: string, voice: Voice) {
  const env = process.env;
  switch (provider) {
    case "elevenlabs":
      // Nên chọn giọng Ý bản xứ trong Voice Library của ElevenLabs rồi dán ID vào .env.
      return voice === "m"
        ? env.ELEVENLABS_VOICE_MALE || "pNInz6obpgDQGcFmaJgB"
        : env.ELEVENLABS_VOICE_FEMALE || "21m00Tcm4TlvDq8ikWAM";
    case "google":
      return voice === "m" ? env.GOOGLE_TTS_VOICE_MALE || "it-IT-Neural2-C" : env.GOOGLE_TTS_VOICE_FEMALE || "it-IT-Neural2-A";
    default:
      return voice === "m" ? env.AZURE_VOICE_MALE || "it-IT-DiegoNeural" : env.AZURE_VOICE_FEMALE || "it-IT-ElsaNeural";
  }
}

async function check(r: Response, who: string) {
  if (!r.ok) {
    const detail = (await r.text().catch(() => "")).slice(0, 200);
    throw new TTSError(r.status === 401 || r.status === 403 ? 401 : 502, `${who}: HTTP ${r.status} ${detail}`);
  }
  return r;
}

async function elevenlabs(text: string, voice: Voice) {
  const r = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceName("elevenlabs", voice)}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY!, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2",
        language_code: "it",
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
      }),
      signal: AbortSignal.timeout(30000),
    },
  );
  await check(r, "ElevenLabs");
  return Buffer.from(await r.arrayBuffer());
}

async function google(text: string, voice: Voice) {
  const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: "it-IT", name: voiceName("google", voice) },
      audioConfig: { audioEncoding: "MP3" },
    }),
    signal: AbortSignal.timeout(30000),
  });
  await check(r, "Google TTS");
  const j = (await r.json()) as { audioContent?: string };
  if (!j.audioContent) throw new TTSError(502, "Google TTS: không có audio");
  return Buffer.from(j.audioContent, "base64");
}

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

async function azure(text: string, voice: Voice) {
  const ssml = `<speak version="1.0" xml:lang="it-IT"><voice name="${voiceName("azure", voice)}">${escapeXml(text)}</voice></speak>`;
  const r = await fetch(`https://${process.env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.AZURE_SPEECH_KEY!,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
      "User-Agent": "IlMioLibroB1",
    },
    body: ssml,
    signal: AbortSignal.timeout(30000),
  });
  await check(r, "Azure TTS");
  return Buffer.from(await r.arrayBuffer());
}
