import { t, tr } from "../../i18n";
import type { Block, BookPage } from "../../types";
import { useStore } from "../../lib/store";
import { speak } from "../../lib/speech";
import { Speakable } from "../Speakable";
import { Scene } from "../illustrations/Scene";
import { Photo } from "../Photo";
import { AudioBlock } from "./AudioBlock";
import { Theory } from "./Theory";
import { flatBlocks } from "../../lib/skills";

/** Đoạn văn / hội thoại / bài nghe của trang — gửi kèm khi AI chấm bài có tham chiếu. */
export function pageContext(page: BookPage) {
  return flatBlocks(page.blocks)
    .filter((b) => b.type === "text" || b.type === "dialogue" || b.type === "audio")
    .map((b) =>
      b.type === "text"
        ? b.it
        : b.type === "dialogue"
          ? b.lines.map((l) => `${l.speaker}: ${l.it}`).join("\n")
          : b.type === "audio"
            ? `[Audio ${b.track ?? ""}]\n${b.transcript ?? ""}`
            : "",
    )
    .join("\n\n");
}

/** Vẽ một block không cần chia nhỏ (tiêu đề, ảnh, ngữ pháp, mẹo, bài nghe). */
export function BlockView({ block, page }: { block: Block; page: BookPage }) {
  const lang = useStore((s) => s.lang);
  const showTr = useStore((s) => s.showTranslation);
  const showAnswers = useStore((s) => s.showAnswers);

  switch (block.type) {
    case "unitHeader":
      // Dải mục tiêu đầu Unità như sách: nhãn xanh "In questa Unità impariamo a:" + gạch đầu dòng.
      return (
        <header className="unit-band">
          <div className="unit-band-label">{block.intro ?? `Unità ${block.unit}`}</div>
          <ul className="unit-band-goals">
            {block.goals?.map((g, i) => (
              <li key={i}>
                {g.it ?? tr(lang, g.tr)}
                {showTr && g.it && <span className="translation">{tr(lang, g.tr)}</span>}
              </li>
            ))}
          </ul>
        </header>
      );

    case "sectionTitle":
      return (
        <div className="section-row">
          <h2 className="section-title">
            <span className="section-initial">{block.text.slice(0, 1)}</span>
            {block.text.slice(1)}
          </h2>
          {block.banner && <div className="section-banner">{block.banner}</div>}
        </div>
      );

    case "photo":
      return (
        <figure className="book-photo">
          <img src={block.src} alt={block.alt} loading="lazy" />
          {showTr && block.caption && <figcaption>{tr(lang, block.caption)}</figcaption>}
        </figure>
      );

    case "collage":
      return (
        <div className="collage" style={{ paddingBottom: `${block.height}%` }}>
          {block.items.map((it, i) => (
            <figure key={i} className="collage-item" style={{ left: `${it.x}%`, top: `${(it.y * block.height) / 100}%`, width: `${it.w}%` }}>
              <img src={it.src} alt={it.alt} loading="lazy" />
              {showAnswers && it.caption && <figcaption>{tr(lang, it.caption)}</figcaption>}
            </figure>
          ))}
        </div>
      );

    case "banner":
      return (
        <div className="banner-row">
          <span className="section-banner">{block.text}</span>
        </div>
      );

    case "sticker":
      return (
        <div className="sticker" title={block.tr ? tr(lang, block.tr) : undefined}>
          <span>{block.text}</span>
        </div>
      );

    case "heading": {
      const H = block.level === 3 ? "h3" : "h2";
      return (
        <H className="sec-heading">
          {block.text}
          {showTr && block.tr && <span className="translation inline"> — {tr(lang, block.tr)}</span>}
        </H>
      );
    }

    case "image":
      return (
        <figure className={`illus ${block.float ? `float-${block.float}` : ""}`}>
          {block.src ? (
            <img src={block.src} alt={block.alt ?? ""} loading="lazy" />
          ) : block.photo ? (
            <Photo query={block.photo} index={block.photoIndex} fallback={block.scene} caption={block.caption && tr(lang, block.caption)} />
          ) : block.scene ? (
            <Scene name={block.scene} />
          ) : null}
          {block.caption && !block.photo && <figcaption>{tr(lang, block.caption)}</figcaption>}
        </figure>
      );

    case "grammar":
      return (
        <aside className="grammar">
          <h3>
            <span className="eyebrow">Grammatica</span>
            {block.title}
            {block.tr && <span className="translation inline"> — {tr(lang, block.tr)}</span>}
          </h3>
          {block.explain && <p>{tr(lang, block.explain)}</p>}
          {block.table && (
            <table>
              <thead>
                <tr>{block.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {block.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((c, j) => (
                      <td key={j} onClick={() => j > 0 && speak(c)} className={j > 0 ? "say" : ""}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {block.examples?.map((e, i) => (
            <Speakable key={i} it={e.it} translation={e.tr} className="example" />
          ))}
        </aside>
      );

    case "tip":
      return (
        <aside className="tip">
          {block.it && <b>{block.it} </b>}
          {tr(lang, block.tr)}
        </aside>
      );

    case "audio":
      return <AudioBlock block={block} />;

    case "barChart":
      return (
        <figure className="bar-chart">
          <div className="bars">
            {block.bars.map((b, i) => (
              <div key={i} className="bar-row">
                <span className="bar" style={{ width: `${(b.value / block.max) * 100}%`, background: b.color }} />
                <span className="bar-val">{String(b.value).replace(".", ",")}</span>
              </div>
            ))}
          </div>
          <div className="bar-axis">
            {Array.from({ length: Math.floor(block.max / block.step) + 1 }, (_, i) => (
              <span key={i} style={{ left: `${((i * block.step) / block.max) * 100}%` }}>{i * block.step}</span>
            ))}
          </div>
          <figcaption className="bar-legend">
            {block.bars.map((b, i) => (
              <span key={i}>
                <i style={{ background: b.color }} /> {b.label}
              </span>
            ))}
          </figcaption>
          {showTr && block.caption && <p className="translation">{tr(lang, block.caption)}</p>}
        </figure>
      );

    case "theory":
      return <Theory text={block.text} note={block.tr} />;

    default:
      // text, dialogue, vocab, exercise được chia nhỏ trong units.tsx
      return null;

  }
}
