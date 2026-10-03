import type { ReactNode } from "react";
import { tr } from "../../i18n";
import type { L10n } from "../../types";
import { speak } from "../../lib/speech";
import { useStore } from "../../lib/store";

/** **đậm**, *nghiêng*, ***đậm nghiêng*** trong một dòng. */
export function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<b key={k++}><i>{m[1]}</i></b>);
    else if (m[2] !== undefined) out.push(<b key={k++}>{inline(m[2])}</b>);
    else out.push(<i key={k++}>{inline(m[3])}</i>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const plain = (s: string) => s.replace(/\*/g, "").replace(/^\d+\.\s*/, "").replace(/^\([^)]*\)\s*/, "");

/** Câu ví dụ in nghiêng: bấm để nghe giọng Ý. */
function Example({ text, indent, bullet, as = "p" }: { text: string; indent?: boolean; bullet?: string; as?: "p" | "span" }) {
  // Phần sau " = " là lời giải thích, không đọc. "1. " ở đầu là số thứ tự, không nghiêng.
  const [first, ...rest] = text.split(" = ");
  const num = first.match(/^(\d+\.)\s+(.*)$/);
  const it = num ? num[2] : first;
  const Tag = as;
  return (
    <Tag className={`th-ex ${indent ? "indent" : ""} ${bullet ? "th-dl" : ""}`}>
      {bullet && <span className="th-bullet">{bullet}</span>}
      {num && <span className="th-num">{num[1]} </span>}
      <span className="th-say" role="button" tabIndex={0} onClick={() => speak(plain(it))} onKeyDown={(e) => e.key === "Enter" && speak(plain(it))}>
        <i>{inline(it)}</i>
      </span>
      {rest.length > 0 && <> = {inline(rest.join(" = "))}</>}
    </Tag>
  );
}

function Table({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <table className={`th-table ${head.length > 3 ? "wide" : ""}`}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) =>
              j === 0 ? (
                <th key={j}>
                  {/* "3ª persona :: maschile" → nhãn chính + nhãn phụ như bảng trong sách */}
                  {c.split("::").map((part, q) => (
                    <span key={q} className={q ? "sub" : ""}>{part.trim()}</span>
                  ))}
                </th>
              ) : (
                <td key={j} className="say" onClick={() => speak(c.trim())}>{c.trim()}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Trang lý thuyết ngữ pháp 2 cột — cú pháp xem kiểu "theory" trong src/types.ts. */
export function Theory({ text, note }: { text: string; note?: L10n }) {
  const lang = useStore((s) => s.lang);
  const showTr = useStore((s) => s.showTranslation);
  const lines = text.split("\n");
  const cols: ReactNode[][] = [[]];
  const top: ReactNode[] = [];
  let col = cols[0];
  let inList = false;
  let k = 0;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      inList = false;
      col.push(<div key={k++} className="th-gap" />);
      continue;
    }
    if (line === "===") {
      col = [];
      cols.push(col);
      inList = false;
      continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim().slice(1).split("|").map((c) => c.replace(/^ (?! )/, "").replace(/\s+$/, "")));
        i++;
      }
      i--;
      col.push(<Table key={k++} rows={rows} />);
      continue;
    }
    if (line === "---") {
      // Phần phía trên chiếm cả chiều ngang trang, phía dưới chia 2 cột.
      top.push(...cols.flat());
      cols.length = 0;
      col = [];
      cols.push(col);
      inList = false;
      continue;
    }
    if (line.startsWith("### ")) col.push(<h5 key={k++} className="th-h3">{inline(line.slice(4))}</h5>);
    else if (line.startsWith("## ")) col.push(<h4 key={k++} className="th-h2">{inline(line.slice(3))}</h4>);
    else if (line.startsWith("^^ ")) col.push(<p key={k++} className="th-center">{inline(line.slice(3))}</p>);
    else if (line.startsWith("• ") || line.startsWith("○ ")) col.push(<Example key={k++} text={line.slice(2)} bullet={line[0]} indent={inList} />);
    else if (line.startsWith("# ")) col.push(<h3 key={k++} className="th-h1">{inline(line.slice(2))}</h3>);
    else if (line.startsWith("! ")) col.push(<p key={k++} className="th-warn">{inline(line.slice(2))}</p>);
    else if (line.startsWith("- ")) {
      inList = true;
      // "- nhãn: | ví dụ" → nhãn thường + ví dụ nghiêng bấm để nghe.
      const [label, ex] = line.slice(2).split(" | ");
      col.push(
        <p key={k++} className="th-li">
          – {inline(label)}
          {ex !== undefined && <> <Example text={ex} as="span" /></>}
        </p>,
      );
    } else if (line.startsWith(">> ")) col.push(<Example key={k++} text={line.slice(3)} indent />);
    else if (line.startsWith("> ")) col.push(<Example key={k++} text={line.slice(2)} indent={inList} />);
    else if (line.startsWith("%% ")) {
      const [a, b] = line.slice(3).split("||").map((s) => s.trim());
      col.push(
        <p key={k++} className={`th-pair ${inList ? "indent" : ""}`}>
          <span className="th-say" onClick={() => speak(plain(a.replace(/^[•○]\s*/, "")))}>{inline(a)}</span>
          <span className="th-say" onClick={() => speak(plain(b.replace(/^[•○]\s*/, "")))}>{inline(b)}</span>
        </p>,
      );
    } else col.push(<p key={k++} className={`th-p ${inList ? "indent" : ""}`}>{inline(line)}</p>);
  }
  return (
    <div className="theory">
      {top.length > 0 && <div className="theory-top">{top}</div>}
      <div className={`theory-cols ${cols.length === 1 ? "single" : ""}`}>
        {cols.map((c, i) => (
          <div key={i} className="theory-col">
            {c}
          </div>
        ))}
      </div>
      {showTr && note && <p className="translation">{tr(lang, note)}</p>}
    </div>
  );
}
