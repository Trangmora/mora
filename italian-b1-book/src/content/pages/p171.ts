import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 171 (Osserviamo bene, bài 7–8: donne al governo; affinché, senza che, a meno che non). */
const page: BookPage = {
  id: "p171",
  number: 171,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Osserviamo bene · Donne al governo",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p171-ex7a", number: "7", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "gridTable", firstCol: true, head: ["DONNE AL GOVERNO (2003-2004)", ""], rows: [
          ["Gran Bretagna", "32,58%"], ["Germania", "27,7%"], ["Austria", "25%"], ["Spagna", "21,43%"], ["Francia", "21%"], ["Portogallo", "15,46%"], ["Italia", "10,30%"],
        ] }],
        [{ type: "gridTable", firstCol: true, head: ["DONNE AL PARLAMENTO EUROPEO (2003-2004)", ""], rows: [
          ["Germania", "38%"], ["Francia", "35%"], ["Gran Bretagna", "21%"], ["Spagna", "20%"], ["Italia", "10%"], ["Austria", "8%"], ["Portogallo", "6%"],
        ] }],
      ],
    },
    { type: "text", it: "(tratto da Io Donna, 07-01-2006)" },
    {
      type: "exercise",
      ex: {
        id: "p171-ex7b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Che cosa pensate della presenza delle donne nei posti di potere?", sample: "Penso che sia giusto che ci siano più donne nei posti di potere, perché portano idee e punti di vista diversi." },
          { id: "2", prompt: "Qual è la situazione nel vostro paese?", sample: "Nel mio paese le donne in parlamento sono circa il… per cento: credo che siano ancora poche." },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p171-ex8a", number: "8", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Usiamo il congiuntivo dopo…", tr: { vi: "Cùng đọc: dùng thức giả định sau…", en: "Let's read: we use the subjunctive after…" }, items: [] },
    },
    { type: "theory", text: "- **affinché, perché** | Ti ho prestato quel libro **perché** tu lo **legga**.\n- **senza che** | Vogliamo organizzare una festa **senza che** Mauro lo **sappia**.\n- **a meno che non** | Vengono da noi **a meno che non cambino** idea all'ultimo momento." },
    {
      type: "exercise",
      ex: {
        id: "p171-ex8b",
        label: "B",
        icons: ["read", "check"],
        kind: "choice",
        skill: "grammar",
        variant: "twoCol",
        instruction: "Leggiamo e scegliamo la risposta giusta.",
        tr: { vi: "Đọc và chọn câu trả lời đúng.", en: "Let's read and choose the right answer." },
        items: [
          { id: "1", prompt: "Puoi prendere la mia macchina:", options: ["perché tu me la riporti entro stasera.", "purché tu me la riporti entro stasera.", "senza che tu me la riporti entro stasera."], answer: 1 },
          { id: "2", prompt: "Fa sempre come vuole:", options: ["senza che io sappia niente.", "senza che io so niente.", "senza che io saprò qualcosa."], answer: 0 },
          { id: "3", prompt: "Sono usciti:", options: ["nonostante piove.", "nonostante piova.", "nonostante pioverà."], answer: 1 },
          { id: "4", prompt: "Non sono sicuro di andare a Roma:", options: ["sebbene la mia amica mi ha invitato spesso.", "sebbene la mia amica mi invita spesso.", "sebbene la mia amica mi abbia invitato spesso."], answer: 2 },
          { id: "5", prompt: "I ragazzi sono usciti:", options: ["senza che il papà se ne sia accorto.", "senza che il papà se ne è accorto.", "senza che il papà se ne sarà accorto."], answer: 0 },
          { id: "6", prompt: "Ci vediamo la prossima settimana:", options: ["a meno che non venite prima a trovarci.", "a meno che non siate venuti prima a trovarci.", "a meno che non veniate prima a trovarci."], answer: 2 },
          { id: "7", prompt: "Gli hanno dato una borsa di studio:", options: ["perché possa finire l'università.", "perché può finire l'università.", "perché ha potuto finire l'università."], answer: 0 },
          { id: "8", prompt: "Ti chiamo:", options: ["prima che tu esci.", "prima che tu esca.", "prima che tu sia uscito."], answer: 1 },
        ],
      },
    },
  ],
};

export default page;
