import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 146 (Cominciamo, bài 1: Che giornali sono?). */
const page: BookPage = {
  id: "p146",
  number: 146,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  title: "Cominciamo · Che giornali sono?",
  blocks: [
    {
      type: "unitHeader",
      unit: "8",
      title: "Andiamo in edicola!",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "conoscere alcuni aspetti della stampa italiana", tr: { vi: "tìm hiểu một số khía cạnh của báo chí Ý", en: "learn about some aspects of the Italian press" } },
        { it: "conoscere diversi tipi di articoli di giornale", tr: { vi: "biết các loại bài báo khác nhau", en: "learn about different kinds of newspaper articles" } },
        { it: "esprimere opinioni, dubbi, speranze, idee", tr: { vi: "bày tỏ ý kiến, nghi ngờ, hy vọng, ý tưởng", en: "express opinions, doubts, hopes and ideas" } },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "CHE GIORNALI SONO?" },
    { type: "photo", src: "images/u8/p146-edicola.jpg", alt: "Un'edicola piena di giornali e riviste: a. la Repubblica; b. Panorama; c. Il Sole 24 Ore; d. Corriere della Sera" },
    {
      type: "exercise",
      ex: {
        id: "p146-ex1",
        number: "1",
        icons: ["look", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Osserviamo le immagini e abbiniamo i testi ai titoli dei giornali.",
        tr: { vi: "Quan sát hình và nối các đoạn văn với tên các tờ báo.", en: "Let's look at the pictures and match the texts to the newspaper titles." },
        left: [
          { id: "1", text: "È un importante quotidiano italiano e il suo sito web è sicuramente il migliore della stampa italiana." },
          { id: "2", text: "È il primo quotidiano economico e finanziario italiano. La domenica ha un inserto culturale molto interessante." },
          { id: "3", text: "È un settimanale del gruppo Mondadori, nato nel 1966, ed è il primo newsmagazine venduto anche fuori dall'Italia. Le sue copertine un po' “osé” nascondono inchieste e informazioni molto acute e apprezzate." },
          { id: "4", text: "“La vecchia signora”, nata nel 1866 a Milano, è un quotidiano ancora in ottima salute. Il primo quotidiano italiano è sempre serio, rigoroso e neutrale. Appartiene al gruppo RCS, che pubblica anche la famosa Gazzetta dello Sport, e possiede il 45% del capitale del quotidiano spagnolo El Mundo." },
        ],
        right: [
          { id: "a", text: "la Repubblica" },
          { id: "b", text: "Panorama" },
          { id: "c", text: "Il Sole 24 Ore" },
          { id: "d", text: "Corriere della Sera" },
        ],
        answer: { "1": "a", "2": "c", "3": "b", "4": "d" },
      },
    },
  ],
};

export default page;
