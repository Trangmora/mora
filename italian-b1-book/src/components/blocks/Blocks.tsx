import { t, tr } from "../../i18n";
import type { Block, BookPage } from "../../types";
import { useStore } from "../../lib/store";
import { speak } from "../../lib/speech";
import { Speakable } from "../Speakable";
import { Scene } from "../illustrations/Scene";
import { Photo } from "../Photo";
import { speakerVoices, splitParagraphs } from "../../lib/voiceText";
import { ExerciseBlock } from "./ExerciseBlock";
import { AudioBlock } from "./AudioBlock";

/** Vẽ một block nội dung theo đúng kiểu của nó. */
export function BlockView({ block, page }: { block: Block; page: BookPage }) {
  const lang = useStore((s) => s.lang);
  const showTr = useStore((s) => s.showTranslation);

  switch (block.type) {
    case "unitHeader":
      return (
        <header className="unit-header">
          <div className="unit-tag">Unità {block.unit}</div>
          <h1>{block.title}</h1>
          {block.tr && <p className="translation always">{tr(lang, block.tr)}</p>}
          {block.goals && (
            <ul className="goals">
              {block.goals.map((g, i) => <li key={i}>{tr(lang, g)}</li>)}
            </ul>
          )}
        </header>
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

    case "text":
      return (
        <div className="reading">
          {block.title && <h3 className="reading-title">{block.title}</h3>}
          {splitParagraphs(block.it).map((para, i, arr) => (
            <Speakable key={i} it={para} translation={arr.length === 1 ? block.tr : undefined} className="para" />
          ))}
          {showTr && block.tr && block.it.split(/\n\s*\n/).length > 1 && (
            <p className="translation">{tr(lang, block.tr)}</p>
          )}
        </div>
      );

    case "dialogue": {
      const voiceOf = speakerVoices(block.lines.map((l) => l.speaker));
      return (
        <div className="dialogue">
          {block.title && <h3 className="reading-title">{block.title}</h3>}
          {block.lines.map((l, i) => (
            <Speakable key={i} it={l.it} translation={l.tr} voice={voiceOf(l.speaker)} className="dl-line">
              <b className="speaker">{l.speaker}:</b> {l.it}
            </Speakable>
          ))}
        </div>
      );
    }

    case "vocab":
      return (
        <div className="vocab">
          {block.title && <h3 className="vocab-title">{block.title}</h3>}
          <ul>
            {block.items.map((v, i) => (
              <li key={i}>
                <button className="vocab-word" onClick={() => speak(v.it)} title={t(lang, "listen")}>
                  {v.it}
                </button>
                <span className="vocab-tr">{tr(lang, v.tr)}</span>
                {v.note && <span className="vocab-note">{v.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      );

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

    case "exercise": {
      // Tìm đoạn văn được bài tập tham chiếu để AI chấm có ngữ cảnh.
      const context = block.ex.refText
        ? page.blocks
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
            .join("\n\n")
        : undefined;
      return <ExerciseBlock ex={block.ex} page={page} context={context} />;
    }
  }
}
