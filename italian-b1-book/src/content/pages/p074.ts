import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 74 (Facciamo pratica, bài 11–12: La gastronomia nel Lazio). */
const page: BookPage = {
  id: "p074",
  number: 74,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Facciamo pratica · La gastronomia nel Lazio",
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica" },
    {
      type: "exercise",
      ex: {
        id: "p074-ex11",
        number: "11",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [
          { id: "1", prompt: "Vengono per la prima volta a cena a casa i vostri futuri suoceri: che cosa gli preparate?", sample: "Gli preparerei un antipasto di salumi, le lasagne e un dolce fatto in casa." },
          { id: "2", prompt: "Partecipate a una cena molto elegante, a base di pesce, a casa di un direttore importante del vostro ufficio: voi, però, non mangiate il pesce. Che cosa fate?", sample: "Lo direi gentilmente al direttore prima della cena e mangerei solo il contorno e il dolce." },
          { id: "3", prompt: "Decidete il menù per una festa di compleanno per 15 bambini molto vivaci: che cosa preparate?", sample: "Preparerei pizzette, panini piccoli, patatine, frutta e una grande torta al cioccolato." },
          { id: "4", prompt: "Avete mai letto un libro o visto un film che parlava di una storia legata al cibo o alle tradizioni alimentari? Raccontatene la trama.", sample: "Ho visto il film Ratatouille: racconta di un topo che sogna di diventare un grande cuoco a Parigi." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p074-ex12",
        number: "12",
        icons: ["write"],
        kind: "cloze",
        skill: "reading",
        instruction: "Leggiamo e completiamo il testo con le parole giuste.",
        intro: "cucina • carciofo • piatti • scelta • si ispira • grattugiato • allevamento • dolci • mozzarelle",
        tr: { vi: "Đọc và hoàn thành đoạn văn với các từ cho sẵn.", en: "Let's read and complete the text with the right words." },
        parts: [
          {
            boxed: true,
            title: "La gastronomia nel Lazio",
            image: { src: "images/u4/p74-amatriciana.jpg", alt: "Un piatto di bucatini all'amatriciana", side: "right", width: 30 },
            text: "La {{=cucina}} del Lazio ha dei piatti molto famosi: i bucatini all'amatriciana (pasta con la pancetta), le penne all'arrabbiata (pasta con un sugo molto piccante), gli spaghetti alla puttanesca (pasta con olive e capperi). Ma l'elenco dei sapori caldi, decisi e corposi non finisce qui.\nLa cucina di questa regione {{si}} {{ispira}} alla tradizione delle campagne e dei pastori: ci sono molti tipi di formaggi semiduri e molli, come il pecorino romano e le {{mozzarelle}}, oltre ai salumi e agli ortaggi, come il famosissimo {{carciofo}} romanesco.\nLe zuppe sono un cibo caratteristico delle zone interne del Lazio, famose per l'{{allevamento}} di pecore, capre e mucche. Se andiamo a Rieti, la {{scelta}} dei primi piatti è varia e sfiziosa: ci sono gli stracci di Antrodoco, frittatine con ragù, fatte al forno con formaggio {{grattugiato}}, gli gnocchi, gli spaghetti aglio, olio e peperoncino. Altri {{piatti}} particolari sono la porchetta, le lenticchie, le fettuccine con funghi e peperoncino, la pasta con le famose olive di Gaeta (piccole e gustosissime olive nere) e, infine, i {{dolci}} come i maritozzi, morbidi panini con pinoli, uvetta e buccia d'arancia candita.",
          },
        ],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u4/p74-mozzarella.jpg", alt: "Mozzarelle" }],
        [{ type: "photo", src: "images/u4/p74-carciofi.jpg", alt: "Carciofi romaneschi" }],
        [{ type: "photo", src: "images/u4/p74-olive.jpg", alt: "Olive nere di Gaeta" }],
        [{ type: "photo", src: "images/u4/p74-maritozzo.jpg", alt: "Un maritozzo" }],
      ],
    },
  ],
};

export default page;
