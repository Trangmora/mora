import type React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { numeroInLettere } from "../lib/numeri";
import type { Sheet } from "./Book";

/** Chiều rộng thiết kế của một trang sách (px); trang được thu nhỏ cho vừa khung màn hình. */
const PAGE_W = 820;
/** Tỉ lệ cao/rộng tối thiểu của trang như sách in. */
const PAGE_RATIO = 1.27;
/** Trên điện thoại: trang hẹp hơn để chữ đủ lớn, các cột xếp chồng, cuộn dọc trong trang. */
const PHONE_W = 460;
const PHONE_Q = "(max-width: 600px)";

function useIsPhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE_Q).matches);
  useEffect(() => {
    const m = window.matchMedia(PHONE_Q);
    const on = () => setPhone(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return phone;
}

/** Một trang sách: dựng đúng bố cục sách rồi thu nhỏ cho vừa màn hình, không cuộn. */
export function ContentPage({ sheet, fit = "page" }: { sheet: Sheet; fit?: "page" | "width" }) {
  const { page, units } = sheet;
  const odd = page.number % 2 === 1;
  const viewport = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 1, left: 0, h: 0 });
  const phone = useIsPhone();
  const mode = phone ? "phone" : fit;
  const W = phone ? PHONE_W : PAGE_W;

  useLayoutEffect(() => {
    const vp = viewport.current;
    const cv = canvas.current;
    if (!vp || !cv) return;
    const update = () => {
      const h = Math.max(cv.scrollHeight, W * PAGE_RATIO);
      // "page": cả trang vừa khung (không cuộn). "width"/"phone": theo chiều ngang, cuộn dọc để đọc/điền cho rõ.
      const scale = mode === "page" ? Math.min(vp.clientWidth / W, vp.clientHeight / h) : Math.min(vp.clientWidth / W, 1.35);
      setBox({ scale, left: Math.max(0, (vp.clientWidth - W * scale) / 2), h: cv.scrollHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(vp);
    ro.observe(cv);
    return () => ro.disconnect();
  }, [mode, W]);

  return (
    <div className={`page-viewport fit-${mode === "phone" ? "width phone" : mode}`} ref={viewport}>
      {mode !== "page" && <div style={{ height: box.h * box.scale }} aria-hidden />}
      <div
        className={`book-page ${odd ? "odd" : "even"} ${page.sideTab ? "has-tab" : ""} ${phone ? "phone" : ""}`}
        ref={canvas}
        style={{ width: W, minHeight: phone ? 0 : PAGE_W * PAGE_RATIO, transform: `translate(${box.left}px, 0) scale(${box.scale})` }}
      >
        {page.runningHead && (
          <div className="running-row">
            <div className="running-head">{page.runningHead}</div>
            {page.banner && <div className="section-banner">{page.banner}</div>}
          </div>
        )}
        {page.sideTab && (
          <div className="side-tab" aria-hidden style={page.sideTab.color ? ({ "--tab": page.sideTab.color } as React.CSSProperties) : undefined}>
            <b>{page.sideTab.unit}</b>
            {page.sideTab.title && <span>{page.sideTab.title}</span>}
          </div>
        )}
        <div className={`book-page-body ${page.notebook ? "notebook-frame" : ""}`}>
          {page.notebook && (
            <>
              <div className="spiral" aria-hidden />
              <p className="notebook-title">{page.notebook.title}</p>
            </>
          )}
          {units.map((u) => (
            <div className="unit" key={u.key}>
              {u.node}
            </div>
          ))}
        </div>
        <div className="book-folio">
          {page.number < 1 ? "demo" : (
            <>
              <span className="folio-num">{page.number}</span>
              <span className="folio-word">{numeroInLettere(page.number)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
