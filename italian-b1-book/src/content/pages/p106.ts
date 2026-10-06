import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 106 (Cominciamo, bài 1: Notizie di attualità). */
const page: BookPage = {
  id: "p106",
  number: 106,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  title: "Cominciamo · Notizie di attualità",
  blocks: [
    {
      type: "unitHeader",
      unit: "6",
      title: "Cultura e società",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "conoscere aspetti attuali della cultura e della società italiana", tr: { vi: "tìm hiểu những nét thời sự của văn hóa và xã hội Ý", en: "learn about current aspects of Italian culture and society" } },
        { it: "esprimere avvenimenti futuri", tr: { vi: "diễn tả các sự việc trong tương lai", en: "talk about future events" } },
        { it: "esprimere ipotesi nel futuro", tr: { vi: "diễn tả giả định trong tương lai", en: "express hypotheses about the future" } },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "NOTIZIE DI ATTUALITÀ" },
    {
      type: "exercise",
      ex: {
        id: "p106-ex1",
        number: "1",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo le frasi alle immagini.",
        tr: { vi: "Đọc và nối các câu với các bức ảnh.", en: "Let's read and match the sentences to the pictures." },
        left: [
          { id: "1", text: "La folla davanti agli Uffizi", image: "images/u6/p106-1.jpg" },
          { id: "2", text: "Studenti all'università", image: "images/u6/p106-2.jpg" },
          { id: "3", text: "Una corsia d'ospedale", image: "images/u6/p106-3.jpg" },
          { id: "4", text: "Uno studio televisivo", image: "images/u6/p106-4.jpg" },
          { id: "5", text: "Un giornalista del telegiornale", image: "images/u6/p106-5.jpg" },
          { id: "6", text: "Due ricercatori in laboratorio", image: "images/u6/p106-6.jpg" },
        ],
        right: [
          { id: "a", text: "Il telegiornale più visto dagli italiani? Il TG1 delle ore 20" },
          { id: "b", text: "In Italia continua il fenomeno della “fuga dei cervelli” all'estero: ancora molti ricercatori vanno fuori per lavorare" },
          { id: "c", text: "Ogni anno migliaia di visitatori agli Uffizi di Firenze" },
          { id: "d", text: "Aumentano gli studenti iscritti alle università, ma rimane basso il numero di laureati in Italia" },
          { id: "e", text: "La trasmissione “Porta a Porta” di Bruno Vespa è il programma che ha il maggior numero di telespettatori in tarda serata" },
          { id: "f", text: "La Sanità in Italia: medici bravi, ma spesso strutture carenti" },
        ],
        answer: { "1": "c", "2": "d", "3": "f", "4": "e", "5": "a", "6": "b" },
      },
    },
  ],
};

export default page;
