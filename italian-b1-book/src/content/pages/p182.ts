import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 182 (Grammatica: congiuntivo passato, espressioni con il congiuntivo). */
const page: BookPage = {
  id: "p182",
  number: 182,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", color: "#ef8a3a" },
  title: "Grammatica · Il congiuntivo passato",
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# Il congiuntivo passato
Formiamo il congiuntivo passato con il congiuntivo presente di *avere* o *essere* e il participio passato del verbo.
Usiamo il congiuntivo passato in una frase dipendente quando nella frase principale abbiamo un verbo all'indicativo presente.
===
Il congiuntivo passato esprime un'azione passata rispetto a quella della principale:
> **Penso** (adesso) **che** tu **abbia detto** (prima) la verità.
> **Credo che** Giulia **sia andata** al mare la settimana scorsa.
> **Suppongo che** Gianni **sia arrivato** ieri.
`,
    },
    { type: "gridTable", firstCol: true, head: ["", "ASCOLTARE", "LEGGERE", "SALIRE"], rows: [
        ["io", "**abbia ascoltato**", "**abbia letto**", "**sia salito/a**"],
        ["tu", "**abbia ascoltato**", "**abbia letto**", "**sia salito/a**"],
        ["lui / lei / Lei", "**abbia ascoltato**", "**abbia letto**", "**sia salito/a**"],
        ["noi", "**abbiamo ascoltato**", "**abbiamo letto**", "**siamo saliti/e**"],
        ["voi", "**abbiate ascoltato**", "**abbiate letto**", "**siate saliti/e**"],
        ["loro", "**abbiano ascoltato**", "**abbiano letto**", "**siano saliti/e**"],
      ] },
    { type: "gridTable", firstCol: true, head: ["", "ESSERE", "AVERE"], rows: [
        ["io", "**sia stato/a**", "**abbia avuto**"], ["tu", "**sia stato/a**", "**abbia avuto**"], ["lui / lei / Lei", "**sia stato/a**", "**abbia avuto**"],
        ["noi", "**siamo stati/e**", "**abbiamo avuto**"], ["voi", "**siate stati/e**", "**abbiate avuto**"], ["loro", "**siano stati/e**", "**abbiano avuto**"],
      ] },
    {
      type: "theory",
      text: `
# Espressioni con il congiuntivo
- Prima che:
> Devo andare in farmacia **prima che chiuda**.
- Nonostante, benché, sebbene, malgrado:
> **Nonostante abbia finito** l'università da due anni, Marco non ha trovato ancora lavoro.
> **Benché ci sia** il sole, fa freddo.
> Mio padre, **sebbene sia** anziano, è ancora agile.
> **Malgrado abbia** molte preoccupazioni, è sempre allegro.
- Purché, a patto che, a condizione che, basta che:
> Usciamo con voi **purché** non **facciate** troppo tardi.
> Lo perdono **a patto che** mi **chieda** scusa.
> Domenica faremo una gita **a condizione che** non **piova**.
> Potete giocare, **basta che** non **mettiate** tutto in disordine.
===
- Affinché, perché:
> Vi ho telefonato **affinché veniate** alla mia festa.
> Ti ho prestato quel libro **perché** tu lo **legga**.
- Senza che:
> Vogliamo organizzare una festa **senza che** Mauro lo **sappia**.
- A meno che non:
> Vanno a Firenze **a meno che non cambino** idea all'ultimo momento.
- Il più / meno… che:
> Questi libri sono **i più** interessanti **che** io **abbia letto**.
- Più / meno… di quanto:
> È molto **più** giovane **di quanto sembri**.
- Chiunque, comunque, dovunque, qualunque:
> **Chiunque dica** questo mente.
> **Comunque stiano** le cose, tu hai agito male.
> **Dovunque** tu **vada** io ti seguirò.
> **Qualunque** cosa tu **faccia**, per me va bene.
`,
    },
  ],
};

export default page;
