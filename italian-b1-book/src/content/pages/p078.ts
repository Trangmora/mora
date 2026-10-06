import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 78 (Lessico, bài 18: proverbi ed espressioni). */
const page: BookPage = {
  id: "p078",
  number: 78,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", color: "#d8333a" },
  title: "Lessico · Proverbi ed espressioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p078-ex18",
        number: "18",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo i disegni e parliamo.",
        subtitle: "PROVERBI",
        intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:",
        tr: { vi: "Quan sát tranh và nói. Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các câu tục ngữ này.", en: "Look at the drawings and talk. With the teacher's help, explain the meaning of these proverbs." },
        items: [],
      },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u4/p78-gallina.jpg", alt: "Un ragazzo con un uovo davanti a una gallina" }], [{ type: "theory", text: "> ***Meglio un uovo oggi che una gallina domani.***" }]],
    },
    {
      type: "columns",
      widths: [2, 3],
      align: "center",
      cols: [[{ type: "theory", text: "> ***Mangia questa minestra o salta dalla finestra!***" }], [{ type: "photo", src: "images/u4/p78-finestra.jpg", alt: "Un ragazzo salta dalla finestra davanti a un piatto di minestra" }]],
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u4/p78-diavolo.jpg", alt: "Il diavolo fabbrica pentole senza coperchi" }], [{ type: "theory", text: "> ***Il diavolo fa le pentole ma non i coperchi.***" }]],
    },
    {
      type: "exercise",
      ex: {
        id: "p078-ex18b",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:",
        subtitle: "ESPRESSIONI",
        tr: { vi: "Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các thành ngữ này.", en: "With the teacher's help, explain the meaning of these expressions." },
        items: [],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u4/p78-carne.jpg", alt: "Giovanna in un vestito rosso" }, { type: "theory", text: "> Giovanna, come stai bene! **Sei** veramente **in carne**!" }],
        [{ type: "photo", src: "images/u4/p78-pane.jpg", alt: "Luca dentro una pagnotta" }, { type: "theory", text: "> Luca è **buono come il pane**." }],
        [{ type: "photo", src: "images/u4/p78-gola.jpg", alt: "Una donna tira un uomo con una collana di salsicce" }, { type: "theory", text: "> Tua moglie è brava in cucina: **ti prende per la gola**!" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p078-ex18c",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "Meglio un uovo oggi che una gallina domani.", sample: "È meglio avere una cosa piccola ma sicura subito che una cosa grande ma incerta in futuro." },
          { id: "2", prompt: "Mangia questa minestra o salta dalla finestra!", sample: "Non ci sono altre possibilità: devi accettare quello che c'è." },
          { id: "3", prompt: "Il diavolo fa le pentole ma non i coperchi.", sample: "Le bugie e gli imbrogli prima o poi vengono scoperti." },
          { id: "4", prompt: "Essere in carne.", sample: "Essere un po' robusti, non magri, in buona salute." },
          { id: "5", prompt: "Essere buono come il pane.", sample: "Essere una persona molto buona e gentile." },
          { id: "6", prompt: "Prendere qualcuno per la gola.", sample: "Conquistare qualcuno con il buon cibo." },
        ],
      },
    },
  ],
};

export default page;
