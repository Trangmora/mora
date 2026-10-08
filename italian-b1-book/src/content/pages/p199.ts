import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 199 (Lessico, bài 16: proverbi ed espressioni). */
const page: BookPage = {
  id: "p199",
  number: 199,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", color: "#d8333a" },
  title: "Lessico · Proverbi ed espressioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p199-ex16", number: "16", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Osserviamo le immagini e parliamo.", subtitle: "PROVERBI", intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:", tr: { vi: "Quan sát tranh và nói. Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các câu tục ngữ này.", en: "Look at the pictures and talk. With the teacher's help, explain the meaning of these proverbs." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u10/p199-carnevale.jpg", alt: "Maschere di Carnevale che si fanno scherzi" }], [{ type: "theory", text: "> ***A Carnevale ogni scherzo vale.***" }]],
    },
    { type: "photo", src: "images/u10/p199-natale.jpg", alt: "Una famiglia a tavola a Natale; persone in vacanza al mare, sulla neve e in città a Pasqua" },
    { type: "theory", text: "> ***Natale con i tuoi, Pasqua con chi vuoi.***" },
    {
      type: "exercise",
      ex: { id: "p199-ex16b", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:", subtitle: "ESPRESSIONI", tr: { vi: "Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các thành ngữ này.", en: "With the teacher's help, explain the meaning of these expressions." }, items: [] },
    },
    {
      type: "columns",
      widths: [2, 3],
      cols: [
        [{ type: "photo", src: "images/u10/p199-elegante.jpg", alt: "Carlo in giacca e cravatta" }, { type: "theory", text: "> Come sei elegante Carlo: oggi **sei vestito a festa**!" }],
        [{ type: "photo", src: "images/u10/p199-arrabbiato.jpg", alt: "Un padre arrabbiato entra nella camera del figlio" }, { type: "theory", text: "> Sono proprio arrabbiato con mio figlio: adesso **gli faccio la festa**!" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p199-ex16c",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "A Carnevale ogni scherzo vale.", sample: "A Carnevale si possono fare tutti gli scherzi e nessuno si deve offendere." },
          { id: "2", prompt: "Natale con i tuoi, Pasqua con chi vuoi.", sample: "Natale si passa in famiglia, a Pasqua invece si può stare con chi si vuole." },
          { id: "3", prompt: "Essere vestito a festa.", sample: "Essere vestito in modo molto elegante." },
          { id: "4", prompt: "Fare la festa a qualcuno.", sample: "Punire o sgridare qualcuno molto duramente." },
        ],
      },
    },
  ],
};

export default page;
