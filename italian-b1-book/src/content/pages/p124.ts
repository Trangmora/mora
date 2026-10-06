import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 124 (Viaggiamo in Italia: gli italiani e la TV). */
const page: BookPage = {
  id: "p124",
  number: 124,
  unit: "6",
  unitTitle: "Cultura e società",
  title: "Viaggiamo in Italia · Gli italiani e la TV",
  addedOn: "2026-10-08",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U6", title: "Cultura e società" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p124-ex1a", number: "1", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Volete passare un po' di tempo davanti alla TV?", tr: { vi: "Cùng đọc: Các bạn có muốn dành chút thời gian trước TV không?", en: "Let's read: Do you want to spend some time in front of the TV?" }, items: [] },
    },
    {
      type: "text",
      it: "Forse non sapete che un italiano passa in media, ogni giorno, 230 minuti davanti alla TV: che cosa guarda, vi chiederete? Tutto! Passa dai telegiornali ai talk-show, dalle trasmissioni scientifiche ai quiz, dal Festival di Sanremo ai dibattiti politici. Ci sono, comunque, dei programmi che molti italiani apprezzano particolarmente.\nSe hanno voglia di curiosare nella vita degli altri, cosa c'è di meglio del Grande Fratello? Questa trasmissione tiene gli spettatori davanti allo schermo almeno una volta alla settimana: chi la guarda? Soprattutto i giovani (ma anche gli adulti) che vogliono osservare i comportamenti di un gruppo di persone chiuse per circa due mesi in una casa.\nSe invece, dopo una giornata di lavoro, qualcuno desidera rilassarsi con battute ironiche e divertenti, il programma adatto è Le Iene: due conduttori e una bella ragazza presentano servizi curiosi su alcuni fatti sociali e politici della nostra vita quotidiana.\nChi non ha niente da fare e può stare una domenica pomeriggio in casa, di solito si divide fra Domenica In, uno spettacolo di circa 5 ore con balletti, talk-show, servizi sociali, e Quelli che il calcio…, la trasmissione più seguita per sapere che cosa succede nei campi di calcio ogni fine settimana. Chi si interessa di politica e dei problemi della nostra società guarda senz'altro Porta a Porta, Ballarò, Matrix, Anno zero, L'infedele, trasmissioni che trattano di argomenti di attualità e aiutano a conoscere da vicino i protagonisti del Parlamento. I giovani, infine, adorano MTV, il canale televisivo famoso in tutto il mondo: la versione italiana è molto divertente.",
    },
    {
      type: "exercise",
      ex: {
        id: "p124-ex1b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Che tipo di trasmissioni piacciono agli italiani?", sample: "Agli italiani piacciono i telegiornali, i talk-show, i quiz, il calcio e i reality come il Grande Fratello." },
          { id: "2", prompt: "Quali di queste trasmissioni conoscete?", sample: "Conosco il Festival di Sanremo e MTV." },
          { id: "3", prompt: "Che cosa guardate in TV nel vostro paese?", sample: "Nel mio paese guardo soprattutto le serie TV e i programmi di cucina." },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p124-ex2", number: "2", icons: ["look"], kind: "speak", skill: "speaking", instruction: "Osserviamo l'immagine.", subtitle: "Cultura moderna…", tr: { vi: "Quan sát bức tranh: Văn hóa hiện đại…", en: "Look at the picture: Modern culture…" }, items: [] },
    },
    { type: "photo", src: "images/u6/p124-tv.jpg", alt: "Un uomo seduto tra tre televisori e due console di videogiochi dice: «Io sono un uomo di cultura…»" },
    { type: "dialogue", lines: [{ speaker: "Uomo", it: "Io sono un uomo di cultura…" }] },
  ],
};

export default page;
