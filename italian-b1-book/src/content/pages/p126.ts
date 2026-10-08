import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 126 (Cominciamo, bài 1: Musica di ieri e di oggi). */
const page: BookPage = {
  id: "p126",
  number: 126,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  title: "Cominciamo · Musica di ieri e di oggi",
  blocks: [
    {
      type: "unitHeader",
      unit: "7",
      title: "Parole e musica",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "conoscere aspetti della cultura musicale italiana", tr: { vi: "tìm hiểu văn hóa âm nhạc Ý", en: "learn about Italian musical culture" } },
        { it: "lavorare sui testi di alcune canzoni italiane", tr: { vi: "làm việc với lời một số bài hát Ý", en: "work on the lyrics of some Italian songs" } },
        { it: "fare paragoni", tr: { vi: "so sánh", en: "make comparisons" } },
        { it: "esprimere apprezzamenti", tr: { vi: "bày tỏ sự yêu thích, khen ngợi", en: "express appreciation" } },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "MUSICA DI IERI E DI OGGI" },
    { type: "audio", src: "audio/u7-p126-ex1.mp3", title: "1", autoTranscript: true, transcript: "Ascolto 1.\n– Sai, ieri sera sono andata a vedere un'opera meravigliosa: la Tosca.\n– Che bello! Dove sei andata?\n– L'hanno rappresentata proprio a Castel Sant'Angelo. Io l'avevo vista a teatro, ma quella di ieri è stata migliore.\n\nAscolto 2.\n– Ieri sera in televisione ho visto una trasmissione su Canale 5: Eros Ramazzotti ha cantato in coppia con Anastacia.\n– Sì, l'ho vista anch'io. Hanno mostrato anche il video. È stato bellissimo, come quello che Eros ha fatto con Tina Turner.\n\nAscolto 3.\n– Ciao Jane, ti piacerebbe venire con me al concerto di Andrea Bocelli?\n– Ah sì, lui ha una voce stupenda!\n– Sì, infatti un mio amico mi ha consigliato di andarlo a vedere. Mi ha detto che il nuovo spettacolo è il più entusiasmante di tutti.\n\nAscolto 4.\nIl prossimo mese partirà il tour nei palasport italiani del gruppo pop Negramaro. Per acquistare i biglietti potete visitare il sito dei Negramaro, dove troverete tutte le informazioni.\n\nAscolto 5.\nSai, ieri sera ho accompagnato mia nipote a un concerto di un cantante rock. Com'è cambiata la musica di oggi! Ai miei tempi facevamo delle bellissime feste, avevamo in casa un meraviglioso grammofono. La musica di prima era più romantica di quella di oggi e le canzoni erano meno commerciali.\n\nAscolto 6.\n– Ho letto la recensione sulla Bohème che hanno dato ieri sera al Teatro alla Scala di Milano. Dicono che è stato uno spettacolo eccezionale: i costumi di scena erano elegantissimi e c'era un cast di cantanti bravissimi.\n– Prendiamo anche noi i biglietti!" },
    {
      type: "exercise",
      ex: { id: "p126-ex1-intro", number: "1", icons: ["listen", "match"], kind: "speak", skill: "listening", instruction: "Ascoltiamo e abbiniamo i dialoghi alle immagini.", tr: { vi: "Nghe và nối các đoạn hội thoại với các bức ảnh.", en: "Let's listen and match the dialogues to the pictures." }, items: [] },
    },
    { type: "photo", src: "images/u7/p126-collage.jpg", alt: "a. un grammofono; b. una scena d'opera; c. due cantanti lirici; d. un cantante con il microfono; e. un gruppo rock in concerto; f. una coppia di cantanti pop" },
    {
      type: "exercise",
      ex: {
        id: "p126-ex1",
        icons: ["listen", "write"],
        kind: "fill",
        skill: "listening",
        refText: "audio",
        variant: "twoCol",
        instruction: "Scriviamo la lettera dell'immagine (a–f).",
        tr: { vi: "Viết chữ cái của bức ảnh (a–f) cho mỗi bài nghe.", en: "Write the letter of the picture (a–f) for each listening." },
        items: [
          { id: "1", prompt: "Ascolto 1. ___", answers: ["c"] },
          { id: "2", prompt: "Ascolto 2. ___", answers: ["f"] },
          { id: "3", prompt: "Ascolto 3. ___", answers: ["d"] },
          { id: "4", prompt: "Ascolto 4. ___", answers: ["e"] },
          { id: "5", prompt: "Ascolto 5. ___", answers: ["a"] },
          { id: "6", prompt: "Ascolto 6. ___", answers: ["b"] },
        ],
      },
    },
  ],
};

export default page;
