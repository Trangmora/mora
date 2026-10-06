import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 105 (Un'italiana famosa: Emma Bonino). */
const page: BookPage = {
  id: "p105",
  number: 105,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  title: "Un'italiana famosa · Emma Bonino",
  addedOn: "2026-10-07",
  ribbon: "Un'italiana famosa!",
  framed: true,
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p105-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Emma Bonino", tr: { vi: "Cùng đọc: Emma Bonino.", en: "Let's read: Emma Bonino." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 1],
      cols: [
        [{ type: "text", it: "– Nome: Emma Bonino.\n– Nasce a Bra (Cuneo) il 9 marzo 1948.\n– Chi è? È una donna politica. Emma Bonino entra in politica nel 1975 e diventa subito uno dei protagonisti della campagna per la legalizzazione dell'aborto. Nell'anno successivo, a soli 28 anni, si presenta per la prima volta alle elezioni politiche e comincia la sua carriera politica nelle fila del Partito Radicale. Nel 1979 diventa parlamentare europeo. Tra il 1980 e il 1981, oltre a promuovere diverse campagne per i referendum e per i diritti civili nell'Europa dell'Est, comincia a lavorare per l'istituzione di una corte penale internazionale." }],
        [{ type: "photo", src: "images/u5/p105-ritratto.jpg", alt: "Ritratto di Emma Bonino" }],
      ],
    },
    {
      type: "columns",
      widths: [1, 2],
      cols: [
        [{ type: "photo", src: "images/u5/p105-arancio.jpg", alt: "Emma Bonino davanti a un manifesto arancione" }],
        [{ type: "text", it: "Nel maggio 1991 partecipa a una campagna internazionale contro la diffusione delle mine antiuomo. Nel 1993 è tra i fondatori di Non c'è Pace Senza Giustizia, un'associazione internazionale che lavora per la protezione e la promozione dei diritti umani, della democrazia, dello stato di diritto e della giustizia internazionale. Nello stesso anno incontra il Dalai Lama e con lui tiene una conferenza stampa per la tutela dei diritti e della libertà del popolo tibetano e per la democrazia in Cina. Nel 1994 diventa capo della delegazione del governo italiano all'Assemblea Generale delle Nazioni Unite per l'iniziativa della “moratoria sulla pena di morte”. Nel dicembre 2001 si trasferisce al Cairo con l'obiettivo di studiare la lingua e la cultura araba. Nel marzo 2003 inaugura una rassegna quotidiana di stampa araba in onda su Radio Radicale. Nel 2006 diventa ministro per il commercio internazionale e per le politiche europee. Emma Bonino ha ricevuto numerosi riconoscimenti, come il “Premio Presidente della Repubblica” (2003) per il suo impegno nella promozione dei diritti umani e civili nel mondo e il “Premio Galileo 2000” (2005) per il suo grande contributo alla pace internazionale." }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p105-ex3b",
        label: "B",
        icons: ["look", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Osserviamo e abbiniamo le immagini alle frasi.",
        tr: { vi: "Quan sát và nối các bức ảnh với các câu.", en: "Look and match the pictures to the sentences." },
        left: [
          { id: "1", text: "Emma Bonino con il Dalai Lama", image: "images/u5/p105-1.jpg" },
          { id: "2", text: "Emma Bonino al Parlamento europeo", image: "images/u5/p105-2.jpg" },
          { id: "3", text: "Emma Bonino parla a una manifestazione dei Radicali", image: "images/u5/p105-3.jpg" },
        ],
        right: [
          { id: "a", text: "Emma Bonino comincia la sua carriera politica nelle fila del Partito Radicale." },
          { id: "b", text: "Nel 1979 Emma Bonino diventa parlamentare europeo." },
          { id: "c", text: "Nel 1993 Emma Bonino incontra il Dalai Lama." },
        ],
        answer: { "1": "c", "2": "b", "3": "a" },
      },
    },
  ],
};

export default page;
