import { flatBlocks } from "../lib/skills";
import { useState } from "react";
import { Icon } from "./Icon";
import { pages } from "../content/book";
import { t } from "../i18n";
import { gradeWithAI, isAIAvailable } from "../lib/grading";
import { getState, setState, useStore, type Mistake } from "../lib/store";
import { speak } from "../lib/speech";
import type { Exercise } from "../types";
import { pageLabel } from "./TableOfContents";
import { noMistakesQuip } from "../lib/humor";
import { NonnaSays } from "./Nonna";

function findExercise(id: string): Exercise | undefined {
  for (const p of pages) for (const b of flatBlocks(p.blocks)) if (b.type === "exercise" && b.ex.id === id) return b.ex;
}

/** Sổ lỗi: tổng hợp mọi câu sai kèm giải thích; có thể nhờ AI giải thích câu chưa có lời giải thích. */
export function MistakesPanel({ onClose, onOpenPage }: { onClose: () => void; onOpenPage: (pageId: string) => void }) {
  const lang = useStore((s) => s.lang);
  const mistakes = useStore((s) => s.mistakes);

  const byPage = new Map<string, Mistake[]>();
  for (const m of mistakes) byPage.set(m.pageId, [...(byPage.get(m.pageId) ?? []), m]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="notebook" onClick={(e) => e.stopPropagation()}>
        <div className="notebook-head">
          <h2>{t(lang, "mistakesTitle")}</h2>
          <button className="icon-btn" onClick={onClose} aria-label={t(lang, "close")}><Icon name="close" /></button>
        </div>
        {mistakes.length === 0 && (
          <>
            <NonnaSays quip={noMistakesQuip} mood="happy" />
            <p className="nb-empty">{t(lang, "noMistakes")}</p>
          </>
        )}
        {[...byPage.entries()].map(([pageId, list]) => {
          const page = pages.find((p) => p.id === pageId);
          return (
            <section key={pageId} className="nb-page">
              <h3>
                {t(lang, "page")} {page ? pageLabel(page) : "?"} · {page?.title}
                <button className="pill ghost" onClick={() => onOpenPage(pageId)}>{t(lang, "goToPage")} →</button>
              </h3>
              {list.map((m) => <MistakeRow key={m.key} m={m} />)}
            </section>
          );
        })}
        {mistakes.length > 0 && (
          <button className="pill ghost" onClick={() => setState({ mistakes: [] })}><Icon name="trash" size={14} /> {t(lang, "clearMistakes")}</button>
        )}
      </div>
    </div>
  );
}

function MistakeRow({ m }: { m: Mistake }) {
  const lang = useStore((s) => s.lang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function explain() {
    const ex = findExercise(m.exerciseId);
    if (!ex) return;
    setLoading(true);
    setError(null);
    try {
      const itemId = m.key.split(":")[1];
      // Chỉ gửi đúng câu bị sai cho AI giải thích.
      const single: Exercise =
        ex.kind === "match"
          ? { ...ex, left: ex.left.filter((l) => l.id === itemId) }
          : ex.kind === "cloze"
            ? ex // đoạn văn: gửi cả đoạn để AI có ngữ cảnh, chỉ kèm câu trả lời của ô sai
            : ({ ...ex, items: (ex.items as { id: string }[]).filter((i) => i.id === itemId) } as Exercise);
      const saved = getState().responses[m.exerciseId]?.[itemId];
      const responses: Record<string, string> = saved !== undefined ? { [itemId]: saved } : {};
      const r = await gradeWithAI(single, responses, lang);
      const it = r.items.find((i) => i.id === itemId);
      setState((s) => ({
        mistakes: s.mistakes.map((x) =>
          x.key === m.key ? { ...x, explanation: it?.explanation || r.summary, correctAnswer: it?.correctAnswer ?? x.correctAnswer } : x,
        ),
      }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="nb-row">
      <p className="nb-prompt">
        {m.exerciseNumber && <span className="ex-num small">{m.exerciseNumber}</span>} {m.prompt}
      </p>
      <p>
        <span className="nb-wrong">✗ {m.userAnswer}</span>
        {m.correctAnswer && (
          <span className="nb-right">
            ✓ {m.correctAnswer} <button className="mini" onClick={() => speak(m.correctAnswer!)}><Icon name="volume" size={14} /></button>
          </span>
        )}
      </p>
      {m.explanation ? (
        <p className="nb-why">
          <b>{t(lang, "explanation")}:</b> {m.explanation}
        </p>
      ) : (
        isAIAvailable() && (
          <button className="pill ai" onClick={explain} disabled={loading}>
            {loading ? t(lang, "thinking") : <><Icon name="sparkle" size={15} /> {t(lang, "explanation")}</>}
          </button>
        )
      )}
      {error && <p className="warn small">{error}</p>}
    </div>
  );
}
