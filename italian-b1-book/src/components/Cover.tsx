import { bookInfo, pages } from "../content/book";
import { t, tr } from "../i18n";
import { coverQuip } from "../lib/humor";
import { NonnaFace } from "./Nonna";
import { useStore } from "../lib/store";

export function Cover({ onOpen }: { onOpen: () => void }) {
  const lang = useStore((s) => s.lang);
  return (
    <div className="cover">
      <svg className="cover-shapes" viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <circle cx="330" cy="120" r="150" fill="var(--c-sun)" />
        <circle cx="330" cy="120" r="96" fill="var(--c-tomato)" />
        <rect x="-40" y="380" width="260" height="260" rx="130" fill="var(--c-sage)" />
        <path d="M0 470 Q200 400 400 470 V560 H0Z" fill="var(--c-deep)" opacity=".55" />
      </svg>
      <div className="cover-content">
        <div className="cover-top">
          <span className="cover-level">B1</span>
          <span className="cover-tricolore" aria-hidden>
            <i /><i /><i />
          </span>
        </div>
        <div className="cover-main">
          <p className="cover-sub">{bookInfo.subtitle}</p>
          <h1 className="cover-title">{bookInfo.title}</h1>
          <button className="cover-open" onClick={onOpen}>
            {t(lang, "openBook")}
            <span aria-hidden>→</span>
          </button>
        </div>
        <div className="cover-sticker">
          <NonnaFace size={54} mood="wink" />
          <span>
            {coverQuip.it}
            <small>{tr(lang, coverQuip.tr)}</small>
          </span>
        </div>
        <p className="cover-count">
          {pages.length} {t(lang, "page").toLowerCase()} · {lang === "vi" ? "cập nhật mỗi ngày" : "updated daily"}
        </p>
      </div>
    </div>
  );
}

export function BackCover() {
  const lang = useStore((s) => s.lang);
  return (
    <div className="cover back">
      <div className="cover-content">
        <div />
        <div className="cover-main">
          <p className="cover-quote">Chi va piano va sano e va lontano.</p>
          <p className="cover-sub">{lang === "vi" ? "Chậm mà chắc thì đi được xa." : "Slow and steady goes far."}</p>
        </div>
        <p className="cover-count">{lang === "vi" ? "— còn tiếp —" : "— to be continued —"}</p>
      </div>
    </div>
  );
}
