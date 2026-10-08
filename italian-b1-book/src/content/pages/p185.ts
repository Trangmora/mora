import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 185 (Un italiano famoso: Dario Fo). */
const page: BookPage = {
  id: "p185",
  number: 185,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  title: "Un italiano famoso · Dario Fo",
  addedOn: "2026-10-08",
  ribbon: "Un italiano famoso!",
  framed: true,
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p185-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Dario Fo", tr: { vi: "Cùng đọc: Dario Fo.", en: "Let's read: Dario Fo." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 1],
      cols: [
        [{ type: "text", it: "– Nome: Dario Fo.\n– Nasce a San Giano (in provincia di Varese) il 24 marzo 1926.\n– Chi è? È uno scrittore, un drammaturgo, un attore e un regista.\nÈ famoso per i suoi testi teatrali di satira politica e sociale. Nel 1950 comincia a lavorare per la radio e la televisione come autore e attore di testi satirici; inizia anche a recitare in luoghi diversi dai teatri, nelle piazze e nelle fabbriche: in breve tempo diventa molto popolare. Nel 1969 Fo ottiene un grande successo con Mistero buffo: è l'unico attore in scena e recita in grammelot, un linguaggio teatrale che deriva dalla tradizione della Commedia dell'Arte e che imita i suoni e l'intonazione di una lingua o di un dialetto; il grammelot di Fo imita i dialetti parlati nell'Italia settentrionale. Alla fine degli anni '70, con la moglie Franca Rame, torna in televisione per proporre Il teatro di Dario Fo: questo ciclo di trasmissioni ha un grande successo." }],
        [{ type: "photo", src: "images/u9/p185-fo.jpg", alt: "Dario Fo sul palco a braccia aperte" }],
      ],
    },
    {
      type: "columns",
      widths: [2, 3],
      cols: [
        [{ type: "photo", src: "images/u9/p185-scena.jpg", alt: "Dario Fo in scena con altri attori con alti cappelli" }],
        [{ type: "text", it: "Il suo teatro satirico è molto attento all'attualità, alla politica, ai problemi sociali. Il protagonista più importante di molti suoi spettacoli è il giullare, un uomo che rappresenta le idee del popolo e che contesta spesso le ingiustizie della società.\nNel 1991, a 500 anni dalla scoperta dell'America, Fo decide di raccontare in modo comico questo evento con la commedia Johan Padan a la descoverta de le Americhe: è la storia di un povero contadino che arriva nel nuovo mondo. Nel 1997 riceve il Premio Nobel per la letteratura e nel 2006 la laurea honoris causa dall'Università La Sapienza di Roma." }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p185-ex3b",
        label: "B",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo le frasi alle immagini.",
        tr: { vi: "Đọc và nối các câu với các bức tranh.", en: "Let's read and match the sentences to the pictures." },
        left: [
          { id: "1", text: "1.", image: "images/u9/p185-1.jpg" },
          { id: "2", text: "2.", image: "images/u9/p185-2.jpg" },
          { id: "3", text: "3.", image: "images/u9/p185-3.jpg" },
        ],
        right: [
          { id: "a", text: "Il protagonista di molti spettacoli di Dario Fo è il giullare." },
          { id: "b", text: "Nel 1997 Dario Fo riceve il Premio Nobel per la letteratura." },
          { id: "c", text: "Nel 1991 Fo racconta la storia del contadino Johan Padan che arriva in America." },
        ],
        answer: { "1": "c", "2": "a", "3": "b" },
      },
    },
  ],
};

export default page;
