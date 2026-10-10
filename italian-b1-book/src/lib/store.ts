import { useSyncExternalStore } from "react";
import type { Lang, Skill } from "../types";

/** Kết quả chấm của một câu trong bài tập. */
export type ItemResult = {
  id: string;
  correct: boolean;
  userAnswer: string;
  correctAnswer?: string;
  explanation?: string;
};

export type ExerciseResult = {
  score: number; // 0-100
  items: ItemResult[];
  summary?: string;
  tips?: string[];
  by: "key" | "ai";
  at: string;
};

export type Mistake = {
  key: string; // exerciseId:itemId
  pageId: string;
  pageNumber: number;
  exerciseId: string;
  exerciseNumber?: string;
  prompt: string;
  userAnswer: string;
  correctAnswer?: string;
  explanation?: string;
  at: string;
};

/** Một lần làm bài / luyện tập — dùng để vẽ đường tiến bộ theo kỹ năng. */
export type Attempt = {
  at: string;
  skill: Skill;
  score: number;
  exerciseId?: string;
  pageId?: string;
};

export type Profile = { id: string; name: string; createdAt: string };

/** Dữ liệu học riêng của từng người. */
type Progress = {
  position: number;
  responses: Record<string, Record<string, string>>;
  results: Record<string, ExerciseResult>;
  mistakes: Mistake[];
  notes: string;
  history: Attempt[];
  /** Cấp bậc espresso cao nhất đã ăn mừng (để biết khi nào lên cấp). */
  lastLevel?: number;
  /** Các quy tắc trong kho kiến thức đã gặp khi chấm bài. */
  learned: string[];
};

/** Cài đặt chung của máy. */
type Settings = {
  lang: Lang;
  showAnswers: boolean;
  showTranslation: boolean;
  speechRate: number;
  /** Âm thanh vui (lật trang, đúng/sai, lên cấp). */
  sound?: boolean;
  users: Profile[];
  currentUser: string;
};

type State = Settings & Progress;

const SETTINGS_KEY = "sach-moi:v1:settings";
const userKey = (id: string) => `sach-moi:v1:user:${id}`;
const LEGACY_KEY = "sach-moi:v0";

const emptyProgress: Progress = {
  position: 0,
  responses: {},
  results: {},
  mistakes: [],
  notes: "",
  history: [],
  learned: [],
};

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* localStorage có thể bị chặn */
  }
}

function loadProgress(id: string): Progress {
  return { ...emptyProgress, ...read<Partial<Progress>>(userKey(id)) };
}

function load(): State {
  let settings = read<Settings>(SETTINGS_KEY);
  if (!settings || !settings.users?.length) {
    const first: Profile = { id: "me", name: "Tôi", createdAt: new Date().toISOString() };
    // Chuyển dữ liệu từ phiên bản cũ (một người dùng) sang hồ sơ đầu tiên.
    const legacy = read<Partial<State>>(LEGACY_KEY);
    settings = {
      lang: legacy?.lang ?? "vi",
      showAnswers: legacy?.showAnswers ?? false,
      showTranslation: legacy?.showTranslation ?? false,
      speechRate: legacy?.speechRate ?? 0.9,
      users: [first],
      currentUser: first.id,
    };
    if (legacy) {
      write(userKey(first.id), {
        position: legacy.position ?? 0,
        responses: legacy.responses ?? {},
        results: legacy.results ?? {},
        mistakes: legacy.mistakes ?? [],
        notes: legacy.notes ?? "",
        history: [],
      });
    }
    write(SETTINGS_KEY, settings);
  }
  return { ...settings, ...loadProgress(settings.currentUser) };
}

let state: State = load();
const listeners = new Set<() => void>();

function save() {
  const { lang, showAnswers, showTranslation, speechRate, sound, users, currentUser, ...progress } = state;
  write(SETTINGS_KEY, { lang, showAnswers, showTranslation, speechRate, sound, users, currentUser });
  write(userKey(currentUser), progress);
}

function emit() {
  listeners.forEach((l) => l());
}

export function setState(patch: Partial<State> | ((s: State) => Partial<State>)) {
  const p = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...p };
  save();
  emit();
}

export function getState() {
  return state;
}

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => selector(state),
  );
}

// ---------- Người học ----------

export function switchUser(id: string) {
  if (id === state.currentUser || !state.users.some((u) => u.id === id)) return;
  save();
  state = { ...state, currentUser: id, ...loadProgress(id) };
  save();
  emit();
}

export function addUser(name: string) {
  const clean = name.trim().slice(0, 40);
  if (!clean) return;
  const id = `u${Date.now().toString(36)}`;
  save();
  state = {
    ...state,
    users: [...state.users, { id, name: clean, createdAt: new Date().toISOString() }],
    currentUser: id,
    ...emptyProgress,
  };
  save();
  emit();
}

export function renameUser(id: string, name: string) {
  const clean = name.trim().slice(0, 40);
  if (!clean) return;
  setState((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, name: clean } : u)) }));
}

// ---------- Bài làm ----------

export function setResponse(exerciseId: string, itemId: string, value: string) {
  setState((s) => ({
    responses: { ...s.responses, [exerciseId]: { ...s.responses[exerciseId], [itemId]: value } },
  }));
}

export function resetExercise(exerciseId: string) {
  setState((s) => {
    const responses = { ...s.responses };
    const results = { ...s.results };
    delete responses[exerciseId];
    delete results[exerciseId];
    return { responses, results };
  });
}

export function saveResult(
  exerciseId: string,
  result: ExerciseResult,
  mistakes: Mistake[],
  meta?: { skill: Skill; pageId: string; counts: boolean },
) {
  setState((s) => {
    // Thay lỗi cũ của bài này bằng lỗi mới nhất.
    const others = s.mistakes.filter((m) => m.exerciseId !== exerciseId);
    const attempt: Attempt[] =
      meta?.counts ? [{ at: result.at, skill: meta.skill, score: result.score, exerciseId, pageId: meta.pageId }] : [];
    return {
      results: { ...s.results, [exerciseId]: result },
      mistakes: [...mistakes, ...others],
      history: [...s.history, ...attempt].slice(-500),
    };
  });
}

/** Ghi lại một lần luyện đọc/phát âm. */
export function logAttempt(a: Attempt) {
  setState((s) => ({ history: [...s.history, a].slice(-500) }));
}

/** Đánh dấu các quy tắc trong kho kiến thức là đã gặp. */
export function learnRules(ids: string[]) {
  if (!ids.length) return;
  setState((s) => ({ learned: [...new Set([...(s.learned ?? []), ...ids])] }));
}
