/**
 * Tạo giọng đọc MỘT LẦN cho mọi câu tiếng Ý trong sách:  npm run voices
 * Xem trước số ký tự sẽ tạo (không gọi API):              npm run voices -- --dry
 * File mp3 lưu ở public/voices — commit lên repo là dùng mãi, không tốn phí lần sau.
 */
import "dotenv/config";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { BookPage } from "../src/types";
import { collectSpeech } from "../src/lib/voiceText";
import { hasVoice, synthesize, ttsProvider } from "../server/tts";

const dry = process.argv.includes("--dry");
const dir = path.resolve(import.meta.dirname, "../src/content/pages");
const files = (await readdir(dir)).filter((f) => f.endsWith(".ts")).sort();
const pages: BookPage[] = [];
for (const f of files) pages.push((await import(pathToFileURL(path.join(dir, f)).href)).default);

const all = collectSpeech(pages);
const missing = [];
for (const s of all) if (!(await hasVoice(s.text, s.voice))) missing.push(s);
const chars = missing.reduce((n, s) => n + s.text.length, 0);

console.log(`📖 ${pages.length} trang · ${all.length} câu có nút nghe · đã có giọng: ${all.length - missing.length}`);
console.log(`🆕 Cần tạo: ${missing.length} câu · ${chars} ký tự`);

if (dry || missing.length === 0) process.exit(0);
const provider = ttsProvider();
if (!provider) {
  console.error("⚠️  Chưa có key giọng đọc trong .env (GOOGLE_TTS_API_KEY / AZURE_SPEECH_KEY / ELEVENLABS_API_KEY).");
  process.exit(1);
}
console.log(`🔊 Đang tạo bằng ${provider}…`);
let done = 0;
for (const s of missing) {
  try {
    await synthesize(s.text, s.voice);
    done++;
    process.stdout.write(`\r   ${done}/${missing.length}`);
  } catch (e) {
    console.error(`\n✗ "${s.text.slice(0, 50)}": ${(e as Error).message}`);
  }
}
console.log(`\n✅ Xong. Commit thư mục public/voices để giữ giọng đọc vĩnh viễn.`);
