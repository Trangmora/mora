import type { BookPage } from "../../types";

/** Unità 1 · Piacere, sono io! — trang 2 (Si parte!, bài 3–5). Nội dung tự soạn. */
const page: BookPage = {
  id: "p002",
  number: 2,
  unit: "1",
  unitTitle: "Piacere, sono io!",
  addedOn: "2026-10-10",
  sideTab: { unit: "U1", title: "Piacere, sono io!" },
  title: "Si parte! · La scheda di iscrizione",
  runningHead: "Si parte!",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p002-ex3",
        number: "3",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Abbiniamo le domande alle risposte di Tomás.",
        tr: { vi: "Nối các câu hỏi với câu trả lời của Tomás.", en: "Let's match the questions to Tomás's answers." },
        left: [
          { id: "1", text: "Come ti chiami?" },
          { id: "2", text: "Quanti anni hai?" },
          { id: "3", text: "Che lavoro fai?" },
          { id: "4", text: "Perché studi l'italiano?" },
          { id: "5", text: "Che cosa fai nel tempo libero?" },
        ],
        right: [
          { id: "a", text: "Faccio il cuoco." },
          { id: "b", text: "Gioco a calcetto e guardo vecchi film." },
          { id: "c", text: "Tomás Herrera." },
          { id: "d", text: "Ne ho ventotto." },
          { id: "e", text: "Perché voglio lavorare in un ristorante italiano." },
        ],
        given: { "1": "c" },
        answer: { "1": "c", "2": "d", "3": "a", "4": "e", "5": "b" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p002-ex4",
        number: "4",
        icons: ["write"],
        kind: "form",
        skill: "writing",
        formStyle: "corso",
        formTitle: "SCUOLA “PAROLA VIVA” · BOLOGNA",
        formSubtitle: "SCHEDA DI ISCRIZIONE",
        instruction: "Scriviamo: compiliamo la scheda con i nostri dati.",
        tr: { vi: "Cùng viết: điền phiếu với thông tin của bạn.", en: "Let's write: fill in the form with our details." },
        items: [
          { id: "nome", label: "Nome e cognome:", col: 1 },
          { id: "nascita", label: "Nato/a a … il …:", col: 1 },
          { id: "naz", label: "Paese di provenienza:", col: 1 },
          { id: "lavoro", label: "Studio / lavoro:", col: 1 },
          { id: "lingue", label: "Lingue che parlo:", col: 1 },
          { id: "q1", label: "Da quanto tempo studi l'italiano?", col: 2, section: "Due parole su di te", sectionNote: "Rispondi con una o due frasi:" },
          { id: "q2", label: "Che cosa vuoi migliorare di più? (parlare, ascoltare, scrivere, leggere…)", col: 2, lines: 2 },
          { id: "q3", label: "Una cosa dell'Italia che ami e una che non capisci ancora:", col: 2, lines: 2 },
          { id: "corso", label: "Corso scelto:", col: "foot", options: ["mattina", "pomeriggio", "sera"], optionCols: 3 },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p002-ex5",
        number: "5",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Completiamo con i verbi chiamarsi, essere, avere, fare al presente.",
        example: { q: "1. Io (chiamarsi) ___ Hoa.", a: "Io ***mi chiamo*** Hoa." },
        tr: { vi: "Hoàn thành câu với các động từ chiamarsi, essere, avere, fare ở thì hiện tại.", en: "Let's complete with the verbs chiamarsi, essere, avere, fare in the present." },
        items: [
          { id: "2", prompt: "2. Tomás (essere) ___ argentino e (fare) ___ il cuoco.", answers: ["è", "fa"] },
          { id: "3", prompt: "3. Noi (avere) ___ lezione tutte le mattine alle nove.", answers: ["abbiamo"] },
          { id: "4", prompt: "4. Come (chiamarsi) ___ la vostra insegnante?", answers: ["si chiama"] },
          { id: "5", prompt: "5. Voi di dove (essere) ___?", answers: ["siete"] },
          { id: "6", prompt: "6. Hoa e Tomás (avere) ___ quasi la stessa età.", answers: ["hanno"] },
        ],
      },
    },
    { type: "theory", text: "! ATTENZIONE!\n- Con un amico: | **Ciao, come ti chiami?** — **Di dove sei?**\n- Con una persona che non conosciamo: | **Buongiorno, come si chiama?** — **Di dov'è?**" },
  ],
};

export default page;
