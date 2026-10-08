import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 191 (Osserviamo bene, bài 7B tiếp: Il Palio di Siena). */
const page: BookPage = {
  id: "p191",
  number: 191,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "Osserviamo bene · Il Palio di Siena",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "photo", src: "images/u10/p191-corsa.jpg", alt: "I cavalli corrono in Piazza del Campo" }],
        [{ type: "photo", src: "images/u10/p191-piazza.jpg", alt: "Un fantino in Piazza del Campo piena di gente" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p191-ex7b",
        icons: ["read", "write"],
        kind: "choice",
        inline: true,
        skill: "grammar",
        instruction: "Il Palio di Siena (continua): sottolineiamo le forme giuste del verbo.",
        tr: { vi: "Il Palio di Siena (tiếp theo): gạch chân dạng đúng của động từ.", en: "Il Palio di Siena (continued): underline the right forms of the verb." },
        items: [
          { id: "3", prompt: "Il Palio di Siena è un'avvincente giostra di cavalli fra le contrade (quartieri) della città: … nella piazza centrale, la Piazza del Campo, il 2 luglio e il 16 agosto.", options: ["ci si svolge", "si svolge"], answer: 1 },
          { id: "4", prompt: "Il Palio di Siena ha origini medievali: … che questa corsa sia una delle più antiche al mondo.", options: ["si ci dice", "si dice"], answer: 1 },
          { id: "5", prompt: "In ogni caso il cavallo sarà l'“ospite” più importante alla cena della vittoria, che … fra settembre e ottobre nelle strade e nelle piazze della contrada vittoriosa.", options: ["si fa", "ci si fa"], answer: 0 },
          { id: "6", prompt: "Prima della corsa … di fronte a uno spettacolo veramente unico:", options: ["ci si può trovare", "si può trovare"], answer: 0 },
          { id: "7", prompt: "nel corteo storico, dal Duomo alla piazza, … la bellezza dei costumi dei cavalieri che rappresentano il Comune e le Contrade.", options: ["ci si può ammirare", "si può ammirare"], answer: 1 },
          { id: "8", prompt: "Lo stile di questi costumi … su uno studio attento e accurato del costume medievale e rinascimentale italiano.", options: ["ci si basa", "si basa"], answer: 1 },
          { id: "9", prompt: "Nonostante ci siano molte critiche a questo tipo di giostra, … da sempre di tutelare la vita dei cavalli.", options: ["si cerca", "ci si cerca"], answer: 0 },        ],
      },
    },
    { type: "text", it: "A luglio si corre per vincere il Palio di Provenzano e ad agosto ci si sfida per quello della Madonna dell'Assunta. Tra le diciassette contrade della città, solo dieci partecipano al Palio. Il cavallo, con o senza fantino, può vincere la competizione, a patto che per primo abbia fatto tre giri della piazza. Oggi il premio per la contrada è un palio rettangolare di seta dipinto. Si spiega anche così la grande partecipazione dei senesi alla festa." },
    {
      type: "columns",
      widths: [1, 1, 1],
      cols: [
        [{ type: "photo", src: "images/u10/p191-fantini.jpg", alt: "I fantini a cavallo durante la corsa" }],
        [{ type: "photo", src: "images/u10/p191-corteo.jpg", alt: "Il corteo storico con il carroccio" }],
        [{ type: "photo", src: "images/u10/p191-finestra.jpg", alt: "Una bandiera a una finestra gotica del Palazzo Pubblico" }],
      ],
    },
  ],
};

export default page;
