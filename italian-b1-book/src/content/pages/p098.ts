import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 98 (Lessico, bài 19: proverbi ed espressioni). */
const page: BookPage = {
  id: "p098",
  number: 98,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", color: "#d8333a" },
  title: "Lessico · Proverbi ed espressioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p098-ex19", number: "19", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Osserviamo le immagini e parliamo.", subtitle: "PROVERBI", intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:", tr: { vi: "Quan sát tranh và nói. Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các câu tục ngữ này.", en: "Look at the pictures and talk. With the teacher's help, explain the meaning of these proverbs." }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u5/p98-ozio.jpg", alt: "Un ragazzo pigro sul divano" }, { type: "theory", text: "> ***L'ozio è il padre di tutti i vizi.***" }],
        [{ type: "photo", src: "images/u5/p98-soli.jpg", alt: "Pinocchio con il Gatto e la Volpe" }, { type: "theory", text: "> ***Meglio soli che male accompagnati.***" }],
      ],
    },
    {
      type: "exercise",
      ex: { id: "p098-ex19b", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:", subtitle: "ESPRESSIONI", tr: { vi: "Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các thành ngữ này.", en: "With the teacher's help, explain the meaning of these expressions." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u5/p98-bastone.jpg", alt: "Un padre con un bastone e una carota" }], [{ type: "theory", text: "> Caro Giulio, fai bene con i tuoi figli a **usare il bastone e la carota**." }]],
    },
    {
      type: "columns",
      widths: [2, 3],
      align: "center",
      cols: [[{ type: "theory", text: "> Edoardo è veramente una persona gentile: è proprio **un signore**!" }], [{ type: "photo", src: "images/u5/p98-signore.jpg", alt: "Un ragazzo apre la porta a una ragazza" }]],
    },
    {
      type: "exercise",
      ex: {
        id: "p098-ex19c",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "L'ozio è il padre di tutti i vizi.", sample: "Chi non fa niente tutto il giorno prende facilmente cattive abitudini." },
          { id: "2", prompt: "Meglio soli che male accompagnati.", sample: "È meglio stare da soli che con persone che ci danneggiano." },
          { id: "3", prompt: "Usare il bastone e la carota.", sample: "Alternare la severità e la gentilezza, le punizioni e i premi." },
          { id: "4", prompt: "Essere un signore.", sample: "Essere una persona molto educata e gentile." },
        ],
      },
    },
  ],
};

export default page;
