/**
 * Tạo bài nghe "cuộc gọi điện thoại": hội thoại nhiều giọng (text-to-dialogue có mốc thời gian từng câu)
 * + chuông điện thoại + tiếng nền, rồi dựng bằng ffmpeg: giọng đầu dây bên kia lọc như qua điện thoại,
 * giọng ở xa nghe vọng, tiếng nền to/nhỏ theo từng câu ("after": "outside" / "before": "inside").
 *   node scripts/phonecall.mjs dialogues/u2-telefonata.json        → tạo (dùng cache nếu có)
 *   node scripts/phonecall.mjs dialogues/u2-telefonata.json --dry  → chỉ đếm ký tự, không gọi API
 * Key như scripts/dialogues.mjs (ELEVENLABS_API_KEY hoặc proxy: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=<ca-bundle>).
 * Cache trong dialogues/cache/: chạy lại không tốn thêm ký tự.
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
  console.error("Dùng: node scripts/phonecall.mjs dialogues/<cảnh>.json [--dry]");
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
console.log(`📞 ${scene.id}: ${scene.lines.length} câu · ${chars} ký tự hội thoại · ${Object.keys(scene.sfx).length} hiệu ứng`);

/** Hội thoại + mốc thời gian từng câu → { file, segments: [{ line, start, end }] }. */
async function dialogue() {
  const inputs = scene.lines.map((l) => ({ text: lineText(l), voice_id: scene.voices[l.speaker].id }));
  for (const model of [scene.model, scene.fallbackModel].filter(Boolean)) {
    const base = path.join(cacheDir, `${scene.id}-voice-${hash({ inputs, model, seed: scene.seed })}`);
    if (existsSync(base + ".mp3")) {
      console.log(`♻️  Hội thoại có sẵn trong cache (${model})`);
      return { file: base + ".mp3", segments: JSON.parse(readFileSync(base + ".json", "utf8")) };
    }
    if (dry) return console.log(`🆕 Sẽ tạo hội thoại bằng ${model}: ${chars} ký tự`), null;
    try {
      const res = await api("POST", "/v1/text-to-dialogue/with-timestamps?output_format=mp3_44100_128", { inputs, model_id: model, seed: scene.seed });
      const data = await res.json();
      writeFileSync(base + ".mp3", Buffer.from(data.audio_base64, "base64"));
      const segments = data.voice_segments.map((s) => ({ line: s.dialogue_input_index, start: s.start_time_seconds, end: s.end_time_seconds }));
      writeFileSync(base + ".json", JSON.stringify(segments, null, 1) + "\n");
      console.log(`✅ Hội thoại: ${model} · ${chars} ký tự`);
      return { file: base + ".mp3", segments };
    } catch (e) {
      if (model !== scene.fallbackModel && scene.fallbackModel && e.status && e.status < 500) {
        console.warn(`⚠️  ${model} bị từ chối (${e.message}) → thử ${scene.fallbackModel}`);
        continue;
      }
      throw e;
    }
  }
}

async function sfx(name) {
  const s = scene.sfx[name];
  const file = path.join(cacheDir, `${scene.id}-${name}-${hash(s)}.mp3`);
  if (existsSync(file)) return console.log(`♻️  ${name}: có sẵn trong cache`), file;
  if (dry) return console.log(`🆕 Sẽ tạo hiệu ứng "${name}" ${s.duration}s`), null;
  const res = await api("POST", "/v1/sound-generation?output_format=mp3_44100_128", {
    text: s.prompt,
    duration_seconds: s.duration,
    prompt_influence: s.promptInfluence ?? 0.3,
  });
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log(`✅ Hiệu ứng ${name} (${s.duration}s)`);
  return file;
}

const voice = await dialogue();
const fx = {};
for (const name of Object.keys(scene.sfx)) fx[name] = await sfx(name);
if (dry) process.exit(0);

