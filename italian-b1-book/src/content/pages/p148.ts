import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 148 (Osserviamo bene, bài 5: il congiuntivo presente). */
const page: BookPage = {
  id: "p148",
  number: 148,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "Osserviamo bene · Il congiuntivo presente",
  runningHead: "Osserviamo bene",
  banner: "PENSO CHE PARTA",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p148-ex5a", number: "5", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il congiuntivo presente", tr: { vi: "Cùng đọc: thức giả định hiện tại.", en: "Let's read: the present subjunctive." }, items: [] },
    },
    { type: "theory", text: "> Credo che Luisa **ami** Giorgio.\n> Mi dispiace che non **vedano** la partita.\n===\n> Vogliamo che **partiate** con noi.\n> Bisogna che **finiscano** subito quel lavoro." },
    { type: "gridTable", firstCol: true, head: ["", "AMARE", "VEDERE", "PARTIRE", "CAPIRE"], rows: [
        ["io", "**ami**", "**veda**", "**parta**", "**capisca**"],
        ["tu", "**ami**", "**veda**", "**parta**", "**capisca**"],
        ["lui / lei / Lei", "**ami**", "**veda**", "**parta**", "**capisca**"],
        ["noi", "**amiamo**", "**vediamo**", "**partiamo**", "**capiamo**"],
        ["voi", "**amiate**", "**vediate**", "**partiate**", "**capiate**"],
        ["loro", "**amino**", "**vedano**", "**partano**", "**capiscano**"],
      ] },
    { type: "theory", text: "! ATTENZIONE!" },
    { type: "gridTable", firstCol: true, head: ["", "AVERE", "ESSERE"], rows: [
        ["io", "**abbia**", "**sia**"], ["tu", "**abbia**", "**sia**"], ["lui / lei / Lei", "**abbia**", "**sia**"],
        ["noi", "**abbiamo**", "**siamo**"], ["voi", "**abbiate**", "**siate**"], ["loro", "**abbiano**", "**siano**"],
      ] },
    {
      type: "exercise",
      ex: {
        id: "p148-ex5b",
        label: "B",
        icons: ["write"],
        kind: "write",
        skill: "grammar",
        instruction: "Scriviamo: trasformiamo le frasi e usiamo i verbi al congiuntivo.",
        example: { q: "Paolo mangia molto. (*Credo che*)", a: "Credo che Paolo ***mangi*** molto." },
        tr: { vi: "Cùng viết: biến đổi câu, dùng động từ ở thức giả định.", en: "Let's write: transform the sentences using the verbs in the subjunctive." },
        items: [
          { id: "1", prompt: "1. Giorgio e Luca sono giornalisti da poco tempo. (Pensiamo che)", lines: 1, sample: "Pensiamo che Giorgio e Luca siano giornalisti da poco tempo." },
          { id: "2", prompt: "2. Michele Serra scrive articoli interessantissimi. (Crediamo che)", lines: 1, sample: "Crediamo che Michele Serra scriva articoli interessantissimi." },
          { id: "3", prompt: "3. Anna dorme a casa di Roberta. (È possibile che)", lines: 1, sample: "È possibile che Anna dorma a casa di Roberta." },
          { id: "4", prompt: "4. Domani non c'è sciopero della stampa. (Molti di noi sperano che)", lines: 1, sample: "Molti di noi sperano che domani non ci sia sciopero della stampa." },
          { id: "5", prompt: "5. Leggete sempre due quotidiani alla settimana. (È bene che)", lines: 1, sample: "È bene che leggiate sempre due quotidiani alla settimana." },
          { id: "6", prompt: "6. I giornalisti lavorano molto tutto il giorno. (Immagino che)", lines: 1, sample: "Immagino che i giornalisti lavorino molto tutto il giorno." },
          { id: "7", prompt: "7. Il caporedattore non ha molte responsabilità. (Dubito che)", lines: 1, sample: "Dubito che il caporedattore non abbia molte responsabilità." },
        ],
      },
    },
  ],
};

export default page;
