import { useCallback, useEffect, useRef, useState } from "react";
import { getState } from "./store";

// ---------- Đọc mẫu (Text-to-Speech) ----------

let italianVoice: SpeechSynthesisVoice | null = null;

function pickVoice() {
  if (typeof speechSynthesis === "undefined") return;
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("it"));
  // Ưu tiên giọng chất lượng cao (Google / Microsoft Online / Natural).
  italianVoice =
    voices.find((v) => /natural|online|google/i.test(v.name)) ?? voices[0] ?? null;
}

if (typeof speechSynthesis !== "undefined") {
  pickVoice();
  speechSynthesis.addEventListener?.("voiceschanged", pickVoice);
}

export function speak(text: string, opts: { rate?: number; pitch?: number; onEnd?: () => void } = {}) {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "it-IT";
  if (italianVoice) u.voice = italianVoice;
  u.rate = opts.rate ?? getState().speechRate;
  if (opts.pitch) u.pitch = opts.pitch;
  if (opts.onEnd) {
    u.onend = opts.onEnd;
    u.onerror = opts.onEnd;
  }
  speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
}

// ---------- Nhận dạng giọng nói + ghi âm ----------

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getRecognitionCtor(): (new () => Recognition) | null {
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as (new () => Recognition) | null;
}

export const speechRecognitionSupported = typeof window !== "undefined" && !!getRecognitionCtor();

export type RecorderState = {
  recording: boolean;
  transcript: string;
  interim: string;
  confidence: number | null;
  audioUrl: string | null;
  error: string | null;
};

/**
 * Ghi âm giọng đọc tiếng Ý: vừa nhận dạng thành chữ (để chấm) vừa lưu file âm thanh (để nghe lại).
 */
export function useItalianRecorder() {
  const [s, setS] = useState<RecorderState>({
    recording: false,
    transcript: "",
    interim: "",
    confidence: null,
    audioUrl: null,
    error: null,
  });
  const recRef = useRef<Recognition | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const finalRef = useRef<string>("");
  const confRef = useRef<number[]>([]);

  const stop = useCallback(() => {
    recRef.current?.stop();
    if (mediaRef.current && mediaRef.current.state !== "inactive") mediaRef.current.stop();
  }, []);

  useEffect(() => () => {
    recRef.current?.abort();
    if (mediaRef.current && mediaRef.current.state !== "inactive") mediaRef.current.stop();
  }, []);

  const start = useCallback(async () => {
    stopSpeaking();
    finalRef.current = "";
    confRef.current = [];
    setS((p) => {
      if (p.audioUrl) URL.revokeObjectURL(p.audioUrl);
      return { recording: true, transcript: "", interim: "", confidence: null, audioUrl: null, error: null };
    });

    // 1) Ghi âm để nghe lại
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((tr) => tr.stop());
        const url = URL.createObjectURL(new Blob(chunks, { type: mr.mimeType }));
        setS((p) => ({ ...p, audioUrl: url }));
      };
      mr.start();
      mediaRef.current = mr;
    } catch {
      setS((p) => ({ ...p, error: "mic" }));
    }

    // 2) Nhận dạng giọng nói tiếng Ý
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setS((p) => ({ ...p, error: p.error ?? "unsupported" }));
      return;
    }
    const rec = new Ctor();
    rec.lang = "it-IT";
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          finalRef.current += (finalRef.current ? " " : "") + r[0].transcript.trim();
          confRef.current.push(r[0].confidence);
        } else interim += r[0].transcript;
      }
      setS((p) => ({ ...p, transcript: finalRef.current, interim }));
    };
    rec.onerror = (e) => {
      if (e.error !== "no-speech" && e.error !== "aborted") setS((p) => ({ ...p, error: e.error }));
    };
    rec.onend = () => {
      if (mediaRef.current && mediaRef.current.state !== "inactive") mediaRef.current.stop();
      const c = confRef.current.filter((x) => x > 0);
      setS((p) => ({
        ...p,
        recording: false,
        interim: "",
        transcript: finalRef.current,
        confidence: c.length ? c.reduce((a, b) => a + b, 0) / c.length : null,
      }));
    };
    recRef.current = rec;
    rec.start();
  }, []);

  const setTranscript = useCallback((transcript: string) => setS((p) => ({ ...p, transcript })), []);

  return { ...s, start, stop, setTranscript };
}
