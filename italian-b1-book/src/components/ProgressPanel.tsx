import { useMemo, useState } from "react";
import { t, tr } from "../i18n";
import { computeStats, levelOf, SKILLS, type SkillStat } from "../lib/skills";
import { addUser, renameUser, switchUser, useStore, type Attempt } from "../lib/store";
import type { Lang, Skill } from "../types";
import { Icon } from "./Icon";
import { espressoPoints, levelOf as espressoLevel, LEVELS } from "../lib/fun";
import { pageLabel } from "./TableOfContents";

/** Bảng điểm & lộ trình học của người đang học. */
export function ProgressPanel({ onClose, onOpenPage }: { onClose: () => void; onOpenPage: (pageId: string) => void }) {
  const lang = useStore((s) => s.lang);
  const users = useStore((s) => s.users);
  const currentUser = useStore((s) => s.currentUser);
  const results = useStore((s) => s.results);
  const history = useStore((s) => s.history);
  const stats = useMemo(() => computeStats(results, history), [results, history]);
  const me = users.find((u) => u.id === currentUser);
  const vi = lang === "vi";

  const open = (id: string) => {
    onClose();
    onOpenPage(id);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="dash" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t(lang, "progressTitle")}>
        <header className="dash-head">
          <div>
            <p className="dash-eyebrow">{t(lang, "progressTitle")}</p>
            <h2>{me?.name}</h2>
          </div>
          <UserSwitcher />
          <button className="icon-btn" onClick={onClose} aria-label={t(lang, "close")}>
            <Icon name="close" />
          </button>
        </header>

        <LevelStrip />

        <section className="dash-kpis">
          <Kpi label={vi ? "Điểm trung bình" : "Average score"} value={stats.overall === null ? "—" : `${stats.overall}`} unit={stats.overall === null ? undefined : "/100"} />
          <Kpi label={vi ? "Trang đã học xong" : "Pages completed"} value={`${stats.pagesDone}`} unit={`/${stats.roadmap.length}`} />
          <Kpi label={vi ? "Bài đã làm" : "Exercises done"} value={`${stats.exercisesDone}`} />
          <Kpi label={vi ? "Chuỗi ngày học" : "Day streak"} value={`${stats.streak}`} unit={vi ? " ngày" : " days"} />
        </section>

        <section>
          <h3 className="dash-h3">{vi ? "Điểm theo kỹ năng" : "Scores by skill"}</h3>
          <div className="skill-grid">
            {stats.skills.map((s) => (
              <SkillCard key={s.skill} stat={s} lang={lang} />
            ))}
          </div>
        </section>

        <div className="dash-cols">
          <section className="dash-road">
            <h3 className="dash-h3">{vi ? "Lộ trình học" : "Learning path"}</h3>
            {stats.roadmap.length === 0 && <p className="muted">{t(lang, "emptyBook")}</p>}
            <ol className="road">
              {stats.roadmap.map((r) => {
                const isNext = stats.next?.page.id === r.page.id;
                return (
                  <li key={r.page.id} className={`road-node ${r.status} ${isNext ? "next" : ""}`}>
                    <span className="road-dot" aria-hidden>
                      {r.status === "done" ? <Icon name="check" size={14} /> : null}
                    </span>
                    <button className="road-body" onClick={() => open(r.page.id)}>
                      <span className="road-meta">
                        Unità {r.page.unit} · {t(lang, "page")} {pageLabel(r.page)}
                        {isNext && <span className="road-next">{vi ? "Học tiếp" : "Up next"}</span>}
                      </span>
                      <span className="road-title">{r.page.title}</span>
                      <span className="road-foot">
                        <span className="road-skills">
                          {r.skills.map((sk) => (
                            <span key={sk} className={`skill-chip sk-${sk}`}>
                              {tr(lang, SKILLS.find((x) => x.id === sk)!.name)}
                            </span>
                          ))}
                        </span>
                        <span className="road-count">
                          {r.done}/{r.total} {t(lang, "done")}
                          {r.score !== null && <b> · {r.score}/100</b>}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>

          <aside className="dash-advice">
            <h3 className="dash-h3">{vi ? "Gợi ý hôm nay" : "Today's plan"}</h3>
            {stats.next && (
              <button className="advice-card" onClick={() => open(stats.next!.page.id)}>
                <span className="advice-kicker">{vi ? "Bài tiếp theo" : "Next lesson"}</span>
                <span className="advice-title">{stats.next.page.title}</span>
                <span className="muted">
                  {t(lang, "page")} {pageLabel(stats.next.page)} · {stats.next.total - stats.next.done} {vi ? "bài còn lại" : "exercises left"}
                </span>
              </button>
            )}
            {stats.weakest && (
              <div className="advice-card static">
                <span className="advice-kicker">{vi ? "Kỹ năng cần ôn" : "Skill to practise"}</span>
                <span className="advice-title">
                  {tr(lang, SKILLS.find((x) => x.id === stats.weakest!.skill)!.name)} · {stats.weakest.score}/100
                </span>
                <span className="muted">{weakTip(stats.weakest.skill, lang)}</span>
              </div>
            )}
            {stats.review.length > 0 && (
              <div className="advice-card static">
                <span className="advice-kicker">{vi ? "Làm lại bài điểm thấp" : "Redo low scores"}</span>
                <ul className="review-list">
                  {stats.review.map((e) => (
                    <li key={e.ex.id}>
                      <button onClick={() => open(e.page.id)}>
                        <span className="ex-num small">{e.ex.number ?? "•"}</span>
                        <span className="review-text">{e.ex.instruction}</span>
                        <span className="review-score">{results[e.ex.id].score}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!stats.weakest && !stats.review.length && (
              <p className="muted">{vi ? "Làm bài đầu tiên để bắt đầu có bảng điểm." : "Finish your first exercise to start your report."}</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function weakTip(skill: Skill, lang: Lang) {
  const tips: Record<Skill, { vi: string; en: string }> = {
    listening: { vi: "Nghe lại bài audio ở tốc độ 0.75×, bật lời rồi tắt lời và nghe lần nữa.", en: "Replay the audio at 0.75×, read the transcript, then listen again without it." },
    writing: { vi: "Viết lại bài đã được AI sửa, chú ý các lỗi trong Sổ lỗi.", en: "Rewrite the texts the AI corrected and review your mistake notebook." },
    grammar: { vi: "Xem lại bảng ngữ pháp của trang và làm lại các bài điền từ.", en: "Review the grammar tables and redo the fill-in exercises." },
    reading: { vi: "Đọc to đoạn văn với nút luyện đọc rồi làm lại bài đúng/sai.", en: "Read the text aloud with the practice button, then redo the true/false task." },
    speaking: { vi: "Luyện đọc từng câu hội thoại đến khi đạt trên 80 điểm.", en: "Practise each dialogue line until you score above 80." },
  };
  return tips[skill][lang];
}

function Kpi({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="kpi">
      <span className="kpi-label">{label}</span>
      <span className="kpi-value">
        {value}
        {unit && <small>{unit}</small>}
      </span>
    </div>
  );
}

function SkillCard({ stat, lang }: { stat: SkillStat; lang: Lang }) {
  const meta = SKILLS.find((s) => s.id === stat.skill)!;
  const level = levelOf(stat.score, lang);
  const pct = stat.total ? Math.round((stat.done / stat.total) * 100) : 0;
  return (
    <article className={`skill-card sk-${stat.skill} ${meta.main ? "main" : ""}`}>
      <header>
        <span className="skill-name">
          <i className="swatch" aria-hidden />
          {tr(lang, meta.name)}
        </span>
        <span className="skill-it">{meta.it}</span>
      </header>
      <div className="skill-score">
        <span className="big">{stat.score ?? "—"}</span>
        {stat.score !== null && <small>/100</small>}
        <span className={`level ${level.tone}`}>{level.label}</span>
      </div>
      <Sparkline points={stat.trend} lang={lang} />
      <div className="skill-progress">
        <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <span className="skill-count">
          {stat.done}/{stat.total} {lang === "vi" ? "bài" : "tasks"}
        </span>
      </div>
    </article>
  );
}

/** Đường tiến bộ của một kỹ năng (tối đa 20 lần gần nhất), rê chuột để xem từng lần. */
function Sparkline({ points, lang }: { points: Attempt[]; lang: Lang }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 220;
  const H = 56;
  const padX = 6;
  const padY = 6;
  if (points.length === 0) {
    return <div className="spark empty">{lang === "vi" ? "Chưa có lần làm nào" : "No attempts yet"}</div>;
  }
  const x = (i: number) => (points.length === 1 ? W / 2 : padX + (i * (W - 2 * padX)) / (points.length - 1));
  const y = (v: number) => padY + ((100 - v) * (H - 2 * padY)) / 100;
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.score).toFixed(1)}`).join(" ");
  const area = `${line} L${x(points.length - 1).toFixed(1)},${H - padY} L${x(0).toFixed(1)},${H - padY} Z`;
  const last = points.length - 1;
  const h = hover ?? last;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let best = 0;
    points.forEach((_, i) => {
      if (Math.abs(x(i) - px) < Math.abs(x(best) - px)) best = i;
    });
    setHover(best);
  };

  const date = new Date(points[h].at).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-GB", { day: "numeric", month: "short" });

  return (
    <div className="spark">
      <div className="spark-plot">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={points.map((p) => p.score).join(", ")}
        >
          <line x1={0} x2={W} y1={y(50)} y2={y(50)} className="spark-grid" />
          <line x1={0} x2={W} y1={y(100)} y2={y(100)} className="spark-grid" />
          <path d={area} className="spark-area" />
          <path d={line} className="spark-line" vectorEffect="non-scaling-stroke" />
          {hover !== null && <line x1={x(h)} x2={x(h)} y1={0} y2={H} className="spark-cross" vectorEffect="non-scaling-stroke" />}
        </svg>
        <span className="spark-dot" style={{ left: `${(x(h) / W) * 100}%`, top: `${(y(points[h].score) / H) * 100}%` }} />
      </div>
      <span className="spark-tip">
        {date} · <b>{points[h].score}</b>
      </span>
    </div>
  );
}

function UserSwitcher() {
  const lang = useStore((s) => s.lang);
  const users = useStore((s) => s.users);
  const currentUser = useStore((s) => s.currentUser);
  const [mode, setMode] = useState<"idle" | "add" | "rename">("idle");
  const [name, setName] = useState("");
  const vi = lang === "vi";

  if (mode !== "idle") {
    return (
      <form
        className="user-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (mode === "add") addUser(name);
          else renameUser(currentUser, name);
          setName("");
          setMode("idle");
        }}
      >
        <input
          id="user-name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={vi ? "Tên người học" : "Learner name"}
          maxLength={40}
        />
        <button className="pill primary" type="submit">{vi ? "Lưu" : "Save"}</button>
        <button className="pill ghost" type="button" onClick={() => setMode("idle")}>{vi ? "Huỷ" : "Cancel"}</button>
      </form>
    );
  }

  return (
    <div className="user-switch">
      <div className="avatars">
        {users.map((u) => (
          <button
            key={u.id}
            className={`avatar ${u.id === currentUser ? "on" : ""}`}
            onClick={() => switchUser(u.id)}
            title={u.name}
            aria-pressed={u.id === currentUser}
          >
            {u.name.slice(0, 1).toUpperCase()}
          </button>
        ))}
      </div>
      <button className="pill ghost" onClick={() => { setName(users.find((u) => u.id === currentUser)?.name ?? ""); setMode("rename"); }}>
        {vi ? "Đổi tên" : "Rename"}
      </button>
      <button className="pill" onClick={() => setMode("add")}>+ {vi ? "Người học" : "Learner"}</button>
    </div>
  );
}

/** Cấp bậc espresso: từ Turista đến Vero italiano. */
function LevelStrip() {
  const lang = useStore((s) => s.lang);
  const results = useStore((s) => s.results);
  const history = useStore((s) => s.history);
  const points = useMemo(() => espressoPoints(results, history), [results, history]);
  const { index, level, next, progress } = espressoLevel(points);
  return (
    <section className="level-strip">
      <div className="level-now">
        <span className="level-emoji">{level.emoji}</span>
        <span>
          <b>{level.it}</b>
          <small>{tr(lang, level.tr)}</small>
        </span>
        <span className="level-points">{points} ☕</span>
      </div>
      <div className="level-track" aria-label={`${points} ☕`}>
        {LEVELS.map((l, i) => (
          <span key={l.it} className={`level-step ${i < index ? "done" : i === index ? "now" : ""}`} title={`${l.it} · ${l.min} ☕`}>
            {l.emoji}
          </span>
        ))}
      </div>
      {next && (
        <p className="muted">
          <span className="level-bar">
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </span>
          {lang === "vi"
            ? `Còn ${next.min - points} ☕ nữa để thành ${next.it} — mỗi câu đúng +10 ☕, bài 100 điểm +20 ☕.`
            : `${next.min - points} ☕ to become ${next.it} — each right answer +10 ☕, a perfect exercise +20 ☕.`}
        </p>
      )}
    </section>
  );
}
