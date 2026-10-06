import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 122 (Grammatica: altri verbi irregolari, stare per, il futuro anteriore). */
const page: BookPage = {
  id: "p122",
  number: 122,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", color: "#ef8a3a" },
  title: "Grammatica · Il futuro anteriore",
  runningHead: "Grammatica",
  blocks: [
    { type: "gridTable", firstCol: true, head: ["", "io", "tu", "lui / lei / Lei", "noi", "voi", "loro"], rows: [
        ["POTERE", "potrò", "potrai", "potrà", "potremo", "potrete", "potranno"],
        ["PRODURRE", "produrrò", "produrrai", "produrrà", "produrremo", "produrrete", "produrranno"],
        ["RIMANERE", "rimarrò", "rimarrai", "rimarrà", "rimarremo", "rimarrete", "rimarranno"],
        ["SAPERE", "saprò", "saprai", "saprà", "sapremo", "saprete", "sapranno"],
        ["STARE", "starò", "starai", "starà", "staremo", "starete", "staranno"],
        ["TENERE", "terrò", "terrai", "terrà", "terremo", "terrete", "terranno"],
        ["TRADURRE", "tradurrò", "tradurrai", "tradurrà", "tradurremo", "tradurrete", "tradurranno"],
        ["VALERE", "varrò", "varrai", "varrà", "varremo", "varrete", "varranno"],
        ["VEDERE", "vedrò", "vedrai", "vedrà", "vedremo", "vedrete", "vedranno"],
        ["VENIRE", "verrò", "verrai", "verrà", "verremo", "verrete", "verranno"],
        ["VIVERE", "vivrò", "vivrai", "vivrà", "vivremo", "vivrete", "vivranno"],
        ["VOLERE", "vorrò", "vorrai", "vorrà", "vorremo", "vorrete", "vorranno"],
      ] },
    {
      type: "theory",
      text: `
## Stare per + infinito
Usiamo *stare per* + infinito per esprimere un'azione futura immediata:
===
%% • **Sto per uscire**, hai bisogno del pane? || ○ No, grazie, lo comprerò più tardi.
%% • Perché non telefoni a Pietro? || ○ È inutile, ormai **starà per arrivare**.
`.trim(),
    },
    { type: "theory", text: "# Il futuro anteriore\nFormiamo il futuro anteriore con il futuro semplice di *avere* o *essere* e il participio passato del verbo." },
    {
      type: "columns",
      cols: [
        [
          { type: "gridTable", firstCol: true, head: ["", "ASCOLTARE"], rows: [["io", "**avrò ascoltato**"], ["tu", "**avrai ascoltato**"], ["lui / lei / Lei", "**avrà ascoltato**"], ["noi", "**avremo ascoltato**"], ["voi", "**avrete ascoltato**"], ["loro", "**avranno ascoltato**"]] },
          { type: "gridTable", firstCol: true, head: ["", "PARTIRE"], rows: [["io", "**sarò partito/a**"], ["tu", "**sarai partito/a**"], ["lui / lei / Lei", "**sarà partito/a**"], ["noi", "**saremo partiti/e**"], ["voi", "**sarete partiti/e**"], ["loro", "**saranno partiti/e**"]] },
        ],
        [
          { type: "gridTable", firstCol: true, head: ["", "AVERE", "ESSERE"], rows: [["io", "**avrò avuto**", "**sarò stato/a**"], ["tu", "**avrai avuto**", "**sarai stato/a**"], ["lui / lei / Lei", "**avrà avuto**", "**sarà stato/a**"], ["noi", "**avremo avuto**", "**saremo stati/e**"], ["voi", "**avrete avuto**", "**sarete stati/e**"], ["loro", "**avranno avuto**", "**saranno stati/e**"]] },
          {
            type: "theory",
            text: "Usiamo il futuro anteriore:\n- quando abbiamo due azioni al futuro e una precede l'altra:\n> Appena **saremo tornati** a casa, vi chiameremo.\n> Andrò all'università dopo che **avrò finito** la scuola superiore.\n> Quando **avrai letto** quel libro, capirai molte cose.\n- per esprimere incertezza nel passato:\n> Franco non è arrivato: il treno **avrà avuto** un ritardo.",
          },
        ],
      ],
    },
  ],
};

export default page;
