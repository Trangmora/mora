import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 56 (Lessico, bài 14–16). */
const page: BookPage = {
  id: "p056",
  number: 56,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", color: "#d8333a" },
  title: "Lessico · Esercizi",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p056-ex14",
        inline: true,
        number: "14",
        icons: ["read", "write"],
        kind: "choice",
        skill: "reading",
        instruction: "Leggiamo e sottolineiamo la parola sbagliata.",
        tr: { vi: "Đọc và gạch chân từ không cùng nhóm.", en: "Let's read and underline the odd word out." },
        items: [
          { id: "1", prompt: "", options: ["libro", "telefono", "biblioteca", "indice"], answer: 1 },
          { id: "2", prompt: "", options: ["pescare", "giocare", "lettore", "viaggiare"], answer: 2 },
          { id: "3", prompt: "", options: ["copertina", "biografia", "recensione", "cavalcare"], answer: 3 },
          { id: "4", prompt: "", options: ["nuoto", "letteratura", "filosofia", "storia"], answer: 0 },
          { id: "5", prompt: "", options: ["stampa", "casa editrice", "ballare", "edizione"], answer: 2 },
          { id: "6", prompt: "", options: ["enciclopedia", "rivista", "pagina", "pescare"], answer: 3 },
          { id: "7", prompt: "", options: ["fare acquisti", "suonare", "dipingere", "capitolo"], answer: 3 },
          { id: "8", prompt: "", options: ["fumetto", "fare fotografie", "fare bricolage", "fare sport"], answer: 0 },
          { id: "9", prompt: "", options: ["autore", "titolo", "brano", "televisione"], answer: 3 },
          { id: "10", prompt: "", options: ["leggere", "passeggiare", "sfogliare", "consultare"], answer: 1 },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p056-ex15",
        number: "15",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con la parola giusta.",
        example: { q: "1. Ho bisogno di fare un po' di sport: dovrei andare in ……", a: "palestra" },
        tr: { vi: "Cùng viết: hoàn thành câu với từ thích hợp.", en: "Let's write: complete the sentences with the right word." },
        items: [
          { id: "2", prompt: "Se ti interessano le storie di personaggi famosi, leggi le loro ___.", answers: ["biografie"] },
          { id: "3", prompt: "Per cercare un argomento nel libro, dobbiamo guardare l'___.", answers: ["indice"] },
          { id: "4", prompt: "Anna è appassionata di racconti misteriosi: leggerebbe sempre i ___.", answers: ["gialli"] },
          { id: "5", prompt: "Se vogliamo aiutare le persone che hanno bisogno, facciamo ___.", answers: ["volontariato"] },
          { id: "6", prompt: "Mi piacciono tanto i cavalli: vado sempre a ___ in campagna il fine settimana.", answers: ["cavalcare"] },
          { id: "7", prompt: "Gli studenti vanno sempre in ___ per avere in prestito i libri.", answers: ["biblioteca"] },
          { id: "8", prompt: "Quali ___ ti raccontava la tua mamma quando eri piccolo?", answers: ["favole|fiabe"] },
          { id: "9", prompt: "Chi scrive un romanzo è un ___.", answers: ["autore|scrittore|romanziere"] },
          { id: "10", prompt: "Se facciamo un viaggio in una nuova località, consultiamo la ___.", answers: ["guida|guida turistica"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p056-ex16",
        number: "16",
        icons: ["read", "check"],
        kind: "truefalse",
        skill: "reading",
        instruction: "Leggiamo: vero o falso?",
        tr: { vi: "Đọc: đúng hay sai?", en: "Let's read: true or false?" },
        items: [
          { id: "1", prompt: "Il capitolo è una parte del libro.", answer: true },
          { id: "2", prompt: "L'introduzione di un libro si trova dopo il secondo capitolo.", answer: false },
          { id: "3", prompt: "Le favole sono libri per bambini.", answer: true },
          { id: "4", prompt: "La casa editrice stampa i libri.", answer: true },
          { id: "5", prompt: "Il paragrafo non è una parte del capitolo.", answer: false },
          { id: "6", prompt: "Il fumetto è una recensione.", answer: false },
          { id: "7", prompt: "Il giallo è un racconto d'amore.", answer: false },
          { id: "8", prompt: "Nella poesia possiamo trovare i versi.", answer: true },
        ],
      },
    },
  ],
};

export default page;
