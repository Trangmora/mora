import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 69 (Osserviamo bene, bài 7B: i verbi con ci). */
const page: BookPage = {
  id: "p069",
  number: 69,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Osserviamo bene · I verbi con ci",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p069-ex7b", label: "B", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "gridTable",
      head: ["", ""],
      rows: [
        ["**Ci** + pensare\n*(sostituisce: a lui, a lei, a loro, a questa cosa)*", "• Pensi molto ai tuoi bambini?\n○ Sì, **ci** penso molto.\n• Chi ha pensato a comprare la carne?\n○ **Ci** ha pensato Giulia."],
        ["**Ci** + credere\n*(sostituisce: a questa cosa)*", "• Piero, credi a quello che dico?\n○ No, non **ci** credo."],
        ["**Ci** + riuscire\n*(sostituisce: in questa cosa, a fare questa cosa)*", "• Sei riuscito a preparare il dolce ieri?\n○ No, non **ci** sono riuscito: l'ho comprato!\n• Dai, Matteo, fai l'esercizio di matematica!\n○ Ma… mamma, non **ci** riesco!"],
        ["**Ci** + provare\n*(sostituisce: a fare questa cosa)*", "• Vuoi provare ad andare in bicicletta?\n○ Volentieri, **ci** provo subito."],
        ["**Ci** + contare\n*(sostituisce: su questa cosa, su questa persona)*", "• Posso contare sul tuo aiuto?\n○ Certo, puoi contar**ci** sempre!"],
        ["**Ci** + stare\n*(sostituisce: con lui, con lei, con loro)*", "• Stai bene con lui?\n○ Sì, **ci** sto bene."],
        ["**Ci** + mettere = impiegare", "Per andare a Verona **ci** mettiamo 3 ore."],
        ["**Ci** + volere = essere necessario", "Per fare la marmellata **ci** sono voluti due chili di pesche."],
        ["**Ci** + avere = avere", "• Hai una sigaretta?\n○ No, non **ce** l'ho, non fumo.\n• Avete i libri di cucina?\n○ Sì, **ce** li abbiamo."],
      ],
    },
    { type: "theory", text: "! ATTENZIONE!" },
    {
      type: "gridTable",
      head: ["", ""],
      rows: [
        ["aver**cela** = essere arrabbiato, offeso", "Alberto **ce l'ha** sempre con me!"],
        ["far**cela** = riuscire a fare qualcosa", "• Puoi finire il lavoro per domani?\n○ Mi dispiace, ma non **ce la** faccio."],
        ["metter**cela** tutta = impegnarsi molto", "Studiare italiano è un po' difficile, ma **ce la** metto tutta!"],
      ],
    },
  ],
};

export default page;
