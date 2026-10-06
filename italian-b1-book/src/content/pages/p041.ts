import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 41 (Un italiano famoso: Totò). */
const page: BookPage = {
  id: "p041",
  number: 41,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Un italiano famoso · Totò",
  addedOn: "2026-10-06",
  ribbon: "Un italiano famoso!",
  framed: true,
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p041-ex3a",
        number: "3",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        subtitle: "Antonio De Curtis in arte TOTÒ",
        tr: { vi: "Cùng đọc: Antonio De Curtis, nghệ danh Totò.", en: "Let's read: Antonio De Curtis, stage name Totò." },
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
            it: "– Nome: Antonio De Curtis.\n– Nasce a Napoli il 15 febbraio 1898.\n– Muore il 15 aprile 1967.\n– Chi è? È un grande attore comico italiano. Fin da piccolo vuole diventare attore, ma la madre non è d'accordo: Totò decide allora di fare il prete, poi l'imbianchino; infine, poiché non finisce gli studi, entra nell'esercito.",
          },
        ],
        [{ type: "image", src: "images/u2/p41-toto.jpg", alt: "Totò dietro le sbarre con il cappello" }],
      ],
    },
    {
      type: "text",
      it: "Quando ritorna a Napoli, dopo la guerra, comincia a recitare in piccoli teatri con un suo repertorio di imitazioni, ma non ha un grande successo; così decide di trasferirsi a Roma. Dopo le esibizioni nei teatri della capitale e di altre città italiane diventa famoso in tutta Italia grazie alla sua mimica e alla sua straordinaria comicità. Nel 1927 torna a Napoli, dove ottiene un autentico trionfo. In quel periodo in Italia si diffonde l'avanspettacolo, una forma di spettacolo popolare che precede o segue la proiezione di film. I copioni sono spesso improvvisati, i costumi di scena sono di poco prezzo e i teatri sono piccoli e poco importanti. Totò diventa il simbolo di questo genere di spettacolo e fa non solo l'attore, ma anche l'impresario. Recita poi in spettacoli più importanti con grandi attori come Anna Magnani e Peppino De Filippo. In seguito lavora nel cinema: dal 1937 al 1967 interpreta 97 film, che hanno avuto circa 270 milioni di spettatori, un record assoluto nella storia del cinema italiano. Totò ha un grande talento anche come scrittore: scrive un'importante raccolta di poesie pubblicata nel 1964, 'A livella (La livella), e anche musiche e testi di numerose canzoni (la più famosa è Malafemmina).",
    },
    {
      type: "exercise",
      ex: {
        id: "p041-ex3b",
        label: "B",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo le frasi di Totò alle immagini.",
        tr: { vi: "Đọc và nối các câu nói của Totò với các bức tranh.", en: "Let's read and match Totò's lines to the pictures." },
        left: [
          { id: "1", text: "Una bella donna e Totò per terra.", image: "images/u2/p41-1.jpg" },
          { id: "2", text: "Totò con mezzo uovo in ogni mano.", image: "images/u2/p41-2.jpg" },
          { id: "3", text: "Totò e una signora anziana.", image: "images/u2/p41-3.jpg" },
        ],
        right: [
          { id: "a", text: "Sulla famiglia: “A proposito della Befana, devo fare gli auguri a mia suocera”." },
          { id: "b", text: "Sulle donne: “Noi uomini lottiamo, lottiamo, ma alla fine vincono sempre le donne”." },
          { id: "c", text: "Sul cibo: “Abbiamo un solo uovo in quattro: il rosso lo mangiamo la mattina e il bianco lo teniamo per la sera”." },
        ],
        answer: { "1": "b", "2": "c", "3": "a" },
      },
    },
  ],
};

export default page;
