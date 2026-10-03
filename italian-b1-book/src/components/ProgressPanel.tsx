import { useMemo, useState } from "react";
import { t, tr } from "../i18n";
import { computeStats, levelOf, SKILLS } from "../lib/skills";
import { addUser, renameUser, switchUser, useStore } from "../lib/store";
import type { Lang, Skill } from "../types";
import { Icon } from "./Icon";
import { espressoPoints, levelOf as espressoLevel, LEVELS } from "../lib/fun";
import { pageLabel } from "./TableOfContents";

/** Bảng điểm gọn trong một màn hình: điểm chung, 5 kỹ năng, học gì tiếp. */
export function ProgressPanel({ onClose, onOpenPage }: { onClose: () => void; onOpenPage: (pageId: string) => void }) {
  const lang = useStore((s) => s.lang);
  const users = useStore((s) => s.users);
  const currentUser = useStore((s) => s.currentUser);
  const results = useStore((s) => s.results);
  const history = useStore((s) => s.history);
  const stats = useMemo(() => computeStats(results, history), [results, history]);
  const points = useMemo(() => espressoPoints(results, history), [results, history]);
  const { level, next, progress } = espressoLevel(points);
  const me = users.find((u) => u.id === currentUser);
  const vi = lang === "vi";
  const overall = levelOf(stats.overall, lang);
  const totalEx = stats.skills.reduce((a, s) => a + s.total, 0);

  const open = (id: string) => {
    onClose();
    onOpenPage(id);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="dash dash-simple" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t(lang, "progressTitle")}>
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

        <section className="ds-top">
          <div className={`ds-score t-${overall.tone}`}>
            <span className="ds-score-num">{stats.overall ?? "—"}</span>
            <span className="ds-score-of">/100</span>
            <span className="ds-score-label">{vi ? "Điểm trung bình" : "Average score"} · {overall.label}</span>
          </div>
          <div className="ds-facts">
            <span>
              <b>{stats.exercisesDone}</b>/{totalEx} {vi ? "bài đã làm" : "exercises"}
            </span>
            <span>
              <b>{stats.pagesDone}</b>/{stats.roadmap.length} {vi ? "trang xong" : "pages done"}
            </span>
            <span>
              <b>{stats.streak}</b> {vi ? "ngày học liên tiếp" : "day streak"} 🔥
            </span>
          </div>
          <div className="ds-level" title={LEVELS.map((l) => `${l.emoji} ${l.it}`).join(" → ")}>
            <span className="ds-level-emoji">{level.emoji}</span>
            <span className="ds-level-text">
              <b>{level.it}</b>
              <small>
                {points} ☕{next ? ` · ${vi ? "còn" : ""} ${next.min - points} ☕ → ${next.it}` : ""}
              </small>
              <span className="ds-level-bar">
                <span style={{ width: `${Math.round(progress * 100)}%` }} />
              </span>
            </span>
          </div>
        </section>

        <section className="ds-skills">
          <h3 className="dash-h3">{vi ? "Điểm theo kỹ năng" : "Scores by skill"}</h3>
          {stats.skills.map((st) => {
            const meta = SKILLS.find((x) => x.id === st.skill)!;
            const lv = levelOf(st.score, lang);
            return (
              <div key={st.skill} className={`ds-skill sk-${st.skill}`}>
                <span className="ds-skill-name">
                  {SKILL_ICON[st.skill]} <b>{tr(lang, meta.name)}</b>
                  <small>{meta.it}</small>
                </span>
                <span className="ds-skill-bar" aria-label={`${st.score ?? 0}/100`}>
                  <span className={`t-${lv.tone}`} style={{ width: `${st.score ?? 0}%` }} />
                  <i style={{ left: "50%" }} />
                  <i style={{ left: "70%" }} />
                </span>
                <span className={`ds-skill-score t-${lv.tone}`}>{st.score ?? "—"}</span>
                <span className="ds-skill-count">
                  {st.done}/{st.total} {vi ? "bài" : "tasks"}
                </span>
              </div>
            );
          })}
          <p className="ds-scale">
            <span className="t-bad">●</span> {vi ? "dưới 50: cần ôn" : "under 50: review"} <span className="t-warn">●</span> 50–69 {vi ? "khá" : "fair"}{" "}
            <span className="t-good">●</span> 70+ {vi ? "tốt" : "good"}
          </p>
        </section>

        <section className="ds-next">
          {stats.next ? (
            <button className="ds-card primary" onClick={() => open(stats.next!.page.id)}>
              <small>{vi ? "Học tiếp" : "Up next"}</small>
              <b>
                {t(lang, "page")} {pageLabel(stats.next.page)} · {stats.next.page.title}
              </b>
              <span>
                {stats.next.total - stats.next.done} {vi ? "bài còn lại →" : "exercises left →"}
              </span>
            </button>
          ) : (
            <div className="ds-card primary">
              <b>{vi ? "Bạn đã làm hết các bài! Bravissimo!" : "All exercises done! Bravissimo!"}</b>
            </div>
          )}
          <div className="ds-card">
            <small>{vi ? "Nên ôn" : "Practise"}</small>
            {stats.weakest ? (
              <>
                <b>
                  {SKILL_ICON[stats.weakest.skill]} {tr(lang, SKILLS.find((x) => x.id === stats.weakest!.skill)!.name)} · {stats.weakest.score}/100
                </b>
                <span>{weakTip(stats.weakest.skill, lang)}</span>
              </>
            ) : (
              <span>{vi ? "Làm bài đầu tiên để có điểm kỹ năng." : "Finish an exercise to see your skills."}</span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

const SKILL_ICON: Record<Skill, string> = { listening: "🎧", writing: "✍️", grammar: "📐", reading: "📖", speaking: "🗣️" };

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

