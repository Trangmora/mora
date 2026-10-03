import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 9 (Facciamo pratica, bài 12–13). */
const page: BookPage = {
  id: "p009",
  number: 9,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Facciamo pratica · L'Italia di ieri e di oggi",
  addedOn: "2026-10-05",
  runningHead: "Facciamo pratica",
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  blocks: [
    {
      type: "audio",
      src: "audio/u1-p9-ex12.mp3",
      autoTranscript: true,
      transcript: [
        "Alberto: Pronto?",
        "Zio James: Pronto! Ciao Alberto, sono lo zio James. Chiamo da New York. Volevo farti gli auguri per il tuo compleanno.",
        "Alberto: Oh, che bella sorpresa! Non avevo tue notizie da tanto tempo. Come stai?",
        "Zio James: Io sto bene. Anche i miei figli stanno bene. Ma io ho tanta nostalgia di voi e dell'Italia. Ho tanti bei ricordi di quando ero bambino.",
        "Alberto: Eh, zio, anche noi ti pensiamo sempre. Però sai, la vita qui in Italia adesso è diversa, non è quella che ricordi tu.",
        "Zio James: Ma davvero?",
        "Alberto: Sì, zio. Sai che adesso c'è tanto traffico nella nostra città? Io, per esempio, prendo sempre la metropolitana.",
        "Zio James: E per fare la spesa comprate sempre le cose buone nei piccoli negozi vicino a casa vostra?",
        "Alberto: No, zio. Adesso io e Franca andiamo in un grande supermercato in un quartiere qui vicino e non mangiamo più la pasta fatta in casa della nonna Concetta.",
        "Zio James: E il fine settimana che cosa fate?",
        "Alberto: Andiamo a trovare gli amici oppure andiamo a fare un giro nei grandi centri commerciali per fare shopping.",
        "Zio James: Mamma mia, Alberto! Allora l'Italia che ricordo io non c'è più.",
      ].join("\n"),
    },
    {
      type: "exercise",
      ex: {
        id: "p009-ex12",
        number: "12",
        icons: ["listen", "check"],
        kind: "choice",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e scegliamo la risposta giusta.",
        tr: { vi: "Nghe và chọn câu trả lời đúng.", en: "Let's listen and choose the right answer." },
        items: [
          {
            id: "1",
            prompt: "Lo zio James:",
            options: ["ha visitato da poco l'Italia.", "abita in Italia.", "ha lasciato tanti anni fa l'Italia."],
            answer: 2,
          },
          {
            id: "2",
            prompt: "Alberto prende la metropolitana perché:",
            options: ["c'è molto traffico.", "non ama camminare a piedi.", "non sa guidare."],
            answer: 0,
          },
          {
            id: "3",
            prompt: "Alberto e Franca fanno la spesa:",
            options: ["nei piccoli negozi.", "al supermercato.", "al mercato all'aperto."],
            answer: 1,
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p009-ex13",
        number: "13",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        subtitle: "Dite se queste immagini rappresentano l'Italia di oggi o di ieri e spiegate perché.",
        tr: {
          vi: "Cùng nói: những bức ảnh này là nước Ý ngày nay hay ngày xưa? Giải thích vì sao.",
          en: "Let's talk: do these pictures show Italy today or Italy in the past? Explain why.",
        },
        items: [
          {
            id: "a",
            prompt: "",
            sample:
              "La foto 1 rappresenta l'Italia di oggi: c'è un'Ape con la frutta e la verdura, ma la foto è a colori. La 2 è di oggi, perché c'è un Internet café con tanti computer. La 3 è di ieri: è in bianco e nero e c'è un carretto dei gelati. Anche la 4 è di oggi: un ragazzo mangia in un fast food. La 5 è di ieri: è una vecchia barberia in bianco e nero. La 6 è di oggi: è l'entrata della metropolitana.",
          },
        ],
      },
    },
    { type: "photo", src: "images/u1/p9-collage.jpg", alt: "Sei foto numerate: un'Ape con frutta, un Internet café, un carretto dei gelati, un fast food, un barbiere, la metropolitana" },
  ],
};

export default page;
