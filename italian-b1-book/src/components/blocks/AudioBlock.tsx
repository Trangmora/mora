import { useEffect, useRef, useState } from "react";
import { Icon } from "../Icon";
import { t, tr } from "../../i18n";
import type { L10n } from "../../types";
import { useStore } from "../../lib/store";
import { speak, stopSpeaking } from "../../lib/speech";
import { Speakable } from "../Speakable";

type Props = { block: { track?: string; title?: string; src?: string; transcript?: string; tr?: L10n } };

const SPEEDS = [0.75, 0.9, 1, 1.25];

function fmt(sec: number) {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  return `${m}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
}

/** Tách lời bài nghe thành từng câu, nhận diện "Tên: câu". */
function parseLines(transcript: string) {
  return transcript
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const m = l.match(/^([A-ZÀ-Ý][\p{L} .']{0,24}):\s*(.+)$/u);
      return m ? { speaker: m[1], text: m[2] } : { speaker: "", text: l };
    });
}

/** Bài nghe: phát file audio của sách, hoặc đọc lời bằng giọng Ý khi chưa có file. */
export function AudioBlock({ block }: Props) {
  const lang = useStore((s) => s.lang);
  const showAnswers = useStore((s) => s.showAnswers);
  const showTr = useStore((s) => s.showTranslation);
  const [showText, setShowText] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(-1);
  const audio = useRef<HTMLAudioElement>(null);
  const ttsRun = useRef(0);

  const lines = block.transcript ? parseLines(block.transcript) : [];
  const speakers = [...new Set(lines.map((l) => l.speaker).filter(Boolean))];

  useEffect(() => {
    if (audio.current) audio.current.playbackRate = speed;
  }, [speed]);

  // Dừng khi lật sang trang khác
  useEffect(() => () => {
    ttsRun.current++;
    stopSpeaking();
  }, []);

  function playTTS(from = 0) {
    const run = ++ttsRun.current;
    setPlaying(true);
    const step = (i: number) => {
      if (run !== ttsRun.current) return;
      if (i >= lines.length) {
        if (loop) return step(0);
        setPlaying(false);
        setCurrent(-1);
        return;
      }
      setCurrent(i);
      const idx = speakers.indexOf(lines[i].speaker);
      // Mỗi người nói một cao độ giọng khác nhau cho dễ phân biệt.
      const pitch = idx < 0 ? 1 : [1, 0.75, 1.25, 0.9][idx % 4];
      speak(lines[i].text, { rate: 0.9 * speed, pitch, onEnd: () => setTimeout(() => step(i + 1), 350) });
    };
    step(from);
  }

  function toggle() {
    if (block.src && audio.current) {
      if (audio.current.paused) audio.current.play();
      else audio.current.pause();
      return;
    }
    if (playing) {
      ttsRun.current++;
      stopSpeaking();
      setPlaying(false);
    } else playTTS(current > 0 ? current : 0);
  }

  function seek(delta: number) {
    if (block.src && audio.current) audio.current.currentTime = Math.max(0, audio.current.currentTime + delta);
    else if (lines.length) {
      const i = Math.max(0, Math.min(lines.length - 1, (current < 0 ? 0 : current) + Math.sign(delta)));
      setCurrent(i);
      if (playing) playTTS(i);
    }
  }

  const textVisible = showText || showAnswers;

  return (
    <div className="audio-block">
      <div className="audio-bar">
        <span className="audio-track">Traccia {block.track ?? ""}</span>
        <button className="audio-play" onClick={toggle} aria-label="play"><Icon name={playing ? "pause" : "play"} size={18} /></button>
        <button className="mini" onClick={() => seek(-5)} title="-5s"><Icon name="back" size={16} /></button>
        <button className="mini" onClick={() => seek(5)} title="+5s"><Icon name="fwd" size={16} /></button>
        {block.src ? (
          <input
            className="audio-progress"
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(e) => audio.current && (audio.current.currentTime = Number(e.target.value))}
          />
        ) : (
          <span className="audio-progress tts">
            {lines.map((_, i) => <span key={i} className={i <= current ? "on" : ""} onClick={() => { setCurrent(i); playTTS(i); }} />)}
          </span>
        )}
        {block.src && <span className="audio-time">{fmt(time)} / {fmt(duration)}</span>}
        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} title={t(lang, "speed")}>
          {SPEEDS.map((s) => <option key={s} value={s}>{s}×</option>)}
        </select>
        <button className={`mini ${loop ? "on" : ""}`} onClick={() => setLoop((v) => !v)} title={t(lang, "loop")}><Icon name="repeat" size={16} /></button>
      </div>
      {block.title && <div className="audio-title">{block.title}</div>}
      {!block.src && <div className="audio-note">{t(lang, "ttsAudio")}</div>}
      {block.src && (
        <audio
          ref={audio}
          src={block.src}
          loop={loop}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />
      )}
      {lines.length > 0 && (
        <button className="pill ghost audio-toggle" onClick={() => setShowText((v) => !v)}>
          <Icon name="text" size={14} /> {textVisible ? t(lang, "hideTranscript") : t(lang, "transcript")}
        </button>
      )}
      {textVisible && (
        <div className="audio-transcript">
          {lines.map((l, i) => (
            <Speakable key={i} it={l.text} className={`dl-line ${i === current ? "now" : ""}`}>
              {l.speaker && <b className="speaker">{l.speaker}:</b>} {l.text}
            </Speakable>
          ))}
          {showTr && block.tr && <p className="translation">{tr(lang, block.tr)}</p>}
        </div>
      )}
    </div>
  );
}
