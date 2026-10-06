import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 23 (bài 2: I figli). */
const page: BookPage = {
  id: "p023",
  number: 23,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Cominciamo · I figli",
  addedOn: "2026-10-06",
  banner: "I FIGLI",
  runningHead: " ",
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p023-ex2a",
        number: "2",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        tr: { vi: "Cùng đọc.", en: "Let's read." },
        items: [],
      },
    },
    {
      type: "photo",
      src: "images/u2/p23-top.jpg",
      alt: "«I ragazzi di trent'anni? Uno su cinque torna a casa.» «Lavoro precario e spese troppo alte: in Italia i figli “riscoprono mamma e papà”.» «Cambiano i comportamenti dei giovani italiani per le difficoltà economiche.»",
    },
    {
      type: "photo",
      src: "images/u2/p23-tables.jpg",
      alt: "Tabelle: perché i figli lasciano la famiglia, perché i figli tornano a casa, e i figli ancora con i genitori (età 33-37 anni)",
    },
    { type: "tip", it: "(adattato da la Repubblica, 28-04-2005)", tr: { vi: "Nguồn trích", en: "Source" } },
    {
      type: "exercise",
      ex: {
        id: "p023-ex2b",
        label: "B",
        icons: ["listen", "check"],
        kind: "choice",
        skill: "listening",
        instruction: "Ascoltiamo e scegliamo la risposta giusta.",
        tr: { vi: "Nghe và chọn câu trả lời đúng.", en: "Let's listen and choose the right answer." },
        items: [
          {
            id: "1",
            prompt: "Il professor Rosina ha curato un'indagine:",
            options: ["sulle abitudini degli anziani.", "sulle abitudini degli adolescenti.", "sulle abitudini dei giovani trentenni."],
            answer: 2,
          },
          {
            id: "2",
            prompt: "I giovani italiani tornano in famiglia:",
            options: ["per problemi economici.", "perché hanno nostalgia dei genitori.", "perché si sentono soli."],
            answer: 0,
          },
          {
            id: "3",
            prompt: "In passato i giovani lasciavano la casa dei genitori soprattutto perché:",
            options: ["andavano a convivere.", "andavano a studiare fuori.", "si sposavano."],
            answer: 2,
          },
        ],
      },
    },
  ],
};

export default page;
