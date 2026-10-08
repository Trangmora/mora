import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 195 (Facciamo pratica, bài 11–12: maschere e San Gennaro). */
const page: BookPage = {
  id: "p195",
  number: 195,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "Facciamo pratica · La festa di San Gennaro",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p195-ex11",
        number: "11",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [
          { id: "1", prompt: "Festeggiate il Carnevale nel vostro paese?", sample: "No, nel mio paese non si festeggia il Carnevale, ma c'è il Capodanno lunare." },
          { id: "2", prompt: "Ci sono delle feste tradizionali nel vostro paese dove bisogna indossare delle maschere o dei costumi tipici?", sample: "Sì, durante la festa di metà autunno i bambini portano maschere e lanterne." },
          { id: "3", prompt: "Osservate queste immagini e descrivetele.", sample: "Pulcinella ha un costume bianco e una maschera nera; Arlecchino ha un vestito fatto di rombi colorati; Colombina indossa un abito lungo rosa." },
        ],
      },
    },
    { type: "photo", src: "images/u10/p195-maschere.jpg", alt: "Le maschere della Commedia dell'Arte: Pulcinella, Arlecchino, Colombina" },
    {
      type: "exercise",
      ex: {
        id: "p195-ex12",
        number: "12",
        icons: ["read", "write"],
        kind: "fill",
        skill: "reading",
        instruction: "Leggiamo e riordiniamo il testo.",
        subtitle: "La festa di San Gennaro",
        intro: "a. Non appena avviene il “miracolo”, da Castel dell'Ovo sparano ventuno colpi di cannone per annunciarlo alla città. Se il sangue non diventa liquido i fedeli continuano a pregare fino al momento della liquefazione.\nb. Da allora, appena il Vescovo di Napoli espone i piccoli vasi al pubblico, il sangue diventa liquido e tutti i fedeli applaudono e pregano. Sicuramente uno dei momenti più intensi della celebrazione è quando i devoti, nella cattedrale, invocano il miracolo con preghiere e suppliche in napoletano.\nc. Il 19 settembre a Napoli c'è la festa di San Gennaro, il patrono della città. In quel giorno i fedeli e i devoti del santo attendono il noto “miracolo” della liquefazione del sangue: questo miracolo risale al 305 dopo Cristo, quando i soldati di Diocleziano tagliano la testa al martire Ianuario (Gennaro). Una donna raccoglie il suo sangue e lo conserva in due piccoli vasi di vetro.\nd. I fedeli, infatti, credono che la liquefazione “puntuale” sia un buon segno per la città e per i suoi abitanti. Se non avviene il miracolo oppure se avviene in ritardo, si dice che sia un fatto negativo. Alla cerimonia partecipano varie autorità cittadine: fra queste il sindaco e il presidente della regione Campania.",
        tr: { vi: "Đọc và sắp xếp lại đoạn văn (viết chữ cái a–d theo đúng thứ tự).", en: "Let's read and put the text in order (write the letters a–d in the right order)." },
        items: [
          { id: "1", prompt: "1. ___", answers: ["c"] },
          { id: "2", prompt: "2. ___", answers: ["b"] },
          { id: "3", prompt: "3. ___", answers: ["a"] },
          { id: "4", prompt: "4. ___", answers: ["d"] },
        ],
        variant: "twoCol",
      },
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "photo", src: "images/u10/p195-duomo.jpg", alt: "Il Duomo di Napoli" }],
        [{ type: "photo", src: "images/u10/p195-miracolo.jpg", alt: "Il vescovo mostra l'ampolla con il sangue di San Gennaro" }],
      ],
    },
  ],
};

export default page;
