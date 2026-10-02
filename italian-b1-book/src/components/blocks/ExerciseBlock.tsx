import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { skillOf } from "../../lib/skills";
import { t, tr } from "../../i18n";
import type { BookPage, Exercise } from "../../types";
import { resetExercise, saveResult, setResponse, useStore, type ItemResult } from "../../lib/store";
import { blanksOf, gradeByKey, gradeWithAI, isAIAvailable, needsAI, SEP, toMistakes } from "../../lib/grading";
import { speak, speechRecognitionSupported, useItalianRecorder } from "../../lib/speech";

const EMPTY: Record<string, string> = {};

export function ExerciseBlock({ ex, page, context }: { ex: Exercise; page: BookPage; context?: string }) {
  const lang = useStore((s) => s.lang);
  const showAnswers = useStore((s) => s.showAnswers);
  const showTr = useStore((s) => s.showTranslation);
  const responses = useStore((s) => s.responses[ex.id] ?? EMPTY);
  const result = useStore((s) => s.results[ex.id]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const byId = new Map<string, ItemResult>((result?.items ?? []).map((i) => [i.id, i]));
  const set = (itemId: string, v: string) => setResponse(ex.id, itemId, v);

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

  return (
    <section className={`exercise kind-${ex.kind}`} id={ex.id}>
      <header className="ex-head">
        {ex.number && <span className="ex-num">{ex.number}</span>}
        <span className="ex-instr">{ex.instruction}</span>
      </header>
      {showTr && ex.tr && <p className="translation">{tr(lang, ex.tr)}</p>}

      <Body ex={ex} responses={responses} set={set} showAnswers={showAnswers} results={byId} />

      <footer className="ex-foot">
        {!needsAI(ex) && (
          <button className="pill primary" onClick={checkByKey}><Icon name="check" size={15} /> {t(lang, "check")}</button>
        )}
        {ai && (
          <button className="pill ai" onClick={checkWithAI} disabled={loading}>
            {loading ? t(lang, "thinking") : <><Icon name="sparkle" size={15} /> {t(lang, "aiCheck")}</>}
          </button>
        )}
        {(result || Object.keys(responses).length > 0) && (
          <button className="pill ghost" onClick={() => resetExercise(ex.id)}><Icon name="reset" size={14} /> {t(lang, "reset")}</button>
        )}
        {result && !(needsAI(ex) && result.by === "key") && (
          <span className="score-badge" data-good={result.score >= 80}>
            {t(lang, "score")}: {result.score}/100 {result.by === "ai" ? "· AI" : ""}
          </span>
        )}
      </footer>
      {needsAI(ex) && ai === false && <p className="warn small">{t(lang, "aiOffline")}</p>}
      {error && <p className="warn">{error}</p>}
      {result?.summary && <p className="ai-note">{result.summary}</p>}
      {result?.tips?.length ? (
        <ul className="ai-tips">{result.tips.map((x, i) => <li key={i}>{x}</li>)}</ul>
      ) : null}
    </section>
  );
}

type BodyProps = {
  ex: Exercise;
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

function Body({ ex, responses, set, showAnswers, results }: BodyProps) {
  const lang = useStore((s) => s.lang);

  switch (ex.kind) {
    case "fill":
      return (
        <>
          {ex.wordBank && (
            <div className="word-bank">
              {ex.wordBank.map((w) => <span key={w}>{w}</span>)}
            </div>
          )}
          <ol className="ex-items">
            {ex.items.map((it) => {
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
        <ol className="ex-items">
          {ex.items.map((it) => {
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
                        name={`${ex.id}-${it.id}`}
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
        <ol className="ex-items">
          {ex.items.map((it) => {
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
                      <input type="radio" name={`${ex.id}-${it.id}`} checked={responses[it.id] === v} onChange={() => set(it.id, v)} />
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
        <ol className="ex-items">
          {ex.items.map((it) => {
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
        <ol className="ex-items">
          {ex.items.map((it) => (
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
