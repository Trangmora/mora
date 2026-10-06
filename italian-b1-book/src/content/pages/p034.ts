import type { BookPage } from "../../types";

const pic = (src: string, alt: string, caption: string) => [
  { type: "image" as const, src: `images/u2/${src}`, alt },
  { type: "theory" as const, text: `^^ ***${caption}***` },
];

/** Unità 2 · Ieri e oggi in famiglia — trang 34 (Lessico, bài 15: proverbi ed espressioni). */
const page: BookPage = {
  id: "p034",
  number: 34,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Lessico · Proverbi ed espressioni",
  addedOn: "2026-10-06",
  runningHead: "Lessico",
  sideTab: { unit: "U2", color: "#d8333a" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p034-ex15",
        number: "15",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo i disegni e parliamo.",
        subtitle: "Proverbi",
        intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:",
        tr: { vi: "Quan sát tranh và nói.", en: "Let's look at the drawings and talk." },
        items: [],
      },
    },
    {
      type: "columns",
      cols: [pic("p34-buoi.svg", "Un contadino con la moglie e un bue", "Moglie e buoi dei paesi tuoi."), pic("p34-panni.svg", "Una famiglia lava i panni al fiume", "I panni sporchi si lavano in famiglia.")],
    },
    { type: "theory", text: "^^ ***Espressioni***\n^^ Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:" },
    {
      type: "columns",
      cols: [pic("p34-nozze.svg", "Un matrimonio in chiesa", "Gianni ha deciso di mettere su famiglia."), pic("p34-persona.svg", "Una grande famiglia con Clara", "Clara, tu per me sei una persona di famiglia.")],
    },
    {
      type: "exercise",
      ex: {
        id: "p034-ex15q",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "Moglie e buoi dei paesi tuoi.", sample: "È meglio sposarsi con una persona del proprio paese, che ha le stesse abitudini e tradizioni." },
          { id: "2", prompt: "I panni sporchi si lavano in famiglia.", sample: "I problemi della famiglia si risolvono in famiglia, senza parlarne con gli altri." },
          { id: "3", prompt: "Gianni ha deciso di mettere su famiglia.", sample: "Gianni ha deciso di sposarsi e di avere dei figli." },
          { id: "4", prompt: "Clara, tu per me sei una persona di famiglia.", sample: "Clara non è una parente, ma è come una di famiglia: una persona molto cara e di fiducia." },
        ],
      },
    },
  ],
};

export default page;
