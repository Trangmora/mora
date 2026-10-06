import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 63 (Un italiano famoso: Luigi Pirandello). */
const page: BookPage = {
  id: "p063",
  number: 63,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  title: "Un italiano famoso · Luigi Pirandello",
  addedOn: "2026-10-07",
  ribbon: "Un italiano famoso!",
  framed: true,
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p063-ex3a",
        number: "3",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        subtitle: "Luigi Pirandello",
        tr: { vi: "Cùng đọc: Luigi Pirandello.", en: "Let's read: Luigi Pirandello." },
        items: [],
      },
    },
    {
      type: "columns",
      widths: [1, 3],
      cols: [
        [{ type: "photo", src: "images/u3/p63-pirandello.jpg", alt: "Ritratto di Luigi Pirandello" }],
        [
          {
            type: "text",
            it: "– Nome: Luigi Pirandello.\n– Nasce ad Agrigento, in Sicilia, nel 1867.\n– Muore nel 1936.\n– Chi è? È un autore importante della letteratura italiana: ha scritto novelle, romanzi e commedie. Dopo gli studi liceali a Palermo, si trasferisce a Bonn e si laurea in Filologia romanza. Nel 1892, per seguire la sua vocazione letteraria, si stabilisce a Roma, dove vive con i soldi del padre. Nell'ambiente letterario della capitale diventa amico dello scrittore siciliano Luigi Capuana, che lo spinge verso il campo della narrativa. Compone così le sue prime novelle e il suo primo romanzo L'esclusa (1901).",
          },
        ],
      ],
    },
    {
      type: "columns",
      widths: [3, 2],
      cols: [
        [
          {
            type: "text",
            it: "In seguito inizia una fitta collaborazione con diversi giornali e riviste letterarie. Il successo arriva nel 1904 con il romanzo Il fu Mattia Pascal. Nel 1915-16 inizia la sua prodigiosa e intensa attività di scrittore di commedie; tra le sue opere teatrali più famose ricordiamo: Così è, se vi pare, Sei personaggi in cerca d'autore, Enrico IV. Nel 1934 riceve il premio Nobel per la letteratura. Pirandello rappresenta, nelle sue opere, la crisi dell'uomo contemporaneo, la sua disperazione e la sua solitudine: lo scrittore va oltre le apparenze per entrare nella condizione intima della vita di tanti individui.",
          },
        ],
        [{ type: "photo", src: "images/u3/p63-copertine.jpg", alt: "Copertine: Sei personaggi in cerca d'autore – Enrico IV; A teatro con Pirandello: Così è (se vi pare)" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p063-ex3b",
        label: "B",
        icons: ["look", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Osserviamo e abbiniamo le immagini ai titoli delle opere di Pirandello.",
        tr: { vi: "Quan sát và nối các bức tranh với tên các tác phẩm của Pirandello.", en: "Look and match the pictures to the titles of Pirandello's works." },
        left: [
          { id: "1", text: "Un re sul trono e la sua ombra", image: "images/u3/p63-enrico.jpg" },
          { id: "2", text: "Personaggi mossi come marionette da un'ombra", image: "images/u3/p63-personaggi.jpg" },
          { id: "3", text: "Un uomo con il cappello di spalle", image: "images/u3/p63-mattia.jpg" },
        ],
        right: [
          { id: "a", text: "Sei personaggi in cerca d'autore." },
          { id: "b", text: "Enrico IV." },
          { id: "c", text: "Il fu Mattia Pascal." },
        ],
        answer: { "1": "b", "2": "a", "3": "c" },
      },
    },
  ],
};

export default page;
