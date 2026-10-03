import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
import { NonnaSays } from "./Nonna";
import { blankQuip, factFor } from "../lib/humor";
import { tr } from "../i18n";

/** Một trang trên màn hình (vừa đúng một khung, không cuộn): một phần của trang sách. */
export type Sheet = { page: BookPage; units: Unit[]; part: number; parts: number; zoom: Record<string, number> };

/** Một "trang ảo" của cuốn sách: bìa, mục lục, trang nội dung, bìa sau. */
export type Leaf =
  | { kind: "cover" }
  | { kind: "toc"; part: number }
  | { kind: "content"; page: BookPage; sheet: Sheet }
  | { kind: "notes" }
  | { kind: "blank" }
  | { kind: "end" };

export type BookApi = {
  goTo: (leafIndex: number) => void;
  openPage: (pageId: string) => void;
  openNumber: (n: number) => void;
};

const allUnits = pages.map((page) => ({ page, units: unitsOf(page) }));

/** Mỗi trang sách là đúng một trang trên màn hình (thu nhỏ cho vừa khung, không cuộn). */
const sheetsAll: Sheet[] = allUnits.map(({ page, units }) => ({ page, units, part: 1, parts: 1, zoom: {} }));

export function buildLeaves(sheets: Sheet[]): Leaf[] {
  const leaves: Leaf[] = [{ kind: "cover" }];
  const n = tocPageCount(pages);
  for (let i = 0; i < n; i++) leaves.push({ kind: "toc", part: i });
  sheets.forEach((sheet) => {
    // Như sách in: trang số chẵn nằm bên trái (vị trí lẻ), trang số lẻ bên phải.
    const wantLeft = sheet.page.number % 2 === 0;
    const isLeft = leaves.length % 2 === 1;
    if (Number.isInteger(sheet.page.number) && wantLeft !== isLeft) leaves.push({ kind: "blank" });
    leaves.push({ kind: "content", page: sheet.page, sheet });
  });
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

export function Book({ apiRef }: { apiRef: React.MutableRefObject<BookApi | null> }) {
  const narrow = useIsNarrow();
  const leaves = useMemo(() => buildLeaves(sheetsAll), []);
  const lang = useStore((s) => s.lang);
  const position = useStore((s) => Math.min(s.position, leaves.length - 1));
  const [flip, setFlip] = useState<Flip>(null);
  const [zoom, setZoom] = useState<number | null>(null);

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

  // Phím mũi tên để lật trang
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (zoom !== null) {
        if (e.key === "Escape") setZoom(null);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, zoom]);

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
    return <LeafView leaf={leaf} index={i} leaves={leaves} goTo={goTo} inert={isStatic} onZoom={setZoom} />;
  };

  const sideClass = (i: number) => (i % 2 === 1 ? "left" : "right");

  let content: ReactNode;
  if (narrow) {
    const under = flip ? (flip.dir === 1 ? flip.target : position) : position;
    content = (
      <div className="book single">
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

  const fact = factFor(`spread-${narrow ? position : spread}`);
  const atStart = narrow ? position === 0 : spread === 0;
  const atEnd = narrow ? position === leaves.length - 1 : spread === lastSpread;

  return (
    <div className="book-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="turn prev" onClick={() => go(-1)} disabled={atStart} aria-label={t(lang, "prev")} title="Indietro!"><Icon name="left" size={26} /></button>
      {content}
      <p className="stage-fact">
        <b>Lo sapevi?</b> {fact.it} <span>— {tr(lang, fact.tr)}</span>
      </p>
      {zoom !== null && leaves[zoom]?.kind === "content" && (
        <div className="zoom-overlay" onClick={() => setZoom(null)}>
          <div className="zoom-sheet paper" onClick={(e) => e.stopPropagation()}>
            <ContentPage sheet={(leaves[zoom] as Extract<Leaf, { kind: "content" }>).sheet} fit="width" />
          </div>
          <button className="zoom-close" onClick={() => setZoom(null)} aria-label={t(lang, "close")}>
            <Icon name="close" size={20} />
          </button>
        </div>
      )}
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
  onZoom,
}: {
  leaf: Leaf;
  index: number;
  leaves: Leaf[];
  goTo: (i: number) => void;
  inert: boolean;
  onZoom: (i: number) => void;
}) {
  const props = inert ? { inert: true } : {};
  switch (leaf.kind) {
    case "cover":
      return <div className="page-surface cover-surface" {...props}><Cover onOpen={() => goTo(1)} /></div>;
    case "end":
      return <div className="page-surface cover-surface back-cover" {...props}><BackCover /></div>;
    case "blank":
      return (
        <div className="page-surface paper blank-page" {...props}>
          <NonnaSays quip={blankQuip} mood="wink" size={44} />
        </div>
      );
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
        <div className="page-surface paper" {...props} onDoubleClick={(e) => {
          if ((e.target as HTMLElement).closest("input, textarea, button, select, label")) return;
          onZoom(index);
        }}>
          <ContentPage sheet={leaf.sheet} />
          <button className="zoom-btn" onClick={() => onZoom(index)} title="Phóng to trang / Zoom">
            <Icon name="search" size={16} />
          </button>
        </div>
      );
  }
}

function PageFoot({ index }: { index: number }) {
  return <div className="page-foot">{["i", "ii", "iii", "iv", "v", "vi"][index - 1] ?? "✎"}</div>;
}
