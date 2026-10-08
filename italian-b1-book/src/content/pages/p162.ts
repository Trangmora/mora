import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 162 (Grammatica: verbi irregolari, di + infinito, congiuntivo nelle frasi indipendenti). */
const page: BookPage = {
  id: "p162",
  number: 162,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", color: "#ef8a3a" },
  title: "Grammatica · Il congiuntivo nelle frasi indipendenti",
  runningHead: "Grammatica",
  blocks: [
    { type: "gridTable", firstCol: true, head: ["", "io", "tu", "lui / lei / Lei", "noi", "voi", "loro"], rows: [
        ["SEDERE", "sieda", "sieda", "sieda", "sediamo", "sediate", "siedano"],
        ["SPEGNERE", "spenga", "spenga", "spenga", "spegniamo", "spegniate", "spengano"],
        ["STARE", "stia", "stia", "stia", "stiamo", "stiate", "stiano"],
        ["TENERE", "tenga", "tenga", "tenga", "teniamo", "teniate", "tengano"],
        ["TRADURRE", "traduca", "traduca", "traduca", "traduciamo", "traduciate", "traducano"],
        ["TOGLIERE", "tolga", "tolga", "tolga", "togliamo", "togliate", "tolgano"],
        ["USCIRE", "esca", "esca", "esca", "usciamo", "usciate", "escano"],
        ["VALERE", "valga", "valga", "valga", "valiamo", "valiate", "valgano"],
        ["VENIRE", "venga", "venga", "venga", "veniamo", "veniate", "vengano"],
        ["VOLERE", "voglia", "voglia", "voglia", "vogliamo", "vogliate", "vogliano"],
      ] },
    {
      type: "theory",
      text: `
! ATTENZIONE!
Al posto di “***che*** + congiuntivo” usiamo “***di*** + infinito” quando il soggetto è lo stesso nelle due frasi:
> Marco **spera di andare** al mare domenica.
> Io **penso di uscire** stasera.
Con i verbi *comandare, ordinare, permettere, proibire, vietare, chiedere*, possiamo usare “***di*** + infinito” o “***che*** + congiuntivo”:
> Il generale **ordina** ai soldati **di ritirarsi**.
> Il generale **ordina che** i soldati **si ritirino**.
> La legge **vieta** alle persone **di fumare** nei locali pubblici.
> La legge **vieta che** le persone **fumino** nei locali pubblici.
! ATTENZIONE!
Il verbo *sapere* regge il congiuntivo solo nelle frasi negative:
> **Non so** se Paul **sia** inglese o americano.
> **So** che Paul **è** americano.
===
# Il congiuntivo nelle frasi indipendenti
Usiamo il congiuntivo nelle frasi indipendenti per esprimere:
- un desiderio, un augurio:
> **Possiate** essere felici!
> **Voglia** il cielo che piova!
- un dubbio (la frase è una domanda e ha all'inizio *che*):
> Non mi ha salutato! Che non **si ricordi** di me?
> I conti non tornano: che **ci sia** un errore?
- un comando, un ordine o un invito, un'esortazione:
> **Stia** zitto!
> **Vada** via!
> **Parli** più lentamente, per favore!
> **Proviamo**!
Usiamo il congiuntivo al posto dell'imperativo nella terza persona singolare e nella prima persona plurale (guarda la GRAMMATICA dell'Unità 5).
`,
    },
  ],
};

export default page;
