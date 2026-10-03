import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 21 (Un'italiana famosa: Anna Magnani). */
const page: BookPage = {
  id: "p021",
  number: 21,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Un'italiana famosa · Anna Magnani",
  addedOn: "2026-10-07",
  ribbon: "Un'italiana famosa",
  framed: true,
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p021-ex3a",
        number: "3",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        subtitle: "Anna Magnani",
        tr: { vi: "Cùng đọc: Anna Magnani.", en: "Let's read: Anna Magnani." },
        items: [],
      },
    },
    {
      type: "columns",
      widths: [3, 2],
      cols: [
        [
          {
            type: "text",
            it: "– Nasce a Roma il 7 marzo 1908.\n– Muore il 26 settembre 1973.\n– Chi è? È una delle più grandi attrici nella storia del cinema italiano.",
          },
        ],
        [{ type: "photo", src: "images/u1/p21-anna.jpg", alt: "Anna Magnani" }],
      ],
    },
    {
      type: "text",
      it: "Anna Magnani comincia a studiare recitazione nel 1927 alla scuola Eleonora Duse (poi Accademia Nazionale d'Arte Drammatica) sotto la direzione di Silvio D'Amico. Recita in seguito nel teatro di prosa e di rivista e lavora anche con Totò. In campo cinematografico il suo debutto è nel 1934. Dopo numerosi film in cui interpreta parti secondarie, Anna Magnani riesce ad avere successo per il suo straordinario temperamento e per le sue eccezionali doti di attrice drammatica. Raggiunge la fama mondiale nel 1945 con Roma città aperta di Roberto Rossellini, che mostra Roma nel periodo dell'occupazione dei nazisti e racconta in modo molto realistico le vicende umane e politiche della gente comune; celebre è una delle scene finali del film: i nazisti uccidono a colpi di mitra la donna che corre dietro il camion dove si trova prigioniero il suo uomo. Nel 1951 interpreta con grande umanità, nel film Bellissima con la regia di Luchino Visconti, il ruolo di una mamma che sogna per la sua bambina un futuro da stella del cinema. Nel 1956 riceve l'Oscar come migliore attrice protagonista per l'interpretazione di Serafina Delle Rose nel film La rosa tatuata di Daniel Mann: è la prima attrice italiana a ottenere questo riconoscimento nella storia degli Academy Awards.",
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [
          {
            type: "collage",
            height: 56,
            items: [
              { src: "images/u1/p21-urlo.jpg", alt: "Anna Magnani grida in una scena drammatica", x: 0, y: 0, w: 44.5 },
              { src: "images/u1/p21-poltrona.jpg", alt: "Anna Magnani seduta in poltrona con un abito scuro", x: 45.7, y: 0, w: 54.3 },
            ],
          },
        ],
        [
          {
            type: "text",
            it: "La sua forte personalità risalta ancora in Mamma Roma di Pierpaolo Pasolini del 1962. Nel 1971 interpreta per la televisione tre brevi film dal titolo Tre donne e ottiene ancora una volta un grande successo. La sua ultima apparizione è nel film Roma di Federico Fellini del 1972. Dopo la sua morte ci sono state molte iniziative in Italia e all'estero per ricordare Anna Magnani. Nel 2002 il Museum of Modern Art di New York le ha dedicato una retrospettiva con la proiezione dei suoi film più significativi.",
          },
        ],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p021-ex3b",
        label: "B",
        icons: ["look", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Osserviamo e abbiniamo le immagini ai titoli dei film di Anna Magnani.",
        tr: {
          vi: "Quan sát và nối các bức tranh với tên phim của Anna Magnani.",
          en: "Look and match the pictures to the titles of Anna Magnani's films.",
        },
        left: [
          { id: "1", text: "Una donna con una rosa tatuata.", image: "images/u1/p21-b1.jpg" },
          { id: "2", text: "Una bella ragazza bionda, come una stella del cinema.", image: "images/u1/p21-b2.jpg" },
          { id: "3", text: "Il panorama di Roma con la cupola di San Pietro.", image: "images/u1/p21-b3.jpg" },
        ],
        right: [
          { id: "a", text: "Bellissima." },
          { id: "b", text: "Roma città aperta." },
          { id: "c", text: "La rosa tatuata." },
        ],
        answer: { "1": "c", "2": "a", "3": "b" },
      },
    },
  ],
};

export default page;
