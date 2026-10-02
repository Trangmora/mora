import { bookInfo, pages } from "../content/book";
import { t } from "../i18n";
import { useStore } from "../lib/store";

export function Cover({ onOpen }: { onOpen: () => void }) {
  const lang = useStore((s) => s.lang);
  return (
    <div className="cover">
      <div className="cover-flag">
        <span style={{ background: "#008c45" }} />
        <span style={{ background: "#f4f5f0" }} />
        <span style={{ background: "#cd212a" }} />
      </div>
      <div className="cover-frame">
        <div className="cover-level">B1</div>
        <h1 className="cover-title">{bookInfo.title}</h1>
        <p className="cover-sub">{bookInfo.subtitle}</p>
        <svg viewBox="0 0 200 120" className="cover-art" aria-hidden>
          <path d="M10 110 Q50 70 100 90 T190 80 V120 H10z" fill="#c8a35a" opacity=".5" />
          <rect x="88" y="20" width="14" height="70" fill="#e8d2a0" />
          <path d="M84 20 h22 l-11 -14z" fill="#c8643b" />
          <circle cx="50" cy="40" r="14" fill="#f6c453" opacity=".9" />
          <path d="M120 90 v-30 a14 14 0 0 1 28 0 v30z" fill="#e8d2a0" />
          <path d="M30 90 h40 v-22 h-40z" fill="#e8d2a0" />
          <path d="M26 68 h48 l-24 -14z" fill="#c8643b" />
        </svg>
        <button className="cover-open" onClick={onOpen}>
          {t(lang, "openBook")} →
        </button>
        <p className="cover-count">
          {pages.length} {t(lang, "page").toLowerCase()}
        </p>
      </div>
    </div>
  );
}

export function BackCover() {
  const lang = useStore((s) => s.lang);
  return (
    <div className="cover back">
      <div className="cover-frame">
        <p className="cover-quote">“Chi va piano va sano e va lontano.”</p>
        <p className="cover-sub small">
          {lang === "vi" ? "Chậm mà chắc thì đi được xa." : "Slow and steady goes far."}
        </p>
        <p className="cover-sub small">{lang === "vi" ? "— còn tiếp —" : "— to be continued —"}</p>
      </div>
    </div>
  );
}
