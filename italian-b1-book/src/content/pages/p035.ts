import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 35 (Scrittura e pronuncia, bài 16–17: le vocali). */
const page: BookPage = {
  id: "p035",
  number: 35,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Scrittura e pronuncia · Le vocali",
  addedOn: "2026-10-06",
  runningHead: "Scrittura e pronuncia",
  sideTab: { unit: "U2", color: "#d8333a" },
  blocks: [
    { type: "audio", src: "audio/u2-p35-ex16a.mp3", title: "16 A", transcript: "a · e /ɛ/ · e /e/ · i · o /ɔ/ · o /o/ · u" },
    {
      type: "exercise",
      ex: {
        id: "p035-ex16a",
        number: "16",
        label: "A",
        icons: ["listen", "read"],
        kind: "speak",
        skill: "speaking",
        instruction: "Ascoltiamo e leggiamo le vocali.",
        tr: { vi: "Nghe và đọc các nguyên âm.", en: "Let's listen and read the vowels." },
        items: [],
      },
    },
    {
      type: "theory",
      text: `
^^ **a** · **e** /ɛ/ · **e** /e/ · **i** · **o** /ɔ/ · **o** /o/ · **u**
! ATTENZIONE!
- e /ɛ/ = **è** | gènte
- e /e/ = **é** | francése
===
- o /ɔ/ = **ò** | nòzze
- o /o/ = **ó** | bórsa
`.trim(),
    },
    {
      type: "exercise",
      ex: {
        id: "p035-ex16b",
        label: "B",
        icons: ["listen", "read"],
        kind: "speak",
        skill: "speaking",
        instruction: "Ascoltiamo e leggiamo le parole.",
        tr: { vi: "Nghe và đọc các từ.", en: "Let's listen and read the words." },
        items: [],
      },
    },
    { type: "audio", src: "audio/u2-p35-ex16b.mp3", title: "16 B", transcript: "gènte, sènza, vècchio, trèno, francése, séta, péntola, réte, nòzze, bòsco, dònna, pòrta, bórsa, tórta, erróre, incrócio" },
    {
      type: "gridTable",
      head: ["è /ɛ/", "é /e/", "ò /ɔ/", "ó /o/"],
      rows: [
        ["gènte", "francése", "nòzze", "bórsa"],
        ["sènza", "séta", "bòsco", "tórta"],
        ["vècchio", "péntola", "dònna", "erróre"],
        ["trèno", "réte", "pòrta", "incrócio"],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p035-ex17",
        number: "17",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        instruction: "Ascoltiamo e scriviamo le parole.",
        tr: { vi: "Nghe và viết các từ vào đúng cột.", en: "Let's listen and write the words in the right column." },
        items: [
          { id: "e1", prompt: "è /ɛ/", starter: "parente", lines: 1 },
          { id: "e2", prompt: "é /e/", lines: 1 },
          { id: "o1", prompt: "ò /ɔ/", lines: 1 },
          { id: "o2", prompt: "ó /o/", lines: 1 },
          { id: "i", prompt: "i", lines: 1 },
          { id: "a", prompt: "a", lines: 1 },
          { id: "u", prompt: "u", lines: 1 },
        ],
      },
    },
  ],
};

export default page;
