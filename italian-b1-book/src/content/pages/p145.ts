import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 145 (Un italiano famoso: Riccardo Muti). */
const page: BookPage = {
  id: "p145",
  number: 145,
  unit: "7",
  unitTitle: "Parole e musica",
  title: "Un italiano famoso · Riccardo Muti",
  addedOn: "2026-10-08",
  ribbon: "Un italiano famoso!",
  framed: true,
  sideTab: { unit: "U7", title: "Parole e musica" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p145-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Riccardo Muti", tr: { vi: "Cùng đọc: Riccardo Muti.", en: "Let's read: Riccardo Muti." }, items: [] },
    },
    { type: "text", it: "– Nome: Riccardo Muti.\n– Nasce a Napoli il 28 luglio 1941.\n– Chi è? È uno dei maggiori direttori d'orchestra contemporanei. Dal 1986 al 2005 è direttore musicale del Teatro alla Scala di Milano. Nel 1967 vince il Premio Cantelli per giovani direttori d'orchestra. Dal 1969 al 1982 è direttore del Maggio Musicale Fiorentino; dal 1973 al 1983 è direttore della Philharmonia Orchestra di Londra; dal 1980 al 1992 è direttore dell'Orchestra di Filadelfia, che porta in diverse tournée internazionali." },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "photo", src: "images/u7/p145-muti.jpg", alt: "Riccardo Muti dirige l'orchestra" }],
        [{ type: "text", it: "Dal 1971 partecipa abitualmente al Festival di Salisburgo, dove dirige opere e concerti ed è particolarmente apprezzato per l'allestimento delle opere di Mozart. Grande interprete di Verdi e di Mozart, Muti è anche noto per le sue esecuzioni operistiche di autori come Pergolesi, Bellini, Rossini e Wagner. Durante il suo periodo alla Scala Muti ha voluto presentare alcune opere di autori meno noti, come la Lodoiska di Luigi Cherubini e La Vestale di Gaspare Spontini." }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p145-ex3b",
        label: "B",
        icons: ["look", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Osserviamo e abbiniamo le immagini ai titoli delle opere che Riccardo Muti ha diretto.",
        tr: { vi: "Quan sát và nối các bức tranh với tên các vở opera mà Riccardo Muti đã chỉ huy.", en: "Look and match the pictures to the titles of the operas Riccardo Muti conducted." },
        left: [
          { id: "1", text: "Toreri e una donna in rosso sul palco", image: "images/u7/p145-1.jpg" },
          { id: "2", text: "Un barbiere e una ragazza sul palco", image: "images/u7/p145-2.jpg" },
          { id: "3", text: "Un guerriero moro tra due uomini", image: "images/u7/p145-3.jpg" },
        ],
        right: [
          { id: "a", text: "Otello." },
          { id: "b", text: "La Carmen." },
          { id: "c", text: "Il barbiere di Siviglia." },
        ],
        answer: { "1": "b", "2": "c", "3": "a" },
      },
    },
  ],
};

export default page;
