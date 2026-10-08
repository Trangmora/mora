import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 138 (Lessico, bài 12–14). */
const page: BookPage = {
  id: "p138",
  number: 138,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", color: "#d8333a" },
  title: "Lessico · Esercizi",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p138-ex12",
        number: "12",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: troviamo la parola.",
        example: { q: "1. Dobbiamo comprarlo per andare a teatro o per andare a un concerto, ha un costo e bisogna mostrarlo all'ingresso:", a: "***biglietto***" },
        tr: { vi: "Cùng viết: tìm từ đúng với định nghĩa.", en: "Let's write: find the word." },
        items: [
          { id: "2", prompt: "2. È un gruppo di persone: può essere maschile, femminile o misto. C'è un maestro che lo dirige: ___", answers: ["coro|il coro"] },
          { id: "3", prompt: "3. Dirige un gruppo di musicisti, è un esperto di musica e durante i concerti sale sul podio: ___", answers: ["direttore d'orchestra|il direttore d'orchestra|maestro|direttore"] },
          { id: "4", prompt: "4. È importante per i cantanti e per i musicisti: lo devono leggere per suonare e cantare: ___", answers: ["spartito|lo spartito"] },
          { id: "5", prompt: "5. Può essere classica oppure elettrica, è possibile portarla fuori casa per suonarla: ___", answers: ["chitarra|la chitarra"] },
          { id: "6", prompt: "6. Scrive i testi delle sue canzoni e li canta: ___", answers: ["cantautore|il cantautore"] },
          { id: "7", prompt: "7. È il luogo che ospita attori, cantanti e spettacoli vari: ___", answers: ["teatro|il teatro"] },
          { id: "8", prompt: "8. Scrive la musica: ___", answers: ["compositore|il compositore|musicista"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p138-ex13",
        number: "13",
        icons: ["read", "write"],
        kind: "choice",
        inline: true,
        skill: "reading",
        instruction: "Leggiamo e sottolineiamo la parola sbagliata.",
        example: { q: "1. violino / violoncello / pianoforte", a: "***pianoforte***" },
        tr: { vi: "Đọc và gạch chân từ không cùng nhóm.", en: "Let's read and underline the odd word out." },
        items: [
          { id: "2", prompt: "", options: ["cantare", "sussurrare", "gorgheggiare"], answer: 1 },
          { id: "3", prompt: "", options: ["casa", "teatro", "palasport"], answer: 0 },
          { id: "4", prompt: "", options: ["rock", "musica classica", "rap"], answer: 1 },
          { id: "5", prompt: "", options: ["musicista", "professore", "cantautore"], answer: 1 },
          { id: "6", prompt: "", options: ["bacchetta", "flauto", "mandolino"], answer: 0 },
          { id: "7", prompt: "", options: ["coro", "direttore d'orchestra", "discoteca"], answer: 2 },
          { id: "8", prompt: "", options: ["compositore", "vocalizzare", "spartito"], answer: 1 },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p138-ex14",
        number: "14",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: troviamo la parola.",
        example: { q: "1. musicisti + direttore =", a: "***orchestra***" },
        tr: { vi: "Cùng viết: tìm từ.", en: "Let's write: find the word." },
        items: [
          { id: "2", prompt: "2. testo + musica = ___", answers: ["canzone|la canzone"] },
          { id: "3", prompt: "3. cantante + spettatori = ___", answers: ["concerto|il concerto"] },
          { id: "4", prompt: "4. cantanti + strumenti musicali = ___", answers: ["complesso|il complesso|gruppo|band"] },
          { id: "5", prompt: "5. cantanti + direttore = ___", answers: ["coro|il coro"] },
          { id: "6", prompt: "6. foglio + note musicali = ___", answers: ["spartito|lo spartito"] },
        ],
      },
    },
  ],
};

export default page;
