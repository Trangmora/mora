import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 121 (Grammatica: il futuro semplice). */
const page: BookPage = {
  id: "p121",
  number: 121,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", color: "#ef8a3a" },
  title: "Grammatica · Il futuro semplice",
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# Il futuro semplice
Usiamo il futuro semplice:
- per descrivere un'azione che si svolgerà nel futuro:
> La prossima settimana **arriverà** mio fratello dal Messico.
> **Leggerò** questo libro più tardi.
> Domani **sentirò** un concerto di musica classica.
- per fare ipotesi o previsioni:
%% • Quanti anni ha Giuseppe? || ○ Mah… **avrà** 30 anni.
===
%% • Che ora è? || ○ Non lo so, **saranno** le due.
> Domani forse **pioverà**.
! ATTENZIONE!
Spesso esprimiamo un'azione futura con il presente indicativo:
> **Parto** domani. = **Partirò** domani.
> **Faccio** i compiti dopo. = **Farò** i compiti dopo.
> Quando **sono** a Milano, **vedo** il Duomo. = Quando **sarò** a Milano, **vedrò** il Duomo.
`.trim(),
    },
    { type: "theory", text: "## Il futuro dei verbi regolari" },
    { type: "gridTable", firstCol: true, head: ["", "GUARDARE", "SCRIVERE", "DORMIRE"], rows: [
        ["io", "guard-**erò**", "scriv-**erò**", "dorm-**irò**"], ["tu", "guard-**erai**", "scriv-**erai**", "dorm-**irai**"], ["lui / lei / Lei", "guard-**erà**", "scriv-**erà**", "dorm-**irà**"],
        ["noi", "guard-**eremo**", "scriv-**eremo**", "dorm-**iremo**"], ["voi", "guard-**erete**", "scriv-**erete**", "dorm-**irete**"], ["loro", "guard-**eranno**", "scriv-**eranno**", "dorm-**iranno**"],
      ] },
    { type: "theory", text: "## Il futuro di *essere* e *avere*" },
    { type: "gridTable", firstCol: true, head: ["", "ESSERE", "AVERE"], rows: [
        ["io", "**sarò**", "**avrò**"], ["tu", "**sarai**", "**avrai**"], ["lui / lei / Lei", "**sarà**", "**avrà**"],
        ["noi", "**saremo**", "**avremo**"], ["voi", "**sarete**", "**avrete**"], ["loro", "**saranno**", "**avranno**"],
      ] },
    { type: "theory", text: "## Il futuro di altri verbi irregolari" },
    { type: "gridTable", firstCol: true, head: ["", "io", "tu", "lui / lei / Lei", "noi", "voi", "loro"], rows: [
        ["ANDARE", "andrò", "andrai", "andrà", "andremo", "andrete", "andranno"],
        ["BERE", "berrò", "berrai", "berrà", "berremo", "berrete", "berranno"],
        ["CADERE", "cadrò", "cadrai", "cadrà", "cadremo", "cadrete", "cadranno"],
        ["DARE", "darò", "darai", "darà", "daremo", "darete", "daranno"],
        ["DIRE", "dirò", "dirai", "dirà", "diremo", "direte", "diranno"],
        ["DOVERE", "dovrò", "dovrai", "dovrà", "dovremo", "dovrete", "dovranno"],
        ["FARE", "farò", "farai", "farà", "faremo", "farete", "faranno"],
        ["PARERE", "parrò", "parrai", "parrà", "parremo", "parrete", "parranno"],
        ["PORRE", "porrò", "porrai", "porrà", "porremo", "porrete", "porranno"],
      ] },
  ],
};

export default page;
