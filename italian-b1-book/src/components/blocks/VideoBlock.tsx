import { useState } from "react";
import { tr } from "../../i18n";
import type { Block } from "../../types";
import { useStore } from "../../lib/store";

type Props = { block: Extract<Block, { type: "video" }> };

/** Video YouTube: ảnh bìa → bấm để phát ngay trong trang; luôn có link mở trên YouTube. */
export function VideoBlock({ block }: Props) {
  const lang = useStore((s) => s.lang);
  const showTr = useStore((s) => s.showTranslation);
  const [playing, setPlaying] = useState(false);
  const watch = `https://www.youtube.com/watch?v=${block.youtube}`;

  return (
    <figure className="video-block">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${block.youtube}?autoplay=1&rel=0&cc_lang_pref=it&cc_load_policy=1`}
            title={block.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className="video-poster" onClick={() => setPlaying(true)} aria-label={`Phát video: ${block.title}`}>
            <img src={block.thumb} alt="" loading="lazy" />
            <span className="video-play" aria-hidden="true">
              <svg viewBox="0 0 68 48" width="58" height="41">
                <path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6c5.3 1.4 26.5 1.4 26.5 1.4s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#e8322b" />
                <path d="M45 24 27 14v20z" fill="#fff" />
              </svg>
            </span>
            {block.duration && <span className="video-dur">{block.duration}</span>}
          </button>
        )}
      </div>
      <figcaption>
        <b className="video-title">{block.title}</b>
        <span className="video-meta">
          {block.channel} ·{" "}
          <a href={watch} target="_blank" rel="noreferrer">
            Mở trên YouTube ↗
          </a>
        </span>
        {showTr && block.tr && <span className="translation">{tr(lang, block.tr)}</span>}
      </figcaption>
    </figure>
  );
}
