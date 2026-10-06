import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 108 (Cominciamo, bài 4: Simboli italiani). */
const page: BookPage = {
  id: "p108",
  number: 108,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Cominciamo · Simboli italiani",
  runningHead: "Cominciamo",
  banner: "SIMBOLI ITALIANI",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p108-ex4",
        number: "4",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: rispondiamo alle domande.",
        tr: { vi: "Cùng viết: trả lời các câu hỏi.", en: "Let's write: answer the questions." },
        items: [
          { id: "1", prompt: "Qual è il vostro film italiano preferito?", lines: 2, sample: "Il mio film italiano preferito è La vita è bella di Roberto Benigni." },
          { id: "2", prompt: "Qual è l'opera d'arte italiana preferita?", lines: 2, sample: "La mia opera d'arte preferita è la Gioconda di Leonardo da Vinci." },
          { id: "3", prompt: "Quale località sognate di visitare in Italia?", lines: 2, sample: "Sogno di visitare Venezia e l'isola di Capri." },
          { id: "4", prompt: "Quale aspetto vi piace di più della società e della cultura italiana?", lines: 2, sample: "Mi piacciono di più l'eleganza della moda e il design italiano." },
        ],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u6/p108-postino.jpg", alt: "Il manifesto del film Il Postino" }],
        [{ type: "photo", src: "images/u6/p108-dolcevita.jpg", alt: "Il manifesto del film La dolce vita di Federico Fellini" }],
        [{ type: "photo", src: "images/u6/p108-gioconda.jpg", alt: "La Gioconda di Leonardo" }],
        [{ type: "photo", src: "images/u6/p108-pieta.jpg", alt: "La Pietà di Michelangelo" }],
      ],
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u6/p108-venezia.jpg", alt: "Venezia: Piazza San Marco" }],
        [{ type: "photo", src: "images/u6/p108-capri.jpg", alt: "I Faraglioni di Capri" }],
        [{ type: "photo", src: "images/u6/p108-moda.jpg", alt: "Due uomini in abito elegante" }],
        [{ type: "photo", src: "images/u6/p108-design.jpg", alt: "Una lampada di design italiano" }],
      ],
    },
  ],
};

export default page;
