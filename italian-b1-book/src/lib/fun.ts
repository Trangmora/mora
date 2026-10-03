import type { L10n } from "../types";
import type { Quip } from "./humor";
import { facts } from "./humor";
import type { Attempt, ExerciseResult } from "./store";
import { getState } from "./store";

/**
 * Phần "cho vui": sự kiện (chấm bài, lật trang, lên cấp), âm thanh tự tạo bằng Web Audio,
 * điểm espresso ☕ và cấp bậc kiểu Ý. Không ảnh hưởng nội dung trang sách.
 */

// ---------- Sự kiện ----------

export type FunEvent =
  | { type: "graded"; score: number; wrong: number }
  | { type: "flip" }
  | { type: "levelup"; level: number };

const listeners = new Set<(e: FunEvent) => void>();

export function onFun(fn: (e: FunEvent) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function emitFun(e: FunEvent) {
  listeners.forEach((l) => l(e));
  playFor(e);
}

// ---------- Âm thanh (tự tạo, không cần file) ----------

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (getState().sound === false) return null;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", gain = 0.12, slideTo?: number) {
  const a = audio();
  if (!a) return;
  const t0 = a.currentTime + start;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(a.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

/** Tiếng giấy sột soạt khi lật trang. */
function paper() {
  const a = audio();
  if (!a) return;
  const len = Math.floor(a.sampleRate * 0.35);
  const buf = a.createBuffer(1, len, a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) ** 2 * (0.6 + 0.4 * Math.sin(t * 40));
  }
  const src = a.createBufferSource();
  src.buffer = buf;
  const f = a.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = 2400;
  f.Q.value = 0.7;
  const g = a.createGain();
  g.gain.value = 0.18;
  src.connect(f).connect(g).connect(a.destination);
  src.start();
}

function playFor(e: FunEvent) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches && e.type === "flip") return;
  switch (e.type) {
    case "flip":
      paper();
      break;
    case "graded":
      if (e.score >= 100) {
        // "Ta-da!" Mi – Sol – Do
        tone(659, 0, 0.18, "triangle");
        tone(784, 0.12, 0.18, "triangle");
        tone(1047, 0.24, 0.4, "triangle");
      } else if (e.score >= 50) {
        tone(880, 0, 0.15);
        tone(1175, 0.1, 0.25);
      } else {
        // "Uh-oh" trượt xuống
        tone(330, 0, 0.22, "triangle", 0.1, 260);
        tone(250, 0.22, 0.35, "triangle", 0.1, 180);
      }
      break;
    case "levelup":
      [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.1, 0.3, "triangle", 0.1));
      break;
  }
}

// ---------- Điểm espresso & cấp bậc ----------

export const LEVELS: { min: number; it: string; tr: L10n; emoji: string }[] = [
  { min: 0, it: "Turista", tr: { vi: "Khách du lịch", en: "Tourist" }, emoji: "📸" },
  { min: 100, it: "Studente Erasmus", tr: { vi: "Sinh viên trao đổi", en: "Exchange student" }, emoji: "🎒" },
  { min: 250, it: "Barista", tr: { vi: "Thợ pha cà phê", en: "Barista" }, emoji: "☕" },
  { min: 500, it: "Pizzaiolo", tr: { vi: "Thợ làm pizza", en: "Pizza maker" }, emoji: "🍕" },
  { min: 850, it: "Chef della Nonna", tr: { vi: "Đầu bếp của Nonna", en: "Nonna's chef" }, emoji: "🍝" },
  { min: 1300, it: "Cittadino onorario", tr: { vi: "Công dân danh dự", en: "Honorary citizen" }, emoji: "🏛️" },
  { min: 2000, it: "Vero italiano", tr: { vi: "Người Ý thứ thiệt", en: "True Italian" }, emoji: "🤌" },
];

/**
 * ☕ = 10 cho mỗi câu đúng, +20 cho bài 100 điểm, +5 cho mỗi lần luyện đọc ≥ 80.
 * Tính lại từ dữ liệu của người học, nên mỗi người có điểm riêng.
 */
