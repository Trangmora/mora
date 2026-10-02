import type { Block, BookPage } from "../types";

/**
 * Danh sách mọi câu tiếng Ý có nút nghe trong sách, để tạo giọng đọc MỘT LẦN (npm run voices).
 * Phải khớp đúng những gì giao diện gửi vào speak().
 */

export type Voice = "f" | "m";

export const cleanText = (s: string) => s.replace(/\s+/g, " ").trim();
export const voiceKey = (text: string, voice: Voice) => `${voice}|${cleanText(text)}`;

/** Tách lời bài nghe thành từng câu, nhận diện "Tên: câu". */
export function parseTranscript(transcript: string) {
  return transcript
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const m = l.match(/^([A-ZÀ-Ý][\p{L} .']{0,24}):\s*(.+)$/u);
      return m ? { speaker: m[1], text: m[2] } : { speaker: "", text: l };
    });
}

/** Giọng theo người nói: người thứ 1 giọng nữ, người thứ 2 giọng nam, xen kẽ. */
export function speakerVoices(speakers: string[]): (speaker: string) => Voice {
  const order = [...new Set(speakers.filter(Boolean))];
  return (sp) => (order.indexOf(sp) % 2 === 1 ? "m" : "f");
}

export const splitParagraphs = (it: string) => it.split(/\n\s*\n/);

function fromBlock(b: Block): { text: string; voice: Voice }[] {
  const f = (text: string) => ({ text, voice: "f" as Voice });
  switch (b.type) {
    case "text":
      return splitParagraphs(b.it).map(f);
    case "dialogue": {
      const v = speakerVoices(b.lines.map((l) => l.speaker));
      return b.lines.map((l) => ({ text: l.it, voice: v(l.speaker) }));
    }
    case "vocab":
      return b.items.map((i) => f(i.it));
    case "grammar":
      return [
        ...(b.table?.rows.flatMap((r) => r.slice(1)) ?? []).map(f),
        ...(b.examples ?? []).map((e) => f(e.it)),
      ];
    case "audio": {
      if (b.src || !b.transcript) return [];
      const lines = parseTranscript(b.transcript);
      const v = speakerVoices(lines.map((l) => l.speaker));
      return lines.map((l) => ({ text: l.text, voice: v(l.speaker) }));
    }
    case "exercise": {
      const ex = b.ex;
      if (ex.kind === "write" || ex.kind === "speak") return ex.items.flatMap((i) => (i.sample ? [f(i.sample)] : []));
      return [];
    }
    default:
      return [];
  }
}

export function collectSpeech(pages: BookPage[]) {
  const seen = new Map<string, { text: string; voice: Voice }>();
  for (const p of pages)
    for (const b of p.blocks)
      for (const s of fromBlock(b)) {
        const text = cleanText(s.text);
        if (text) seen.set(voiceKey(text, s.voice), { text, voice: s.voice });
      }
  return [...seen.values()];
}
