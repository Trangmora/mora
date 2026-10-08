import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 180 (Lessico, bài 19: proverbi ed espressioni). */
const page: BookPage = {
  id: "p180",
  number: 180,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", color: "#d8333a" },
  title: "Lessico · Proverbi ed espressioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p180-ex19", number: "19", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Osserviamo le immagini e parliamo.", subtitle: "PROVERBI", intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:", tr: { vi: "Quan sát tranh và nói. Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các câu tục ngữ này.", en: "Look at the pictures and talk. With the teacher's help, explain the meaning of these proverbs." }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u9/p180-lingua.jpg", alt: "Una donna parla senza sosta e due persone sono sfinite" }, { type: "theory", text: "> ***Ne uccide più la lingua che la spada.***" }],
        [{ type: "photo", src: "images/u9/p180-silenzio.jpg", alt: "Un ragazzo parla, una ragazza chiude le parole in uno scrigno" }, { type: "theory", text: "> ***Il silenzio è d'oro, la parola è d'argento.***" }],
      ],
    },
    {
      type: "exercise",
      ex: { id: "p180-ex19b", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:", subtitle: "ESPRESSIONI", tr: { vi: "Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các thành ngữ này.", en: "With the teacher's help, explain the meaning of these expressions." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u9/p180-lingualunga.jpg", alt: "Un bambino parla, parla, parla: bla bla bla" }], [{ type: "theory", text: "> Filippo **ha la lingua lunga**: parla troppo ed è molto pettegolo!" }]],
    },
    {
      type: "columns",
      widths: [2, 3],
      align: "center",
      cols: [[{ type: "theory", text: "> Basta mamma! **Risparmia il fiato**: non cambio idea!" }], [{ type: "photo", src: "images/u9/p180-fiato.jpg", alt: "Una mamma grida e il figlio si tappa le orecchie" }]],
    },
    {
      type: "exercise",
      ex: {
        id: "p180-ex19c",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "Ne uccide più la lingua che la spada.", sample: "Le parole possono fare più male delle armi." },
          { id: "2", prompt: "Il silenzio è d'oro, la parola è d'argento.", sample: "A volte è meglio stare zitti che parlare." },
          { id: "3", prompt: "Avere la lingua lunga.", sample: "Parlare troppo e raccontare i fatti degli altri." },
          { id: "4", prompt: "Risparmiare il fiato.", sample: "Non sprecare parole, perché è inutile insistere." },
        ],
      },
    },
  ],
};

export default page;
