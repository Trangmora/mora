import { useEffect, useRef, useState } from "react";
import { Book, type BookApi } from "./components/Book";
import { MistakesPanel } from "./components/MistakesPanel";
import { ProgressPanel } from "./components/ProgressPanel";
import { FunLayer } from "./components/Fun";
import { TopMenu } from "./components/TopMenu";
import { checkAI } from "./lib/grading";
import { loadVoices } from "./lib/speech";
import { useStore } from "./lib/store";

export function App() {
  const lang = useStore((s) => s.lang);
  const [aiOnline, setAiOnline] = useState<boolean | null>(null);
  const [mistakesOpen, setMistakesOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const book = useRef<BookApi | null>(null);

  useEffect(() => {
    checkAI().then(setAiOnline);
    loadVoices();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const openPageById = (pageId: string) => book.current?.openPage(pageId);
  const openPageByNumber = (n: number) => book.current?.openNumber(n);

  return (
    <div className="app">
      <TopMenu
        onContents={() => book.current?.goTo(1)}
        onMistakes={() => setMistakesOpen(true)}
        onProgress={() => setProgressOpen(true)}
        onGoToPage={openPageByNumber}
        aiOnline={aiOnline}
      />
      <Book apiRef={book} />
      <FunLayer />
      {progressOpen && <ProgressPanel onClose={() => setProgressOpen(false)} onOpenPage={openPageById} />}
      {mistakesOpen && (
        <MistakesPanel
          onClose={() => setMistakesOpen(false)}
          onOpenPage={(id) => {
            setMistakesOpen(false);
            openPageById(id);
          }}
        />
      )}
    </div>
  );
}
