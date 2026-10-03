import { useLayoutEffect, useRef, useState } from "react";
import { numeroInLettere } from "../lib/numeri";
import type { Sheet } from "./Book";

/** Chiều rộng thiết kế của một trang sách (px); trang được thu nhỏ cho vừa khung màn hình. */
const PAGE_W = 820;
/** Tỉ lệ cao/rộng tối thiểu của trang như sách in. */
const PAGE_RATIO = 1.27;

/** Một trang sách: dựng đúng bố cục sách rồi thu nhỏ cho vừa màn hình, không cuộn. */
export function ContentPage({ sheet, fit = "page" }: { sheet: Sheet; fit?: "page" | "width" }) {
  const { page, units } = sheet;
  const odd = page.number % 2 === 1;
  const viewport = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 1, left: 0 });

  useLayoutEffect(() => {
    const vp = viewport.current;
    const cv = canvas.current;
    if (!vp || !cv) return;
    const update = () => {
      const h = Math.max(cv.scrollHeight, PAGE_W * PAGE_RATIO);
      // "page": cả trang vừa khung (không cuộn). "width": phóng to theo chiều ngang để đọc/điền cho rõ.
      const scale = fit === "width" ? Math.min(vp.clientWidth / PAGE_W, 1.35) : Math.min(vp.clientWidth / PAGE_W, vp.clientHeight / h);
      setBox({ scale, left: (vp.clientWidth - PAGE_W * scale) / 2 });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(vp);
    ro.observe(cv);
    return () => ro.disconnect();
  }, [fit]);

  return (
    <div className={`page-viewport fit-${fit}`} ref={viewport}>
      {fit === "width" && <div style={{ height: (canvas.current?.scrollHeight ?? 0) * box.scale }} aria-hidden />}
      <div
        className={`book-page ${odd ? "odd" : "even"} ${page.sideTab ? "has-tab" : ""}`}
        ref={canvas}
        style={{ width: PAGE_W, minHeight: PAGE_W * PAGE_RATIO, transform: `translate(${box.left}px, 0) scale(${box.scale})` }}
      >
        {page.runningHead && (
          <div className="running-row">
            <div className="running-head">{page.runningHead}</div>
            {page.banner && <div className="section-banner">{page.banner}</div>}
          </div>
        )}
        {page.sideTab && (
          <div className="side-tab" aria-hidden>
            <b>{page.sideTab.unit}</b>
            <span>{page.sideTab.title}</span>
          </div>
        )}
        <div className="book-page-body">
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
