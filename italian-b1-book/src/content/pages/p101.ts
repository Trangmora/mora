import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 101 (Grammatica: l'imperativo negativo, l'imperativo con i pronomi). */
const page: BookPage = {
  id: "p101",
  number: 101,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", color: "#ef8a3a" },
  title: "Grammatica · Imperativo negativo e pronomi",
  runningHead: "Grammatica",
  blocks: [
    {
      type: "theory",
      text: `
# L'imperativo negativo
Usiamo l'imperativo negativo per dire a una persona di non fare una cosa.
| TU | VOI
| non guardare | non guardate
| non scrivere | non scrivete
| non sentire | non sentite
Formiamo l'imperativo negativo con:
- 1. **non** + verbo all'infinito per la seconda persona singolare:
> **Non guardare** sempre la televisione!
> **Non scrivere** sul muro!
> **Non sentire** i suoi discorsi!
> **Non avere** paura: l'intervento chirurgico è molto semplice!
> **Non essere** cattivo!
- 2. **non** + verbo all'imperativo per la seconda persona plurale:
> **Non buttate** i rifiuti per terra!
> **Non mettete** in disordine!
> Bambini, **non aprite** la finestra!
> Ragazzi, **non fate** tardi stanotte!
> **Non dite** le bugie!
Per la terza persona singolare (*Lei*) e per la prima persona plurale (*noi*) usiamo queste forme:
| LEI | NOI
| non guardi | non guardiamo
| non scriva | non scriviamo
| non senta | non sentiamo
> Signor Rossi, **non mangi** troppi dolci!
> **Non prenda** il treno! Oggi c'è sciopero.
> **Non senta** i suoi consigli!
> **Non fumiamo**! Fa male alla salute.
> **Non beviamo** troppo vino!
===
# L'imperativo con i pronomi
## L'imperativo con i pronomi *mi, ti*, ecc. o con l'avverbio di luogo *ci*
### Quando il soggetto è *tu, noi, voi*
I pronomi *mi, ti*, ecc., i pronomi combinati *me lo, te lo*, ecc., l'avverbio di luogo *ci* seguono il verbo all'imperativo e formano con il verbo una parola sola:
%% • Quando telefono a Paola? || ○ **Telefonale** domani.
%% • Porto il libro a Gianni? || ○ Sì, **portaglielo**.
%% • Andiamo a casa? || ○ Sì, **andateci** subito!
Nell'imperativo negativo i pronomi possono precedere o seguire il verbo:
%% • Lascio la borsa sul tavolo? || ○ **Non la lasciare** sul tavolo! / **Non lasciarla** sul tavolo!
%% • Spedisco il pacco a Chiara? || ○ **Non glielo spedire**! / **Non spedirglielo**!
%% • Questa sera andiamo al cinema. || ○ **Non ci andate**, c'è un brutto film! / **Non andateci**, c'è un brutto film!
### Quando il soggetto è *Lei*
I pronomi *mi, ti*, ecc., i pronomi combinati *me lo, te lo*, ecc., l'avverbio di luogo *ci* precedono il verbo:
> I dolci ingrassano, **non li mangi**!
> Professore, gli studenti non hanno capito bene la lezione, **gliela spieghi** un'altra volta!
%% • Perché non va al lavoro? || ○ **Ci vada** lei!
## Gli imperativi *da', di', fa', sta', va'* con i pronomi
I pronomi *mi, ti*, ecc., i pronomi combinati *me lo, te lo*, ecc., l'avverbio di luogo *ci* raddoppiano…
`.trim(),
    },
  ],
};

export default page;
