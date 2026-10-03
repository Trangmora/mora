import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 20 (Viaggiamo in Italia: La lingua italiana oggi). */
const page: BookPage = {
  id: "p020",
  number: 20,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Viaggiamo in Italia · La lingua italiana oggi",
  addedOn: "2026-10-07",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p020-ex1a",
        number: "1",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        subtitle: "La lingua italiana oggi",
        tr: { vi: "Cùng đọc: Tiếng Ý ngày nay.", en: "Let's read: The Italian language today." },
        items: [],
      },
    },
    {
      type: "columns",
      cols: [
        [
          {
            type: "text",
            it: "Molte persone all'estero studiano e parlano italiano: non solo gli immigrati italiani, ma anche gli stranieri. La lingua italiana è diventata sempre più importante in vari paesi.\nAll'estero ci sono molti Istituti italiani di cultura e molte scuole private che promuovono la conoscenza della nostra lingua e della nostra cultura: per questo oggi l'italiano è la quinta lingua più studiata nel mondo e molte persone seguono corsi di italiano negli Stati Uniti, in Australia, in Giappone, nei paesi del Mediterraneo e in quelli dell'Europa dell'Est.\nNel grafico potete vedere quali sono le motivazioni allo studio dell'italiano:",
          },
          {
            type: "barChart",
            max: 35,
            step: 5,
            bars: [
              { label: "Studio", value: 19, color: "#3d8fd6" },
              { label: "Lavoro", value: 22.4, color: "#7cc35a" },
              { label: "Motivi personali", value: 25.8, color: "#f4c74b" },
              { label: "Tempo libero", value: 32.8, color: "#e8685a" },
            ],
          },
          {
            type: "text",
            it: "Tra le motivazioni il lavoro è al terzo posto. Molti studiano la nostra lingua per lavorare con le ditte",
          },
        ],
        [
          { type: "image", src: "images/u1/svg/p20-studenti.svg", alt: "Un gruppo di studenti ride insieme" },
          {
            type: "text",
            it: "e le aziende italiane o per fare carriera o per trovare un lavoro in Italia; di meno sono quelli che studiano l'italiano perché si occupano di traduzione e di insegnamento. Vediamo nel grafico le percentuali:",
          },
          {
            type: "barChart",
            max: 90,
            step: 10,
            bars: [
              { label: "Trovare lavoro in Italia", value: 34.7, color: "#3d8fd6" },
              { label: "Carriera", value: 43.8, color: "#7cc35a" },
              { label: "Lavoro con ditte italiane", value: 84.3, color: "#f4c74b" },
              { label: "Insegnamento", value: 15.2, color: "#f08a6a" },
              { label: "Traduzione", value: 23.9, color: "#c0392b" },
            ],
          },
          {
            type: "text",
            it: "Molti studenti europei partecipano ai progetti Erasmus e scelgono spesso di venire a studiare in Italia arte, economia, giurisprudenza e letteratura.\nDa un po' di tempo sono nate anche le Certificazioni della lingua italiana: oggi queste Certificazioni sono necessarie per poter lavorare e studiare in Italia o all'estero.",
          },
        ],
      ],
      widths: [1, 1],
    },
    { type: "tip", it: "(adattato da Italiano 2000, a cura di T. De Mauro et alii)", tr: { vi: "Nguồn trích", en: "Source" } },
    {
      type: "exercise",
      ex: {
        id: "p020-ex1b",
        label: "B",
        icons: ["read", "check"],
        kind: "truefalse",
        skill: "reading",
        instruction: "Leggiamo: vero o falso?",
        tr: { vi: "Đọc: đúng hay sai?", en: "Let's read: true or false?" },
        items: [
          { id: "1", prompt: "L'italiano è una lingua molto studiata all'estero.", answer: true },
          { id: "2", prompt: "Molti studiano l'italiano per motivi di lavoro.", answer: true },
          { id: "3", prompt: "In Italia gli immigrati non imparano l'italiano.", answer: false },
          { id: "4", prompt: "Le certificazioni della lingua italiana sono utili per lavorare.", answer: true },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p020-ex2",
        number: "2",
        icons: ["look"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo l'immagine.",
        subtitle: "Vorrei studiare l'italiano!",
        tr: {
          vi: "Quan sát bức tranh: «Tôi muốn học tiếng Ý!» — Bạn hãy trả lời câu hỏi của thầy giáo.",
          en: "Look at the picture: “I'd like to study Italian!” — Answer the teacher's question.",
        },
        items: [
          {
            id: "a",
            prompt: "«Perché vuoi studiare l'italiano?»",
            sample: "Perché amo la cultura italiana. Mi piacciono anche la cucina, la moda e la musica italiana, e un giorno vorrei lavorare in Italia.",
          },
        ],
      },
    },
    { type: "image", src: "images/u1/svg/p20-vorrei.svg", alt: "Il professore chiede: «Perché vuoi studiare l'italiano?» La ragazza risponde: «Perché amo la cultura italiana.»" },
  ],
};

export default page;
