import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 187 (Cominciamo, bài 2–3: Feste e celebrazioni). */
const page: BookPage = {
  id: "p187",
  number: 187,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "Cominciamo · Feste e celebrazioni",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p187-ex2",
        number: "2",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Che cosa pensate delle feste tradizionali e popolari?", sample: "Penso che siano importanti perché mantengono vive le tradizioni di un popolo." },
          { id: "2", prompt: "Nel vostro paese ci sono delle feste di questo tipo? Quali?", sample: "Sì, nel mio paese c'è la festa di metà autunno, con le lanterne e i dolci della luna." },
          { id: "3", prompt: "Avete letto dei libri o avete visto dei film dove si racconta qualcosa sulle feste tradizionali italiane?", sample: "Ho visto un film in cui si vedeva il Palio di Siena." },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p187-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Feste e celebrazioni", tr: { vi: "Cùng đọc: Lễ hội và lễ kỷ niệm.", en: "Let's read: Festivals and celebrations." }, items: [] },
    },
    { type: "text", it: "Nell'antichità la festa rappresentava una pausa dal lavoro in onore di una divinità. Le comunità celebravano con speciali riti i giorni festivi, per dividere i periodi dell'anno dedicati al lavoro e i periodi dedicati alle celebrazioni. In origine il calendario delle stagioni e delle attività agricole scandiva le feste più importanti dell'anno. Con il cristianesimo, a poco a poco, le feste cristiane prendono il posto di quelle pagane.\nIn Italia, nel corso dell'anno, si svolge un gran numero di feste, di commemorazioni, di processioni religiose, di fiere e sagre; non esiste paese o città che non abbia la sua festa patronale, alcune di origine antica, altre più recenti. Le celebrazioni più importanti sono quelle legate al calendario della Chiesa, che fin dal II-III secolo dopo Cristo ha fissato le date solenni da ricordare anche nel calendario civile. La Pasqua, per esempio, è una delle feste più antiche; successivamente i cristiani hanno cominciato a celebrare anche l'Epifania e il Natale.\nLa celebrazione della festa è un importante momento di unione della comunità: oggi nelle città italiane si vive spesso divisi per i numerosi impegni della vita quotidiana, ma durante le feste ci si ritrova di solito tutti insieme per celebrare le proprie tradizioni.\n(adattato da www.popolari.arti.beniculturali.it)" },
    {
      type: "exercise",
      ex: {
        id: "p187-ex3b",
        label: "B",
        icons: ["read", "check"],
        kind: "truefalse",
        skill: "reading",
        instruction: "Leggiamo: vero o falso?",
        tr: { vi: "Đọc: đúng hay sai?", en: "Let's read: true or false?" },
        items: [
          { id: "1", prompt: "In origine il calendario delle stagioni scandiva le feste.", answer: true },
          { id: "2", prompt: "In Italia ci sono poche feste religiose.", answer: false },
          { id: "3", prompt: "Il Natale è la festa cristiana più antica.", answer: false },
          { id: "4", prompt: "Le feste rappresentano un momento di unione.", answer: true },
        ],
      },
    },
  ],
};

export default page;
