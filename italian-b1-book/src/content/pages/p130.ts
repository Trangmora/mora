import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 130 (Osserviamo bene, bài 6B: Biagio Antonacci; 7A: il superlativo relativo). */
const page: BookPage = {
  id: "p130",
  number: 130,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Osserviamo bene · Il superlativo relativo",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p130-ex6b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con le parole giuste.",
        intro: "più • di • superiore • più • maggiore • maggiori • più • di • migliori",
        tr: { vi: "Đọc và hoàn thành đoạn văn với các từ cho sẵn.", en: "Let's read and complete the text with the right words." },
        parts: [
          {
            boxed: true,
            title: "Sapete chi è Biagio Antonacci?",
            image: { src: "images/u7/p130-biagio.jpg", alt: "Biagio Antonacci canta e manda un bacio", side: "right", width: 30 },
            text: "Biagio Antonacci ha cominciato la sua carriera musicale nel 1991: ha partecipato per la prima volta al *Festivalbar*, una manifestazione musicale che si svolge alla fine dell'estate in molte città italiane. Il suo primo CD ha venduto {{=più di}} 150.000 copie. Due anni {{più}} tardi ha partecipato al *Festival di Sanremo* e ha cominciato il suo tour per tutta l'Italia: ha conquistato, così, un pubblico sempre {{maggiore}} e in poco tempo è diventato uno dei {{migliori}} cantanti italiani. Nel 1996 ha pubblicato un album molto famoso, *Mi fai stare bene*, forse {{più}} originale del suo primo lavoro. Agli inizi del 2000 è uscita una raccolta dei suoi {{maggiori}} successi e nel 2003, per il mercato spagnolo e sudamericano, Biagio ha pubblicato un album particolare, *Cuanto tiempo…*, che contiene {{più}} {{di}} 100 brani: il suo successo anche in Sud America è stato {{superiore}} a ogni aspettativa. Nel 2005 il nostro cantante ha ricevuto a Hollywood il premio “Best Male Selling Italian Artist”, perché il suo album *Convivendo* ha venduto più {{di}} un milione di copie.",
          },
        ],
      },
    },
    { type: "photo", src: "images/u7/p130-album.jpg", alt: "La copertina dell'album Il mucchio di Biagio Antonacci" },
    {
      type: "exercise",
      ex: { id: "p130-ex7a", number: "7", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il superlativo relativo", tr: { vi: "Cùng đọc: so sánh nhất.", en: "Let's read: the relative superlative." }, items: [] },
    },
    {
      type: "theory",
      text: "> I concerti di Pino Daniele sono **i più** emozionanti **di** tutti.\n> Questa musica è **la meno** interessante **fra** quelle che conosciamo.\n! ATTENZIONE!\n- il / la più buono/a = **il / la migliore**\n- il / la più cattivo/a = **il / la peggiore**\n===\n- il / la più grande = **il / la maggiore**\n- il / la più piccolo/a = **il / la minore**\n---\n> **Il migliore** album della stagione è quello di Franco Battiato.\n> Il disco **peggiore** del Festival di Sanremo è quello di Mino Reitano.",
    },
  ],
};

export default page;
