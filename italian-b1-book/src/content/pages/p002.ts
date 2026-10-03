import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 2 (Cominciamo, bài 1–2). */
const page: BookPage = {
  id: "p002",
  number: 2,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Cominciamo · Parliamo, osserviamo",
  addedOn: "2026-10-03",
  blocks: [
    {
      type: "unitHeader",
      unit: "1",
      title: "Entriamo in Italia!",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "presentarci", tr: { vi: "giới thiệu bản thân", en: "introduce ourselves" } },
        { it: "parlare dei nostri interessi", tr: { vi: "nói về sở thích của mình", en: "talk about our interests" } },
        {
          it: "fare una domanda di iscrizione a un corso di lingua",
          tr: { vi: "làm đơn đăng ký một khoá học ngôn ngữ", en: "apply for a language course" },
        },
        {
          it: "conoscere alcuni aspetti della società italiana di ieri e di oggi",
          tr: { vi: "tìm hiểu vài khía cạnh của xã hội Ý xưa và nay", en: "learn about Italian society past and present" },
        },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo" },
    {
      type: "columns",
      widths: [3, 5.3, 1.7],
      cols: [
        [
          {
            type: "exercise",
            ex: {
              id: "p002-ex1",
              number: "1",
              icons: ["speak"],
              kind: "speak",
              skill: "speaking",
              instruction: "Parliamo.",
              tr: { vi: "Chúng ta cùng nói.", en: "Let's talk." },
              items: [
                {
                  id: "a",
                  prompt:
                    "Dite il vostro nome, la vostra età, di dove siete, dove abitate, che cosa studiate o dove lavorate e parlate dei vostri interessi.",
                  sample:
                    "Mi chiamo Linh, ho venticinque anni e sono vietnamita, di Hanoi. Abito a Ho Chi Minh City. Lavoro in un ufficio e studio l'italiano. Mi piacciono la musica, i viaggi e la cucina italiana.",
                },
              ],
            },
          },
        ],
        [{ type: "photo", src: "images/u1/p2-amici.jpg", alt: "Due ragazzi parlano a cena" }],
        [{ type: "sticker", text: "CIAO!", tr: { vi: "Xin chào!", en: "Hi!" } }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p002-ex2",
        number: "2",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo e descriviamo le immagini.",
        tr: { vi: "Quan sát và miêu tả các hình ảnh.", en: "Let's look at and describe the pictures." },
        items: [
          {
            id: "a",
            prompt: "",
            sample:
              "Nella prima foto ci sono degli studenti in un'aula dell'università. Poi c'è la Creazione di Adamo di Michelangelo, nella Cappella Sistina. Sulla cartina dell'Italia ci sono un violino, una modella, una Ferrari e delle ceramiche. A destra ci sono il Campanile di Giotto e la cupola del Duomo di Firenze.",
          },
        ],
      },
    },
    {
      type: "collage",
      height: 60,
      items: [
        {
          src: "images/u1/p2-mappa.png",
          alt: "Cartina dell'Italia con un violino, una modella, una Ferrari e delle ceramiche",
          x: 28.6,
          y: 0,
          w: 49.3,
          caption: { vi: "Bản đồ Ý: đàn violin, thời trang, Ferrari, gốm sứ", en: "Map of Italy: violin, fashion, Ferrari, ceramics" },
        },
        {
          src: "images/u1/p2-aula.jpg",
          alt: "Studenti in un'aula universitaria",
          x: 0.7,
          y: 19,
          w: 28.5,
          caption: { vi: "Sinh viên trong giảng đường", en: "Students in a lecture hall" },
        },
        {
          src: "images/u1/p2-adamo.jpg",
          alt: "La Creazione di Adamo di Michelangelo",
          x: 0.4,
          y: 67,
          w: 34.6,
          caption: { vi: "«Sáng tạo Adam» — Michelangelo, nhà nguyện Sistina", en: "The Creation of Adam — Michelangelo, Sistine Chapel" },
        },
        {
          src: "images/u1/p2-campanile.jpg",
          alt: "Il Campanile di Giotto a Firenze",
          x: 78.9,
          y: 1.1,
          w: 21,
          caption: { vi: "Tháp chuông Giotto, Firenze", en: "Giotto's Bell Tower, Florence" },
        },
        {
          src: "images/u1/p2-duomo.jpg",
          alt: "La cupola del Duomo di Firenze",
          x: 77.4,
          y: 50.5,
          w: 22,
          caption: { vi: "Mái vòm nhà thờ Duomo, Firenze", en: "The Duomo's dome, Florence" },
        },
      ],
    },
  ],
};

export default page;
