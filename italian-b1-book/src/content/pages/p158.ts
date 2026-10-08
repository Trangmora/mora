import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 158 (Lessico, bài 18: proverbi ed espressioni). */
const page: BookPage = {
  id: "p158",
  number: 158,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", color: "#d8333a" },
  title: "Lessico · Proverbi ed espressioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p158-ex18", number: "18", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Osserviamo le immagini e parliamo.", subtitle: "PROVERBI", intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:", tr: { vi: "Quan sát tranh và nói. Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các câu tục ngữ này.", en: "Look at the pictures and talk. With the teacher's help, explain the meaning of these proverbs." }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u8/p158-nuove.jpg", alt: "Un ragazzo legge un giornale con le pagine vuote" }, { type: "theory", text: "> ***Niente nuove, buone nuove.***" }],
        [{ type: "photo", src: "images/u8/p158-dente.jpg", alt: "Un ragazzo con il mal di denti grida «ouch!»" }, { type: "theory", text: "> ***La lingua batte dove il dente duole.***" }],
      ],
    },
    {
      type: "exercise",
      ex: { id: "p158-ex18b", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:", subtitle: "ESPRESSIONI", tr: { vi: "Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các thành ngữ này.", en: "With the teacher's help, explain the meaning of these expressions." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u8/p158-notizia.jpg", alt: "Due persone guardano molti televisori in una vetrina che trasmettono la stessa notizia" }], [{ type: "theory", text: "> Quell'avvenimento **ha fatto notizia**, tutti ne parlano." }]],
    },
    {
      type: "columns",
      widths: [2, 3],
      align: "center",
      cols: [[{ type: "theory", text: "> Al telegiornale hanno dato **una notizia lampo** sulle ultime elezioni politiche; per saperne di più, dobbiamo comprare il giornale domani." }], [{ type: "photo", src: "images/u8/p158-lampo.jpg", alt: "Un giornalista in studio colpito da un fulmine: «notizia lampo!»" }]],
    },
    {
      type: "exercise",
      ex: {
        id: "p158-ex18c",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "Niente nuove, buone nuove.", sample: "Se non arrivano notizie, vuol dire che non è successo niente di male." },
          { id: "2", prompt: "La lingua batte dove il dente duole.", sample: "Si torna sempre a parlare del problema che ci preoccupa di più." },
          { id: "3", prompt: "Fare notizia.", sample: "Essere un fatto così importante o strano che tutti ne parlano." },
          { id: "4", prompt: "Una notizia lampo.", sample: "Una notizia breve e improvvisa, data in pochi secondi." },
        ],
      },
    },
  ],
};

export default page;
