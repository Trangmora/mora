import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { skillOf } from "../../lib/skills";
import { t, tr } from "../../i18n";
import type { BadgeIcon, BookPage, ClozeExercise, Exercise, FormExercise } from "../../types";
import { parseCloze } from "../../lib/cloze";
import { Photo } from "../Photo";
import { resetExercise, saveResult, setResponse, useStore, type ItemResult } from "../../lib/store";
import { blanksOf, gradeByKey, gradeWithAI, isAIAvailable, needsAI, SEP, toMistakes } from "../../lib/grading";
import { speak, speechRecognitionSupported, useItalianRecorder } from "../../lib/speech";
import { thinkingQuip } from "../../lib/humor";
import { emitFun } from "../../lib/fun";
import { useMeasuring } from "../../lib/measure";

const EMPTY: Record<string, string> = {};

/** Mảnh của một bài tập khi chia trang: đề bài, từng câu, hoặc phần nút chấm. */
export type ExPart = { kind: "head" } | { kind: "item"; index: number } | { kind: "whole" } | { kind: "foot" };

/** Số câu có thể tách riêng sang trang khác (bài nối giữ nguyên một khối). */
export function itemCount(ex: Exercise) {
  // Bài nối và mẫu đơn giữ nguyên một khối như sách.
  if ((ex.kind === "speak" || ex.kind === "fill") && ex.layout === "board") return 0;
  return ex.kind === "match" || ex.kind === "form" || ex.kind === "cloze" ? 0 : ex.items.length;
}

/** Ô số bài màu đỏ như sách, bên dưới là icon dạng bài (nói, nhìn, đọc, viết, nghe). */
function Badge({ number, icons }: { number?: string; icons?: BadgeIcon[] }) {
  return (
    <span className={`ex-badge ${number ? "" : "no-num"}`}>
      {number && <span className="ex-badge-num">{number}</span>}
      {icons?.length ? (
        <span className="ex-badge-icons">
          {icons.map((i) => (
            <BadgeGlyph key={i} name={i} />
          ))}
        </span>
      ) : null}
    </span>
  );
}

