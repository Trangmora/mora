import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 141 (Grammatica: i gradi dell'aggettivo, il comparativo). */
const page: BookPage = {
  id: "p141",
  number: 141,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", color: "#ef8a3a" },
  title: "Grammatica · Il comparativo",
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# I gradi dell'aggettivo qualificativo
## Grado positivo
> Marco è **alto**.
## Grado comparativo
- comparativo di maggioranza: | Marco è **più alto di** Paolo.
- comparativo di minoranza: | Paolo è **meno alto di** Marco.
- comparativo di uguaglianza: | Marco è **alto come** Daniele.
## Grado superlativo
> Carlo è **molto alto**. = Carlo è **altissimo**.
# Il comparativo
Usiamo il comparativo per fare paragoni.
## Il comparativo di maggioranza e di minoranza
- Quando il paragone è fra due nomi, usiamo ***più*** o ***meno*** davanti all'aggettivo e ***di*** davanti al secondo nome:
> Jovanotti è **più** giovane **di** Gianni Morandi.
> Ligabue ha scritto **meno** canzoni **di** Vasco Rossi.
- Quando il paragone è fra due aggettivi, usiamo ***più*** o ***meno*** davanti al primo aggettivo e ***che*** davanti al secondo aggettivo:
> Gino Paoli ha composto canzoni **più** romantiche **che** ritmiche.
- Quando il paragone è fra due verbi, usiamo ***più*** o ***meno*** davanti all'aggettivo e ***che*** davanti al secondo verbo:
> Suonare Vivaldi è **meno** impegnativo **che** suonare Bach.
## Il comparativo di uguaglianza
- Quando il paragone è fra due nomi, usiamo ***come*** o ***quanto*** davanti al secondo nome e non usiamo niente davanti all'aggettivo:
> Francesco De Gregori è famoso **come / quanto** Antonello Venditti.
===
- Quando il paragone è fra due aggettivi, usiamo ***tanto*** (o non usiamo niente) davanti al primo aggettivo e ***quanto*** davanti al secondo aggettivo:
> La musica di Chopin è **tanto** emozionante **quanto** rilassante. / La musica di Chopin è emozionante **quanto** rilassante.
- Quando il paragone è fra due verbi usiamo ***come*** o ***quanto*** davanti al secondo verbo e non usiamo niente davanti all'aggettivo:
> Cantare è impegnativo **come / quanto** suonare.
## I comparativi irregolari
| | |
| più buono = migliore | più piccolo = minore
| più cattivo = peggiore | più alto = superiore
| più grande = maggiore | più basso = inferiore
> L'ultimo CD di Giorgia è **migliore** di quello di Gigi D'Alessio.
> L'ultimo CD di Gigi D'Alessio è **peggiore** di quello di Giorgia.
> La canzone di Eros Ramazzotti ha avuto un successo **maggiore** di quella di Laura Pausini.
> La canzone di Laura Pausini ha avuto un successo **minore** di quella di Eros Ramazzotti.
! ATTENZIONE!
Dopo ***superiore*** e ***inferiore*** usiamo la preposizione ***a***:
> Claudio Baglioni ha venduto un numero di dischi **superiore a** quello di Roberto Vecchioni.
> Roberto Vecchioni ha venduto un numero di dischi **inferiore a** quello di Claudio Baglioni.
## Il comparativo degli avverbi *bene* e *male*
| NO | SÌ
| più bene | meglio
| più male | peggio
> Oggi il coro ha cantato **meglio** di ieri.
> Ieri il coro ha cantato **peggio** di oggi.
# Il superlativo
Usiamo il superlativo per esprimere una qualità al massimo grado. In italiano abbiamo due tipi di superlativo: il **superlativo relativo** e il **superlativo assoluto**.
`.trim(),
    },
  ],
};

export default page;