export function espressoPoints(results: Record<string, ExerciseResult>, history: Attempt[]) {
  let pts = 0;
  for (const r of Object.values(results)) {
    pts += r.items.filter((i) => i.correct).length * 10;
    if (r.score >= 100) pts += 20;
  }
  pts += history.filter((h) => !h.exerciseId && h.score >= 80).length * 5;
  return pts;
}

export function levelOf(points: number) {
  let i = 0;
  LEVELS.forEach((l, k) => {
    if (points >= l.min) i = k;
  });
  const next = LEVELS[i + 1];
  return {
    index: i,
    level: LEVELS[i],
    next,
    progress: next ? (points - LEVELS[i].min) / (next.min - LEVELS[i].min) : 1,
  };
}

// ---------- Câu nói của Nonna khi bấm vào bà ----------

const proverbs: Quip[] = [
  { it: "Sbagliando s'impara!", tr: { vi: "Có sai mới có học!", en: "We learn by making mistakes!" } },
  { it: "Chi dorme non piglia pesci.", tr: { vi: "Ngủ thì chẳng bắt được cá — chăm lên nào!", en: "He who sleeps catches no fish." } },
  { it: "Roma non fu fatta in un giorno.", tr: { vi: "Thành Rome đâu xây trong một ngày.", en: "Rome wasn't built in a day." } },
  { it: "L'appetito vien mangiando.", tr: { vi: "Ăn rồi mới thấy đói — học rồi sẽ thấy thích!", en: "Appetite comes with eating." } },
  { it: "Tutte le strade portano a Roma.", tr: { vi: "Mọi con đường đều dẫn tới Rome.", en: "All roads lead to Rome." } },
  { it: "Meglio tardi che mai.", tr: { vi: "Muộn còn hơn không.", en: "Better late than never." } },
  { it: "Chi va piano va sano e va lontano.", tr: { vi: "Chậm mà chắc thì đi được xa.", en: "Slow and steady goes far." } },
  { it: "A tavola non s'invecchia.", tr: { vi: "Ngồi bên bàn ăn thì chẳng ai già.", en: "At the table, nobody gets old." } },
];

const nonnaJokes: Quip[] = [
  { it: "Hai mangiato? Non si studia a pancia vuota!", tr: { vi: "Ăn chưa con? Bụng đói thì sao học được!", en: "Have you eaten? You can't study on an empty stomach!" } },
  { it: "Ancora un capitolo e poi un bel piatto di pasta, va bene?", tr: { vi: "Thêm một bài nữa rồi ăn đĩa mì nhé?", en: "One more chapter and then a nice plate of pasta, ok?" } },
  { it: "Ma che bella pronuncia! Sembri di Firenze… quasi.", tr: { vi: "Phát âm hay ghê! Nghe như người Firenze… gần gần.", en: "What lovely pronunciation! You sound Florentine… almost." } },
  { it: "Ti ho visto, eh! Niente traduttore automatico!", tr: { vi: "Bà thấy rồi nhé! Không dùng máy dịch đâu!", en: "I saw that! No machine translator!" } },
  { it: "Mamma mia, quanto studi! Sei proprio bravo/a.", tr: { vi: "Trời ơi, học chăm thế! Giỏi lắm con.", en: "Mamma mia, you study so much! Well done." } },
];

export function randomNonnaLine(seed = Date.now()): Quip {
  const pool = [...proverbs, ...nonnaJokes, ...facts];
  return pool[Math.abs(seed) % pool.length];
}

export function greeting(): Quip {
  const h = new Date().getHours();
  if (h < 12) return { it: "Buongiorno, tesoro! Un caffè e si comincia?", tr: { vi: "Chào buổi sáng, cưng! Làm ly cà phê rồi học nhé?", en: "Good morning, darling! A coffee and we start?" } };
  if (h < 18) return { it: "Buon pomeriggio! Pronto per una pagina nuova?", tr: { vi: "Chào buổi chiều! Sẵn sàng học trang mới chưa?", en: "Good afternoon! Ready for a new page?" } };
  return { it: "Buonasera! Studiamo un po' e poi a cena, eh?", tr: { vi: "Chào buổi tối! Học một chút rồi đi ăn tối nhé?", en: "Good evening! A bit of study and then dinner, ok?" } };
}
