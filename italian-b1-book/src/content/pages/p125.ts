import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 125 (Un italiano famoso: Rosario Fiorello). */
const page: BookPage = {
  id: "p125",
  number: 125,
  unit: "6",
  unitTitle: "Cultura e società",
  title: "Un italiano famoso · Rosario Fiorello",
  addedOn: "2026-10-08",
  ribbon: "Un italiano famoso!",
  framed: true,
  sideTab: { unit: "U6", title: "Cultura e società" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p125-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Rosario Fiorello", tr: { vi: "Cùng đọc: Rosario Fiorello.", en: "Let's read: Rosario Fiorello." }, items: [] },
    },
    {
      type: "columns",
      widths: [2, 3],
      cols: [
        [{ type: "photo", src: "images/u6/p125-fiorello.jpg", alt: "Rosario Fiorello sorridente" }],
        [{ type: "text", it: "– Nome: Rosario Fiorello.\n– Nasce a Catania, in Sicilia, il 16 maggio 1960.\n– Chi è? È un conduttore televisivo e uno “showman”. Dopo la scuola comincia a lavorare come animatore nei villaggi turistici. La sua carriera televisiva inizia nel 1989 in trasmissioni musicali: Fiorello ha una bellissima voce ed è capace di imitare vari personaggi del mondo dello spettacolo, della politica, ecc. Inoltre, sa ballare e sa recitare molto bene. Nel 1994 presenta un programma, Superkaraoke, che ha uno straordinario successo in tutta Italia. Nel 2001 conduce da solo un programma su Rai Uno, Stasera pago io, dove mostra tutte le sue qualità artistiche." }],
      ],
    },
    {
      type: "columns",
      widths: [3, 2],
      cols: [
        [{ type: "text", it: "Dal 2002 conduce una trasmissione radiofonica su Radio 2 ogni mattina. Con la sua simpatia e ironia Fiorello ha conquistato tutti gli italiani.\nUna curiosità: nel 2000, in occasione dei premi Oscar, Fiorello è andato a Los Angeles, perché il produttore cinematografico Dino De Laurentiis lo aveva invitato per presentare e animare la festa in onore dei partecipanti alla serata degli Oscar. Fiorello ha avuto un grande successo e, dopo quella serata, ce ne sono state anche altre: il nostro uomo di spettacolo è così diventato famoso anche all'estero." }],
        [{ type: "photo", src: "images/u6/p125-palco.jpg", alt: "Fiorello sul palco con un cappello in mano" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p125-ex3b",
        label: "B",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo le frasi alle immagini.",
        tr: { vi: "Đọc và nối các câu với các bức ảnh.", en: "Let's read and match the sentences to the pictures." },
        left: [
          { id: "1", text: "La locandina di Viva Radio2 con Fiorello e Baldini", image: "images/u6/p125-1.jpg" },
          { id: "2", text: "Fiorello canta con il pubblico in piazza", image: "images/u6/p125-2.jpg" },
          { id: "3", text: "Coriandoli davanti al teatro: “Stasera pago io”", image: "images/u6/p125-3.jpg" },
        ],
        right: [
          { id: "a", text: "Nel 1994 Fiorello presenta il programma televisivo Superkaraoke." },
          { id: "b", text: "Ogni mattina Fiorello conduce una trasmissione radiofonica di successo." },
          { id: "c", text: "Nel 2001 Fiorello presenta il programma televisivo Stasera pago io." },
        ],
        answer: { "1": "b", "2": "a", "3": "c" },
      },
    },
  ],
};

export default page;
