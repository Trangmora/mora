import { tr } from "../i18n";
import { factFor } from "../lib/humor";
import { useStore } from "../lib/store";
import type { Sheet } from "./Book";
import { pageLabel } from "./TableOfContents";

/** Một khung trang: vừa đúng màn hình, không cuộn. */
export function ContentPage({ sheet }: { sheet: Sheet }) {
  const lang = useStore((s) => s.lang);
  const { page, units, part, parts, zoom } = sheet;
  const fact = factFor(`${page.id}-${part}`);
  return (
    <>
      <div className="page-head">
        <span>Unità {page.unit} · {page.unitTitle}</span>
        <span>{page.title}</span>
      </div>
      <div className="page-body">
        {units.map((u) => (
          <div className="unit" key={u.key} style={zoom[u.key] ? { zoom: zoom[u.key] } : undefined}>
            {u.node}
          </div>
        ))}
      </div>
      <div className="page-foot">
        <span className="fact">
          <span className="fact-it">
            <b>Lo sapevi?</b> {fact.it}
          </span>
          <span className="fact-tr">{tr(lang, fact.tr)}</span>
        </span>
        <span className="page-num">
          {pageLabel(page)}
          {parts > 1 && <small> · {part}/{parts}</small>}
        </span>
      </div>
    </>
  );
}
