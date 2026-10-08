import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 132 (Osserviamo bene, bài 8: il superlativo assoluto). */
const page: BookPage = {
  id: "p132",
  number: 132,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Osserviamo bene · Il superlativo assoluto",
  runningHead: "Osserviamo bene",
  banner: "BELLISSIMO!",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p132-ex8a", number: "8", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il superlativo assoluto", tr: { vi: "Cùng đọc: so sánh tuyệt đối.", en: "Let's read: the absolute superlative." }, items: [] },
    },
    {
      type: "theory",
      text: `
> L'ultimo CD di Francesco Guccini è **bellissimo / molto bello**.
> Enrico Caruso era un tenore **famosissimo / molto famoso**.
! ATTENZIONE!
> L'ultimo CD di Francesco Guccini è **particolarmente bello / estremamente bello / veramente bello / davvero bello / proprio bello**.
! ATTENZIONE!
- molto buono/a, buonissimo/a = **ottimo/a**
- molto cattivo/a, cattivissimo/a = **pessimo/a**
- molto grande, grandissimo/a = **massimo/a**
- molto piccolo/a, piccolissimo/a = **minimo/a**
> Ennio Morricone è un **ottimo** musicista.
> Tra questo CD e quello c'è una **minima** differenza di prezzo.
! ATTENZIONE!
- **il massimo** = il più grande · **il minimo** = il più piccolo
> Ha ottenuto **il massimo** risultato con **il minimo** sforzo.
! ATTENZIONE!
- molto bene, benissimo = **ottimamente** · molto male, malissimo = **pessimamente**
> Riccardo Muti ha diretto l'orchestra **ottimamente**.
> Questa sera il tenore ha cantato **pessimamente**.
`.trim(),
    },
    {
      type: "exercise",
      ex: {
        id: "p132-ex8b",
        label: "B",
        icons: ["read", "check"],
        kind: "choice",
        skill: "grammar",
        variant: "twoCol",
        instruction: "Leggiamo e scegliamo la risposta giusta.",
        tr: { vi: "Đọc và chọn câu trả lời đúng.", en: "Let's read and choose the right answer." },
        items: [
          { id: "1", prompt: "Puccini:", options: ["era il più bravissimo.", "era bravissimo.", "era il bravissimo."], answer: 1 },
          { id: "2", prompt: "La musica rap:", options: ["è la migliore di tutte.", "è la più migliore.", "è la più ottima."], answer: 0 },
          { id: "3", prompt: "Pavarotti aveva:", options: ["una voce particolarmente bella.", "una voce più bellissima.", "una voce molto bellissima."], answer: 0 },
          { id: "4", prompt: "Suonare il pianoforte è più difficile:", options: ["che suonare i piatti.", "di suonare i piatti.", "che più suonare i piatti."], answer: 0 },
          { id: "5", prompt: "Madonna canta:", options: ["meglio che me.", "più meglio che me.", "meglio di me."], answer: 2 },
          { id: "6", prompt: "Bizet è meno famoso:", options: ["di Verdi.", "che Verdi.", "del Verdi."], answer: 0 },
          { id: "7", prompt: "L'interpretazione del cantante è stata:", options: ["pessima.", "la più pessima.", "la più peggiore."], answer: 0 },
          { id: "8", prompt: "L'ultimo concerto di Renga:", options: ["è stato più buono di tutti i suoi concerti.", "è stato il più buono di tutti i suoi concerti.", "è stato il migliore di tutti i suoi concerti."], answer: 2 },
          { id: "9", prompt: "Quali sono:", options: ["i cantanti i più interessanti che conosci?", "i cantanti più interessanti che conosci?", "cantanti più interessanti che conosci?"], answer: 1 },
          { id: "10", prompt: "Al concerto della scorsa settimana il tenore ha cantato:", options: ["molto pessimo.", "molto più peggio.", "pessimamente."], answer: 2 },
        ],
      },
    },
  ],
};

export default page;
