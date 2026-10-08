import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 128 (Cominciamo, bài 4: canzoni italiane famose). */
const page: BookPage = {
  id: "p128",
  number: 128,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Cominciamo · Canzoni famose",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p128-ex4a",
        number: "4",
        label: "A",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo i testi delle canzoni ai titoli.",
        intro: "Vi proponiamo alcune canzoni italiane molto famose: provate ad abbinare il titolo al testo.",
        tr: { vi: "Đọc và nối lời bài hát với tên bài.", en: "Let's read and match the song lyrics to the titles." },
        left: [
          { id: "1", text: "Claudio Baglioni, Questo piccolo grande amore", image: "images/u7/p128-1.jpg" },
          { id: "2", text: "Antonello Venditti, Ricordati di me", image: "images/u7/p128-2.jpg" },
          { id: "3", text: "Jovanotti, Bella", image: "images/u7/p128-3.jpg" },
          { id: "4", text: "Gino Paoli, Il cielo in una stanza", image: "images/u7/p128-4.jpg" },
          { id: "5", text: "Vasco Rossi, Vita spericolata", image: "images/u7/p128-5.jpg" },
        ],
        right: [
          { id: "a", text: "“Quando sei qui con me, questa stanza non ha più pareti, ma alberi, alberi infiniti, quando tu sei qui vicino a me, questo soffitto viola no, non esiste più…”" },
          { id: "b", text: "“Mi manca da morire questo piccolo grande amore, adesso che saprei cosa dire, adesso che saprei cosa fare, adesso che voglio un piccolo grande amore…”" },
          { id: "c", text: "“Voglio una vita spericolata, voglio una vita come quelle dei film, voglio una vita esagerata, voglio una vita come Steve McQueen. E poi ci troveremo come le star a bere del whisky al Roxy bar…”" },
          { id: "d", text: "“Ricordati di me, questa sera che non hai da fare, e tutta la città è allagata da questo temporale, e non c'è sesso senza amore, nessun rimpianto, nessun dolore…”" },
          { id: "e", text: "“Bella come una mattina di acqua cristallina, come una finestra che mi illumina il cuscino, calda come il pane, ombra sotto un pino, mentre ti allontani e stai con me forever…”" },
        ],
        answer: { "1": "b", "2": "d", "3": "e", "4": "a", "5": "c" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p128-ex4b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        intro: "Adesso trovate delle informazioni su uno di questi cantanti: Claudio Baglioni, Antonello Venditti, Jovanotti, Gino Paoli, Vasco Rossi. Poi presentatele alla classe.",
        tr: { vi: "Cùng nói: tìm thông tin về một trong các ca sĩ này rồi giới thiệu với cả lớp.", en: "Let's talk: find information about one of these singers and present it to the class." },
        items: [{ id: "1", prompt: "Presenta un cantante alla classe.", sample: "Vasco Rossi è nato a Zocca nel 1952. È il rocker italiano più famoso: i suoi concerti riempiono gli stadi. La sua canzone più conosciuta è Vita spericolata." }],
      },
    },
  ],
};

export default page;
