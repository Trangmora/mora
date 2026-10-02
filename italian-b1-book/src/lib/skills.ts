import { pages } from "../content/book";
import type { BookPage, Exercise, L10n, Lang, Skill } from "../types";
import type { Attempt, ExerciseResult } from "./store";
import { needsAI } from "./grading";

export const SKILLS: { id: Skill; name: L10n; it: string; main: boolean }[] = [
  { id: "listening", name: { vi: "Nghe", en: "Listening" }, it: "Ascolto", main: true },
  { id: "writing", name: { vi: "Viết", en: "Writing" }, it: "Scrittura", main: true },
  { id: "grammar", name: { vi: "Ngữ pháp", en: "Grammar" }, it: "Grammatica", main: true },
  { id: "reading", name: { vi: "Đọc hiểu", en: "Reading" }, it: "Lettura", main: false },
  { id: "speaking", name: { vi: "Nói & phát âm", en: "Speaking" }, it: "Parlato", main: false },
];

/** Đoán kỹ năng của bài tập từ dạng bài và nội dung đứng trước nó trong trang. */
export function skillOf(ex: Exercise, page: BookPage): Skill {
  if (ex.skill) return ex.skill;
  if (ex.kind === "speak") return "speaking";
  if (ex.kind === "write") return "writing";
  if (ex.refText === "audio") return "listening";
  const idx = page.blocks.findIndex((b) => b.type === "exercise" && b.ex.id === ex.id);
  for (let i = idx - 1; i >= 0; i--) {
    const b = page.blocks[i];
    if (b.type === "exercise" || b.type === "heading" || b.type === "image") continue;
    if (b.type === "audio") return "listening";
    break;
  }
  return ex.refText ? "reading" : "grammar";
}

export type ExerciseRef = { ex: Exercise; page: BookPage; skill: Skill };

export const allExercises: ExerciseRef[] = pages.flatMap((page) =>
  page.blocks.flatMap((b) => (b.type === "exercise" ? [{ ex: b.ex, page, skill: skillOf(b.ex, page) }] : [])),
);

/** Bài viết/nói chỉ tính là đã làm khi AI đã chấm. */
export function isDone(ex: Exercise, r?: ExerciseResult) {
  return !!r && !(needsAI(ex) && r.by === "key");
}

export function levelOf(score: number | null, lang: Lang) {
  if (score === null) return { label: lang === "vi" ? "Chưa có điểm" : "No score yet", tone: "none" as const };
  if (score >= 85) return { label: lang === "vi" ? "Xuất sắc" : "Excellent", tone: "good" as const };
  if (score >= 70) return { label: lang === "vi" ? "Tốt" : "Good", tone: "good" as const };
  if (score >= 50) return { label: lang === "vi" ? "Khá" : "Fair", tone: "warn" as const };
  return { label: lang === "vi" ? "Cần ôn thêm" : "Needs work", tone: "bad" as const };
}

const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null);

export type SkillStat = {
  skill: Skill;
  total: number;
  done: number;
  score: number | null;
  trend: Attempt[];
};

export function computeStats(results: Record<string, ExerciseResult>, history: Attempt[]) {
  const skills: SkillStat[] = SKILLS.map(({ id }) => {
    const exs = allExercises.filter((e) => e.skill === id);
    const doneEx = exs.filter((e) => isDone(e.ex, results[e.ex.id]));
    const trend = history.filter((h) => h.skill === id).slice(-20);
    // Điểm kỹ năng = trung bình điểm mới nhất của các bài đã làm; kỹ năng chỉ có luyện tập thì lấy luyện tập gần đây.
    const score = avg(doneEx.map((e) => results[e.ex.id].score)) ?? avg(trend.slice(-5).map((t) => t.score));
    return { skill: id, total: exs.length, done: doneEx.length, score, trend };
  });

  const doneAll = allExercises.filter((e) => isDone(e.ex, results[e.ex.id]));
  const overall = avg(doneAll.map((e) => results[e.ex.id].score));

  const roadmap = pages.map((page) => {
    const exs = allExercises.filter((e) => e.page.id === page.id);
    const done = exs.filter((e) => isDone(e.ex, results[e.ex.id]));
    const status: "done" | "progress" | "todo" =
      exs.length === 0 ? "todo" : done.length === exs.length ? "done" : done.length ? "progress" : "todo";
    return {
      page,
      total: exs.length,
      done: done.length,
      score: avg(done.map((e) => results[e.ex.id].score)),
      status,
      skills: [...new Set(exs.map((e) => e.skill))],
    };
  });

  const next = roadmap.find((r) => r.status !== "done") ?? null;
  const scored = skills.filter((s) => s.score !== null);
  const weakest = scored.length ? scored.reduce((a, b) => ((a.score ?? 0) <= (b.score ?? 0) ? a : b)) : null;
  const review = doneAll
    .filter((e) => results[e.ex.id].score < 70)
    .sort((a, b) => results[a.ex.id].score - results[b.ex.id].score)
    .slice(0, 4);

  // Chuỗi ngày học liên tiếp tính đến hôm nay (hoặc hôm qua).
  const days = new Set(history.map((h) => h.at.slice(0, 10)));
  let streak = 0;
  const d = new Date();
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (days.has(d.toISOString().slice(0, 10))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }

  return {
    skills,
    overall,
    roadmap,
    next,
    weakest,
    review,
    streak,
    pagesDone: roadmap.filter((r) => r.status === "done").length,
    exercisesDone: doneAll.length,
  };
}
