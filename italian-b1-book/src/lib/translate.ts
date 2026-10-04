import type { Lang } from "../types";
import saved from "../content/translations.json";

/**
 * Bản dịch cho icon dịch cạnh mỗi câu. Thứ tự tìm:
 * 1. bộ nhớ bản dịch của sách (src/content/translations.json) — dịch sẵn một lần, dùng mãi, không tốn API;
 * 2. bản dịch đã lưu trên máy này (localStorage);
 * 3. API dịch trên máy chủ (/api/translate, Claude) — máy chủ ghi kết quả vào bộ nhớ bản dịch để lần sau khỏi gọi lại.
 */

type Entry = Partial<Record<Lang, string>>;
const book = saved as Record<string, Entry>;

const CACHE_KEY = "italian-b1-book:v2:translations";

function readCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function remember(key: string, value: string) {
  try {
    const c = readCache();
    c[key] = value;
    localStorage.setItem(CACHE_KEY, JSON.stringify(c));
  } catch {
    /* hết chỗ hoặc bị chặn: bỏ qua */
  }
}

/** Bản dịch có sẵn ngay (bộ nhớ của sách hoặc của máy), không cần gọi API. */
export function savedTranslation(text: string, lang: Lang): string | undefined {
  return book[text]?.[lang] ?? readCache()[`${lang}|${text}`];
}

export async function translate(text: string, lang: Lang): Promise<string | null> {
  const hit = savedTranslation(text, lang);
  if (hit) return hit;
  try {
    const r = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    });
    if (r.ok) {
      const j = (await r.json()) as { translation?: string };
      if (j.translation) {
        remember(`${lang}|${text}`, j.translation);
        return j.translation;
      }
    }
  } catch {
    /* không có máy chủ (ví dụ bản xem trực tuyến) */
  }
  return null;
}

/** Chữ thuần để dịch: bỏ dấu ** * của định dạng, ô trống thành "…". */
export function plainForTranslation(s: string) {
  return s
    .replace(/\{\{=([^}]*)\}\}/g, "$1")
    .replace(/\{\{[^}]*\}\}/g, "…")
    .replace(/_{3,}/g, "…")
    .replace(/\*+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
