import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 157 (Lessico, bài 15–17). */
const page: BookPage = {
  id: "p157",
  number: 157,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", color: "#d8333a" },
  title: "Lessico · Esercizi",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p157-ex15",
        number: "15",
        icons: ["read", "check"],
        kind: "truefalse",
        skill: "reading",
        instruction: "Leggiamo: vero o falso?",
        tr: { vi: "Đọc: đúng hay sai?", en: "Let's read: true or false?" },
        items: [
          { id: "1", prompt: "Il cronista scrive articoli su fatti quotidiani.", answer: true },
          { id: "2", prompt: "L'opinionista dà i consigli su come scrivere un articolo.", answer: false },
          { id: "3", prompt: "Il periodico è un giornale che esce ogni settimana.", answer: false },
          { id: "4", prompt: "La tiratura è il numero di copie di un giornale.", answer: true },
          { id: "5", prompt: "Il corrispondente scrive articoli fuori dalla sede del giornale.", answer: true },
          { id: "6", prompt: "Il redattore è il capo dei disegnatori.", answer: false },
          { id: "7", prompt: "Il sommario comprende i titoli degli articoli più importanti.", answer: true },
          { id: "8", prompt: "Nell'articolo di fondo il giornalista scrive le sue opinioni.", answer: true },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p157-ex16",
        number: "16",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: rispondiamo alle domande.",
        example: { q: "1. Che cos'è la stampa locale?", a: "***La stampa locale è l'insieme dei giornali presenti in una determinata zona del paese.***" },
        tr: { vi: "Cùng viết: trả lời các câu hỏi.", en: "Let's write: answer the questions." },
        items: [
          { id: "2", prompt: "2. Che cosa fa l'inviato?", lines: 1, sample: "L'inviato va nel luogo dove succede un fatto e scrive articoli per il giornale." },
          { id: "3", prompt: "3. Che cos'è un'inchiesta?", lines: 1, sample: "È un articolo che indaga in modo approfondito su un fatto o su un problema." },
          { id: "4", prompt: "4. Che cosa scrive un recensore?", lines: 1, sample: "Il recensore scrive recensioni di libri, film o spettacoli." },
          { id: "5", prompt: "5. Che cos'è un articolo di cronaca rosa?", lines: 1, sample: "È un articolo che parla della vita privata e degli amori dei personaggi famosi." },
          { id: "6", prompt: "6. Che cos'è un articolo di cronaca nera?", lines: 1, sample: "È un articolo che parla di crimini, incidenti e fatti tragici." },
          { id: "7", prompt: "7. Che cosa fa l'editore?", lines: 1, sample: "L'editore pubblica il giornale e ne è il proprietario." },
          { id: "8", prompt: "8. Che cos'è un supplemento?", lines: 1, sample: "È un fascicolo in più che si vende insieme al giornale." },
          { id: "9", prompt: "9. Che cos'è un numero arretrato?", lines: 1, sample: "È un numero di un giornale o di una rivista uscito nei giorni o nei mesi passati." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p157-ex17",
        number: "17",
        icons: ["read", "write"],
        kind: "choice",
        inline: true,
        skill: "reading",
        instruction: "Leggiamo e sottolineiamo la parola sbagliata.",
        example: { q: "1. rivista / quotidiano / redattore", a: "***redattore***" },
        tr: { vi: "Đọc và gạch chân từ không cùng nhóm.", en: "Let's read and underline the odd word out." },
        items: [
          { id: "2", prompt: "", options: ["opinionista", "testata", "tiratura"], answer: 0 },
          { id: "3", prompt: "", options: ["giornalista", "rubrica", "inserzione"], answer: 0 },
          { id: "4", prompt: "", options: ["fotoreporter", "mensile", "inviato"], answer: 1 },
          { id: "5", prompt: "", options: ["redazione", "sala stampa", "vignetta"], answer: 2 },
          { id: "6", prompt: "", options: ["numero", "articolo di fondo", "fascicolo"], answer: 1 },
          { id: "7", prompt: "", options: ["settimanale", "sottotitolo", "periodico"], answer: 1 },
          { id: "8", prompt: "", options: ["trafiletto", "stampa locale", "stampa estera"], answer: 0 },
        ],
      },
    },
  ],
};

export default page;
