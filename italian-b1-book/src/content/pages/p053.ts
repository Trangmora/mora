import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 53 (Facciamo pratica, bài 12: In libreria…). */
const page: BookPage = {
  id: "p053",
  number: 53,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Facciamo pratica · In libreria…",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p053-ex12a",
        number: "12",
        label: "A",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo i titoli dei libri alle descrizioni.",
        subtitle: "IN LIBRERIA…",
        tr: { vi: "Đọc và nối tên sách với phần giới thiệu.", en: "Let's read and match the book titles to the descriptions." },
        left: [
          { id: "1", text: "La scrittrice affronta un tema molto delicato e privato: le responsabilità che può avere una madre nella cura e nell'educazione di un figlio." },
          { id: "2", text: "Questo splendido romanzo narra alcune vicende personali della vita di Ida durante la seconda guerra mondiale: l'autrice ci fa vedere quanto sono importanti le storie private per capire il significato della Storia degli uomini." },
          { id: "3", text: "Due ragazzi, Ciccio e Jacolino, vogliono scoprire che cosa succede nella pensione vicino a casa loro. Un giorno conoscono la proprietaria, che li porta in un mondo misterioso e fantastico, dove i protagonisti vivono avventure particolari." },
          { id: "4", text: "Sei bambini, con le loro biciclette, corrono in campagna: in mezzo al grano, uno di loro, Michele, scopre un segreto terribile che cambierà per sempre la sua vita. Michele comincia a capire il mondo degli adulti e la loro crudeltà: con grande coraggio, però, riuscirà a vincere la loro cattiveria." },
        ],
        right: [
          { id: "a", text: "Andrea Camilleri, La pensione Eva (2006)" },
          { id: "b", text: "Elsa Morante, La Storia (1974)" },
          { id: "c", text: "Oriana Fallaci, Lettera a un bambino mai nato (1975)" },
          { id: "d", text: "Niccolò Ammaniti, Io non ho paura (2001)" },
        ],
        answer: { "1": "c", "2": "b", "3": "a", "4": "d" },
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u3/p53-camilleri.jpg", alt: "a. Andrea Camilleri, La pensione Eva (2006)" }],
        [{ type: "photo", src: "images/u3/p53-morante.jpg", alt: "b. Elsa Morante, La Storia (1974)" }],
        [{ type: "photo", src: "images/u3/p53-fallaci.jpg", alt: "c. Oriana Fallaci, Lettera a un bambino mai nato (1975)" }],
        [{ type: "photo", src: "images/u3/p53-ammaniti.jpg", alt: "d. Niccolò Ammaniti, Io non ho paura (2001)" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p053-ex12b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Quale di questi libri vi piacerebbe leggere?", sample: "Mi piacerebbe leggere Io non ho paura, perché la storia sembra molto avvincente." },
          { id: "2", prompt: "Quale regalereste a un vostro amico? Perché?", sample: "Regalerei La pensione Eva a un mio amico, perché ama le storie fantastiche." },
          { id: "3", prompt: "Conoscete questi autori?", sample: "Conosco Camilleri, ma non ho mai letto i libri della Morante." },
          { id: "4", prompt: "Quali narratori o poeti del vostro paese vorreste far conoscere? Che cosa hanno scritto?", sample: "Vorrei far conoscere Nguyễn Du, che ha scritto il poema Truyện Kiều." },
        ],
      },
    },
  ],
};

export default page;
