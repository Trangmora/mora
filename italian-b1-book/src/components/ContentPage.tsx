import type { BookPage } from "../types";
import { BlockView } from "./blocks/Blocks";
import { pageLabel } from "./TableOfContents";

export function ContentPage({ page }: { page: BookPage }) {
  return (
    <>
      <div className="page-head">
        <span>Unità {page.unit} · {page.unitTitle}</span>
        <span>{page.title}</span>
      </div>
      <div className="page-body">
        {page.blocks.map((b, i) => (
          <BlockView key={i} block={b} page={page} />
        ))}
      </div>
      <div className="page-foot">{pageLabel(page)}</div>
    </>
  );
}
