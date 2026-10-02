import { tr } from "../i18n";
import type { Quip } from "../lib/humor";
import { useStore } from "../lib/store";

/** Nonna Pina — bà nội Ý đi kèm cuốn sách. */
export function NonnaFace({ size = 40, mood = "happy" }: { size?: number; mood?: "happy" | "shocked" | "wink" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="nonna-face" aria-hidden>
      {/* tóc búi */}
      <circle cx="32" cy="12" r="9" fill="#d9d4cc" />
      <circle cx="32" cy="34" r="22" fill="#d9d4cc" />
      {/* mặt */}
      <circle cx="32" cy="37" r="17" fill="#f3c9a6" />
      {/* má hồng */}
      <circle cx="22" cy="42" r="3.5" fill="#ef9a8a" opacity=".7" />
      <circle cx="42" cy="42" r="3.5" fill="#ef9a8a" opacity=".7" />
      {/* kính */}
      <circle cx="25" cy="35" r="5.5" fill="none" stroke="#1d2126" strokeWidth="1.8" />
      <circle cx="39" cy="35" r="5.5" fill="none" stroke="#1d2126" strokeWidth="1.8" />
      <path d="M30.5 35h3" stroke="#1d2126" strokeWidth="1.8" />
      {mood === "wink" ? (
        <>
          <circle cx="25" cy="35" r="1.6" fill="#1d2126" />
          <path d="M36.5 35.5q2.5-2 5 0" stroke="#1d2126" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="25" cy="35" r={mood === "shocked" ? 2.2 : 1.6} fill="#1d2126" />
          <circle cx="39" cy="35" r={mood === "shocked" ? 2.2 : 1.6} fill="#1d2126" />
        </>
      )}
      {/* miệng */}
      {mood === "shocked" ? (
        <ellipse cx="32" cy="46" rx="3" ry="3.6" fill="#8f2a20" />
      ) : (
        <path d="M26 45q6 5 12 0" stroke="#8f2a20" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      {/* khăn quàng đỏ */}
      <path d="M17 54q15 10 30 0l-3 8H20Z" fill="#d6492f" />
    </svg>
  );
}

/** Nonna nói một câu: tiếng Ý + bản dịch theo ngôn ngữ đang chọn. */
export function NonnaSays({ quip, mood = "happy", size = 40 }: { quip: Quip; mood?: "happy" | "shocked" | "wink"; size?: number }) {
  const lang = useStore((s) => s.lang);
  return (
    <div className="nonna-says">
      <NonnaFace size={size} mood={mood} />
      <p>
        <span className="nonna-it">{quip.it}</span>
        <span className="nonna-tr">{tr(lang, quip.tr)}</span>
      </p>
    </div>
  );
}
