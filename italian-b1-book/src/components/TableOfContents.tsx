import { t } from "../i18n";
import { allExercises, isDone } from "../lib/skills";
import { useStore, type ExerciseResult } from "../lib/store";
import type { BookPage } from "../types";
import type { Leaf } from "./Book";

/** Mục lục gói trong một trang: không cần trang mục lục thứ hai. */
export function tocPageCount(_pages: BookPage[]) {
  return 1;
}

export function pageLabel(p: BookPage) {
  return p.number < 1 ? "demo" : String(p.number);
}

/** Tên phần của trang: chữ trước dấu "·" trong tiêu đề (Cominciamo, Grammatica, Verifica…). */
function sectionOf(p: BookPage) {
  return p.title.split("·")[0].trim();
}

type Status = "done" | "progress" | "todo" | "none";

function pageStats(p: BookPage, results: Record<string, ExerciseResult>) {
  const exs = allExercises.filter((e) => e.page.id === p.id);
  const done = exs.filter((e) => isDone(e.ex, results[e.ex.id]));
  const status: Status = exs.length === 0 ? "none" : done.length === exs.length ? "done" : done.length ? "progress" : "todo";
  return { total: exs.length, done: done.length, scores: done.map((e) => results[e.ex.id].score), status };
}

export function TableOfContents({ leaves, goTo }: { part: number; leaves: Leaf[]; goTo: (i: number) => void }) {
  const lang = useStore((s) => s.lang);
  const results = useStore((s) => s.results);
  const vi = lang === "vi";
  // Mỗi trang sách chỉ một ô, dù được chia thành nhiều khung.
  const pages = leaves.flatMap((l) => (l.kind === "content" && l.sheet.part === 1 ? [l.page] : []));
  const leafOf = (p: BookPage) => leaves.findIndex((l) => l.kind === "content" && l.page.id === p.id);

  // Unità → các phần liên tiếp → các trang.
  const units: { unit: string; title: string; sections: { name: string; pages: BookPage[] }[] }[] = [];
  for (const p of pages) {
    let u = units[units.length - 1];
    if (!u || u.unit !== p.unit) units.push((u = { unit: p.unit, title: p.unitTitle, sections: [] }));
    const name = sectionOf(p);
    const last = u.sections[u.sections.length - 1];
    if (last && last.name === name) last.pages.push(p);
    else u.sections.push({ name, pages: [p] });
  }

  const label = { done: vi ? "Xong" : "Done", progress: vi ? "Đang làm" : "In progress", todo: vi ? "Chưa làm" : "To do" };

  return (
    <div className="toc toc-compact">
      <h2 className="toc-title">{t(lang, "indice")}</h2>
      <p className="toc-sub">{t(lang, "contents")}</p>
      {pages.length === 0 && <p className="toc-empty">{t(lang, "emptyBook")}</p>}

      {units.map((u) => {
        const stats = u.sections.flatMap((s) => s.pages).map((p) => pageStats(p, results));
        const total = stats.reduce((a, s) => a + s.total, 0);
        const done = stats.reduce((a, s) => a + s.done, 0);
        const scores = stats.flatMap((s) => s.scores);
        const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
        const pct = total ? Math.round((done / total) * 100) : 0;
        return (
          <section key={u.unit} className="toc-u">
            <header className="toc-u-head">
              <span className="toc-u-badge">U{u.unit}</span>
              <span className="toc-u-title">{u.title}</span>
              <span className={`toc-u-score t-${avg === null ? "none" : avg >= 70 ? "good" : avg >= 50 ? "warn" : "bad"}`}>
                {avg === null ? "—" : avg}
                <small>/100</small>
              </span>
            </header>
            <div className="toc-u-bar" title={`${done}/${total}`}>
              <span style={{ width: `${pct}%` }} />
            </div>
            <p className="toc-u-meta">
              {vi ? `Đã làm ${done}/${total} bài · ${pct}%` : `${done}/${total} exercises done · ${pct}%`}
            </p>
            <ul className="toc-secs">
              {u.sections.map((s, i) => (
                <li key={`${s.name}-${i}`}>
                  <button className="toc-sec-name" onClick={() => goTo(leafOf(s.pages[0]))}>
                    {s.name}
                  </button>
                  <span className="toc-dots" />
                  <span className="toc-chips">
                    {s.pages.map((p) => {
                      const st = pageStats(p, results).status;
                      return (
                        <button
                          key={p.id}
                          className={`toc-chip ${st}`}
                          onClick={() => goTo(leafOf(p))}
                          title={`${p.title}${st !== "none" ? ` · ${label[st]}` : ""}`}
                        >
                          {pageLabel(p)}
                        </button>
                      );
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {pages.length > 0 && (
        <p className="toc-legend">
          <span className="toc-chip done">✓</span> {label.done}
          <span className="toc-chip progress">…</span> {label.progress}
          <span className="toc-chip todo"> </span> {label.todo}
          <span className="toc-hint">{vi ? "Bấm số trang để mở" : "Tap a page number to open it"}</span>
        </p>
      )}
    </div>
  );
}
