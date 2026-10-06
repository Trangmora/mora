import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 45 (Osserviamo bene, bài 5: il condizionale presente). */
const page: BookPage = {
  id: "p045",
  number: 45,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Osserviamo bene · Il condizionale presente",
  banner: "CHE COSA FARESTI?",
  runningHead: " ",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p045-ex5a", number: "5", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il condizionale presente", tr: { vi: "Cùng đọc: thì điều kiện hiện tại.", en: "Let's read: the present conditional." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2, 3, 2],
      align: "center",
      cols: [
        [{ type: "photo", src: "images/u3/p45-tv.jpg", alt: "Un ragazzo davanti alla TV" }],
        [{ type: "text", it: "Stasera guarderei un bel film in TV…" }],
        [{ type: "photo", src: "images/u3/p45-giornale.jpg", alt: "Un uomo legge il giornale su una panchina" }],
        [{ type: "text", it: "Leggerei il giornale, ma non ho molto tempo oggi." }],
      ],
    },
    { type: "gridTable", firstCol: true, head: ["", "guardare", "prendere", "aprire"], rows: [
        ["io", "guarderei", "prenderei", "aprirei"],
        ["tu", "guarderesti", "prenderesti", "apriresti"],
        ["lui / lei / Lei", "guarderebbe", "prenderebbe", "aprirebbe"],
        ["noi", "guarderemmo", "prenderemmo", "apriremmo"],
        ["voi", "guardereste", "prendereste", "aprireste"],
        ["loro", "guarderebbero", "prenderebbero", "aprirebbero"],
      ] },
    { type: "theory", text: "! ATTENZIONE!" },
    { type: "gridTable", firstCol: true, head: ["", "essere", "avere"], rows: [
        ["io", "sarei", "avrei"], ["tu", "saresti", "avresti"], ["lui / lei / Lei", "sarebbe", "avrebbe"],
        ["noi", "saremmo", "avremmo"], ["voi", "sareste", "avreste"], ["loro", "sarebbero", "avrebbero"],
      ] },
    {
      type: "exercise",
      ex: { id: "p045-ex5b", label: "B", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il condizionale per…", tr: { vi: "Cùng đọc: ta dùng thì điều kiện để…", en: "Let's read: we use the conditional to…" }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u3/p45-desiderio.jpg", alt: "Una ragazza guarda le torte in vetrina" }, { type: "theory", text: "### esprimere un desiderio:\n> **Mangerei** volentieri una fetta di torta al cioccolato…" }],
        [{ type: "photo", src: "images/u3/p45-cortese.jpg", alt: "Sull'autobus una signora chiede di aprire il finestrino" }, { type: "theory", text: "### chiedere o dire qualcosa in modo cortese:\n> Scusi, **aprirebbe** il finestrino per favore?" }],
      ],
    },
  ],
};

export default page;
