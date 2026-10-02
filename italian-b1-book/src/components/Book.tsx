import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { pages } from "../content/book";
import { t } from "../i18n";
import { setState, useStore } from "../lib/store";
import { stopSpeaking } from "../lib/speech";
import type { BookPage } from "../types";
import { BackCover, Cover } from "./Cover";
import { TableOfContents, tocPageCount } from "./TableOfContents";
import { ContentPage } from "./ContentPage";
import { NotesPage } from "./NotesPage";
import { unitsOf, type Unit } from "./units";
import { MeasureCtx } from "../lib/measure";

/** Một trang trên màn hình (vừa đúng một khung, không cuộn): một phần của trang sách. */
export type Sheet = { page: BookPage; units: Unit[]; part: number; parts: number; zoom: Record<string, number> };

/** Một "trang ảo" của cuốn sách: bìa, mục lục, trang nội dung, bìa sau. */
export type Leaf =
  | { kind: "cover" }
  | { kind: "toc"; part: number }
  | { kind: "content"; page: BookPage; sheet: Sheet }
  | { kind: "notes" }
  | { kind: "end" };

export type BookApi = {
  goTo: (leafIndex: number) => void;
  openPage: (pageId: string) => void;
  openNumber: (n: number) => void;
};

const allUnits = pages.map((page) => ({ page, units: unitsOf(page) }));

/** Mặc định (trước khi đo xong): mỗi trang sách là một khung. */
const unsplit: Sheet[] = allUnits.map(({ page, units }) => ({ page, units, part: 1, parts: 1, zoom: {} }));

export function buildLeaves(sheets: Sheet[]): Leaf[] {
  const leaves: Leaf[] = [{ kind: "cover" }];
  const n = tocPageCount(pages);
  for (let i = 0; i < n; i++) leaves.push({ kind: "toc", part: i });
  sheets.forEach((sheet) => leaves.push({ kind: "content", page: sheet.page, sheet }));
  // Trang "Appunti" (ghi chú) để bìa sau luôn nằm bên trái như sách thật.
  if (leaves.length % 2 === 0) leaves.push({ kind: "notes" });
  leaves.push({ kind: "end" });
  return leaves;
}

