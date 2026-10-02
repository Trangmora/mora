import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { skillOf } from "../../lib/skills";
import { t, tr } from "../../i18n";
import type { BookPage, Exercise } from "../../types";
import { resetExercise, saveResult, setResponse, useStore, type ItemResult } from "../../lib/store";
import { blanksOf, gradeByKey, gradeWithAI, isAIAvailable, needsAI, SEP, toMistakes } from "../../lib/grading";
import { speak, speechRecognitionSupported, useItalianRecorder } from "../../lib/speech";
import { reaction, thinkingQuip } from "../../lib/humor";
import { useMeasuring } from "../../lib/measure";
import { NonnaSays } from "../Nonna";

const EMPTY: Record<string, string> = {};

/** Mảnh của một bài tập khi chia trang: đề bài, từng câu, hoặc phần nút chấm. */
export type ExPart = { kind: "head" } | { kind: "item"; index: number } | { kind: "whole" } | { kind: "foot" };

/** Số câu có thể tách riêng sang trang khác (bài nối giữ nguyên một khối). */
export function itemCount(ex: Exercise) {
  return ex.kind === "match" ? 0 : ex.items.length;
}

function useExercise(ex: Exercise) {
  const responses = useStore((s) => s.responses[ex.id] ?? EMPTY);
  const result = useStore((s) => s.results[ex.id]);
  const byId = new Map<string, ItemResult>((result?.items ?? []).map((i) => [i.id, i]));
  const set = (itemId: string, v: string) => setResponse(ex.id, itemId, v);
  return { responses, result, byId, set };
}

export function ExercisePart({ ex, page, context, part }: { ex: Exercise; page: BookPage; context?: string; part: ExPart }) {
  const lang = useStore((s) => s.lang);
  const showAnswers = useStore((s) => s.showAnswers);
  const showTr = useStore((s) => s.showTranslation);
  const measuring = useMeasuring();
  const { responses, byId, set } = useExercise(ex);

  if (part.kind === "head") {
    return (
      <div className={`exercise kind-${ex.kind} ex-part-head`} id={measuring ? undefined : ex.id}>
        <header className="ex-head">
          {ex.number && <span className="ex-num">{ex.number}</span>}
          <span className="ex-instr">{ex.instruction}</span>
        </header>
        {showTr && ex.tr && <p className="translation">{tr(lang, ex.tr)}</p>}
        {ex.kind === "fill" && ex.wordBank && (
          <div className="word-bank">
            {ex.wordBank.map((w) => <span key={w}>{w}</span>)}
          </div>
        )}
      </div>
    );
  }
  if (part.kind === "foot") return <ExerciseFoot ex={ex} page={page} context={context} />;
  return (
    <div className={`exercise kind-${ex.kind} ex-part-body`}>
      <Body
        ex={ex}
        only={part.kind === "item" ? part.index : undefined}
        responses={responses}
        set={set}
        showAnswers={showAnswers}
        results={byId}
        radioPrefix={measuring ? "m-" : ""}
      />
    </div>
  );
}

