import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 129 (Osserviamo bene, bài 5–6A: i comparativi). */
const page: BookPage = {
  id: "p129",
  number: 129,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Osserviamo bene · I comparativi",
  runningHead: "Osserviamo bene",
  banner: "SONO PIÙ BRAVO DI…",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p129-ex5a", number: "5", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "I comparativi di maggioranza, minoranza e uguaglianza", tr: { vi: "Cùng đọc: so sánh hơn, so sánh kém và so sánh bằng.", en: "Let's read: comparatives of superiority, inferiority and equality." }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 3],
      cols: [
        [{ type: "photo", src: "images/u7/p129-jovanotti.jpg", alt: "Jovanotti (Lorenzo Cherubini)" }],
        [{ type: "theory", text: "> Jovanotti è **più** giovane **di** Gianni Morandi.\n> Ligabue ha scritto **meno** canzoni **di** Vasco Rossi.\n> Francesco De Gregori è famoso **come / quanto** Antonello Venditti.\n> Gino Paoli ha composto canzoni **più** romantiche **che** ritmiche.\n> Suonare Vivaldi è **meno** impegnativo **che** suonare Bach.\n> La musica di Chopin è **tanto** emozionante **quanto** rilassante." }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p129-ex5b",
        label: "B",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: facciamo dei paragoni.",
        example: { q: "1. La musica di Mozart – la musica di Bach.", a: "***Per me la musica di Mozart è più interessante di quella di Bach / è meno interessante di quella di Bach / è interessante come quella di Bach.***" },
        tr: { vi: "Cùng viết: so sánh.", en: "Let's write: make comparisons." },
        items: [
          { id: "2", prompt: "I concerti di musica rock – i concerti di musica jazz.", lines: 1, sample: "Per me i concerti di musica rock sono più divertenti di quelli di musica jazz." },
          { id: "3", prompt: "Le canzoni di Sting – le canzoni di Lou Reed.", lines: 1, sample: "Le canzoni di Sting sono più melodiche di quelle di Lou Reed." },
          { id: "4", prompt: "L'opera lirica – la musica rap.", lines: 1, sample: "L'opera lirica è meno moderna della musica rap." },
          { id: "5", prompt: "I cantanti italiani – i cantanti del mio paese.", lines: 1, sample: "I cantanti italiani sono famosi quanto i cantanti del mio paese." },
          { id: "6", prompt: "Ascoltare la musica in casa – ascoltare la musica a teatro.", lines: 1, sample: "Ascoltare la musica in casa è meno emozionante che ascoltarla a teatro." },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p129-ex6a", number: "6", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "MIGLIORE / PEGGIORE", tr: { vi: "Cùng đọc: tốt hơn / tệ hơn.", en: "Let's read: better / worse." }, items: [] },
    },
    {
      type: "theory",
      text: "! ATTENZIONE!\n- più buono = **migliore**\n- più cattivo = **peggiore**\n- più grande = **maggiore**\n===\n- più piccolo = **minore**\n- più alto = **superiore**\n- più basso = **inferiore**",
    },
    {
      type: "theory",
      text: "> L'ultimo CD di Giorgia è **migliore** di quello di Gigi D'Alessio.\n> La canzone di Eros Ramazzotti ha avuto un successo **maggiore** di quella di Laura Pausini.\n! ATTENZIONE!\nDopo ***superiore*** e ***inferiore*** usiamo ***a***:\n> Claudio Baglioni ha venduto un numero di dischi **superiore a** quello di Roberto Vecchioni.\n! ATTENZIONE!\nNon diciamo: *più bene*. Diciamo: ***meglio***. Non diciamo: *più male*. Diciamo: ***peggio***.\n> Oggi il coro ha cantato **meglio** di ieri.",
    },
  ],
};

export default page;