function BadgeGlyph({ name }: { name: BadgeIcon }) {
  const d: Record<BadgeIcon, string> = {
    speak: "M4 6.5C4 4.6 6.7 3 10 3s6 1.6 6 3.5S13.3 10 10 10c-.7 0-1.4-.1-2-.2L5 11.5l.8-2.4C4.7 8.4 4 7.5 4 6.5Z",
    look: "M2 7s2.7-4 8-4 8 4 8 4-2.7 4-8 4-8-4-8-4Zm8 2.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z",
    read: "M2 3.5c2.5-.8 5-.6 8 1 3-1.6 5.5-1.8 8-1v8.5c-2.5-.8-5-.6-8 1-3-1.6-5.5-1.8-8-1V3.5Zm8 1v8.5",
    write: "m4 12.5 1-3.2 7.6-7.6a1.4 1.4 0 0 1 2 2L7 11.3l-3 1.2Zm7.5-9.7 2 2",
    listen: "M4 10V8a6 6 0 0 1 12 0v2M4 10h2.4v3.5H4zM13.6 10H16v3.5h-2.4z",
    match: "M3 4h5M3 8h5M3 12h5M11 4l6 7m0 0v-3.5m0 3.5h-3.5",
    check: "M4 8.5 8 12.5 16 2.5",
  };
  return (
    <svg viewBox="0 0 20 15" width="22" height="16" aria-hidden>
      <path d={d[name]} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
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
          <Badge number={ex.number} icons={ex.icons} />
          <span className="ex-instr">
            {ex.label && <b className="ex-label">{ex.label}.</b>} {ex.instruction}
          </span>
        </header>
        {showTr && ex.tr && <p className="translation">{tr(lang, ex.tr)}</p>}
        {ex.subtitle && <p className={`ex-subtitle ${"layout" in ex && ex.layout === "board" ? "center" : ""}`}>{ex.subtitle}</p>}
        {ex.intro && (
          <div className="ex-intro">
            {ex.intro.split("\n").map((l, i) => <p key={i}>{l}</p>)}
          </div>
        )}
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
    if (!needsAI(ex)) emitFun({ type: "graded", score: r.score, wrong: r.items.filter((i) => !i.correct).length });
  }

  async function checkWithAI() {
    setLoading(true);
    setError(null);
    try {
      const r = await gradeWithAI(ex, responses, lang, context);
      saveResult(ex.id, r, toMistakes(page, ex, r), { skill: skillOf(ex, page), pageId: page.id, counts: true });
      emitFun({ type: "graded", score: r.score, wrong: r.items.filter((i) => !i.correct).length });
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
            <Icon name="sparkle" size={15} /> {loading ? thinkingQuip.it : t(lang, "aiCheck")}
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
      if (ex.layout === "board")
        return <BoardView ex={ex} responses={responses} set={set} showAnswers={showAnswers} results={results} />;
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
          {ex.title && <div className="match-title">{ex.title}</div>}
          <ol className="ex-items">
            {ex.left.map((l) => {
              const r = results.get(l.id);
              const given = ex.given?.[l.id];
              return (
                <li key={l.id} className={`ex-item ${given ? "given" : ""}`}>
                  <span className="line">
                    <span>{l.text}</span>
                    <select
                      value={given ?? responses[l.id] ?? ""}
                      disabled={!!given}
                      onChange={(e) => set(l.id, e.target.value)}
                    >
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
              <li key={rr.id} className={Object.values(ex.given ?? {}).includes(rr.id) ? "given" : ""}>
                <b>{rr.id}.</b> {rr.text}
              </li>
            ))}
          </ul>
        </div>
      );

    case "cloze":
      return <ClozeView ex={ex} responses={responses} set={set} showAnswers={showAnswers} results={results} />;

    case "form":
      return <FormView ex={ex} responses={responses} set={set} showAnswers={showAnswers} results={results} radioPrefix={radioPrefix} />;

    case "write":
      return (
        <ol className={`ex-items ${ex.items.length === 1 ? "single" : ""}`} start={start}>
          {pick(ex.items).map((it) => {
            const r = results.get(it.id);
            return (
              <li key={it.id} className="ex-item">
                {it.prompt && (
                  <span className="line">
                    {it.prompt} <Mark r={r} />
                  </span>
                )}
                {it.starter && <span className="write-starter">{it.starter}</span>}
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
      if (ex.layout === "board")
        return <BoardView ex={ex} responses={responses} set={set} showAnswers={showAnswers} results={results} />;
      return (
        <ol className={`ex-items ${ex.items.length === 1 ? "single" : "numbered"}`} start={start}>
          {pick(ex.items).map((it) => (
            <SpeakItem
              key={it.id}
              compact={ex.items.length > 1}
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

/** Bảng trò chơi "Giochiamo insieme!": ô Esempio, các ô có số + tranh + lệnh, ô "Totale". Bấm ô để ghi âm câu trả lời. */
function BoardView({
  ex,
  responses,
  set,
  showAnswers,
  results,
}: {
  ex: Extract<Exercise, { kind: "speak" | "fill" }>;
  responses: Record<string, string>;
  set: (itemId: string, v: string) => void;
  showAnswers: boolean;
  results: Map<string, ItemResult>;
}) {
  const b = ex.board ?? {};
  const points = b.points ?? 2;
  const got = [...results.values()].filter((r) => r.correct).length * points;
  // Hàng đầu 2 ô, sau đó mỗi hàng 4 ô; các hàng xen kẽ màu như sách.
  const tone = (i: number) => ((i < 2 ? 0 : 1 + Math.floor((i - 2) / 4)) % 2 === 0 ? "a" : "b");
  return (
    <div className={`board palette-${b.palette ?? "orange"}`}>
      {b.example && (
        <>
          <span className="board-es-label">Esempio:</span>
          <div className="board-tile tone-a board-es">
            {b.example.image && <img src={b.example.image} alt="" loading="lazy" />}
            <span className={`board-cmd ${b.example.pattern ? "pattern" : ""}`}>{b.example.prompt ?? b.example.pattern}</span>
          </div>
          <p className="board-es-answer">→ {b.example.answer}</p>
        </>
      )}
      {ex.kind === "fill" && ex.items.map((it, i) => (
        <WriteTile
          key={it.id}
          n={i + 1}
          tone={tone(i)}
          first={i < 2}
          pattern={it.hint ?? ""}
          image={it.image}
          answer={it.answers[0]?.split("|")[0] ?? ""}
          value={responses[it.id] ?? ""}
          onChange={(v) => set(it.id, v)}
          showAnswers={showAnswers}
          r={results.get(it.id)}
        />
      ))}
      {ex.kind === "speak" && ex.items.map((it, i) => (
        <BoardTile
          key={it.id}
          n={i + 1}
          tone={tone(i)}
          first={i < 2}
          prompt={it.prompt}
          image={it.image}
          sample={it.sample}
          value={responses[it.id] ?? ""}
          onChange={(v) => set(it.id, v)}
          showAnswers={showAnswers}
          r={results.get(it.id)}
        />
      ))}
      {b.total && (
        <div className="board-total" style={{ gridRow: 3 + Math.floor((ex.items.length - 3) / 4) + ((ex.items.length - 2) % 4 === 0 ? 1 : 0), gridColumn: 4 }}>
          {results.size ? `Totale: ${got} / ${ex.items.length * points} punti` : b.total}
        </div>
      )}
    </div>
  );
}

/** Vị trí ô trong lưới: hàng đầu 2 ô ở cột 3–4, sau đó mỗi hàng 4 ô. */
function tilePos(n: number, first: boolean) {
  return first ? { gridRow: 2, gridColumn: n + 2 } : { gridRow: 3 + Math.floor((n - 3) / 4), gridColumn: 1 + ((n - 3) % 4) };
}

/** Ô chép chính tả: tranh + khung chữ như sách, gõ từ nghe được. */
function WriteTile(props: {
  n: number;
  tone: "a" | "b";
  first: boolean;
  pattern: string;
  image?: string;
  answer: string;
  value: string;
  onChange: (v: string) => void;
  showAnswers: boolean;
  r?: ItemResult;
}) {
  const lang = useStore((s) => s.lang);
  const { r } = props;
  const state = r ? (r.correct ? "ok" : "ko") : props.value ? "done" : "";
  return (
    <div className={`board-tile write tone-${props.tone} ${state}`} style={tilePos(props.n, props.first)}>
      <span className="board-num">{props.n}</span>
      {props.image && <img src={props.image} alt="" loading="lazy" />}
      <span className="board-cmd pattern">
        <input
          value={props.value}
          placeholder={props.pattern}
          aria-label={props.pattern || String(props.n)}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </span>
      <button className="board-mic" onClick={() => speak(props.answer)} title={t(lang, "listen")}>
        <Icon name="volume" size={14} />
      </button>
      {r && !r.correct && <span className="board-why">{r.correctAnswer}{r.explanation ? ` — ${r.explanation}` : ""}</span>}
      {props.showAnswers && !r && <span className="board-sample">{props.answer}</span>}
    </div>
  );
}

function BoardTile(props: {
  n: number;
  tone: "a" | "b";
  first: boolean;
  prompt: string;
  image?: string;
  sample?: string;
  value: string;
  onChange: (v: string) => void;
  showAnswers: boolean;
  r?: ItemResult;
}) {
  const lang = useStore((s) => s.lang);
  const rec = useItalianRecorder();
  const { r, onChange } = props;
  useEffect(() => {
    if (!rec.recording && rec.transcript) onChange(rec.transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rec.recording, rec.transcript]);
  const state = r ? (r.correct ? "ok" : "ko") : props.value ? "done" : "";
  return (
    <div
      className={`board-tile tone-${props.tone} ${props.image ? "" : "no-img"} ${state}`}
      style={tilePos(props.n, props.first)}
    >
      <span className="board-num">{props.n}</span>
      {props.image && <img src={props.image} alt="" loading="lazy" />}
      <span className="board-cmd">{props.prompt}</span>
      <button
        className={`board-mic ${rec.recording ? "on" : ""}`}
        onClick={() => (rec.recording ? rec.stop() : rec.start())}
        title={rec.recording ? t(lang, "stop") : t(lang, "record")}
      >
        <Icon name={rec.recording ? "stop" : "mic"} size={14} />
      </button>
      {(rec.recording || props.value) && (
        <span className="board-said" title={props.value}>
          {rec.recording ? `${rec.transcript} ${rec.interim}`.trim() || "…" : props.value}
        </span>
      )}
      {r && !r.correct && r.explanation && <span className="board-why">{r.explanation}</span>}
      {props.showAnswers && props.sample && (
        <button className="board-sample" onClick={() => speak(props.sample!)} title={props.sample}>
          {props.sample}
        </button>
      )}
    </div>
  );
}

function SpeakItem(props: {
  /** Nhiều câu hỏi: nút ghi âm thu nhỏ thành icon cuối câu để trang gọn như sách. */
  compact?: boolean;
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
      {props.prompt && (
        <span className="line speak-prompt">
          {props.prompt}{" "}
          {props.compact && (
            <button
              className={`mini speak-mini ${rec.recording ? "on" : ""}`}
              onClick={() => (rec.recording ? rec.stop() : rec.start())}
              title={rec.recording ? t(lang, "stop") : t(lang, "record")}
            >
              <Icon name={rec.recording ? "stop" : "mic"} size={15} />
            </button>
          )}
          <Mark r={r} />
        </span>
      )}
      {props.compact && rec.audioUrl && <audio src={rec.audioUrl} controls className="coach-audio" />}
      {!props.compact && <span className="coach-actions">
        {rec.recording ? (
          <button className="pill rec" onClick={() => rec.stop()}><Icon name="stop" size={15} /> {t(lang, "stop")}</button>
        ) : (
          <button className="pill primary" onClick={() => rec.start()}><Icon name="mic" size={15} /> {t(lang, "record")}</button>
        )}
        {rec.audioUrl && <audio src={rec.audioUrl} controls className="coach-audio" />}
      </span>}
      {rec.recording && (
        <span className="coach-live">
          <span className="dot" /> <em>{rec.transcript} {rec.interim}</em>
        </span>
      )}
      {/* Bản chép lời chỉ hiện sau khi ghi âm, để trang vẫn gọn như sách. */}
      {(props.value || rec.transcript) && !rec.recording && (
        <textarea
          className="lined"
          rows={2}
          value={props.value}
          placeholder={t(lang, "speakHint")}
          onChange={(e) => props.onChange(e.target.value)}
        />
      )}
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

/** Mẫu đơn như trong sách: hai cột, dòng kẻ để viết, ô tích ☐; hàng "Data / Firma" ở cuối. */
function FormView({
  ex,
  responses,
  set,
  showAnswers,
  results,
  radioPrefix,
}: {
  ex: FormExercise & { id: string };
  responses: Record<string, string>;
  set: (itemId: string, v: string) => void;
  showAnswers: boolean;
  results: Map<string, ItemResult>;
  radioPrefix: string;
}) {
  const col = (c: 1 | 2 | "foot") => ex.items.filter((f) => (f.col ?? 1) === c);
  const field = (f: FormExercise["items"][number]) => {
    const r = results.get(f.id);
    const key = f.options ? (f.answer !== undefined ? f.options[f.answer] : undefined) : f.answers?.split("|")[0];
    return (
      <div key={f.id} className={`form-field ${f.options ? "has-options" : ""} ${f.section ? "has-section" : ""}`}>
        {f.section && <div className="form-section">{f.section}</div>}
        {f.sectionNote && <div className="form-section-note">{f.sectionNote}</div>}
        {f.options ? (
          <>
            <div className="form-q">{f.label}</div>
            <div className="form-options" style={{ gridTemplateColumns: `repeat(${f.optionCols ?? 2}, auto)` }}>
              {f.options.map((o, k) => (
                <label key={k} className={`form-check ${responses[f.id] === String(k) ? "sel" : ""} ${showAnswers && f.answer === k ? "is-answer" : ""}`}>
                  <input
                    type="radio"
                    name={`${radioPrefix}${ex.id}-${f.id}`}
                    checked={responses[f.id] === String(k)}
                    onChange={() => set(f.id, String(k))}
                  />
                  <span className="box" aria-hidden>{responses[f.id] === String(k) ? "✗" : ""}</span>
                  {o}
                </label>
              ))}
              <Mark r={r} />
            </div>
          </>
        ) : (
          <label className={`form-line lines-${f.lines ?? 1}`}>
            <span className="form-label">{f.label}</span>
            {f.given ? (
              <span className="form-given">{f.given}</span>
            ) : (f.lines ?? 1) > 1 ? (
              <textarea
                className={`form-input ${r ? (r.correct ? "ok" : "ko") : ""}`}
                rows={f.lines}
                value={responses[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
                spellCheck={false}
              />
            ) : (
              <input
                className={`form-input ${r ? (r.correct ? "ok" : "ko") : ""}`}
                value={responses[f.id] ?? ""}
                onChange={(e) => set(f.id, e.target.value)}
                spellCheck={false}
                autoCapitalize="off"
              />
            )}
            <Mark r={r} />
          </label>
        )}
        {!f.given && <Margin show={showAnswers && !!key} answer={key} r={r} />}
      </div>
    );
  };
  return (
    <div className={`book-form form-${ex.formStyle ?? "corso"}`}>
      {(ex.formTitle || ex.formSubtitle) && (
        <div className="form-title">
          {ex.formTitle && <div className="form-title-main">{ex.formTitle}</div>}
          {ex.formSubtitle && <div className="form-title-sub">{ex.formSubtitle}</div>}
        </div>
      )}
      <div className="form-cols">
        <div className="form-col">{col(1).map(field)}</div>
        <div className="form-col">{col(2).map(field)}</div>
      </div>
      {col("foot").length > 0 && <div className="form-foot">{col("foot").map(field)}</div>}
    </div>
  );
}

/** Đoạn văn / hội thoại có chỗ trống ngay trong câu, bố cục như sách (khung bo góc, chữ chạy quanh ảnh). */
function ClozeView({
  ex,
  responses,
  set,
  showAnswers,
  results,
}: {
  ex: ClozeExercise & { id: string };
  responses: Record<string, string>;
  set: (itemId: string, v: string) => void;
  showAnswers: boolean;
  results: Map<string, ItemResult>;
}) {
  const parts = parseCloze(ex);
  const renderPart = (part: (typeof parts)[number], pi: number) => (
    <section key={pi} className={`cloze-part ${part.boxed ? "boxed" : ""} ${part.variant ?? ""} cols-${part.columns ?? 1} ${part.text ? "" : "image-only"}`}>
      {part.image && (
        <figure className={`cloze-img ${part.image.side}`} style={{ width: `${part.image.width}%` }}>
          {part.image.src ? (
            <img src={part.image.src} alt={part.image.alt} loading="lazy" />
          ) : part.image.photo ? (
            <Photo query={part.image.photo} alt={part.image.alt} />
          ) : null}
        </figure>
      )}
      {part.title && <h4 className="cloze-title">{part.title}</h4>}
      {part.text && (
        <div className="cloze-text">
          {part.lines.map((line, li) => (
            <p key={li} className={`cloze-line ${line.bullet ? "cloze-turn" : ""}`}>
              {line.bullet && <span className="cloze-bullet">{line.bullet}</span>}
              {line.tokens.map((tok, ti) => {
                if (tok.t === "text") return <span key={ti}>{tok.s}</span>;
                if (tok.t === "em") return <em key={ti}>{tok.s}</em>;
                if (tok.t === "given") return <em key={ti} className="cloze-given">{tok.s}</em>;
                const r = results.get(tok.id);
                const showKey = (showAnswers || (r && !r.correct)) && tok.answers[0];
                return (
                  <span key={ti} className="cloze-slot">
                    <input
                      className={`blank ${r ? (r.correct ? "ok" : "ko") : ""}`}
                      value={responses[tok.id] ?? ""}
                      style={{ width: `${Math.max(3.2, tok.answers[0].length * 0.48 + 1.4)}em` }}
                      onChange={(e) => set(tok.id, e.target.value)}
                      spellCheck={false}
                      autoCapitalize="off"
                      aria-label={tok.id}
                    />
                    {showKey && <sup className="cloze-key">{tok.answers[0]}</sup>}
                    {r && !r.correct && r.explanation && <span className="cloze-why">{r.explanation}</span>}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      )}
    </section>
  );
  return (
    <div className={`cloze ${ex.layout ? `layout-${ex.layout}` : ""}`}>
      {ex.heading && <h3 className="cloze-heading">{ex.heading}</h3>}
      {ex.layout === "notes3" ? (
        <div className="notes3">
          {[1, 2, 3].map((c) => (
            <div key={c} className="notes3-col">
              {parts.map((p, i) => ((p.col ?? 1) === c ? renderPart(p, i) : null))}
            </div>
          ))}
        </div>
      ) : (
        parts.map(renderPart)
      )}
      {ex.source && <p className="cloze-source">{ex.source}</p>}
    </div>
  );
}
