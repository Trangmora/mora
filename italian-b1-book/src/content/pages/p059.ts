import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 59 (Grammatica: il condizionale presente). */
const page: BookPage = {
  id: "p059",
  number: 59,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", color: "#ef8a3a" },
  title: "Grammatica · Il condizionale presente",
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# Il condizionale presente
Usiamo il condizionale presente per:
- esprimere un desiderio:
> ***Mangerei*** *volentieri una fetta di torta al cioccolato…*
- chiedere o dire qualcosa in modo cortese:
> Scusi, **aprirebbe** la finestra per favore?
- dare consigli:
%% • Dove posso trovare l'ultimo libro di Wilbur Smith? || ○ **Potresti** provare alla Libreria Feltrinelli.
%% • Avrei bisogno di tagliare i capelli: conosci un buon parrucchiere? || ○ Io **andrei** da Aldo Coppola.
===
- esprimere un dubbio:
> Tra questo vestito e quello non **saprei** quale scegliere.
- presentare una notizia come non certa nel presente:
> Secondo la stampa l'attore Stefano Accorsi **sarebbe** già a Cannes per ricevere il premio.
- esprimere un'azione che dipende da un'altra:
> Non ho la macchina, altrimenti ti **darei** un passaggio.
`.trim(),
    },
    { type: "theory", text: "## Il condizionale presente dei verbi regolari" },
    { type: "gridTable", firstCol: true, head: ["", "GUARDARE", "PRENDERE", "APRIRE"], rows: [
        ["io", "guard-**erei**", "prend-**erei**", "apr-**irei**"],
        ["tu", "guard-**eresti**", "prend-**eresti**", "apr-**iresti**"],
        ["lui / lei / Lei", "guard-**erebbe**", "prend-**erebbe**", "apr-**irebbe**"],
        ["noi", "guard-**eremmo**", "prend-**eremmo**", "apr-**iremmo**"],
        ["voi", "guard-**ereste**", "prend-**ereste**", "apr-**ireste**"],
        ["loro", "guard-**erebbero**", "prend-**erebbero**", "apr-**irebbero**"],
      ] },
    { type: "theory", text: "## Il condizionale presente di *essere* e *avere*" },
    { type: "gridTable", firstCol: true, head: ["", "ESSERE", "AVERE"], rows: [
        ["io", "**sarei**", "**avrei**"], ["tu", "**saresti**", "**avresti**"], ["lui / lei / Lei", "**sarebbe**", "**avrebbe**"],
        ["noi", "**saremmo**", "**avremmo**"], ["voi", "**sareste**", "**avreste**"], ["loro", "**sarebbero**", "**avrebbero**"],
      ] },
    { type: "theory", text: "## Il condizionale presente di altri verbi irregolari" },
    { type: "gridTable", firstCol: true, head: ["", "io", "tu", "lui / lei / Lei", "noi", "voi", "loro"], rows: [
        ["ANDARE", "andrei", "andresti", "andrebbe", "andremmo", "andreste", "andrebbero"],
        ["BERE", "berrei", "berresti", "berrebbe", "berremmo", "berreste", "berrebbero"],
        ["DARE", "darei", "daresti", "darebbe", "daremmo", "dareste", "darebbero"],
        ["DIRE", "direi", "diresti", "direbbe", "diremmo", "direste", "direbbero"],
        ["DOVERE", "dovrei", "dovresti", "dovrebbe", "dovremmo", "dovreste", "dovrebbero"],
        ["FARE", "farei", "faresti", "farebbe", "faremmo", "fareste", "farebbero"],
        ["POTERE", "potrei", "potresti", "potrebbe", "potremmo", "potreste", "potrebbero"],
      ] },
  ],
};

export default page;
