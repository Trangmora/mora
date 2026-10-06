import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 119 (Lessico, bài 17: proverbi ed espressioni). */
const page: BookPage = {
  id: "p119",
  number: 119,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", color: "#d8333a" },
  title: "Lessico · Proverbi ed espressioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p119-ex17", number: "17", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Osserviamo le immagini e parliamo.", subtitle: "PROVERBI", intro: "Con l'aiuto dell'insegnante spiegate il significato di questi proverbi:", tr: { vi: "Quan sát tranh và nói. Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các câu tục ngữ này.", en: "Look at the pictures and talk. With the teacher's help, explain the meaning of these proverbs." }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u6/p119-mondo.jpg", alt: "Ragazzi di paesi diversi ascoltano musica" }, { type: "theory", text: "> ***Tutto il mondo è paese.***" }],
        [{ type: "photo", src: "images/u6/p119-bello.jpg", alt: "Due ragazze provano occhiali da sole" }, { type: "theory", text: "> ***Non è bello ciò che è bello, è bello ciò che piace.***" }],
      ],
    },
    {
      type: "exercise",
      ex: { id: "p119-ex17b", icons: ["look", "speak"], kind: "speak", skill: "speaking", instruction: "Con l'aiuto dell'insegnante spiegate il significato di queste espressioni:", subtitle: "ESPRESSIONI", tr: { vi: "Với sự giúp đỡ của giáo viên, hãy giải thích ý nghĩa các thành ngữ này.", en: "With the teacher's help, explain the meaning of these expressions." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [[{ type: "photo", src: "images/u6/p119-gente.jpg", alt: "Tante persone sull'autobus" }], [{ type: "theory", text: "> Marinella, ti piace stare fra la gente: **sei** proprio **un animale sociale**." }]],
    },
    {
      type: "columns",
      widths: [2, 3],
      align: "center",
      cols: [[{ type: "theory", text: "> Matteo, la cultura è importante, devi studiare! Non devi **marinare la scuola**!" }], [{ type: "photo", src: "images/u6/p119-scuola.jpg", alt: "Bambini davanti a una scuola" }]],
    },
    {
      type: "exercise",
      ex: {
        id: "p119-ex17c",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Spieghiamo il significato.",
        tr: { vi: "Giải thích ý nghĩa.", en: "Explain the meaning." },
        items: [
          { id: "1", prompt: "Tutto il mondo è paese.", sample: "Le persone sono uguali dappertutto: in ogni paese ci sono le stesse abitudini e gli stessi problemi." },
          { id: "2", prompt: "Non è bello ciò che è bello, è bello ciò che piace.", sample: "La bellezza dipende dai gusti di ognuno." },
          { id: "3", prompt: "Essere un animale sociale.", sample: "Amare stare in compagnia, con tante persone." },
          { id: "4", prompt: "Marinare la scuola.", sample: "Non andare a scuola senza permesso, di nascosto dai genitori." },
        ],
      },
    },
  ],
};

export default page;
