import { t } from "../i18n";
import { useStore } from "../lib/store";
import type { BookPage } from "../types";
import type { Leaf } from "./Book";

const PER_TOC_PAGE = 16;

type Row = { kind: "unit"; unit: string; title: string } | { kind: "page"; page: BookPage };

function rows(pages: BookPage[]): Row[] {
  const out: Row[] = [];
  let unit: string | null = null;
  for (const p of pages) {
    if (p.unit !== unit) {
      unit = p.unit;
      out.push({ kind: "unit", unit: p.unit, title: p.unitTitle });
    }
    out.push({ kind: "page", page: p });
  }
  return out;
}

export function tocPageCount(pages: BookPage[]) {
  return Math.max(1, Math.ceil(rows(pages).length / PER_TOC_PAGE));
}

export function pageLabel(p: BookPage) {
  return p.number < 1 ? "demo" : String(p.number);
}

export function TableOfContents({ part, leaves, goTo }: { part: number; leaves: Leaf[]; goTo: (i: number) => void }) {
  const lang = useStore((s) => s.lang);
  const results = useStore((s) => s.results);
  // Mỗi trang sách chỉ một dòng, dù được chia thành nhiều khung.
  const pages = leaves.flatMap((l) => (l.kind === "content" && l.sheet.part === 1 ? [l.page] : []));
  const all = rows(pages);
  const slice = all.slice(part * PER_TOC_PAGE, (part + 1) * PER_TOC_PAGE);
  const leafOf = (p: BookPage) => leaves.findIndex((l) => l.kind === "content" && l.page.id === p.id);

  const progress = (p: BookPage) => {
    const exs = p.blocks.flatMap((b) => (b.type === "exercise" ? [b.ex.id] : []));
    if (!exs.length) return null;
    const done = exs.filter((id) => results[id]).length;
    return `${done}/${exs.length}`;
  };

  return (
    <div className="toc">
      {part === 0 && (
        <>
          <h2 className="toc-title">{t(lang, "indice")}</h2>
          <p className="toc-sub">{t(lang, "contents")}</p>
        </>
      )}
      {pages.length === 0 && <p className="toc-empty">{t(lang, "emptyBook")}</p>}
      <ul>
        {slice.map((r, i) =>
          r.kind === "unit" ? (
            <li key={`u${r.unit}-${i}`} className="toc-unit">
              Unità {r.unit} · {r.title}
            </li>
          ) : (
            <li key={r.page.id} className="toc-row" onClick={() => goTo(leafOf(r.page))}>
              <span className="toc-name">{r.page.title}</span>
              <span className="toc-dots" />
              {progress(r.page) && <span className="toc-prog">✎ {progress(r.page)}</span>}
              <span className="toc-num">{pageLabel(r.page)}</span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