function ExerciseFoot({ ex, page, context }: { ex: Exercise; page: BookPage; context?: string }) {
  const lang = useStore((s) => s.lang);
  const { responses, result } = useExercise(ex);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function checkByKey() {
    const r = gradeByKey(ex, responses, lang);
    saveResult(ex.id, r, toMistakes(page, ex, r), { skill: skillOf(ex, page), pageId: page.id, counts: !needsAI(ex) });
  }

  async function checkWithAI() {
    setLoading(true);
    setError(null);
    try {
      const r = await gradeWithAI(ex, responses, lang, context);
      saveResult(ex.id, r, toMistakes(page, ex, r), { skill: skillOf(ex, page), pageId: page.id, counts: true });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const ai = isAIAvailable();
  const scored = result && !(needsAI(ex) && result.by === "key");

  return (
    <div className="exercise ex-part-foot">
      <footer className="ex-foot">
        {!needsAI(ex) && (
          <button className="pill primary" onClick={checkByKey}><Icon name="check" size={15} /> {t(lang, "check")}</button>
        )}
        {ai && (
          <button className="pill ai" onClick={checkWithAI} disabled={loading}>
            <Icon name="sparkle" size={15} /> {t(lang, "aiCheck")}
          </button>
        )}
        {(result || Object.keys(responses).length > 0) && (
          <button className="pill ghost" onClick={() => resetExercise(ex.id)}><Icon name="reset" size={14} /> {t(lang, "reset")}</button>
        )}
        {scored && (
          <span className="score-badge" data-good={result.score >= 80}>
            {result.score}/100{result.by === "ai" ? " · AI" : ""}
          </span>
        )}
      </footer>
      {loading && <NonnaSays quip={thinkingQuip} mood="wink" size={34} />}
      {!loading && scored && (
        <NonnaSays
          quip={reaction(result.score, result.at.length + ex.id.length + Number(result.at.slice(-3, -1)))}
          mood={result.score >= 80 ? "happy" : result.score >= 50 ? "wink" : "shocked"}
          size={34}
        />
      )}
      {needsAI(ex) && ai === false && <p className="warn small">{t(lang, "aiOffline")}</p>}
      {error && <p className="warn">{error}</p>}
      {result?.summary && <p className="ai-note">{result.summary}</p>}
      {result?.tips?.length ? (
        <ul className="ai-tips">{result.tips.map((x, i) => <li key={i}>{x}</li>)}</ul>
      ) : null}
    </div>
  );
}

type BodyProps = {
  ex: Exercise;
  /** Chỉ vẽ câu thứ `only` (khi bài bị chia sang nhiều trang). */
  only?: number;
  radioPrefix: string;
  responses: Record<string, string>;
  set: (itemId: string, v: string) => void;
  showAnswers: boolean;
  results: Map<string, ItemResult>;
};

function Mark({ r }: { r?: ItemResult }) {
  if (!r) return null;
  return <span className={`mark ${r.correct ? "ok" : "ko"}`}>{r.correct ? "✓" : "✗"}</span>;
}

/** Ghi chú bút đỏ bên lề: đáp án đúng + giải thích. */
function Margin({ show, answer, r }: { show: boolean; answer?: string; r?: ItemResult }) {
  const lang = useStore((s) => s.lang);
  const wrong = r && !r.correct;
  if (!show && !wrong) return null;
  return (
    <span className="margin-note">
      {(show || wrong) && (r?.correctAnswer ?? answer) && <span className="pen">→ {r?.correctAnswer ?? answer}</span>}
      {wrong && r?.explanation && (
        <span className="why">
          <b>{t(lang, "explanation")}:</b> {r.explanation}
        </span>
      )}
    </span>
  );
}

function Body({ ex, only, responses, set, showAnswers, results, radioPrefix }: BodyProps) {
  const lang = useStore((s) => s.lang);
  // Danh sách câu cần vẽ + thuộc tính start để giữ đúng a, b, c… khi tách trang.
  const pick = <T,>(items: T[]) => (only === undefined ? items : items.slice(only, only + 1));
  const start = (only ?? 0) + 1;

  switch (ex.kind) {
    case "fill":
      return (
        <>
          <ol className="ex-items" start={start}>
            {pick(ex.items).map((it) => {
              const parts = it.prompt.split("___");
              const n = blanksOf(it.prompt);
              const values = (responses[it.id] ?? "").split(SEP);
              const r = results.get(it.id);
              const update = (b: number, v: string) => {
                const next = Array.from({ length: n }, (_, k) => values[k] ?? "");
                next[b] = v;
                set(it.id, next.join(SEP));
              };
              return (
                <li key={it.id} className="ex-item">
                  <span className="line">
                    {parts.map((p, k) => (
                      <span key={k}>
                        {p}
                        {k < parts.length - 1 && (
                          <input
                            className={`blank ${r ? (r.correct ? "ok" : "ko") : ""}`}
                            value={values[k] ?? ""}
                            size={Math.max(6, (it.answers[k] ?? "").split("|")[0].length + 2)}
                            onChange={(e) => update(k, e.target.value)}
                            spellCheck={false}
                            autoCapitalize="off"
                          />
                        )}
                      </span>
                    ))}
                    {it.hint && <span className="hint">({it.hint})</span>}
                    <Mark r={r} />
                  </span>
                  <Margin show={showAnswers} answer={it.answers.map((a) => a.split("|")[0]).join(" / ")} r={r} />
                </li>
              );
            })}
          </ol>
        </>
      );

    case "choice":
      return (
        <ol className="ex-items" start={start}>
          {pick(ex.items).map((it) => {
            const r = results.get(it.id);
            return (
              <li key={it.id} className="ex-item">
                <span className="line">
                  {it.prompt} <Mark r={r} />
                </span>
                <span className="options">
                  {it.options.map((o, k) => (
                    <label
                      key={k}
                      className={`opt ${responses[it.id] === String(k) ? "sel" : ""} ${showAnswers && k === it.answer ? "is-answer" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`${radioPrefix}${ex.id}-${it.id}`}
                        checked={responses[it.id] === String(k)}
                        onChange={() => set(it.id, String(k))}
                      />
                      <span className="opt-letter">{String.fromCharCode(97 + k)}</span> {o}
                    </label>
                  ))}
                </span>
                <Margin show={false} r={r} />
              </li>
            );
          })}
        </ol>
      );

    case "truefalse":
      return (
        <ol className="ex-items" start={start}>
          {pick(ex.items).map((it) => {
            const r = results.get(it.id);
            return (
              <li key={it.id} className="ex-item tf">
                <span className="line">
                  {it.prompt} <Mark r={r} />
                </span>
                <span className="options">
                  {(["true", "false"] as const).map((v) => (
                    <label
                      key={v}
                      className={`opt ${responses[it.id] === v ? "sel" : ""} ${showAnswers && String(it.answer) === v ? "is-answer" : ""}`}
                    >
                      <input type="radio" name={`${radioPrefix}${ex.id}-${it.id}`} checked={responses[it.id] === v} onChange={() => set(it.id, v)} />
                      {v === "true" ? "V" : "F"}
                    </label>
                  ))}
                </span>
                <Margin show={false} r={r} />
              </li>
            );
          })}
        </ol>
      );

    case "match":
      return (
        <div className="match">
          <ol className="ex-items">
            {ex.left.map((l) => {
              const r = results.get(l.id);
              return (
                <li key={l.id} className="ex-item">
                  <span className="line">
                    <span>{l.text}</span>
                    <select value={responses[l.id] ?? ""} onChange={(e) => set(l.id, e.target.value)}>
                      <option value="">{t(lang, "pick")}</option>
                      {ex.right.map((rr) => (
                        <option key={rr.id} value={rr.id}>
                          {rr.id}) {rr.text}
                        </option>
                      ))}
                    </select>
                    <Mark r={r} />
                  </span>
                  <Margin
                    show={showAnswers}
                    answer={`${ex.answer[l.id]}) ${ex.right.find((x) => x.id === ex.answer[l.id])?.text ?? ""}`}
                    r={r}
                  />
                </li>
              );
            })}
          </ol>
          <ul className="match-right">
            {ex.right.map((rr) => (
              <li key={rr.id}>
                <b>{rr.id})</b> {rr.text}
              </li>
            ))}
          </ul>
        </div>
      );

    case "write":
      return (
        <ol className="ex-items" start={start}>
          {pick(ex.items).map((it) => {
            const r = results.get(it.id);
            return (
              <li key={it.id} className="ex-item">
                <span className="line">
                  {it.prompt} <Mark r={r} />
                </span>
                <textarea
                  className="lined"
                  rows={it.lines ?? 2}
                  value={responses[it.id] ?? ""}
                  placeholder={t(lang, "writeHere")}
                  onChange={(e) => set(it.id, e.target.value)}
                />
                {r?.correctAnswer && !r.correct && (
                  <span className="margin-note">
                    <span className="pen">{t(lang, "corrected")}: {r.correctAnswer}</span>
                    {r.explanation && <span className="why">{r.explanation}</span>}
                  </span>
                )}
                {showAnswers && it.sample && !r && (
                  <span className="margin-note">
                    <span className="pen">{t(lang, "sample")}: {it.sample}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      );

    case "speak":
      return (
        <ol className="ex-items" start={start}>
          {pick(ex.items).map((it) => (
            <SpeakItem
              key={it.id}
              prompt={it.prompt}
              sample={it.sample}
              value={responses[it.id] ?? ""}
              onChange={(v) => set(it.id, v)}
              showAnswers={showAnswers}
              r={results.get(it.id)}
            />
          ))}
        </ol>
      );
  }
}

function SpeakItem(props: {
  prompt: string;
  sample?: string;
  value: string;
  onChange: (v: string) => void;
  showAnswers: boolean;
  r?: ItemResult;
}) {
  const lang = useStore((s) => s.lang);
  const rec = useItalianRecorder();
  const { r, onChange } = props;

  // Khi ghi âm xong, đưa bản chép lời vào ô trả lời (bạn vẫn sửa được).
  useEffect(() => {
    if (!rec.recording && rec.transcript) onChange(rec.transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rec.recording, rec.transcript]);

  return (
    <li className="ex-item speak-item">
      <span className="line">
        {props.prompt} <Mark r={r} />
      </span>
      <span className="coach-actions">
        {rec.recording ? (
          <button className="pill rec" onClick={() => rec.stop()}><Icon name="stop" size={15} /> {t(lang, "stop")}</button>
        ) : (
          <button className="pill primary" onClick={() => rec.start()}><Icon name="mic" size={15} /> {t(lang, "record")}</button>
        )}
        {rec.audioUrl && <audio src={rec.audioUrl} controls className="coach-audio" />}
      </span>
      {rec.recording && (
        <span className="coach-live">
          <span className="dot" /> <em>{rec.transcript} {rec.interim}</em>
        </span>
      )}
      <textarea
        className="lined"
        rows={3}
        value={props.value}
        placeholder={t(lang, "speakHint")}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {!speechRecognitionSupported && <span className="warn small">{t(lang, "noSpeech")}</span>}
      {r && !r.correct && r.correctAnswer && (
        <span className="margin-note">
          <span className="pen">
            {t(lang, "corrected")}: {r.correctAnswer}{" "}
            <button className="mini" onClick={() => speak(r.correctAnswer!)}><Icon name="volume" size={14} /></button>
          </span>
          {r.explanation && <span className="why">{r.explanation}</span>}
        </span>
      )}
      {props.showAnswers && props.sample && (
        <span className="margin-note">
          <span className="pen">
            {t(lang, "sample")}: {props.sample} <button className="mini" onClick={() => speak(props.sample!)}><Icon name="volume" size={14} /></button>
          </span>
        </span>
      )}
    </li>
  );
}
