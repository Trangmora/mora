import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gradeExercise, gradeReading, translateText, aiEnabled, GradingError } from "./grader";
import { findPhoto } from "./photos";
import { synthesize, ttsProvider, TTSError } from "./tts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isProd = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT ?? 5173);

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ai: aiEnabled(), tts: ttsProvider() });
});

app.post("/api/grade/exercise", async (req, res) => {
  try {
    res.json(await gradeExercise(req.body));
  } catch (e) {
    handleError(res, e);
  }
});

app.post("/api/grade/reading", async (req, res) => {
  try {
    res.json(await gradeReading(req.body));
  } catch (e) {
    handleError(res, e);
  }
});

// Ảnh thật cho trang sách: /api/photo?q=italian+espresso+bar&i=0
app.post("/api/translate", async (req, res) => {
  try {
    res.json(await translateText(req.body));
  } catch (e) {
    handleError(res, e);
  }
});

app.get("/api/photo", async (req, res) => {
  const q = String(req.query.q ?? "");
  const i = Math.max(0, Math.min(10, Number(req.query.i ?? 0) || 0));
  const photo = await findPhoto(q, i);
  if (!photo) return res.status(404).json({ error: "Không tìm thấy ảnh" });
  res.set("Cache-Control", "public, max-age=86400").json(photo);
});

// Giọng đọc tự nhiên: /api/tts?text=Ciao!&voice=f|m  → audio/mpeg
app.get("/api/tts", async (req, res) => {
  try {
    const voice = req.query.voice === "m" ? "m" : "f";
    const audio = await synthesize(String(req.query.text ?? ""), voice);
    res.set({ "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=31536000, immutable" }).send(audio);
  } catch (e) {
    const status = e instanceof TTSError ? e.status : 500;
    console.error("[tts]", e);
    res.status(status).json({ error: e instanceof Error ? e.message : String(e) });
  }
});

function handleError(res: express.Response, e: unknown) {
  const status = e instanceof GradingError ? e.status : 500;
  console.error("[grade]", e);
  res.status(status).json({ error: e instanceof Error ? e.message : String(e) });
}

// File giọng đọc đã tạo (kể cả file mới tạo sau khi build)
app.use("/voices", express.static(path.join(root, "public/voices")));

if (isProd) {
  const dist = path.join(root, "dist");
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, "index.html")));
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({ root, server: { middlewareMode: true }, appType: "spa" });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`📖 Il Mio Libro B1 → http://localhost:${port}`);
  console.log(aiEnabled() ? "🤖 AI grading: ON" : "⚠️  AI grading: OFF (thêm ANTHROPIC_API_KEY vào .env)");
  console.log(ttsProvider() ? `🔊 Giọng đọc: ${ttsProvider()}` : "⚠️  Giọng đọc: giọng máy của trình duyệt (thêm key ElevenLabs/Google/Azure vào .env)");
});
