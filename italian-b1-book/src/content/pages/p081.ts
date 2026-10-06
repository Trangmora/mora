import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 81 (Grammatica: i verbi con la, l'avverbio di luogo ci, il pronome ci). */
const page: BookPage = {
  id: "p081",
  number: 81,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", color: "#ef8a3a" },
  title: "Grammatica · Ci e i verbi con la",
  runningHead: "Grammatica",
  blocks: [
    {
      type: "theory",
      text: `
## I verbi con *la*
***farla finita*** =
- 1. smettere: | Basta, **fatela finita**!
- 2. uccidersi: | Era stanco di vivere e ha deciso di **farla finita**.
***farla franca*** = non essere scoperto
> Questa volta il colpevole non è riuscito a **farla franca**.
***farla pagare*** (a una persona) = vendicarsi.
> Giuro che te **la farò pagare**.
***finirla / smetterla*** = smettere, interrompere
> **Finiscila** con questi capricci!
> **Smettetela** di fare chiasso!
***saperla lunga*** = essere molto furbo.
> Mario **la sa lunga**, non ti fidare!
! ATTENZIONE!
***cavarsela*** = superare abbastanza bene una situazione difficile
%% • Com'è andato l'esame? || ○ **Me la sono cavata**.
***darsela a gambe / svignarsela*** = fuggire, scappare
> I ladri **se la sono data a gambe**.
***prendersela*** = offendersi, arrabbiarsi
> Non **te la prendere** per questa sciocchezza!
***vedersela brutta*** = essere in pericolo
> Ho avuto un incidente e **me la sono vista brutta**.
# L'avverbio di luogo *ci*
***ci*** = in quel luogo, lì; in questo luogo, qui
%% • Venite in trattoria con noi? || ○ Sì, veniamo **in trattoria** volentieri. = Sì, **ci** veniamo volentieri.
! ATTENZIONE!
***mi, ti, vi + ci = mi ci, ti ci, vi ci***
%% • Mi porti a casa? || ○ Sì, **ti** porto **a casa** subito. = Sì, **ti ci** porto subito.
***ci + lo, la, li, le = ce lo, ce la, ce li, ce le***
%% • Chi accompagna le bambine a scuola? || ○ **A scuola le** accompagna Franco. = **Ce le** accompagna Franco.
===
# Il pronome *ci*
Il pronome *ci* sostituisce:
- a lui, a lei, a loro o a questa cosa:
%% • Pensi molto ai tuoi bambini? || ○ Sì, penso molto **a loro**. = Sì, **ci** penso molto.
%% • Piero, credi a quello che dico? || ○ No, non credo **a questa cosa**. = No, non **ci** credo.
- su di lui, su di lei, su di loro o su questa cosa:
%% • Posso contare su Mario? || ○ Certo, puoi contare **su di lui**! = Certo, puoi contar**ci**!
%% • Ti aiuto volentieri. || ○ Conto **su questa cosa**! = **Ci** conto!
- di questa cosa:
%% • Sei un esperto di automobili? || ○ Non capisco niente **di questa cosa**. = Non **ci** capisco niente.
- in questa cosa, a fare questa cosa:
%% • Sei riuscito a preparare il dolce ieri? || ○ No, non sono riuscito **a fare questa cosa**. = No, non **ci** sono riuscito.
%% • Vuoi provare ad andare in bicicletta? || ○ Provo **a fare questa cosa** domani. = **Ci** provo domani.
- con lui, con lei, con loro:
%% • Stai bene **con lui**? || ○ Sì, **ci** sto bene.
## I verbi con *ci*
***averci*** = avere
%% • Hai una sigaretta? || ○ No, non **ce l'ho**, non fumo.
%% • Avete i libri di cucina? || ○ Sì, **ce li abbiamo**.
***entrarci*** = avere relazione con qualcosa
> Questo non **c'entra** con quello che stavo dicendo.
> In tutta questa storia io non **c'entro** niente.
***metterci*** = impiegare
%% • Quanto tempo **ci metti** per andare a Verona? || ○ **Ci metto** tre ore.
`.trim(),
    },
  ],
};

export default page;
