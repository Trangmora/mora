import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 139 (Lessico, bài 15: proverbi ed espressioni). */
const page: BookPage = {
  id: "p139",
  number: 139,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", color: "#d8333a" },
  title: "Lessico · Proverbi ed espressioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p139-ex15", number: "15", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Osserviamo le immagini e parliamo.", subtitle: "PROVERBI", intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:", tr: { vi: "Quan sát tranh và nói. Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các câu tục ngữ này.", en: "Look at the pictures and talk. With the teacher's help, explain the meaning of these proverbs." }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u7/p139-suonatori.jpg", alt: "Un gruppo di musicisti suona" }, { type: "theory", text: "> ***Cambiano i suonatori, ma la musica è sempre quella.***" }],
        [{ type: "photo", src: "images/u7/p139-galli.jpg", alt: "Tanti galli cantano sotto la luna" }, { type: "theory", text: "> ***Quando ci sono troppi galli che cantano non fa mai giorno.***" }],
      ],
    },
    {
      type: "exercise",
      ex: { id: "p139-ex15b", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:", subtitle: "ESPRESSIONI", tr: { vi: "Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các thành ngữ này.", en: "With the teacher's help, explain the meaning of these expressions." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u7/p139-stonato.jpg", alt: "Giacomo canta male e gli amici si tappano le orecchie" }], [{ type: "theory", text: "> Mamma mia, Giacomo, come canti male: **sei stonato come una campana**!" }]],
    },
    {
      type: "columns",
      widths: [2, 3],
      align: "center",
      cols: [[{ type: "theory", text: "> Sono stanco di questa situazione: **è ora di cambiare musica**!" }], [{ type: "photo", src: "images/u7/p139-ufficio.jpg", alt: "In ufficio un impiegato suona il sassofono" }]],
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u7/p139-parole.jpg", alt: "Due ragazzi parlano felici tra le note musicali" }], [{ type: "theory", text: "> Che bello ricevere queste notizie: **le tue parole sono musica per le mie orecchie**!" }]],
    },
    {
      type: "exercise",
      ex: {
        id: "p139-ex15c",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "Cambiano i suonatori, ma la musica è sempre quella.", sample: "Anche se le persone cambiano, la situazione resta la stessa." },
          { id: "2", prompt: "Quando ci sono troppi galli che cantano non fa mai giorno.", sample: "Quando troppe persone vogliono comandare, non si conclude niente." },
          { id: "3", prompt: "Essere stonato come una campana.", sample: "Cantare molto male, senza seguire le note." },
          { id: "4", prompt: "È ora di cambiare musica.", sample: "È il momento di cambiare situazione o comportamento." },
          { id: "5", prompt: "Le tue parole sono musica per le mie orecchie.", sample: "Quello che dici mi fa molto piacere." },
        ],
      },
    },
  ],
};

export default page;
