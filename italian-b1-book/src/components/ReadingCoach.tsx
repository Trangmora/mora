import { useState } from "react";
import { t } from "../i18n";
import { useStore } from "../lib/store";
import { speak, speechRecognitionSupported, useItalianRecorder } from "../lib/speech";
import { gradeReadingAI, gradeReadingLocal, isAIAvailable, type ReadingResult } from "../lib/grading";

/** Khung luyện đọc: nghe mẫu → ghi âm → chấm từng từ → AI nhận xét phát âm. */
export function ReadingCoach({ text, onClose }: { text: string; onClose: () => void }) {
  const lang = useStore((s) => s.lang);
  const rec = useItalianRecorder();
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const local = !rec.recording && rec.transcript ? gradeReadingLocal(text, rec.transcript) : null;
  const shown = result ?? local;

  async function askAI() {
    setLoading(true);
    setError(null);
    try {
      setResult(await gradeReadingAI(text, rec.transcript, rec.confidence, lang));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="coach" onClick={(e) => e.stopPropagation()}>
      <div className="coach-head">
        <span>🎙️ {t(lang, "pronunciation")}</span>
        <button className="icon-btn" onClick={onClose} aria-label={t(lang, "close")}>✕</button>
      </div>

      <div className="coach-target">
        {shown
          ? shown.words.map((w, i) => (
              <span key={i} className={`w-${w.status}`} onClick={() => speak(w.word)} title={t(lang, "listen")}>
                {w.word}{" "}
              </span>
            ))
          : text}
      </div>

      <div className="coach-actions">
        <button className="pill" onClick={() => speak(text)}>🔊 {t(lang, "listen")}</button>
        {rec.recording ? (
          <button className="pill rec" onClick={rec.stop}>⏹ {t(lang, "stop")}</button>
        ) : (
          <button className="pill primary" onClick={() => { setResult(null); rec.start(); }}>🎙️ {t(lang, "record")}</button>
        )}
        {rec.audioUrl && <audio src={rec.audioUrl} controls className="coach-audio" />}
      </div>

      {!speechRecognitionSupported && <p className="warn">{t(lang, "noSpeech")}</p>}
      {rec.error === "mic" && <p className="warn">🎤 Microphone?</p>}

      {rec.recording && (
        <p className="coach-live">
          <span className="dot" /> {t(lang, "recording")} <em>{rec.transcript} {rec.interim}</em>
        </p>
      )}

      {!rec.recording && rec.transcript && (
        <div className="coach-result">
          <p>
            <b>{t(lang, "youSaid")}:</b> <em>{rec.transcript}</em>
          </p>
          {shown && (
            <div className="score-badge" data-good={shown.score >= 80}>
              {t(lang, "accuracy")}: {shown.score}/100 {shown.by === "ai" ? "· AI" : ""}
            </div>
          )}
          {result?.feedback && <p className="ai-note">{result.feedback}</p>}
          {result?.tips?.length ? (
            <ul className="ai-tips">
              {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          ) : null}
          {!result && isAIAvailable() && (
            <button className="pill ai" onClick={askAI} disabled={loading}>
              {loading ? t(lang, "thinking") : `🤖 ${t(lang, "aiCheck")}`}
            </button>
          )}
          {error && <p className="warn">{error}</p>}
        </div>
      )}
    </div>
  );
}
