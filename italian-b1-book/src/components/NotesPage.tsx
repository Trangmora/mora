import { setState, useStore } from "../lib/store";
import { notesQuip } from "../lib/humor";
import { NonnaSays } from "./Nonna";

/** Trang "Appunti" cuối sách: ghi chú riêng của bạn, tự lưu trong trình duyệt. */
export function NotesPage() {
  const lang = useStore((s) => s.lang);
  const notes = useStore((s) => s.notes);
  return (
    <div className="notes-page">
      <h2 className="toc-title">Appunti</h2>
      <p className="toc-sub">{lang === "vi" ? "Ghi chú của tôi" : "My notes"}</p>
      <NonnaSays quip={notesQuip} mood="wink" size={36} />
      <textarea
        className="lined notes-area"
        value={notes}
        onChange={(e) => setState({ notes: e.target.value })}
        placeholder={lang === "vi" ? "Ghi lại từ mới, câu hay, điều cần nhớ…" : "Write new words, useful phrases, things to remember…"}
      />
    </div>
  );
}
