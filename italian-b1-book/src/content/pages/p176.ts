import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 176 (Facciamo pratica, bài 12C–13A: Il fascino della moda italiana). */
const page: BookPage = {
  id: "p176",
  number: 176,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Facciamo pratica · Il fascino della moda italiana",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p176-ex12c",
        label: "C",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Che cosa pensate del volontariato?", sample: "Penso che il volontariato sia molto importante: aiuta chi ha bisogno e ci rende persone migliori." },
          { id: "2", prompt: "Qual è la vostra opinione sulle adozioni a distanza (prendersi cura economicamente di un bambino di un paese povero)?", sample: "Credo che sia un modo semplice e concreto per aiutare un bambino a studiare." },
          { id: "3", prompt: "Secondo voi nel vostro paese c'è solidarietà e impegno sociale?", sample: "Sì, nel mio paese molte persone fanno beneficenza, soprattutto quando ci sono disastri naturali." },
          { id: "4", prompt: "Avete mai fatto esperienze di volontariato?", sample: "Sì, ho fatto volontariato in una mensa per i poveri durante l'università." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p176-ex13a",
        number: "13",
        label: "A",
        icons: ["read", "write"],
        kind: "write",
        skill: "writing",
        instruction: "Leggiamo le risposte dell'intervista e scriviamo le domande.",
        intro: "Il fascino della moda italiana\nIeri sera a Milano ci sono state le sfilate dell'alta moda per presentare la collezione primavera-estate e, adesso, abbiamo qui con noi una grande stilista italiana, Laura Biagiotti, che ci ha affascinato con le sue meravigliose creazioni. Allora, signora Biagiotti, sappiamo che lei ha un grande successo anche all'estero.",
        tr: { vi: "Đọc các câu trả lời của bài phỏng vấn và viết câu hỏi.", en: "Let's read the answers in the interview and write the questions." },
        items: [
          { id: "1", prompt: "1. …? — Ecco, io penso a una donna elegante, ma anche sportiva e dinamica, una donna che lavora, ma che vuole essere anche molto femminile.", lines: 1, sample: "A quale donna pensa quando crea i suoi vestiti?" },
          { id: "2", prompt: "2. …? — La moda made in Italy, per fortuna, riscuote ancora oggi un grande successo soprattutto all'estero. Recentemente, invece, in Italia c'è stato un calo delle vendite, perché credo che l'economia italiana non attraversi un periodo molto positivo…", lines: 1, sample: "Che successo ha oggi la moda made in Italy?" },
          { id: "3", prompt: "3. …? — Fuori dell'Europa gli Stati Uniti occupano il terzo posto tra i paesi clienti del made in Italy. In Europa la Francia è il secondo paese cliente del sistema moda italiano con un buon 11,1%. Al primo posto rimane la Germania con un 12,7%.", lines: 1, sample: "Quali sono i paesi che comprano di più la moda italiana?" },
          { id: "4", prompt: "4. …? — In Oriente abbiamo il mercato giapponese che è in espansione. L'export italiano ha registrato una piccola crescita: il Giappone, infatti, è all'ottavo posto nella classifica dei principali paesi clienti della moda made in Italy con un 3,5%.", lines: 1, sample: "E in Oriente come va il mercato della moda italiana?" },
        ],
      },
    },
    {
      type: "columns",
      widths: [1, 1, 1],
      cols: [
        [{ type: "photo", src: "images/u9/p176-biagiotti.jpg", alt: "Laura Biagiotti con la figlia a una sfilata" }],
        [{ type: "photo", src: "images/u9/p176-sfilata.jpg", alt: "Una modella in passerella con un abito arancione" }],
        [{ type: "photo", src: "images/u9/p176-web.jpg", alt: "La pagina web di una casa di moda" }],
      ],
    },
  ],
};

export default page;
