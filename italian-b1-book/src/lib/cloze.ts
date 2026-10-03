import type { ClozeExercise } from "../types";

/**
 * Cú pháp đoạn văn có chỗ trống (bài "completiamo il testo"):
 *   {{presentiamo}}        ô trống, đáp án "presentiamo"
 *   {{gli|loro}}           nhiều đáp án đúng
 *   {{=presentiamo}}       chữ mẫu sách đã điền sẵn (in đỏ nghiêng)
 *   *presentare*           chữ nghiêng (gợi ý động từ)
 *   Dòng bắt đầu bằng "• " hoặc "○ " là lượt thoại.
 */

export type ClozeToken =
  | { t: "text"; s: string }
  | { t: "em"; s: string }
  | { t: "given"; s: string }
  | { t: "blank"; id: string; answers: string[] };

export type ClozeLine = { bullet?: "•" | "○"; tokens: ClozeToken[] };

const RE = /\{\{(=?)([^}]*)\}\}|\*([^*]+)\*/g;

export function parseLine(line: string, next: () => string): ClozeLine {
  let bullet: ClozeLine["bullet"];
  let body = line;
  if (/^[•○] /.test(line)) {
    bullet = line[0] as "•" | "○";
    body = line.slice(2);
  }
  const tokens: ClozeToken[] = [];
  let last = 0;
  for (const m of body.matchAll(RE)) {
    if (m.index! > last) tokens.push({ t: "text", s: body.slice(last, m.index) });
    if (m[3] !== undefined) tokens.push({ t: "em", s: m[3] });
    else if (m[1] === "=") tokens.push({ t: "given", s: m[2] });
    else tokens.push({ t: "blank", id: next(), answers: m[2].split("|") });
    last = m.index! + m[0].length;
  }
  if (last < body.length) tokens.push({ t: "text", s: body.slice(last) });
  return { bullet, tokens };
}

/** Tách bài thành các phần → các dòng → các mảnh; ô trống đánh số b1, b2… theo thứ tự trong bài. */
export function parseCloze(ex: ClozeExercise) {
  let n = 0;
  const next = () => `b${++n}`;
  return ex.parts.map((p) => ({ ...p, lines: p.text.split("\n").map((l) => parseLine(l, next)) }));
}

export function clozeBlanks(ex: ClozeExercise) {
  const out: { id: string; answers: string[]; context: string }[] = [];
  for (const part of parseCloze(ex))
    for (const line of part.lines) {
      line.tokens.forEach((tok, i) => {
        if (tok.t !== "blank") return;
        const before = line.tokens
          .slice(0, i)
          .map((x) => (x.t === "blank" ? "…" : x.s))
          .join("")
          .slice(-50);
        const after = line.tokens
          .slice(i + 1)
          .map((x) => (x.t === "blank" ? "…" : x.s))
          .join("")
          .slice(0, 30);
        out.push({ id: tok.id, answers: tok.answers, context: `${before}___${after}`.trim() });
      });
    }
  return out;
}
