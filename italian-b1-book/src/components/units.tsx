import type { ReactNode } from "react";
import { t, tr } from "../i18n";
import { speak } from "../lib/speech";
import { useStore } from "../lib/store";
import { speakerVoices, splitParagraphs } from "../lib/voiceText";
import type { Block, BookPage, L10n } from "../types";
import { BlockView, pageContext } from "./blocks/Blocks";
import { ExercisePart, itemCount } from "./blocks/ExerciseBlock";
import { Speakable } from "./Speakable";

/**
 * Một "mảnh" nội dung nhỏ nhất khi chia trang: một đoạn văn, một câu hội thoại, một từ vựng,
 * một câu của bài tập… Mỗi trang sách được xếp từ các mảnh này cho vừa đúng một màn hình.
 */
export type Unit = {
  key: string;
  /** Không để mảnh này nằm cuối trang một mình (tiêu đề, đề bài…). */
  keepWithNext?: boolean;
  node: ReactNode;
};

export function unitsOf(page: BookPage): Unit[] {
  const out: Unit[] = [];
  page.blocks.forEach((b, bi) => {
    const k = `${page.id}:${bi}`;
    out.push(...blockUnits(b, k, page));
  });
  return out;
}

function blockUnits(b: Block, k: string, page: BookPage): Unit[] {
  switch (b.type) {
    case "unitHeader":
    case "heading":
      return [{ key: k, keepWithNext: true, node: <BlockView block={b} page={page} /> }];

    case "text": {
      const paras = splitParagraphs(b.it);
      const units: Unit[] = [];
      if (b.title) units.push({ key: `${k}:t`, keepWithNext: true, node: <h3 className="reading-title">{b.title}</h3> });
      paras.forEach((p, i) =>
        units.push({
          key: `${k}:p${i}`,
          node: (
            <div className="reading">
              <Speakable it={p} translation={paras.length === 1 ? b.tr : undefined} className="para" />
            </div>
          ),
        }),
      );
      if (paras.length > 1 && b.tr) units.push({ key: `${k}:tr`, node: <Translation value={b.tr} /> });
      return units;
    }

    case "dialogue": {
      const voiceOf = speakerVoices(b.lines.map((l) => l.speaker));
      const units: Unit[] = [];
      if (b.title) units.push({ key: `${k}:t`, keepWithNext: true, node: <h3 className="reading-title">{b.title}</h3> });
      b.lines.forEach((l, i) =>
        units.push({
          key: `${k}:l${i}`,
          node: (
            <Speakable it={l.it} translation={l.tr} voice={voiceOf(l.speaker)} className="dl-line">
              <b className="speaker">{l.speaker}</b> {l.it}
            </Speakable>
          ),
        }),
      );
      return units;
    }

    case "vocab": {
      const units: Unit[] = [];
      if (b.title) units.push({ key: `${k}:t`, keepWithNext: true, node: <h3 className="vocab-title">{b.title}</h3> });
      b.items.forEach((v, i) => units.push({ key: `${k}:v${i}`, node: <VocabRow it={v.it} tr={v.tr} note={v.note} /> }));
      return units;
    }

    case "columns": {
      const total = (b.widths ?? b.cols.map(() => 1)).reduce((a, x) => a + x, 0);
      return [
        {
          key: k,
          node: (
            <div className="book-columns" style={{ alignItems: b.align ?? "start" }}>
              {b.cols.map((col, ci) => (
                <div key={ci} className="book-col" style={{ flex: `${(b.widths?.[ci] ?? 1) / total} 1 0` }}>
                  {col.flatMap((cb, bi) => blockUnits(cb, `${k}:c${ci}:${bi}`, page)).map((u) => (
                    <div className="unit" key={u.key}>
                      {u.node}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ),
        },
      ];
    }

    case "exercise": {
      const ex = b.ex;
      const context = ex.refText ? pageContext(page) : undefined;
      const units: Unit[] = [
        { key: `${k}:h`, keepWithNext: true, node: <ExercisePart ex={ex} page={page} context={context} part={{ kind: "head" }} /> },
      ];
      const n = itemCount(ex);
      // Câu cuối luôn đi cùng nút chấm bài, để nút không nằm lẻ loi đầu trang sau.
      if (n === 0)
        units.push({ key: `${k}:w`, keepWithNext: true, node: <ExercisePart ex={ex} page={page} context={context} part={{ kind: "whole" }} /> });
      for (let i = 0; i < n; i++)
        units.push({
          key: `${k}:i${i}`,
          keepWithNext: i === n - 1,
          node: <ExercisePart ex={ex} page={page} context={context} part={{ kind: "item", index: i }} />,
        });
      units.push({ key: `${k}:f`, node: <ExercisePart ex={ex} page={page} context={context} part={{ kind: "foot" }} /> });
      return units;
    }

    default:
      return [{ key: k, node: <BlockView block={b} page={page} /> }];
  }
}

function Translation({ value }: { value: L10n }) {
  const lang = useStore((s) => s.lang);
  const show = useStore((s) => s.showTranslation);
  return show ? <p className="translation">{tr(lang, value)}</p> : null;
}

function VocabRow({ it, tr: trans, note }: { it: string; tr: L10n; note?: string }) {
  const lang = useStore((s) => s.lang);
  return (
    <div className="vocab-row">
      <button className="vocab-word" onClick={() => speak(it)} title={t(lang, "listen")}>
        {it}
      </button>
      <span className="vocab-dots" aria-hidden />
      <span className="vocab-tr">{tr(lang, trans)}</span>
      {note && <span className="vocab-note">{note}</span>}
    </div>
  );
}
