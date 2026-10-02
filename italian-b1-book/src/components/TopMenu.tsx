import { useState } from "react";
import { pages } from "../content/book";
import { t } from "../i18n";
import { setState, useStore } from "../lib/store";
import type { Lang } from "../types";

export function TopMenu({
  onContents,
  onMistakes,
  onGoToPage,
  aiOnline,
}: {
  onContents: () => void;
  onMistakes: () => void;
  onGoToPage: (pageNumber: number) => void;
  aiOnline: boolean | null;
}) {
  const lang = useStore((s) => s.lang);
  const showAnswers = useStore((s) => s.showAnswers);
  const showTr = useStore((s) => s.showTranslation);
  const rate = useStore((s) => s.speechRate);
  const mistakes = useStore((s) => s.mistakes.length);
  const results = useStore((s) => s.results);
  const [jump, setJump] = useState("");
  const [settings, setSettings] = useState(false);

  const allEx = pages.flatMap((p) => p.blocks.flatMap((b) => (b.type === "exercise" ? [b.ex.id] : [])));
  const done = allEx.filter((id) => results[id]).length;

  return (
    <nav className="topmenu">
      <div className="brand">📖 {t(lang, "bookTitle")}</div>

      <div className="menu-items">
        <button className="menu-btn" onClick={onContents}>☰ {t(lang, "contents")}</button>

        <label className="menu-select">
          🌐
          <select value={lang} onChange={(e) => setState({ lang: e.target.value as Lang })} aria-label={t(lang, "language")}>
            <option value="vi">Tiếng Việt – Italiano</option>
            <option value="en">English – Italiano</option>
          </select>
        </label>

        <button className={`menu-btn toggle ${showAnswers ? "on" : ""}`} onClick={() => setState({ showAnswers: !showAnswers })}>
          ✎ {showAnswers ? t(lang, "hideAnswers") : t(lang, "showAnswers")}
        </button>

        <button className={`menu-btn toggle ${showTr ? "on" : ""}`} onClick={() => setState({ showTranslation: !showTr })}>
          ⇄ {t(lang, "showTranslation")}
        </button>

        <button className="menu-btn" onClick={onMistakes}>
          ✗ {t(lang, "mistakes")} {mistakes > 0 && <span className="badge">{mistakes}</span>}
        </button>

        <span className="menu-progress" title={t(lang, "progress")}>
          ★ {done}/{allEx.length}
        </span>

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
            ⚙ <span className={`ai-dot ${aiOnline ? "on" : "off"}`} />
          </button>
          {settings && (
            <div className="popover">
              <p className={aiOnline ? "ok-text" : "warn small"}>{aiOnline ? `🤖 ${t(lang, "aiOnline")}` : t(lang, "aiOffline")}</p>
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
