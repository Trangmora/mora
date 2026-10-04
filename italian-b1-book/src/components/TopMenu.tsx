import { useState } from "react";
import { Icon } from "./Icon";
import { EspressoBadge } from "./Fun";
import { allExercises, isDone } from "../lib/skills";
import { t } from "../i18n";
import { setState, useStore } from "../lib/store";
import type { Lang } from "../types";

export function TopMenu({
  onContents,
  onMistakes,
  onProgress,
  onGoToPage,
  aiOnline,
}: {
  onContents: () => void;
  onMistakes: () => void;
  onProgress: () => void;
  onGoToPage: (pageNumber: number) => void;
  aiOnline: boolean | null;
}) {
  const lang = useStore((s) => s.lang);
  const showAnswers = useStore((s) => s.showAnswers);
  const showTr = useStore((s) => s.showTranslation);
  const rate = useStore((s) => s.speechRate);
  const sound = useStore((s) => s.sound);
  const mistakes = useStore((s) => s.mistakes.length);
  const results = useStore((s) => s.results);
  const me = useStore((s) => s.users.find((u) => u.id === s.currentUser)?.name ?? "?");
  const [jump, setJump] = useState("");
  const [settings, setSettings] = useState(false);

  const allEx = allExercises;
  const done = allExercises.filter((e) => isDone(e.ex, results[e.ex.id])).length;

  return (
    <nav className="topmenu">
      <div className="brand"><span className="brand-mark"><Icon name="book" size={16} /></span>{t(lang, "bookTitle")}</div>

      <div className="menu-items">
        <button className="menu-btn" onClick={onContents}><Icon name="menu" /> <span className="lbl">{t(lang, "contents")}</span></button>

        <label className="menu-select">
          <Icon name="globe" />
          <select value={lang} onChange={(e) => setState({ lang: e.target.value as Lang })} aria-label={t(lang, "language")}>
            <option value="vi">Tiếng Việt – Italiano</option>
            <option value="en">English – Italiano</option>
          </select>
        </label>

        <button className={`menu-btn toggle ${showAnswers ? "on" : ""}`} onClick={() => setState({ showAnswers: !showAnswers })}>
          <Icon name="key" /> <span className="lbl">{showAnswers ? t(lang, "hideAnswers") : t(lang, "showAnswers")}</span>
        </button>

        <button className={`menu-btn toggle ${showTr ? "on" : ""}`} onClick={() => setState({ showTranslation: !showTr })}>
          <Icon name="translate" /> <span className="lbl">{t(lang, "showTranslation")}</span>
        </button>

        <button
          className={`menu-btn sound-btn ${sound === false ? "muted" : ""}`}
          onClick={() => setState({ sound: sound === false })}
          title={
            sound === false
              ? lang === "vi" ? "Bật tiếng lật trang" : "Turn page sounds on"
              : lang === "vi" ? "Tắt tiếng lật trang" : "Mute page sounds"
          }
          aria-pressed={sound === false}
          aria-label={lang === "vi" ? "Tắt / bật tiếng" : "Mute / unmute"}
        >
          <Icon name={sound === false ? "mute" : "volume"} />
        </button>

        <button className="menu-btn" onClick={onMistakes}>
          <Icon name="alert" /> <span className="lbl">{t(lang, "mistakes")}</span> {mistakes > 0 && <span className="badge">{mistakes}</span>}
        </button>

        <EspressoBadge onClick={onProgress} />

        <button className="menu-btn path-btn" onClick={onProgress} title={t(lang, "progressTitle")}>
          <span className="avatar mini-avatar">{me.slice(0, 1).toUpperCase()}</span>
          <span className="lbl">{t(lang, "path")}</span>
          <span className="menu-progress-num">{done}/{allEx.length}</span>
        </button>

        <form
          className="menu-jump"
          onSubmit={(e) => {
            e.preventDefault();
            if (jump) onGoToPage(Number(jump));
            setJump("");
          }}
        >
          <input value={jump} onChange={(e) => setJump(e.target.value.replace(/[^\d]/g, ""))} placeholder={t(lang, "page")} aria-label={t(lang, "goTo")} />
        </form>

        <div className="menu-settings">
          <button className="menu-btn" onClick={() => setSettings((v) => !v)} aria-label={t(lang, "settings")}>
            <Icon name="settings" /> <span className={`ai-dot ${aiOnline ? "on" : "off"}`} />
          </button>
          {settings && (
            <div className="popover">
              <p className={aiOnline ? "ok-text" : "warn small"}>{aiOnline ? t(lang, "aiOnline") : t(lang, "aiOffline")}</p>
              <label className="toggle-row">
                <input type="checkbox" checked={sound !== false} onChange={(e) => setState({ sound: e.target.checked })} />
                {lang === "vi" ? "Âm thanh vui (lật trang, đúng/sai)" : "Fun sounds (page turns, right/wrong)"}
              </label>
              <label>
                {t(lang, "speechRate")}: {rate.toFixed(2)}×
                <input type="range" min={0.5} max={1.2} step={0.05} value={rate} onChange={(e) => setState({ speechRate: Number(e.target.value) })} />
              </label>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
