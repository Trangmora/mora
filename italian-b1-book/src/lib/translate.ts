import type { Lang } from "../types";

/**
 * Dịch một câu tiếng Ý khi người học bấm icon dịch cạnh câu đó. Thứ tự thử:
 * 1. bản dịch đã lưu trên máy (localStorage);
 * 2. bộ dịch có sẵn trong trình duyệt (Chrome 138+, chạy ngay trên máy, miễn phí);
 * 3. máy chủ /api/translate (Claude) khi có ANTHROPIC_API_KEY.
 * Không cách nào dùng được thì trả null — giao diện đưa link Google Dịch.
 */

const CACHE_KEY = "italian-b1-book:v2:translations";

type Cache = Record<string, string>;

function readCache(): Cache {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}") as Cache;
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

export function cachedTranslation(text: string, lang: Lang): string | undefined {
  return readCache()[`${lang}|${text}`];
}

type BrowserTranslator = { translate(text: string): Promise<string> };
type TranslatorApi = {
  availability(o: { sourceLanguage: string; targetLanguage: string }): Promise<string>;
  create(o: { sourceLanguage: string; targetLanguage: string }): Promise<BrowserTranslator>;
};

/** Chờ tối đa ms mili-giây, quá thì coi như không có kết quả. */
function within<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), ms))]);
}

const browserTranslators: Partial<Record<Lang, Promise<BrowserTranslator | null>>> = {};

function browserTranslator(lang: Lang): Promise<BrowserTranslator | null> {
  const api = (globalThis as { Translator?: TranslatorApi }).Translator;
  if (!api) return Promise.resolve(null);
  browserTranslators[lang] ??= (async (): Promise<BrowserTranslator | null> => {
    try {
      const opts = { sourceLanguage: "it", targetLanguage: lang };
      const avail = await within(api.availability(opts), 3000);
      if (!avail || avail === "unavailable") return null;
      // Lần đầu Chrome tải gói ngôn ngữ về máy; quá lâu (mạng chặn) thì bỏ qua.
      return await within(api.create(opts), avail === "available" ? 5000 : 20000);
    } catch {
      return null;
    }
  })();
  return browserTranslators[lang]!;
}

export async function translate(text: string, lang: Lang): Promise<string | null> {
  const key = `${lang}|${text}`;
  const hit = readCache()[key];
  if (hit) return hit;

  const local = await browserTranslator(lang);
  if (local) {
    try {
      const out = await within(local.translate(text), 8000);
      if (out) {
        remember(key, out);
        return out;
      }
    } catch {
      /* thử cách tiếp theo */
    }
  }

  try {
    const r = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    });
    if (r.ok) {
      const j = (await r.json()) as { translation?: string };
      if (j.translation) {
        remember(key, j.translation);
        return j.translation;
      }
    }
  } catch {
    /* không có máy chủ (ví dụ bản xem trực tuyến) */
  }
  return null;
}

export function googleTranslateUrl(text: string, lang: Lang) {
  return `https://translate.google.com/?sl=it&tl=${lang}&text=${encodeURIComponent(text)}&op=translate`;
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
