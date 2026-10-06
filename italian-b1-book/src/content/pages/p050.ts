import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 50 (bài 8B–C: il condizionale passato per…). */
const page: BookPage = {
  id: "p050",
  number: 50,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Osserviamo bene · Il condizionale passato per…",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p050-ex8b", label: "B", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il condizionale passato per…", tr: { vi: "Cùng đọc: thì điều kiện quá khứ để…", en: "Let's read: the past conditional to…" }, items: [] },
    },
    { type: "theory", text: "### esprimere un'azione che non si è potuta realizzare nel passato o che non si può realizzare nel presente o nel futuro:" },
    {
      type: "columns",
      cols: [
        [{ type: "image", src: "images/u3/p50-cavallo.jpg", alt: "Pina sogna di andare a cavallo" }, { type: "text", it: "Quando era bambina Pina avrebbe voluto fare equitazione, ma non ha potuto perché non c'era un maneggio vicino a casa sua." }],
        [{ type: "image", src: "images/u3/p50-amici.jpg", alt: "Un gruppo di amici si saluta" }, { type: "text", it: "Domani dobbiamo partire… Peccato! Sarebbe stato bello rimanere con voi ancora un po'." }],
      ],
    },
    {
      type: "columns",
      cols: [
        [{ type: "theory", text: "### esprimere un'azione futura rispetto a un momento del passato:" }, { type: "image", src: "images/u3/p50-forno.jpg", alt: "Il pollo bruciato nel forno" }, { type: "text", it: "Ti avevo detto che non avresti dovuto lasciare troppo tempo il pollo nel forno." }],
        [{ type: "theory", text: "### presentare una notizia come non certa nel passato:" }, { type: "image", src: "images/u3/p50-attori.jpg", alt: "Due attori in costume" }, { type: "text", it: "I due attori avrebbero divorziato." }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p050-ex8c",
        label: "C",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: completiamo le frasi con i verbi al condizionale passato.",
        example: { q: "1. Nadia non immaginava che ***Paolo le avrebbe scritto una lettera.***", a: "***Paolo le avrebbe scritto una lettera***" },
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thì điều kiện quá khứ.", en: "Let's write: complete the sentences with verbs in the past conditional." },
        items: [
          { id: "2", prompt: "Monica doveva partire, altrimenti …", lines: 1, sample: "sarebbe rimasta con noi." },
          { id: "3", prompt: "Ieri ti avevo detto che …", lines: 1, sample: "sarei arrivato tardi." },
          { id: "4", prompt: "Non sapevamo come …", lines: 1, sample: "avremmo potuto aiutarti." },
          { id: "5", prompt: "Eri sicuro che …", lines: 1, sample: "avresti vinto la partita." },
          { id: "6", prompt: "Il mese scorso Vincenzo diceva che …", lines: 1, sample: "avrebbe cambiato lavoro." },
          { id: "7", prompt: "Alcuni giorni fa pensavano che …", lines: 1, sample: "sarebbero partiti per le vacanze." },
          { id: "8", prompt: "Dovevo lavorare, altrimenti …", lines: 1, sample: "sarei venuto alla festa." },
          { id: "9", prompt: "Ci avevano avvertito che …", lines: 1, sample: "il treno sarebbe arrivato in ritardo." },
          { id: "10", prompt: "Giovanna credeva che …", lines: 1, sample: "le avremmo fatto un regalo." },
        ],
      },
    },
  ],
};

export default page;
