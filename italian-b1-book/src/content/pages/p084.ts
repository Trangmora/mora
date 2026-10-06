import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 84 (Viaggiamo in Italia: Chi ha "mangiato" la pasta?). */
const page: BookPage = {
  id: "p084",
  number: 84,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  title: "Viaggiamo in Italia · Chi ha “mangiato” la pasta?",
  addedOn: "2026-10-07",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p084-ex1a", number: "1", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Chi ha “mangiato” la pasta?", tr: { vi: "Cùng đọc: Ai đã “ăn mất” mì ống?", en: "Let's read: Who “ate” the pasta?" }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 3],
      cols: [
        [{ type: "photo", src: "images/u4/p84-pasta.jpg", alt: "Farfalle, penne e rigatoni" }],
        [
          { type: "text", it: "In dieci anni, purtroppo, sono spariti in Italia 250 tipi di pasta: siamo passati da 450 a 200 tipi. Gianni Mondelli, un esperto del settore, ci spiega che la differenza dei formati è il simbolo di una grande varietà culturale: per farsene un'idea basta viaggiare per tutta la penisola. Un napoletano potrebbe stupirvi mentre descrive le differenze fra una “penna liscia” e una “penna rigata”; un pugliese non rinuncerebbe mai alle orecchiette fatte in casa; un genovese vi parlerebbe della bontà delle trofie al pesto; un lombardo della Valtellina vi inviterebbe a gustare i pizzoccheri. Se non avete mai provato questi piatti, non avete ancora capito qual è la differenza fra “mangiare la pasta” e “gustare la tradizione italiana”." },
          { type: "tip", it: "(adattato da il Venerdì di Repubblica, 11-01-2002)", tr: { vi: "Nguồn trích", en: "Source" } },
        ],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p084-ex1b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Sapete quali sono i pastifici più importanti in Italia?", sample: "Sì, conosco Barilla, De Cecco e Garofalo." },
          { id: "2", prompt: "Mangiate spesso la pasta?", sample: "Sì, mangio la pasta due o tre volte alla settimana." },
          { id: "3", prompt: "Qual è il tipo di pasta che vi piace di più?", sample: "Mi piacciono di più le penne rigate con il sugo di pomodoro." },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p084-ex2", number: "2", icons: ["look"], kind: "speak", skill: "speaking", instruction: "Osserviamo le immagini.", tr: { vi: "Quan sát các bức tranh.", en: "Look at the pictures." }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "theory", text: "## Hiroshi invita a cena Antonio…" }, { type: "photo", src: "images/u4/p84-hiroshi.jpg", alt: "Hiroshi: «Ho cucinato tutto il giorno, per te, mio caro Antonio». Sul tavolo ci sono solo tre piccole ciotole." }],
        [{ type: "theory", text: "## Antonio invita a cena Hiroshi…" }, { type: "photo", src: "images/u4/p84-antonio.jpg", alt: "Antonio: «Avrei voluto cucinare di più: comunque devi mangiare tutto!» Hiroshi: «Ma, io…». La tavola è piena di piatti." }],
      ],
    },
    {
      type: "dialogue",
      lines: [
        { speaker: "Hiroshi", it: "Ho cucinato tutto il giorno, per te, mio caro Antonio." },
        { speaker: "Antonio", it: "Avrei voluto cucinare di più: comunque devi mangiare tutto!" },
        { speaker: "Hiroshi", it: "Ma, io…" },
      ],
    },
  ],
};

export default page;
