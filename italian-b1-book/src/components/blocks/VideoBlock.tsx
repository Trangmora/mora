import { tr } from "../../i18n";
import type { Block } from "../../types";
import { useStore } from "../../lib/store";

type Props = { block: Extract<Block, { type: "video" }> };

/**
 * Video YouTube: ảnh bìa (tải sẵn) + nút phát → mở video ở tab mới trên YouTube.
 * Không nhúng khung YouTube vì trang sách đăng trên Claude (và nhiều nơi khác) chặn khung nhúng.
 */
export function VideoBlock({ block }: Props) {
  const lang = useStore((s) => s.lang);
  const showTr = useStore((s) => s.showTranslation);
  const watch = `https://www.youtube.com/watch?v=${block.youtube}`;

  return (
    <figure className="video-block">
      <a className="video-frame video-poster" href={watch} target="_blank" rel="noreferrer" aria-label={`Xem trên YouTube: ${block.title}`}>
        <img src={block.thumb} alt="" loading="lazy" />
        <span className="video-play" aria-hidden="true">
          <svg viewBox="0 0 68 48" width="58" height="41">
            <path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6c5.3 1.4 26.5 1.4 26.5 1.4s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#e8322b" />
            <path d="M45 24 27 14v20z" fill="#fff" />
          </svg>
        </span>
        {block.duration && <span className="video-dur">{block.duration}</span>}
        <span className="video-open">Xem trên YouTube ↗</span>
      </a>
      <figcaption>
        <b className="video-title">{block.title}</b>
        <span className="video-meta">{block.channel}</span>
        {showTr && block.tr && <span className="translation">{tr(lang, block.tr)}</span>}
      </figcaption>
    </figure>
  );
}
