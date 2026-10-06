import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 70 (Osserviamo bene, bài 8: La cucina del Veneto). */
const page: BookPage = {
  id: "p070",
  number: 70,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Osserviamo bene · La cucina del Veneto",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p070-ex8",
        number: "8",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo.",
        tr: { vi: "Đọc và hoàn thành đoạn văn (ci, vi, lo, la…).", en: "Let's read and complete the text (ci, vi, lo, la…)." },
        source: "(adattato da www.taccuinistorici.it)",
        parts: [
          {
            boxed: true,
            title: "Concludiamo il nostro viaggio alla scoperta dei sapori del Nord…",
            image: { src: "images/u4/p70-risotto.jpg", alt: "Un piatto di risi e bisi", side: "right", width: 34 },
            text: "*La cucina del Veneto*\nNell'alimentazione veneta troviamo soprattutto riso, polenta, fagioli e baccalà: a questi cibi possiamo aggiungere le patate, alcuni ortaggi, i salumi freschi e i formaggi dolci.\nIl riso è arrivato dal mondo arabo: {{=ci}} sono voluti circa cinquecento anni per far{{lo}} crescere nelle vaste pianure venete; oggi, nelle tradizioni gastronomiche di Verona, {{ci}} sono quaranta piatti diversi a base di riso.\nDopo la scoperta dell'America sono arrivati anche la farina di mais e i fagioli.\nDai mari del Nord abbiamo invece il baccalà (stoccafisso): {{ci}} ha messo un po' di tempo per diventare il pesce preferito dei veneti, ma ha dato un gusto unico a molti piatti.\nPer conoscere la vera cucina veneta {{vi}} consigliamo di provare il radicchio e le cipolle: molte ricette a base di cipolla si chiamano “alla veneziana”. Per esempio, avete mai assaggiato il “fegato alla veneziana”? {{Lo}} trovate in tutti i ristoranti, di solito {{lo|ve lo|ce lo}} propongono con un piatto di radicchio arrosto e con un raffinato abbinamento di vini bianchi.\nLa cucina veneta è famosa per l'uso del pepe nero e delle altre spezie che danno ai primi piatti e al pesce un gusto piccante: se non {{vi}} piace il pepe nero, potete adoperare quello rosa, più delicato.\n{{Vi}} piace la selvaggina? In Veneto abbiamo l'oca in onto (oca sotto grasso): se {{la}} mangiate quasi cruda, diventerete dei “veri veneziani”!\nUn tipico pasto veneto finisce sempre con il pandoro veronese: {{l'|lo}} avete vist{{o}} a Natale sulle tavole di tutta Italia. Questo dolce è nato a Venezia e ha una storia antica: i pasticcieri {{lo}} facevano con burro e zucchero e i ricchi signori della Serenissima {{lo}} mangiavano sempre nel periodo di Carnevale.",
          },
        ],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u4/p70-fegato.jpg", alt: "Il fegato alla veneziana con le cipolle" }],
        [{ type: "photo", src: "images/u4/p70-carpaccio.jpg", alt: "Un piatto di carpaccio" }],
        [{ type: "photo", src: "images/u4/p70-pandoro.jpg", alt: "Il pandoro veronese con lo zucchero a velo" }],
      ],
    },
  ],
};

export default page;
