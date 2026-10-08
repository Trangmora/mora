import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 161 (Grammatica: tabelle del congiuntivo presente). */
const page: BookPage = {
  id: "p161",
  number: 161,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", color: "#ef8a3a" },
  title: "Grammatica · Il congiuntivo presente: tabelle",
  runningHead: "Grammatica",
  blocks: [
    { type: "theory", text: "## Il congiuntivo presente dei verbi regolari" },
    { type: "gridTable", firstCol: true, head: ["", "AMARE", "VEDERE", "PARTIRE", "CAPIRE"], rows: [
        ["io", "am-**i**", "ved-**a**", "part-**a**", "cap-**isc-a**"],
        ["tu", "am-**i**", "ved-**a**", "part-**a**", "cap-**isc-a**"],
        ["lui / lei / Lei", "am-**i**", "ved-**a**", "part-**a**", "cap-**isc-a**"],
        ["noi", "am-**iamo**", "ved-**iamo**", "part-**iamo**", "cap-**iamo**"],
        ["voi", "am-**iate**", "ved-**iate**", "part-**iate**", "cap-**iate**"],
        ["loro", "am-**ino**", "ved-**ano**", "part-**ano**", "cap-**isca-no**"],
      ] },
    { type: "theory", text: "## Il congiuntivo presente di *essere* e *avere*" },
    { type: "gridTable", firstCol: true, head: ["", "ESSERE", "AVERE"], rows: [
        ["io", "**sia**", "**abbia**"], ["tu", "**sia**", "**abbia**"], ["lui / lei / Lei", "**sia**", "**abbia**"],
        ["noi", "**siamo**", "**abbiamo**"], ["voi", "**siate**", "**abbiate**"], ["loro", "**siano**", "**abbiano**"],
      ] },
    { type: "theory", text: "## Il congiuntivo presente di altri verbi irregolari" },
    { type: "gridTable", firstCol: true, head: ["", "io", "tu", "lui / lei / Lei", "noi", "voi", "loro"], rows: [
        ["ANDARE", "vada", "vada", "vada", "andiamo", "andiate", "vadano"],
        ["APPARIRE", "appaia", "appaia", "appaia", "appariamo", "appariate", "appaiano"],
        ["BERE", "beva", "beva", "beva", "beviamo", "beviate", "bevano"],
        ["COGLIERE", "colga", "colga", "colga", "cogliamo", "cogliate", "colgano"],
        ["DARE", "dia", "dia", "dia", "diamo", "diate", "diano"],
        ["DIRE", "dica", "dica", "dica", "diciamo", "diciate", "dicano"],
        ["DOVERE", "debba", "debba", "debba", "dobbiamo", "dobbiate", "debbano"],
        ["FARE", "faccia", "faccia", "faccia", "facciamo", "facciate", "facciano"],
        ["MORIRE", "muoia", "muoia", "muoia", "moriamo", "moriate", "muoiano"],
        ["PARERE", "paia", "paia", "paia", "paiamo", "paiate", "paiano"],
        ["PORRE", "ponga", "ponga", "ponga", "poniamo", "poniate", "pongano"],
        ["POTERE", "possa", "possa", "possa", "possiamo", "possiate", "possano"],
        ["RIMANERE", "rimanga", "rimanga", "rimanga", "rimaniamo", "rimaniate", "rimangano"],
        ["SALIRE", "salga", "salga", "salga", "saliamo", "saliate", "salgano"],
        ["SAPERE", "sappia", "sappia", "sappia", "sappiamo", "sappiate", "sappiano"],
        ["SCEGLIERE", "scelga", "scelga", "scelga", "scegliamo", "scegliate", "scelgano"],
      ] },
  ],
};

export default page;
