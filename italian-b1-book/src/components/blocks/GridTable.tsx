import type { ReactNode } from "react";
import { speak } from "../../lib/speech";
import { TrIcon } from "../TrIcon";

/** **đỏ đậm**, ^^xanh đậm^^, *nghiêng* trong một ô bảng. */
function marks(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\^\^(.+?)\^\^|\*(.+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<b key={k++} className="gt-red">{m[1]}</b>);
    else if (m[2] !== undefined) out.push(<b key={k++} className="gt-blue">{m[2]}</b>);
    else out.push(<i key={k++}>{m[3]}</i>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const plain = (s: string) => s.replace(/\*\*|\^\^|\*/g, "");

/** Bảng cam của trang ngữ pháp: mỗi dòng trong ô bấm để nghe, có icon dịch. */
export function GridTable({ head, rows, firstCol, split }: { head: string[]; rows: string[][]; firstCol?: boolean; split?: number[] }) {
  return (
    <table className={`grid-table ${firstCol ? "first-col" : ""}`}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i} className={split?.includes(i) ? "split" : ""}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} className={`${split?.includes(j) ? "split" : ""} ${firstCol && j === 0 ? "label" : ""}`}>
                {c.split("\n").map((line, li) =>
                  !line.trim() ? (
                    <span key={li} className="gt-gap" />
                  ) : line.startsWith("- ") ? (
                    <span key={li} className="gt-line gt-use">– {marks(line.slice(2))}</span>
                  ) : (
                    <span key={li} className="gt-line">
                      <span className="th-say" onClick={() => speak(plain(line).replace(/^[•○]\s*/, ""))}>{marks(line)}</span>
                      {!firstCol && line.length > 12 && <> <TrIcon text={plain(line)} /></>}
                    </span>
                  ),
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
