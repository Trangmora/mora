import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 100 (Grammatica: l'imperativo, gli imperativi irregolari). */
const page: BookPage = {
  id: "p100",
  number: 100,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", color: "#ef8a3a" },
  title: "Grammatica · L'imperativo",
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# L'imperativo
Usiamo l'imperativo per dare un comando, un ordine o per rivolgere un invito, una preghiera, un'esortazione.
| TU | VOI
| guarda | guardate
| scrivi | scrivete
| senti | sentite
> **Guarda** quel cartello!
> **Scrivi** un'e-mail a Giorgio!
> **Senti** bene le mie parole!
> **Mangiate** tutto!
> **Prendete** le chiavi!
> **Finite** i compiti!
===
L'imperativo ha soltanto la seconda persona singolare (*tu*) e la seconda persona plurale (*voi*). Per la terza persona singolare (*Lei*) e per la prima persona plurale (*noi*) usiamo queste forme:
| LEI | NOI
| guardi | guardiamo
| scriva | scriviamo
| senta | sentiamo
> Dottore, **guardi** qui!
> Signora, **scriva** il suo nome in questo modulo!
> **Senta** con attenzione quello che le devo dire!
> **Cantiamo** tutti insieme!
> **Vediamo** il film!
> **Partiamo** subito!
`.trim(),
    },
    { type: "theory", text: "# Gli imperativi irregolari" },
    {
      type: "gridTable",
      firstCol: true,
      head: ["", "TU", "LEI", "VOI"],
      rows: [
        ["andare", "**vai / va'**", "**vada**", "**andate**"],
        ["avere", "**abbi**", "**abbia**", "**abbiate**"],
        ["dare", "**dai / da'**", "**dia**", "**date**"],
        ["dire", "**di'**", "**dica**", "**dite**"],
        ["essere", "**sii**", "**sia**", "**siate**"],
        ["fare", "**fai / fa'**", "**faccia**", "**fate**"],
        ["sapere", "**sappi**", "**sappia**", "**sappiate**"],
        ["stare", "**stai / sta'**", "**stia**", "**state**"],
      ],
    },
    {
      type: "gridTable",
      head: ["TU", "LEI", "VOI"],
      rows: [
        ["**Va'** *fuori!*", "**Vada** *via!*", "**Andate** *a letto!*"],
        ["**Abbi** *fiducia!*", "**Abbia** *pietà di me!*", "**Abbiate** *un po' di pazienza!*"],
        ["*Piero,* **dà** *la penna a Claudio!*", "*La prego, ci* **dia** *un aiuto!*", "**Date** *i soldi a Daniele!*"],
        ["**Di'** *la verità!*", "**Dica** *33!*", "**Dite** *tutto ai vostri genitori!*"],
        ["**Sii** *giusto!*", "**Sia** *buono!*", "**Siate** *bravi!*"],
        ["**Fa'** *subito!*", "**Faccia** *attenzione!*", "**Fate** *presto, siamo in ritardo!*"],
        ["**Sappi** *una cosa!*", "**Sappia** *giudicare bene!*", "**Sappiate** *comportarvi.*"],
        ["**Sta'** *fermo!*", "**Stia** *calmo!*", "*Ragazzi,* **state** *zitti!*"],
      ],
    },
  ],
};

export default page;
