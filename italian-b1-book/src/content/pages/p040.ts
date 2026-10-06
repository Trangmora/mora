import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 40 (Viaggiamo in Italia: La famiglia italiana). */
const page: BookPage = {
  id: "p040",
  number: 40,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Viaggiamo in Italia · La famiglia italiana",
  addedOn: "2026-10-06",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p040-ex1",
        number: "1",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        subtitle: "La famiglia italiana",
        tr: { vi: "Cùng đọc: Gia đình Ý.", en: "Let's read: The Italian family." },
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
            it: "Alcuni sociologi hanno studiato i comportamenti dei nuclei familiari del passato e hanno fatto delle scoperte interessanti. Prima di tutto hanno analizzato il fenomeno della famiglia patriarcale: in questa tipologia familiare il padre aveva un ruolo fondamentale e i figli dovevano rispettare regole severe. Le famiglie restavano più unite e più vicine agli anziani e ai genitori. I sociologi hanno dimostrato che, nelle famiglie italiane di cento anni fa, le persone sposate si ammalavano meno, vivevano più a lungo e si sentivano più felici.\nUn dato rilevante dell'attuale società italiana è che i padri sono i più vecchi del mondo: il primo figlio nasce quando il padre ha 33 anni. Gli uomini italiani sono fra quelli che escono più tardi dalla famiglia di origine: fino ai 30 anni preferiscono di solito vivere in casa con mamma e papà. Quando si sposano imparano più tardi a fare i lavori di casa e lasciano così più responsabilità alle donne. Un'indagine dell'ISTAT dice che oggi il matrimonio e i figli arrivano dopo l'affermazione professionale ed economica.",
          },
          { type: "tip", it: "(adattato da la Repubblica, 21-10-2005)", tr: { vi: "Nguồn trích", en: "Source" } },
        ],
        [{ type: "image", src: "images/u2/p40-famiglia.svg", alt: "Vecchie foto di famiglie italiane" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p040-ex2",
        number: "2",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo le immagini.",
        subtitle: "In Italia i papà più vecchi del mondo",
        tr: { vi: "Quan sát các bức tranh: Ở Ý có những ông bố già nhất thế giới.", en: "Look at the pictures: In Italy, the oldest dads in the world." },
        items: [],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "image", src: "images/u2/p40-ny.svg", alt: "New York, Central Park: un papà giovane corre con il passeggino" }, { type: "theory", text: "New York, Central Park" }],
        [{ type: "image", src: "images/u2/p40-siena.svg", alt: "Siena, Piazza del Campo: un papà anziano non riesce a seguire il bambino" }, { type: "theory", text: "Siena, Piazza del Campo" }],
      ],
    },
  ],
};

export default page;
