import { useEffect, useMemo, useRef, useState } from "react";
import { Book, buildLeaves } from "./components/Book";
import { MistakesPanel } from "./components/MistakesPanel";
import { TopMenu } from "./components/TopMenu";
import { checkAI } from "./lib/grading";
import { useStore } from "./lib/store";

export function App() {
  const lang = useStore((s) => s.lang);
  const [aiOnline, setAiOnline] = useState<boolean | null>(null);
  const [mistakesOpen, setMistakesOpen] = useState(false);
  const goTo = useRef<(leafIndex: number) => void>(() => {});
  const leaves = useMemo(buildLeaves, []);

  useEffect(() => {
    checkAI().then(setAiOnline);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const openPageById = (pageId: string) => {
    const i = leaves.findIndex((l) => l.kind === "content" && l.page.id === pageId);
    if (i >= 0) goTo.current(i);
  };

  const openPageByNumber = (n: number) => {
    // Trang có số gần nhất ≤ n
    let best = -1;
    leaves.forEach((l, i) => {
      if (l.kind === "content" && l.page.number <= n) best = i;
    });
    if (best >= 0) goTo.current(best);
  };

  return (
    <div className="app">
      <TopMenu
        onContents={() => goTo.current(1)}
        onMistakes={() => setMistakesOpen(true)}
        onGoToPage={openPageByNumber}
        aiOnline={aiOnline}
      />
      <Book goToRef={goTo} />
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