// ---------- Dựng âm thanh ----------
const m = scene.mix;
const T0 = m.voiceStart;
const segs = voice.segments.map((s) => ({ ...s, start: s.start + T0, end: s.end + T0, line: scene.lines[s.line] }));
const voiceEnd = Math.max(...segs.map((s) => s.end));
const total = voiceEnd + m.tail;
const f = (x) => x.toFixed(3);
const during = (speaker) => {
  const parts = segs.filter((s) => s.line.speaker === speaker).map((s) => `between(t,${f(s.start - 0.05)},${f(s.end + 0.05)})`);
  return parts.length ? parts.join("+") : "0";
};

// Tiếng bếp: to lúc đầu, nhỏ sau câu "after: outside", to lại từ câu "before: inside"; tắt dần cuối bài.
const lvl = (db) => Math.pow(10, db / 20);
const outAt = segs.find((s) => s.line.after === "outside")?.end ?? total;
const inAt = segs.find((s) => s.line.before === "inside")?.start ?? total;
const ramp = (a, b, t0, d) => `(${a}+(${b}-${a})*min(max((t-${f(t0)})/${d},0),1))`;
const kIn = lvl(m.kitchenDb), kOut = lvl(m.outsideDb);
const kitchenGain = `if(lt(t,${f(inAt - 0.6)}),${ramp(kIn, kOut, outAt - 1.2, 1.5)},${ramp(kOut, kIn * 0.8, inAt - 0.6, 0.6)})`;

const speakers = Object.keys(scene.voices);
const chains = speakers.map((sp, i) => {
  const kind = scene.voices[sp].fx;
  const gate = `volume='if(${during(sp)},1,0)':eval=frame`;
  const color =
    kind === "phone"
      ? "highpass=f=320,lowpass=f=3300,acompressor=threshold=-18dB:ratio=4,volume=1.15"
      : kind === "far"
        ? "lowpass=f=2600,aecho=0.8:0.6:45|90:0.35|0.2,volume=1.3"
        : "volume=1";
  return `[v${i}]${gate},${color}[s${i}]`;
});

const filter = [
  `[0:a]adelay=${Math.round(T0 * 1000)}:all=1,apad=whole_dur=${f(total)},asplit=${speakers.length}${speakers.map((_, i) => `[v${i}]`).join("")}`,
  ...chains,
  // Tiếng rè đường dây chỉ khi đang gọi (từ lúc nghe máy đến hết câu cuối).
  `anoisesrc=color=pink:amplitude=0.012:duration=${f(total)},highpass=f=400,lowpass=f=3000,volume='if(between(t,${f(T0 - 0.2)},${f(voiceEnd + 0.2)}),1,0)':eval=frame[hiss]`,
  `[1:a]aloop=loop=-1:size=2e9,atrim=0:${f(total)},volume='${kitchenGain}':eval=frame,afade=t=out:st=${f(total - 1.8)}:d=1.8[kitchen]`,
  `[2:a]atrim=0:${f(m.ringLength)},afade=t=out:st=${f(m.ringLength - 0.4)}:d=0.4,adelay=${Math.round(m.ringStart * 1000)}:all=1,volume=0.32[ring]`,
  // Tiếng "bíp" kết thúc cuộc gọi.
  `sine=f=620:d=0.14,apad=pad_dur=0.12,aloop=loop=1:size=11466,volume=0.18,adelay=${Math.round((voiceEnd + 0.35) * 1000)}:all=1[beep]`,
  `${speakers.map((_, i) => `[s${i}]`).join("")}[hiss][kitchen][ring][beep]amix=inputs=${speakers.length + 4}:normalize=0,atrim=0:${f(total)},loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100[out]`,
].join(";");

const out = path.resolve(root, scene.out);
mkdirSync(path.dirname(out), { recursive: true });
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", voice.file, "-i", fx.kitchen, "-i", fx.ringtone, "-filter_complex", filter, "-map", "[out]", "-ac", "2", "-b:a", "128k", out]);
console.log(`🎧 ${path.relative(root, out)} · ${total.toFixed(1)}s`);