function useIsNarrow() {
  const q = "(max-width: 900px)";
  const [narrow, setNarrow] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setNarrow(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return narrow;
}

type Flip = { dir: 1 | -1; target: number } | null;

/**
 * Xếp các mảnh nội dung vào từng khung trang cho vừa chiều cao; mảnh cao hơn cả trang thì thu nhỏ.
 */
function paginate(heights: Map<string, number>, avail: number): Sheet[] {
  const sheets: Sheet[] = [];
  for (const { page, units } of allUnits) {
    const groups: { units: Unit[]; zoom: Record<string, number> }[] = [];
    let cur: Unit[] = [];
    let zoom: Record<string, number> = {};
    let used = 0;
    const flush = () => {
      if (cur.length) groups.push({ units: cur, zoom });
      cur = [];
      zoom = {};
      used = 0;
    };
    units.forEach((u, i) => {
      let h = heights.get(u.key) ?? 0;
      const next = units[i + 1];
      const hNext = next ? Math.min(heights.get(next.key) ?? 0, avail) : 0;
      const need = u.keepWithNext && next ? h + hNext : h;
      if (cur.length && used + Math.min(need, avail) > avail) flush();
      if (h > avail) {
        zoom[u.key] = Math.max(0.55, avail / h);
        h = avail;
      }
      cur.push(u);
      used += h;
    });
    flush();
    if (groups.length === 0) groups.push({ units: [], zoom: {} });
    groups.forEach((g, i) => sheets.push({ page, units: g.units, part: i + 1, parts: groups.length, zoom: g.zoom }));
  }
  return sheets;
}

const signature = (sheets: Sheet[]) =>
  sheets.map((s) => s.units.map((u) => u.key + (s.zoom[u.key] ? `@${s.zoom[u.key].toFixed(2)}` : "")).join(",")).join("|");

export function Book({ apiRef }: { apiRef: React.MutableRefObject<BookApi | null> }) {
  const narrow = useIsNarrow();
  const [sheets, setSheets] = useState<Sheet[]>(unsplit);
  const leaves = useMemo(() => buildLeaves(sheets), [sheets]);
  const lang = useStore((s) => s.lang);
  const position = useStore((s) => Math.min(s.position, leaves.length - 1));
  const [flip, setFlip] = useState<Flip>(null);

  // Ở chế độ 2 trang: spread k hiện trang trái 2k-1 và phải 2k.
  const spreadOf = (pos: number) => Math.floor((pos + 1) / 2);
  const lastSpread = spreadOf(leaves.length - 1);
  const spread = spreadOf(position);

  const commit = useCallback((pos: number) => {
    stopSpeaking();
    setState({ position: pos });
    setFlip(null);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (flip) return;
      if (narrow) {
        const target = position + dir;
        if (target < 0 || target >= leaves.length) return;
        setFlip({ dir, target });
      } else {
        const s = spread + dir;
        if (s < 0 || s > lastSpread) return;
        setFlip({ dir, target: Math.min(2 * s, leaves.length - 1) });
      }
    },
    [flip, narrow, position, spread, lastSpread, leaves.length],
  );

  const goTo = useCallback(
    (leafIndex: number) => {
      const target = Math.max(0, Math.min(leafIndex, leaves.length - 1));
      if (target === position) return;
      if (!narrow && spreadOf(target) === spread) return commit(target);
      setFlip({ dir: target > position ? 1 : -1, target });
    },
    [leaves.length, position, narrow, spread, commit],
  );
  apiRef.current = {
    goTo,
    openPage: (pageId) => {
      const i = leaves.findIndex((l) => l.kind === "content" && l.page.id === pageId);
      if (i >= 0) goTo(i);
    },
    openNumber: (n) => {
      // Trang có số gần nhất ≤ n
      let best = -1;
      leaves.forEach((l, i) => {
        if (l.kind === "content" && l.page.number <= n && l.sheet.part === 1) best = i;
      });
      if (best >= 0) goTo(best);
    },
  };

  // ---------- Đo kích thước & chia trang ----------
  const measureBody = useRef<HTMLDivElement>(null);
  const sigRef = useRef(signature(unsplit));
  const anchor = useRef<string | null>(null);


  const remeasure = useCallback(() => {
    const body = measureBody.current;
    if (!body) return;
    const cs = getComputedStyle(body);
    const avail = body.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 2;
    if (avail < 80) return;
    const heights = new Map<string, number>();
    body.querySelectorAll<HTMLElement>(":scope > .unit").forEach((el) => {
      heights.set(el.dataset.key!, el.getBoundingClientRect().height);
    });
    const next = paginate(heights, avail);
    const sig = signature(next);
    if (sig === sigRef.current) return;
    sigRef.current = sig;
    setSheets(next);
  }, []);

  useLayoutEffect(() => {
    remeasure();
    const body = measureBody.current;
    if (!body) return;
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(remeasure);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(body);
    body.querySelectorAll(":scope > .unit").forEach((el) => ro.observe(el));
    document.fonts?.ready.then(schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [remeasure, narrow]);

  // Sau khi chia lại trang: giữ nguyên nội dung đang đọc.
  const leavesRef = useRef(leaves);
  useEffect(() => {
    leavesRef.current = leaves;
    const key = anchor.current;
    if (!key) return;
    const i = leaves.findIndex(
      (l) => l.kind === "content" && (l.sheet.units.some((u) => u.key === key) || (l.sheet.units.length === 0 && l.page.id === key)),
    );
    if (i >= 0 && i !== position) setState({ position: i });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaves]);

  // Ghi nhớ mảnh đầu tiên của trang đang mở.
  useEffect(() => {
    const l = leavesRef.current[position];
    anchor.current = l?.kind === "content" ? (l.sheet.units[0]?.key ?? l.page.id) : null;
  }, [position]);

  // Phím mũi tên để lật trang
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Vuốt trên điện thoại
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY });
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  const render = (i: number, isStatic = false): ReactNode => {
    const leaf = leaves[i];
    if (!leaf) return <div className="page-surface empty" />;
    return <LeafView leaf={leaf} index={i} leaves={leaves} goTo={goTo} inert={isStatic} />;
  };

  const sideClass = (i: number) => (i % 2 === 1 ? "left" : "right");

  let content: ReactNode;
  if (narrow) {
    const under = flip ? (flip.dir === 1 ? flip.target : position) : position;
    content = (
      <div className="book single">
        <MeasureLayer bodyRef={measureBody} full={true} />
        <div className={`page-slot full ${sideClass(under)}`}>{render(under)}</div>
        {flip && (
          <div
            className={`flipper single ${flip.dir === 1 ? "fwd" : "bwd"}`}
            onAnimationEnd={() => commit(flip.target)}
          >
            <div className={`face front ${sideClass(flip.dir === 1 ? position : flip.target)}`}>
              {render(flip.dir === 1 ? position : flip.target, true)}
            </div>
            <div className="face back paper-back" />
          </div>
        )}
      </div>
    );
  } else {
    const k = spread;
    const tk = flip ? spreadOf(flip.target) : k;
    const leftIdx = flip?.dir === -1 ? 2 * tk - 1 : 2 * k - 1;
    const rightIdx = flip?.dir === 1 ? 2 * tk : 2 * k;
    content = (
      <div className={`book spread ${k === 0 && !flip ? "closed" : ""} ${k === lastSpread && !flip && leaves.length % 2 === 0 ? "closed-end" : ""}`}>
        <div className="page-slot left">{leftIdx >= 0 ? render(leftIdx) : null}</div>
        <div className="page-slot right">{rightIdx < leaves.length ? render(rightIdx) : null}</div>
        <div className="spine" />
        <MeasureLayer bodyRef={measureBody} full={false} />
        {flip && flip.dir === 1 && (
          <div className="flipper fwd" onAnimationEnd={() => commit(flip.target)}>
            <div className="face front right">{render(2 * k, true)}</div>
            <div className="face back left">{render(2 * tk - 1, true)}</div>
          </div>
        )}
        {flip && flip.dir === -1 && (
          <div className="flipper bwd" onAnimationEnd={() => commit(flip.target)}>
            <div className="face front left">{render(2 * k - 1, true)}</div>
            <div className="face back right">{render(2 * tk, true)}</div>
          </div>
        )}
      </div>
    );
  }

  const atStart = narrow ? position === 0 : spread === 0;
  const atEnd = narrow ? position === leaves.length - 1 : spread === lastSpread;

  return (
    <div className="book-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="turn prev" onClick={() => go(-1)} disabled={atStart} aria-label={t(lang, "prev")} title="Indietro!"><Icon name="left" size={26} /></button>
      {content}
      <button className="turn next" onClick={() => go(1)} disabled={atEnd} aria-label={t(lang, "next")} title="Avanti!"><Icon name="right" size={26} /></button>
    </div>
  );
}

function LeafView({
  leaf,
  index,
  leaves,
  goTo,
  inert,
}: {
  leaf: Leaf;
  index: number;
  leaves: Leaf[];
  goTo: (i: number) => void;
  inert: boolean;
}) {
  const props = inert ? { inert: true } : {};
  switch (leaf.kind) {
    case "cover":
      return <div className="page-surface cover-surface" {...props}><Cover onOpen={() => goTo(1)} /></div>;
    case "end":
      return <div className="page-surface cover-surface back-cover" {...props}><BackCover /></div>;
    case "notes":
      return (
        <div className="page-surface paper" {...props}>
          <NotesPage />
          <PageFoot index={index} />
        </div>
      );
    case "toc":
      return (
        <div className="page-surface paper" {...props}>
          <TableOfContents part={leaf.part} leaves={leaves} goTo={goTo} />
          <PageFoot index={index} />
        </div>
      );
    case "content":
      return (
        <div className="page-surface paper" {...props}>
          <ContentPage sheet={leaf.sheet} />
        </div>
      );
  }
}

function PageFoot({ index }: { index: number }) {
  return <div className="page-foot">{["i", "ii", "iii", "iv", "v", "vi"][index - 1] ?? "✎"}</div>;
}

/** Lớp ẩn có đúng kích thước một trang, vẽ mọi mảnh nội dung để đo chiều cao. */
function MeasureLayer({ bodyRef, full }: { bodyRef: React.RefObject<HTMLDivElement | null>; full: boolean }) {
  return (
    <MeasureCtx.Provider value={true}>
      <div className={`page-slot measure-slot ${full ? "full" : "left"}`} aria-hidden inert>
        <div className="page-surface paper">
          <div className="page-head">
            <span>Unità</span>
            <span>Measure</span>
          </div>
          <div className="page-body" ref={bodyRef}>
            {allUnits.flatMap(({ units }) =>
              units.map((u) => (
                <div className="unit" data-key={u.key} key={u.key}>
                  {u.node}
                </div>
              )),
            )}
          </div>
          <div className="page-foot">
            <span>0</span>
          </div>
        </div>
      </div>
    </MeasureCtx.Provider>
  );
}
