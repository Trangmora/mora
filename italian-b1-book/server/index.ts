import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gradeExercise, gradeReading, aiEnabled, GradingError } from "./grader";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isProd = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT ?? 5173);

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ai: aiEnabled() });
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

function handleError(res: express.Response, e: unknown) {
  const status = e instanceof GradingError ? e.status : 500;
  console.error("[grade]", e);
  res.status(status).json({ error: e instanceof Error ? e.message : String(e) });
}

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
});
