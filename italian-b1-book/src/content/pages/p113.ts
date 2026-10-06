import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 113 (Osserviamo bene, bài 9: Michele Santoro e i problemi dell'Italia). */
const page: BookPage = {
  id: "p113",
  number: 113,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Osserviamo bene · I problemi dell'Italia",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p113-ex9",
        number: "9",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi al futuro semplice e al futuro anteriore.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thì tương lai đơn và tương lai hoàn thành.", en: "Let's read and complete the text with the simple future and the future perfect." },
        source: "(adattato da il Venerdì di Repubblica, 29-11-2002)",
        parts: [
          {
            boxed: true,
            title: "Michele Santoro ci illustra le difficoltà che dovranno affrontare i politici italiani dopo le elezioni",
            image: { src: "images/u6/p113-santoro.jpg", alt: "Il giornalista Michele Santoro", side: "right", width: 38 },
            text: "Dopo che (*vincere*) {{=avranno vinto}} le prossime elezioni, gli onorevoli che (*lavorare*) {{lavoreranno}} nel Parlamento (*discutere*) {{discuteranno}} molte questioni importanti per il futuro del nostro paese. Il Presidente del Consiglio, dopo che (*riunire*) {{avrà riunito}} i ministri, (*scrivere*) {{scriverà}} le proposte di legge e le (*presentare*) {{presenterà}} in Parlamento.\nI problemi più gravi dell'Italia oggi sono questi:",
          },
        ],
      },
    },
    { type: "gridTable", firstCol: true, head: ["", "NORD OVEST", "NORD EST", "CENTRO", "SUD E ISOLE"], rows: [
        ["disoccupazione", "16,1%", "8,6%", "14%", "48,2%"],
        ["criminalità", "17,4%", "20,5%", "18,4%", "14%"],
        ["costo della vita", "20,4%", "15,1%", "21,7%", "10,9%"],
        ["immigrazione", "13,5%", "14,1%", "14,7%", "7,3%"],
        ["ambiente", "9,4%", "5,9%", "9,9%", "6,7%"],
        ["qualità dei servizi sociali e sanitari", "13,1%", "16,8%", "12,1%", "7,9%"],
        ["trasporti, strade", "10,1%", "18,9%", "9,2%", "5,1%"],
      ] },
    {
      type: "exercise",
      ex: {
        id: "p113-ex9b",
        icons: ["write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Continuiamo a completare il testo.",
        tr: { vi: "Tiếp tục hoàn thành đoạn văn.", en: "Keep completing the text." },
        parts: [
          {
            boxed: true,
            text: "Quando i deputati (*leggere*) {{avranno letto}} questi dati, (*rendersi conto*) {{si renderanno conto}} che al Nord e al Centro, per esempio, il costo della vita è la prima difficoltà da risolvere. (*loro, vedere*) {{Vedranno}} che il Sud ha bisogno di molti aiuti economici per abbassare la percentuale di disoccupazione. Appena (*loro, studiare*) {{avranno studiato}} la situazione delle scuole e degli ospedali in ogni regione, (*loro, fare*) {{faranno}} molte proposte per migliorare la qualità dei servizi sociali e sanitari in tutto il paese.",
          },
        ],
      },
    },
  ],
};

export default page;
