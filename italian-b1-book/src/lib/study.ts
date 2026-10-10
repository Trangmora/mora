import { useSyncExternalStore } from "react";
import type { Exercise } from "../types";

/** Trạng thái tạm (không lưu) của khung học bên cạnh sách: câu đang xem "Vì sao?" và quy tắc đang mở. */
type Study = {
  focus: { ex: Exercise; itemId: string } | null;
  openRule: string | null;
  /** Ngăn kéo trên màn hình hẹp. */
  drawer: boolean;
};

let study: Study = { focus: null, openRule: null, drawer: false };
const listeners = new Set<() => void>();

export function setStudy(patch: Partial<Study>) {
  study = { ...study, ...patch };
  listeners.forEach((l) => l());
}

export function useStudy<T>(selector: (s: Study) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => selector(study),
  );
}

/** Mở lời giải "Vì sao?" của một câu, kèm quy tắc liên quan. */
export function focusWhy(ex: Exercise, itemId: string) {
  const rule = ex.why?.[itemId]?.rule ?? null;
  setStudy({ focus: { ex, itemId }, openRule: rule ?? study.openRule, drawer: true });
}

/** Câu chữ của một câu trong bài (để nhắc lại trong khung). */
export function itemPrompt(ex: Exercise, itemId: string): string {
  if (ex.kind === "match") {
    const l = ex.left.find((x) => x.id === itemId);
    return l?.text ?? "";
  }
  if ("items" in ex) {
    const it = (ex.items as { id: string; prompt?: string; label?: string }[]).find((x) => x.id === itemId);
    return it?.prompt ?? it?.label ?? "";
  }
  return "";
}
