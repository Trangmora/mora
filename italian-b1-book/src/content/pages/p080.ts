import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 80 (Grammatica: pronomi diretti con il passato prossimo, pronomi combinati). */
const page: BookPage = {
  id: "p080",
  number: 80,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", color: "#ef8a3a" },
  title: "Grammatica · I pronomi combinati",
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# I pronomi diretti con il passato prossimo
Quando ci sono i pronomi diretti ***lo, la, li, le*** prima di un verbo al passato prossimo, il participio passato ha il genere (maschile o femminile) e il numero (singolare o plurale) del pronome:
%% • Chi ha preparato questi **ravioli**? || ○ **Li** ha fatt**i** mia cugina.
===
> Abbiamo cucinato **le lasagne** al ragù e **le** abbiamo mangiat**e** tutte!
I pronomi ***lo*** e ***la*** diventano ***l'*** davanti alle forme del verbo *avere* che cominciano per *h* o per *a*:
%% • Dove hai messo **il mestolo**? || ○ **L'**ho mess**o** nel cassetto.
%% • Avete mai provato **l'anatra** all'arancia? || ○ Sì, **l'**abbiamo assaggiat**a** una volta in una trattoria.
`.trim(),
    },
    { type: "theory", text: "# I pronomi combinati\nFormiamo i pronomi combinati con i pronomi indiretti e i pronomi diretti:" },
    {
      type: "gridTable",
      firstCol: true,
      head: ["", "lo", "la", "li", "le"],
      rows: [
        ["mi", "me lo", "me la", "me li", "me le"],
        ["ti", "te lo", "te la", "te li", "te le"],
        ["gli (= a lui)", "glielo", "gliela", "glieli", "gliele"],
        ["le (= a lei)", "glielo", "gliela", "glieli", "gliele"],
        ["ci", "ce lo", "ce la", "ce li", "ce le"],
        ["vi", "ve lo", "ve la", "ve li", "ve le"],
        ["gli (= a loro)", "glielo", "gliela", "glieli", "gliele"],
        ["si (riflessivo)", "se lo", "se la", "se li", "se le"],
      ],
    },
    {
      type: "theory",
      text: `
%% • Mi dai il tuo libro? || ○ Sì, **ti** do **il libro** subito! = Sì, **te lo** do subito.
%% • Ci portate il dolce stasera? || ○ **Vi** portiamo certamente **il dolce**! = **Ve lo** portiamo certamente!
%% • Chi spiega le regole a Giulio? || ○ Il professore **gli** spiega **le regole** = Il professore **gliele** spiega.
Quando ci sono i pronomi combinati ***glielo, gliela, glieli, gliele*** prima di un verbo al passato prossimo, il participio passato ha il genere (maschile o femminile) e il numero (singolare o plurale) del pronome:
%% • Hai scritto la ricetta a Marisa? || ○ No, ancora non ho scritto **la ricetta a Marisa**. = No, ancora non **gliel'**ho scritt**a**.
%% • Avete preparato i crostini a Francesco? || ○ Sì, abbiamo preparato **i crostini a Francesco** con l'uovo e i capperi. = Sì, **glieli** abbiamo preparat**i** con l'uovo e i capperi.
===
## La posizione dei pronomi combinati
I pronomi combinati sono prima del verbo. Sono dopo il verbo:
- con un verbo all'imperativo: | Ho bisogno del sale, passa**melo** per favore!
- con un verbo all'infinito (in questo caso il verbo perde la vocale finale): | Se ci sono novità, ti prego di comunicar**mele** subito.
Quando sono dopo il verbo, i pronomi combinati formano con il verbo una parola sola. Con i verbi servili (*dovere, potere, volere*) i pronomi combinati possono seguire il verbo all'infinito o precedere il verbo servile:
%% • Quando ti porto la bottiglia di Barolo? || ○ Potresti portar**mela** stasera per cena. / **Me la** potresti portare stasera per cena.
`.trim(),
    },
  ],
};

export default page;
