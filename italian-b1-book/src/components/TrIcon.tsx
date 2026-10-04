import { useState } from "react";
import { tr as pick } from "../i18n";
import type { L10n } from "../types";
import { useStore } from "../lib/store";
import { plainForTranslation, savedTranslation, translate } from "../lib/translate";

/**
 * Icon dịch nhỏ cạnh mỗi câu tiếng Ý: bấm để xem bản dịch (Việt / Anh theo ngôn ngữ đang chọn), bấm lần nữa để ẩn.
 * Có bản dịch soạn sẵn (tr) hoặc trong bộ nhớ bản dịch thì hiện ngay; không thì gọi API dịch (xem src/lib/translate.ts).
 */
export function TrIcon({ text, tr }: { text: string; tr?: L10n }) {
  const lang = useStore((s) => s.lang);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<{ lang: string; text: string | null; loading: boolean } | null>(null);
  const source = plainForTranslation(text);
  if (!source) return null;

  const ready = tr ? pick(lang, tr) : state?.lang === lang ? state.text : savedTranslation(source, lang);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !open;
    setOpen(next);
    if (!next || tr || ready) return;
    setState({ lang, text: null, loading: true });
    const out = await translate(source, lang);
    setState({ lang, text: out, loading: false });
  };

  const loading = !tr && !ready && state?.loading;
  return (
    <>
      <button
        type="button"
        className={`tr-icon ${open ? "on" : ""}`}
        data-src={source}
        onClick={toggle}
        title={lang === "vi" ? "Xem bản dịch" : "Show translation"}
        aria-label={lang === "vi" ? "Xem bản dịch" : "Show translation"}
        aria-expanded={open}
      >
        <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden>
          <path d="M2.5 4h8M6.5 2.5V4c0 3.2-1.6 5.8-4 7.2M4.6 6.6c.9 1.8 2.6 3.4 4.4 4.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 17.5l3.5-8.5 3.5 8.5M11.3 14.5h4.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <span className="tr-pop" onClick={(e) => e.stopPropagation()}>
          {ready ? (
            ready
          ) : loading ? (
            <em>{lang === "vi" ? "Đang dịch…" : "Translating…"}</em>
          ) : (
            <em className="tr-missing">
              {lang === "vi"
                ? "Câu này chưa có trong bộ nhớ bản dịch. Bật API dịch trên máy chủ (ANTHROPIC_API_KEY) để dịch và lưu lại."
                : "This sentence isn't in the translation memory yet. Turn on the translation API on the server (ANTHROPIC_API_KEY) to translate and save it."}
            </em>
          )}
        </span>
      )}
    </>
  );
}
