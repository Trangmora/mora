import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 186 (Cominciamo, bài 1: Quante feste!). */
const page: BookPage = {
  id: "p186",
  number: 186,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  title: "Cominciamo · Quante feste!",
  blocks: [
    {
      type: "unitHeader",
      unit: "10",
      title: "Tradizioni popolari",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "conoscere aspetti storici e culturali di alcune feste italiane", tr: { vi: "tìm hiểu khía cạnh lịch sử và văn hóa của một số lễ hội Ý", en: "learn about historical and cultural aspects of some Italian festivals" } },
        { it: "conoscere alcune tradizioni popolari e religiose", tr: { vi: "tìm hiểu một số truyền thống dân gian và tôn giáo", en: "learn about some folk and religious traditions" } },
        { it: "raccontare fatti e avvenimenti", tr: { vi: "kể lại sự việc và sự kiện", en: "tell about facts and events" } },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "QUANTE FESTE!" },
    { type: "photo", src: "images/u10/p186-feste.jpg", alt: "1. La festa di Sant'Agata a Catania; 2. La corsa dei Ceri; 3. Il Carnevale di Venezia; 4. Scene della Via Crucis nel Colosseo; 5. Il Palio di Siena" },
    {
      type: "exercise",
      ex: {
        id: "p186-ex1",
        number: "1",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo i testi alle immagini.",
        tr: { vi: "Đọc và nối các đoạn văn với các bức ảnh.", en: "Let's read and match the texts to the pictures." },
        left: [
          { id: "1", text: "La festa di Sant'Agata a Catania" },
          { id: "2", text: "La corsa dei Ceri" },
          { id: "3", text: "Il Carnevale di Venezia" },
          { id: "4", text: "Scene della Via Crucis nel Colosseo" },
          { id: "5", text: "Il Palio di Siena" },
        ],
        right: [
          { id: "a", text: "È una grande manifestazione di festa, si svolge nelle strade di una meravigliosa città italiana: molte persone indossano costumi e maschere splendide." },
          { id: "b", text: "È una corsa di cavalli, in una città toscana, con una tradizione molto antica che risale al Medioevo: il luogo dove avviene questa corsa è la meravigliosa Piazza del Campo." },
          { id: "c", text: "Ogni anno, il Venerdì prima di Pasqua, il Papa fa una celebrazione in ricordo della Passione di Gesù Cristo." },
          { id: "d", text: "È una festa religiosa, antichissima, in onore di una santa di Catania: tutto il popolo della città partecipa con commozione a questo evento." },
          { id: "e", text: "È una corsa che si svolge in Umbria: le persone devono correre per le vie della città, con un grande cero che portano nella chiesa di Sant'Ubaldo." },
        ],
        answer: { "1": "d", "2": "e", "3": "a", "4": "c", "5": "b" },
      },
    },
  ],
};

export default page;
