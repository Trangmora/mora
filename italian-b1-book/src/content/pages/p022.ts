import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 22 (Cominciamo, bài 1). */
const page: BookPage = {
  id: "p022",
  number: 22,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Cominciamo · Ti sei sposato?",
  addedOn: "2026-10-06",
  blocks: [
    {
      type: "unitHeader",
      unit: "2",
      title: "Ieri e oggi in famiglia",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "raccontare avvenimenti nel passato", tr: { vi: "kể lại sự việc trong quá khứ", en: "talk about past events" } },
        { it: "conoscere la realtà della famiglia italiana", tr: { vi: "tìm hiểu thực tế gia đình Ý", en: "learn about the Italian family today" } },
        {
          it: "confrontare le tradizioni della famiglia italiana con quelle di altri paesi",
          tr: { vi: "so sánh truyền thống gia đình Ý với các nước khác", en: "compare Italian family traditions with those of other countries" },
        },
        {
          it: "chiedere e dare informazioni personali per ottenere documenti in un ufficio",
          tr: { vi: "hỏi và cung cấp thông tin cá nhân để làm giấy tờ ở cơ quan", en: "ask for and give personal details to get documents at an office" },
        },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "TI SEI SPOSATO?" },
    {
      type: "exercise",
      ex: {
        id: "p022-ex1a",
        number: "1",
        label: "A",
        icons: ["look", "read"],
        kind: "speak",
        skill: "reading",
        instruction: "Osserviamo e leggiamo.",
        tr: { vi: "Quan sát và đọc.", en: "Let's look and read." },
        items: [],
      },
    },
    {
      type: "photo",
      src: "images/u2/p22-collage.jpg",
      alt: "Una famiglia di inizio Novecento, una famiglia di oggi e quattro titoli di giornale: «Per il matrimonio gli italiani NON risparmiano su abito, villa e rinfresco», «Matrimoni al minimo storico», «Gli italiani di oggi? Meno figli rispetto al passato», «L'Italia oggi è un paese di vecchi»",
    },
    {
      type: "exercise",
      ex: {
        id: "p022-ex1b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        subtitle: "Con l'aiuto delle immagini e dei titoli dei giornali, rispondiamo alle domande.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [
          {
            id: "1",
            prompt: "Come era, secondo voi, la famiglia italiana nel secolo scorso? Quante persone c'erano? Come erano le loro abitudini alimentari? Dove vivevano?",
            sample: "Secondo me la famiglia italiana nel secolo scorso era molto numerosa: c'erano i genitori, tanti figli e spesso anche i nonni. Mangiavano cose semplici, pasta, pane e verdure, e vivevano soprattutto in campagna.",
          },
          { id: "2", prompt: "Com'è oggi la famiglia italiana?", sample: "Oggi la famiglia italiana è piccola: di solito ci sono due genitori e uno o due figli, e molti vivono in città." },
          {
            id: "3",
            prompt: "Perché oggi, secondo voi, in Italia nascono meno bambini?",
            sample: "Secondo me nascono meno bambini perché il lavoro è precario, la vita è cara e le persone si sposano più tardi.",
          },
          {
            id: "4",
            prompt: "Com'è la situazione della famiglia nel vostro paese? Ci sono differenze geografiche e sociali all'interno del vostro paese?",
          },
        ],
      },
    },
  ],
};

export default page;
