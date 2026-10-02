import { useSyncExternalStore } from "react";
import type { Lang } from "../types";

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

type State = {
  lang: Lang;
  showAnswers: boolean;
  showTranslation: boolean;
  speechRate: number;
  /** Vị trí trang ảo đang mở (xem Book.tsx). */
  position: number;
  /** Câu trả lời: exerciseId -> itemId -> giá trị */
  responses: Record<string, Record<string, string>>;
  results: Record<string, ExerciseResult>;
  mistakes: Mistake[];
  notes: string;
};

const KEY = "italian-b1-book:v1";

const defaults: State = {
  lang: "vi",
  showAnswers: false,
  showTranslation: false,
  speechRate: 0.9,
  position: 0,
  responses: {},
  results: {},
  mistakes: [],
  notes: "",
};

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {
    /* localStorage có thể bị chặn */
  }
  return defaults;
}

let state: State = load();
const listeners = new Set<() => void>();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* bỏ qua */
  }
}

export function setState(patch: Partial<State> | ((s: State) => Partial<State>)) {
  const p = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...p };
  save();
  listeners.forEach((l) => l());
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

export function saveResult(exerciseId: string, result: ExerciseResult, mistakes: Mistake[]) {
  setState((s) => {
    // Thay lỗi cũ của bài này bằng lỗi mới nhất.
    const others = s.mistakes.filter((m) => m.exerciseId !== exerciseId);
    return {
      results: { ...s.results, [exerciseId]: result },
      mistakes: [...mistakes, ...others],
    };
  });
}
