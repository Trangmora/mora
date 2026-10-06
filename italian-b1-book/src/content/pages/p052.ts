import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 52 (Facciamo pratica, bài 10–11). */
const page: BookPage = {
  id: "p052",
  number: 52,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Facciamo pratica · Che cosa fareste?",
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica" },
    {
      type: "exercise",
      ex: {
        id: "p052-ex10",
        number: "10",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Come trascorrete il tempo libero?", sample: "Nel tempo libero leggo, vado in palestra ed esco con gli amici." },
          { id: "2", prompt: "Che genere di film preferite?", sample: "Preferisco i film gialli e le commedie." },
          { id: "3", prompt: "Quali sono le attività del tempo libero più diffuse nel vostro paese?", sample: "Nel mio paese molte persone guardano la televisione, fanno sport e mangiano fuori con la famiglia." },
          { id: "4", prompt: "Immaginate di dare dei consigli a un italiano che viene nel vostro paese: che cosa potrebbe fare nel tempo libero?", sample: "Potrebbe visitare i mercati, assaggiare il cibo di strada e fare una gita in montagna." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p052-ex11",
        number: "11",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alla domanda.",
        subtitle: "Voi che cosa fareste in queste situazioni?",
        tr: { vi: "Cùng nói: trả lời câu hỏi. Các bạn sẽ làm gì trong những tình huống này?", en: "Let's talk: answer the question. What would you do in these situations?" },
        items: [],
      },
    },
    {
      type: "columns",
      align: "center",
      cols: [
        [
          { type: "photo", src: "images/u3/p52-motorino.jpg", alt: "1. Un motorino passa in una pozzanghera e bagna una signora" },
          { type: "photo", src: "images/u3/p52-cane.jpg", alt: "3. Un cane morde un vigile" },
        ],
        [{ type: "photo", src: "images/u3/p52-sentiero.jpg", alt: "2. Due escursionisti non sanno quale sentiero prendere" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p052-ex11r",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Voi che cosa fareste in queste situazioni?",
        tr: { vi: "Các bạn sẽ làm gì trong những tình huống này?", en: "What would you do in these situations?" },
        items: [
          { id: "1", prompt: "La signora bagnata dal motorino", sample: "Mi arrabbierei moltissimo e chiederei al ragazzo di pagare la lavanderia." },
          { id: "2", prompt: "I due escursionisti al bivio", sample: "Guarderei la cartina oppure chiederei informazioni a qualcuno; forse tornerei indietro." },
          { id: "3", prompt: "Il cane che morde il vigile", sample: "Chiederei scusa al vigile e terrei il cane più vicino a me." },
        ],
      },
    },
  ],
};

export default page;
