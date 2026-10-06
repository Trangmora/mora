import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 57 (Lessico, bài 17: proverbi ed espressioni). */
const page: BookPage = {
  id: "p057",
  number: 57,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", color: "#d8333a" },
  title: "Lessico · Proverbi ed espressioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p057-ex17",
        number: "17",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo i disegni e parliamo.",
        subtitle: "PROVERBI",
        intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:",
        tr: { vi: "Quan sát tranh và nói. Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa của các câu tục ngữ này.", en: "Look at the drawings and talk. With the teacher's help, explain the meaning of these proverbs." },
        items: [],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u3/p57-studente.jpg", alt: "Uno studente studia tra pile di libri" }, { type: "theory", text: "^^ ***Più si legge più si impara.***" }],
        [{ type: "photo", src: "images/u3/p57-dizionario.jpg", alt: "Un bambino cerca una parola nel dizionario" }, { type: "theory", text: "^^ ***Chi cerca trova.***" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p057-ex17b",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:",
        subtitle: "ESPRESSIONI",
        tr: { vi: "Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa của các thành ngữ này.", en: "With the teacher's help, explain the meaning of these expressions." },
        items: [],
      },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u3/p57-professore.jpg", alt: "Un professore parla in latino a uno studente" }], [{ type: "theory", text: "> Il mio professore **parla come un libro stampato**." }]],
    },
    {
      type: "columns",
      widths: [2, 3],
      align: "center",
      cols: [[{ type: "theory", text: "> Ah! Sei arrivato in ritardo oggi! Sicuramente **sei nel libro nero** del direttore." }], [{ type: "photo", src: "images/u3/p57-libro-nero.jpg", alt: "Un impiegato vola via spaventato da un libro nero" }]],
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u3/p57-pensiero.jpg", alt: "Un ragazzo e Maria si guardano" }], [{ type: "theory", text: "> Maria, come hai fatto a capire? **Leggi** proprio **nel pensiero**." }]],
    },
    {
      type: "exercise",
      ex: {
        id: "p057-ex17c",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "Più si legge più si impara.", sample: "Significa che leggere molto ci fa imparare sempre cose nuove." },
          { id: "2", prompt: "Chi cerca trova.", sample: "Se cerchiamo con impegno una cosa, alla fine la troviamo." },
          { id: "3", prompt: "Parlare come un libro stampato.", sample: "Parlare in modo molto corretto, preciso e un po' difficile." },
          { id: "4", prompt: "Essere nel libro nero di qualcuno.", sample: "Non essere simpatico a qualcuno, avere una cattiva reputazione con lui." },
          { id: "5", prompt: "Leggere nel pensiero.", sample: "Capire che cosa pensa un'altra persona senza che lei lo dica." },
        ],
      },
    },
  ],
};

export default page;
