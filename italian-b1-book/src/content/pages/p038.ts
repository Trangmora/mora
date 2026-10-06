import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 38 (Grammatica: passato prossimo e imperfetto insieme, trapassato prossimo). */
const page: BookPage = {
  id: "p038",
  number: 38,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Grammatica · Il trapassato prossimo",
  addedOn: "2026-10-06",
  runningHead: "Grammatica",
  sideTab: { unit: "U2", color: "#ef8a3a" },
  blocks: [
    {
      type: "theory",
      text: `
## Il passato prossimo e l'imperfetto
Usiamo il passato prossimo per descrivere un'azione che avviene in un momento preciso del passato e l'imperfetto per descrivere un'azione continuata nel passato:
> Un anno fa, a Palermo, **ho mangiato** la cassata. / A Palermo **mangiavo** la cassata ogni giorno.

Possiamo usare il passato prossimo e l'imperfetto insieme:
- per descrivere un'azione precisa del passato (**passato prossimo**) all'interno di una situazione in svolgimento (**imperfetto**):
> Ieri sera, mentre **guardavo** la partita in televisione, Claudio mi **ha telefonato**.
> **Abbiamo incontrato** Andrea e Cristina mentre **passeggiavano**.
> Mentre Lucia **apparecchiava** la tavola **è caduto** un bicchiere.
> Marco **è entrato** in camera mentre Paolo **dormiva**.
- per descrivere un'azione precisa del passato (**passato prossimo**) e la causa che ha determinato quell'azione (**imperfetto**):
> **Ho acceso** la TV perché **volevo** ascoltare le notizie del telegiornale.
> Luca **è andato** in gioielleria perché **doveva** comprare un anello.
> Non **avevo** niente da mangiare e così **ho fatto** la spesa.

# Il trapassato prossimo
Formiamo il trapassato prossimo con l'imperfetto di ***avere*** o ***essere*** + il participio passato del verbo.
`.trim(),
    },
    {
      type: "gridTable",
      firstCol: true,
      split: [3],
      head: ["", "guardare", "partire", "avere", "essere"],
      rows: [
        ["io", "avevo guardato", "ero partito/a", "avevo avuto", "ero stato/a"],
        ["tu", "avevi guardato", "eri partito/a", "avevi avuto", "eri stato/a"],
        ["lui / lei / Lei", "aveva guardato", "era partito/a", "aveva avuto", "era stato/a"],
        ["noi", "avevamo guardato", "eravamo partiti/e", "avevamo avuto", "eravamo stati/e"],
        ["voi", "avevate guardato", "eravate partiti/e", "avevate avuto", "eravate stati/e"],
        ["loro", "avevano guardato", "erano partiti/e", "avevano avuto", "erano stati/e"],
      ],
    },
    {
      type: "theory",
      text: `
Il trapassato prossimo esprime un'azione compiuta nel passato prima di un'altra azione passata:
> Quando sono arrivato Carla **era** già **uscita**.
> Ieri sera Marco era felice perché **aveva superato** un esame difficile.
===
! ATTENZIONE!
Possiamo usare il trapassato prossimo anche da solo:
> Che carino tuo figlio! Non l'**avevo** mai **visto** prima!
`.trim(),
    },
  ],
};

export default page;
