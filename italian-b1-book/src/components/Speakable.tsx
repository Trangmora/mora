import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useMeasuring } from "../lib/measure";
import { Icon } from "./Icon";
import { t, tr } from "../i18n";
import type { L10n } from "../types";
import { useStore } from "../lib/store";
import { speak } from "../lib/speech";
import { ReadingCoach } from "./ReadingCoach";
import { TrIcon } from "./TrIcon";

/** Câu / đoạn tiếng Ý có nút nghe mẫu + luyện đọc, và bản dịch (khi bật). */
export function Speakable({
  it,
  translation,
  children,
  as: Tag = "div",
  className,
  voice = "f",
}: {
  it: string;
  translation?: L10n;
  children?: ReactNode;
  as?: "p" | "div" | "span";
  className?: string;
  voice?: "f" | "m";
}) {
  const lang = useStore((s) => s.lang);
  const showTr = useStore((s) => s.showTranslation);
  const [coach, setCoach] = useState(false);
  const measuring = useMeasuring();

  return (
    <Tag className={`speakable ${className ?? ""}`}>
      <span className="it">{children ?? it}</span>
      <span className="sp-tools">
        <button className="mini" title={t(lang, "listen")} onClick={() => speak(it, { voice })}><Icon name="volume" size={15} /></button>
        <button className="mini" title={t(lang, "practice")} onClick={() => setCoach((c) => !c)}><Icon name="mic" size={15} /></button>
        {!(showTr && translation) && <TrIcon text={it} tr={translation} />}
      </span>
      {showTr && translation && <span className="translation">{tr(lang, translation)}</span>}
      {coach &&
        !measuring &&
        createPortal(
          <div className="overlay" onClick={() => setCoach(false)}>
            <ReadingCoach text={it} voice={voice} onClose={() => setCoach(false)} />
          </div>,
          document.body,
        )}
    </Tag>
  );
}
