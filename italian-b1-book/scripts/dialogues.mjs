/**
 * Tạo file nghe hội thoại nhiều giọng (ElevenLabs text-to-dialogue) + tiếng nền cảnh, trộn bằng ffmpeg.
 *   node scripts/dialogues.mjs dialogues/u1-parola-viva.json        → tạo (dùng cache nếu có)
 *   node scripts/dialogues.mjs dialogues/u1-parola-viva.json --dry  → chỉ đếm ký tự, không gọi API
 * Key ElevenLabs: ELEVENLABS_API_KEY trong .env/môi trường, hoặc do proxy của môi trường tự gắn header
 *   (khi dùng proxy: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=<ca-bundle> để fetch của Node đi qua proxy).
 * Cache (dialogues/cache/) theo nội dung + giọng + model + seed: chạy lại không tốn thêm ký tự.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const scenePath = args.find((a) => !a.startsWith("--"));
if (!scenePath) {
  console.error("Dùng: node scripts/dialogues.mjs dialogues/<cảnh>.json [--dry]");
  process.exit(1);
}
const scene = JSON.parse(readFileSync(path.resolve(root, scenePath), "utf8"));
const cacheDir = path.join(root, "dialogues/cache");
mkdirSync(cacheDir, { recursive: true });

const API = "https://api.elevenlabs.io";
const key = process.env.ELEVENLABS_API_KEY;
const headers = { "Content-Type": "application/json", ...(key ? { "xi-api-key": key } : {}) };
const hash = (o) => createHash("sha256").update(JSON.stringify(o)).digest("hex").slice(0, 16);

async function api(method, url, body) {
  const res = await fetch(API + url, { method, headers, body: body && JSON.stringify(body) });
  if (!res.ok) throw Object.assign(new Error(`${method} ${url} → ${res.status}: ${(await res.text()).slice(0, 300)}`), { status: res.status });
  return res;
}

const lineText = (l) => (l.tags ? `${l.tags} ${l.text}` : l.text);
const chars = scene.lines.reduce((n, l) => n + lineText(l).length, 0);
const sfxChars = scene.scene ? scene.scene.prompt.length : 0;
console.log(`🎬 ${scene.id}: ${scene.lines.length} câu · ${chars} ký tự hội thoại · tiếng nền ${scene.scene ? scene.scene.duration + "s" : "không"}`);

async function resolveVoices() {
  const out = {};
  for (const [speaker, v] of Object.entries(scene.voices)) {
    if (v.id) { out[speaker] = v.id; continue; }
    const data = await (await api("GET", `/v2/voices?search=${encodeURIComponent(v.name.split(" - ")[0])}&page_size=50`)).json();
    const hit = data.voices.find((x) => x.name === v.name) ?? data.voices.find((x) => x.name.startsWith(v.name.split(" - ")[0]));
    if (!hit) throw new Error(`Không thấy giọng "${v.name}" trong tài khoản — ghi "id" vào file cảnh.`);
    console.log(`🗣️  ${speaker} → ${hit.name} (${hit.voice_id})`);
    out[speaker] = hit.voice_id;
  }
  return out;
}

async function dialogue(voiceIds) {
  const inputs = scene.lines.map((l) => ({ text: lineText(l), voice_id: voiceIds[l.speaker] }));
  for (const model of [scene.model, scene.fallbackModel].filter(Boolean)) {
    const file = path.join(cacheDir, `${scene.id}-voice-${hash({ inputs, model, seed: scene.seed })}.mp3`);
    if (existsSync(file)) return console.log(`♻️  Hội thoại có sẵn trong cache (${model})`), file;
    if (dry) return console.log(`🆕 Sẽ tạo hội thoại bằng ${model}: ${chars} ký tự`), null;
    try {
      const res = await api("POST", "/v1/text-to-dialogue?output_format=mp3_44100_128", { inputs, model_id: model, seed: scene.seed });
      writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      console.log(`✅ Hội thoại: ${model} · ${chars} ký tự`);
      return file;
    } catch (e) {
      if (model !== scene.fallbackModel && scene.fallbackModel && e.status && e.status < 500) {
        console.warn(`⚠️  ${model} bị từ chối (${e.message}) → thử ${scene.fallbackModel}`);
        continue;
      }
      throw e;
    }
  }
}

async function ambience() {
  const s = scene.scene;
  if (!s) return null;
  const file = path.join(cacheDir, `${scene.id}-scene-${hash(s.prompt + s.duration + s.promptInfluence)}.mp3`);
  if (existsSync(file)) return console.log("♻️  Tiếng nền có sẵn trong cache"), file;
  if (dry) return console.log(`🆕 Sẽ tạo tiếng nền ${s.duration}s`), null;
  const res = await api("POST", "/v1/sound-generation?output_format=mp3_44100_128", {
    text: s.prompt, duration_seconds: s.duration, prompt_influence: s.promptInfluence,
  });
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log("✅ Tiếng nền");
  return file;
}

const voices = dry && !key ? null : await resolveVoices().catch((e) => (dry ? null : Promise.reject(e)));
const voiceFile = voices ? await dialogue(voices) : (console.log(`🆕 Hội thoại: ${chars} ký tự (chưa tra được giọng)`), null);
const bgFile = await ambience();
if (dry) process.exit(0);

const out = path.resolve(root, scene.out);
mkdirSync(path.dirname(out), { recursive: true });
if (bgFile) {
  // Nền lặp lại cho đủ dài, hạ xuống gainDb so với giọng, mở/tắt dần; độ dài theo giọng.
  const g = scene.scene.gainDb ?? -26;
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", voiceFile, "-stream_loop", "-1", "-i", bgFile,
    "-filter_complex",
    `[0:a]apad=pad_dur=1.2,loudnorm=I=-16:TP=-1.5:LRA=11[v];[1:a]volume=${g}dB,afade=t=in:d=1.5[b];` +
    `[v][b]amix=inputs=2:duration=first:normalize=0,afade=t=in:d=0.4[m]`,
    "-map", "[m]", "-ac", "1", "-ar", "44100", "-b:a", "96k", out]);
} else {
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", voiceFile, "-af", "loudnorm=I=-16:TP=-1.5", "-b:a", "96k", out]);
}
console.log(`🎧 ${path.relative(root, out)}`);
