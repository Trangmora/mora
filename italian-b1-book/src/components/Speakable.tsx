import { useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { t, tr } from "../i18n";
import type { L10n } from "../types";
import { useStore } from "../lib/store";
import { speak } from "../lib/speech";
import { ReadingCoach } from "./ReadingCoach";

/** Câu / đoạn tiếng Ý có nút nghe mẫu + luyện đọc, và bản dịch (khi bật). */
export function Speakable({
  it,
  translation,
  children,
  as: Tag = "div",
  className,
}: {
  it: string;
  translation?: L10n;
  children?: ReactNode;
  as?: "p" | "div" | "span";
  className?: string;
}) {
  const lang = useStore((s) => s.lang);
  const showTr = useStore((s) => s.showTranslation);
  const [coach, setCoach] = useState(false);

  return (
    <Tag className={`speakable ${className ?? ""}`}>
      <span className="it">{children ?? it}</span>
      <span className="sp-tools">
        <button className="mini" title={t(lang, "listen")} onClick={() => speak(it)}><Icon name="volume" size={15} /></button>
        <button className="mini" title={t(lang, "practice")} onClick={() => setCoach((c) => !c)}><Icon name="mic" size={15} /></button>
      </span>
      {showTr && translation && <span className="translation">{tr(lang, translation)}</span>}
      {coach && <ReadingCoach text={it} onClose={() => setCoach(false)} />}
    </Tag>
  );
}
