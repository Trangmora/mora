import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 8 (Facciamo pratica, bài 10–11). */
const page: BookPage = {
  id: "p008",
  number: 8,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Facciamo pratica · L'Italia all'estero, ieri e oggi",
  addedOn: "2026-10-04",
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica", banner: "L'ITALIA ALL'ESTERO" },
    {
      type: "exercise",
      ex: {
        id: "p008-ex10",
        number: "10",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Nel vostro paese quali sono i luoghi dove lo studio della lingua italiana è più diffuso?" },
          { id: "2", prompt: "Ci sono immigrati italiani?" },
          { id: "3", prompt: "Avete contatti con le comunità italiane o con gli Istituti italiani di cultura nel vostro paese?" },
          { id: "4", prompt: "Avete possibilità di contatto con la cultura italiana (ristoranti, cinema, librerie…)?" },
          { id: "5", prompt: "Nel vostro paese le persone parlano altre lingue? Ci sono molti stranieri?" },
          { id: "6", prompt: "Conoscete un dialetto? In quali occasioni lo usate o lo ascoltate?" },
          {
            id: "7",
            prompt: "Ci sono delle differenze tra la lingua che parlate voi oggi e quella dei vostri nonni? Fate degli esempi di alcune parole.",
          },
        ],
      },
    },
    { type: "banner", text: "IERI E OGGI" },
    {
      type: "exercise",
      ex: {
        id: "p008-ex11a",
        number: "11",
        label: "A",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        title: "Alcune informazioni sull'Italia…",
        instruction: "Leggiamo e abbiniamo le domande alle risposte.",
        tr: { vi: "Đọc và nối câu hỏi với câu trả lời.", en: "Let's read and match the questions to the answers." },
        left: [
          { id: "1", text: "Com'era la situazione in Italia nella seconda metà del 1800?" },
          { id: "2", text: "Dove sono andati gli italiani per cercare fortuna?" },
          { id: "3", text: "È stato difficile per gli italiani vivere all'estero?" },
          { id: "4", text: "L'Italia oggi è diventata terra di immigrazione?" },
          { id: "5", text: "Oggi dove abitano di più gli stranieri in Italia?" },
          { id: "6", text: "In quali settori lavorano di più gli stranieri in Italia?" },
        ],
        right: [
          { id: "a", text: "Vivono soprattutto al Nord (61% circa), poi al Centro (26% circa) e al Sud (13% circa)." },
          { id: "b", text: "Sì, perché sono arrivate molte persone da altri paesi per cercare lavoro." },
          { id: "c", text: "Lavorano soprattutto nelle industrie e nell'agricoltura." },
          { id: "d", text: "Sono andati soprattutto nell'America del Nord e del Sud e in Australia." },
          { id: "e", text: "In quel periodo era difficile trovare lavoro." },
          { id: "f", text: "Sì, perché gli italiani hanno dovuto superare molte difficoltà." },
        ],
        given: { "1": "e" },
        answer: { "1": "e", "2": "d", "3": "f", "4": "b", "5": "a", "6": "c" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p008-ex11b",
        label: "B",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        tr: { vi: "Cùng viết.", en: "Let's write." },
        items: [
          {
            id: "a",
            prompt: "Leggete ancora le informazioni dell'attività precedente e scrivete un testo.",
            starter: "In Italia, nella seconda metà del 1800…",
            lines: 8,
            sample:
              "In Italia, nella seconda metà del 1800 era difficile trovare lavoro, perciò molti italiani sono andati a cercare fortuna soprattutto nell'America del Nord e del Sud e in Australia. Vivere all'estero è stato difficile, perché hanno dovuto superare molte difficoltà. Oggi, invece, l'Italia è diventata terra di immigrazione: sono arrivate molte persone da altri paesi per cercare lavoro. Gli stranieri vivono soprattutto al Nord (61% circa), poi al Centro (26%) e al Sud (13%) e lavorano soprattutto nelle industrie e nell'agricoltura.",
          },
        ],
      },
    },
  ],
};

export default page;
