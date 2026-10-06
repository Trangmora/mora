import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 82 (Grammatica: i verbi con ci, il pronome ne, i verbi con ne). */
const page: BookPage = {
  id: "p082",
  number: 82,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", color: "#ef8a3a" },
  title: "Grammatica · Il pronome ne",
  runningHead: "Grammatica",
  blocks: [
    {
      type: "theory",
      text: `
***restarci*** (o ***rimanerci***) ***male*** = offendersi
> Quando lo hai criticato **ci è rimasto male**.
***starci*** = essere d'accordo
%% • Venite in vacanza con noi? || ○ Io **ci sto**!
***volerci*** = essere necessario
%% • Quanto tempo **ci vuole** per arrivare a Roma? || ○ **Ci vogliono** due ore.
> Per fare la marmellata **ci sono voluti** due chili di pesche.
! ATTENZIONE!
***avercela*** = essere arrabbiato, offeso
> Alberto **ce l'ha** sempre con me!
***farcela*** = riuscire a fare qualcosa
%% • Hai superato l'esame? || ○ Sì, **ce l'ho fatta**!
***mettercela tutta*** = impegnarsi molto
> Studiare italiano è un po' difficile, ma **ce la metto tutta**!
# Il pronome *ne*
Il pronome *ne* sostituisce:
- di lui, di lei, di loro:
%% • Sai qualcosa di Vincenzo? || ○ No, non so niente **di lui**. = No, non **ne** so niente.
%% • Come si chiama quella ragazza? || ○ Non ricordo il nome **di lei**. = Non **ne** ricordo il nome.
%% • Avete parlato di Paola e Riccardo? || ○ Sì, abbiamo parlato spesso **di loro**. = Sì, **ne** abbiamo parlato spesso.
- di questa cosa:
%% • Hai comprato il pane? || ○ No, mi sono dimenticato **di questa cosa** = No, me **ne** sono dimenticato.
> Ti sei sposato! Sono contento **di questa cosa**. = **Ne** sono contento.
Il pronome *ne* può anche indicare una quantità, una parte di qualcosa (***ne* partitivo**):
%% • Vuoi del vino? || ○ Sì grazie, voglio un bicchiere **di vino**. = Sì grazie, **ne** voglio un bicchiere.
%% • Quanti caffè bevi al giorno? || ○ Bevo due **caffè**. = **Ne** bevo due.
===
! ATTENZIONE!
***ci + ne = ce ne***
%% • Quanto zucchero metti nel caffè? || ○ **Ci** metto due cucchiaini **di zucchero**. = **Ce ne** metto due cucchiaini.
## Il pronome *ne* con il passato prossimo
Quando il pronome *ne* è prima di un verbo al passato prossimo, il participio passato ha il genere (maschile o femminile) e il numero (singolare o plurale) del nome che il pronome sostituisce:
%% • Quante bottiglie di acqua minerale hai comprato? || ○ Ho comprato sei **bottiglie**. = **Ne** ho comprat**e** sei.
## I verbi con *ne*
***farne*** (o ***combinarne***) ***di tutti i colori*** = fare guai
> Quando eri piccolo, **ne facevi di tutti i colori**!
***non poterne più / averne abbastanza / averne fin sopra i capelli*** = essere stufo
> **Non ne posso più** delle sue chiacchiere!
> **Ne ho abbastanza** di lui e delle sue bugie!
> **Ne ho fin sopra i capelli** di tutti questi litigi!
***valerne la pena*** = essere vantaggioso, utile
> Il viaggio è faticoso, ma **ne vale la pena**.
! ATTENZIONE!
***andarsene*** = andare
> Sono stanco: **me ne vado** a casa.
***aversene a male*** = offendersi
> Non **te ne avere a male** per così poco!
***starsene*** = stare
> Federica **se ne sta** sempre in casa: non esce mai.
***uscirsene*** = dire all'improvviso, in modo inaspettato
> Ieri sera Amedeo **se ne è uscito** con un discorso strano.
`.trim(),
    },
  ],
};

export default page;
