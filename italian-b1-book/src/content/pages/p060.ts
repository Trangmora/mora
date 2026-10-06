import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 60 (Grammatica: altri verbi irregolari, il condizionale passato). */
const page: BookPage = {
  id: "p060",
  number: 60,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", color: "#ef8a3a" },
  title: "Grammatica · Il condizionale passato",
  runningHead: "Grammatica",
  blocks: [
    { type: "gridTable", firstCol: true, head: ["", "io", "tu", "lui / lei / Lei", "noi", "voi", "loro"], rows: [
        ["RIMANERE", "rimarrei", "rimarresti", "rimarrebbe", "rimarremmo", "rimarreste", "rimarrebbero"],
        ["SAPERE", "saprei", "sapresti", "saprebbe", "sapremmo", "sapreste", "saprebbero"],
        ["STARE", "starei", "staresti", "starebbe", "staremmo", "stareste", "starebbero"],
        ["TENERE", "terrei", "terresti", "terrebbe", "terremmo", "terreste", "terrebbero"],
        ["TRADURRE", "tradurrei", "tradurresti", "tradurrebbe", "tradurremmo", "tradurreste", "tradurrebbero"],
        ["VEDERE", "vedrei", "vedresti", "vedrebbe", "vedremmo", "vedreste", "vedrebbero"],
        ["VENIRE", "verrei", "verresti", "verrebbe", "verremmo", "verreste", "verrebbero"],
        ["VIVERE", "vivrei", "vivresti", "vivrebbe", "vivremmo", "vivreste", "vivrebbero"],
        ["VOLERE", "vorrei", "vorresti", "vorrebbe", "vorremmo", "vorreste", "vorrebbero"],
      ] },
    {
      type: "theory",
      text: `
# Il condizionale passato
Formiamo il condizionale passato con il condizionale semplice di *avere* o *essere* + il participio passato del verbo.
`.trim(),
    },
    {
      type: "columns",
      cols: [
        [
          { type: "gridTable", firstCol: true, head: ["", "PARLARE"], rows: [
              ["io", "**avrei parlato**"], ["tu", "**avresti parlato**"], ["lui / lei / Lei", "**avrebbe parlato**"],
              ["noi", "**avremmo parlato**"], ["voi", "**avreste parlato**"], ["loro", "**avrebbero parlato**"],
            ] },
          { type: "gridTable", firstCol: true, head: ["", "USCIRE"], rows: [
              ["io", "**sarei uscito/a**"], ["tu", "**saresti uscito/a**"], ["lui / lei / Lei", "**sarebbe uscito/a**"],
              ["noi", "**saremmo usciti/e**"], ["voi", "**sareste usciti/e**"], ["loro", "**sarebbero usciti/e**"],
            ] },
          { type: "theory", text: "## Il condizionale passato di *essere* e *avere*" },
          { type: "gridTable", firstCol: true, head: ["", "ESSERE"], rows: [
              ["io", "**sarei stato/a**"], ["tu", "**saresti stato/a**"], ["lui / lei / Lei", "**sarebbe stato/a**"],
              ["noi", "**saremmo stati/e**"], ["voi", "**sareste stati/e**"], ["loro", "**sarebbero stati/e**"],
            ] },
        ],
        [
          { type: "gridTable", firstCol: true, head: ["", "AVERE"], rows: [
              ["io", "**avrei avuto**"], ["tu", "**avresti avuto**"], ["lui / lei / Lei", "**avrebbe avuto**"],
              ["noi", "**avremmo avuto**"], ["voi", "**avreste avuto**"], ["loro", "**avrebbero avuto**"],
            ] },
          {
            type: "theory",
            text: `
Usiamo il condizionale passato per:
- esprimere un'azione che non si è potuta realizzare nel passato o che non si può realizzare nel presente o nel futuro:
> Quando era bambina Pina **avrebbe voluto** fare equitazione, ma non ha potuto perché non c'era un maneggio vicino a casa sua.
%% • Domani dobbiamo partire… || ○ Peccato! **Sarebbe stato** bello rimanere con voi ancora un po'.
- esprimere un'azione futura rispetto a un momento del passato:
> La settimana scorsa ti avevo detto che non **avresti dovuto** telefonare a Matteo.
- presentare una notizia come non certa nel passato:
> I due attori **avrebbero divorziato**.
`.trim(),
          },
        ],
      ],
    },
  ],
};

export default page;
