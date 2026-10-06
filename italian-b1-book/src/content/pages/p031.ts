import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 31 (Facciamo pratica, bài 11B–12: Viva gli sposi!). */
const page: BookPage = {
  id: "p031",
  number: 31,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Facciamo pratica · La famiglia di Patrizia, Viva gli sposi!",
  addedOn: "2026-10-06",
  runningHead: "Facciamo pratica",
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p031-ex11b",
        label: "B",
        icons: ["look", "write"],
        kind: "speak",
        skill: "listening",
        refText: "audio",
        instruction: "Osserviamo l'immagine e scriviamo.",
        subtitle: "Scrivete i nomi delle persone della famiglia di Patrizia.",
        tr: { vi: "Quan sát bức tranh và viết tên các thành viên trong gia đình Patrizia.", en: "Look at the picture and write the names of the people in Patrizia's family." },
        items: [],
      },
    },
    { type: "photo", src: "images/u2/p31-famiglia.jpg", alt: "La famiglia di Patrizia al lago: sette persone, una bambina e un cane" },
    {
      type: "exercise",
      ex: {
        id: "p031-ex11b-nomi",
        icons: ["write"],
        kind: "fill",
        skill: "listening",
        refText: "audio",
        instruction: "I nomi, da sinistra a destra:",
        tr: { vi: "Tên, từ trái sang phải:", en: "The names, from left to right:" },
        items: [
          { id: "1", prompt: "il signore con i baffi e la canna da pesca: ___", answers: ["zio Sandro|lo zio Sandro|Sandro"] },
          { id: "2", prompt: "il signore alto con i capelli rossi: ___", answers: ["Bruno|il padre Bruno|papà Bruno|suo padre"] },
          { id: "3", prompt: "la signora un po' grassa con gli occhiali: ___", answers: ["Carla|la madre Carla|mamma Carla|sua madre"] },
          { id: "4", prompt: "la bambina vicino al cane: ___", answers: ["Patrizia"] },
          { id: "5", prompt: "la signora bionda con la gonna a fiori: ___", answers: ["zia Giovanna|Giovanna"] },
          { id: "6", prompt: "la vecchietta con il cappellino rosa: ___", answers: ["nonna Rita|Rita"] },
          { id: "7", prompt: "il vecchietto con la pipa: ___", answers: ["nonno Osvaldo|Osvaldo"] },
        ],
      },
    },
    { type: "banner", text: "VIVA GLI SPOSI!" },
    {
      type: "audio",
      src: "audio/u2-p31-ex12.mp3",
      autoTranscript: true,
      transcript: [
        "Clara: Ciao, Maria Rosa, come stai?",
        "Maria Rosa: Abbastanza bene, grazie, Clara. Che mi racconti di bello?",
        "Clara: Sai, Maria Rosa, il 22 maggio si è sposata mia nipote Giulia.",
        "Maria Rosa: Congratulazioni, Clara, è davvero una bella notizia. Dove si è sposata?",
        "Clara: Hanno celebrato il matrimonio religioso nella Basilica di San Giovanni e poi hanno fatto un magnifico ricevimento in una villa fuori Roma.",
        "Maria Rosa: E la sposa com'era vestita?",
        "Clara: Giulia stava molto bene, indossava un abito molto romantico, elegantissimo.",
        "Maria Rosa: E quante persone c'erano al rinfresco?",
        "Clara: Più di cento! È stata una grande festa! Sai, le cose sono molto diverse da quando ci siamo sposate noi. Il mio matrimonio è stato molto semplice, non avevamo molti soldi e, prima di sposarci, per organizzare le nozze io e mio marito Antonio avevamo chiesto un aiuto economico ai nostri genitori. I giovani di oggi, invece, si sposano più tardi, ma non vogliono rinunciare a niente.",
        "Maria Rosa: Eh sì, hai proprio ragione, Clara. Oggi è tutto diverso.",
      ].join("\n"),
    },
    {
      type: "columns",
      widths: [3, 2],
      cols: [
        [
          {
            type: "exercise",
            ex: {
              id: "p031-ex12",
              number: "12",
              icons: ["listen", "write"],
              kind: "form",
              formStyle: "siena",
              skill: "listening",
              refText: "audio",
              instruction: "Ascoltiamo e completiamo la tabella.",
              tr: { vi: "Nghe và hoàn thành bảng.", en: "Let's listen and complete the table." },
              items: [
                { id: "data", label: "Data del matrimonio di Giulia", answers: "22 maggio|il 22 maggio" },
                { id: "luogo", label: "Luogo del matrimonio", answers: "Basilica di San Giovanni|San Giovanni" },
                { id: "abito", label: "Caratteristiche dell'abito di nozze", lines: 2, answers: "molto romantico, elegantissimo|romantico|elegantissimo" },
                { id: "invitati", label: "Numero di invitati", answers: "più di cento|più di 100|cento|100" },
                { id: "clara", label: "Caratteristiche del matrimonio di Clara", lines: 2, answers: "molto semplice|semplice" },
              ],
            },
          },
        ],
        [{ type: "photo", src: "images/u2/p31-sposi.jpg", alt: "Gli sposi escono dalla chiesa tra gli applausi" }],
      ],
    },
  ],
};

export default page;
