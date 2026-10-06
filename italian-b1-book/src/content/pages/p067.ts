import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 67 (Osserviamo bene, bài 5: i pronomi combinati). */
const page: BookPage = {
  id: "p067",
  number: 67,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Osserviamo bene · Me lo… / te lo…",
  runningHead: "Osserviamo bene",
  banner: "ME LO… / TE LO…",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p067-ex5a", number: "5", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "theory",
      text: `
%% • Mi dai il tuo libro? || ○ Sì, **te lo** do subito.
%% • Ci portate il dolce stasera? || ○ **Ve lo** portiamo certamente!
%% • Hai scritto la ricetta a Marisa? || ○ No, ancora non **gliel'**ho scritta.
===
%% • Avete preparato i crostini a Francesco? || ○ Sì, **glieli** abbiamo preparati con l'uovo e i capperi.
%% • Quando ti porto la bottiglia di Barolo? || ○ Potresti portar**mela** stasera per cena. / **Me la** potresti portare stasera per cena.
`.trim(),
    },
    { type: "theory", text: "^^ ***pronomi indiretti + pronomi diretti = pronomi combinati***" },
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
      type: "exercise",
      ex: {
        id: "p067-ex5b",
        label: "B",
        icons: ["match", "write"],
        kind: "match",
        skill: "grammar",
        instruction: "Abbiniamo e completiamo le frasi con i pronomi.",
        tr: { vi: "Nối và hoàn thành câu với đại từ kép.", en: "Let's match and complete the sentences with the pronouns." },
        left: [
          { id: "1", text: "Chi ti ha preparato i tortellini?" },
          { id: "2", text: "Dove potremmo andare a mangiare stasera?" },
          { id: "3", text: "Perché non mangi il tartufo?" },
          { id: "4", text: "Scusi, quando ci portano la pasta?" },
          { id: "5", text: "Hai cucinato gli spaghetti per me?" },
          { id: "6", text: "Avete dato la merenda ai bambini?" },
          { id: "7", text: "Chi ti ha detto questa cosa?" },
          { id: "8", text: "Mi puoi prendere un pacco di sale?" },
        ],
        right: [
          { id: "a", text: "…… …… portano appena è pronta." },
          { id: "b", text: "Certo, …… …… prendo subito." },
          { id: "c", text: "Sì, …… …… ho cucinati al dente, come li vuoi tu!" },
          { id: "d", text: "Me li ha preparati mia nonna perché sa che mi piacciono tanto." },
          { id: "e", text: "Perché ho scoperto di essere allergico: …… …… ha detto il dottore." },
          { id: "f", text: "Potremmo andare da “Pino”: …… …… ha consigliato un mio amico." },
          { id: "g", text: "No, …… diamo più tardi." },
          { id: "h", text: "…… …… ha detta Giovanni." },
        ],
        given: { "1": "d" },
        answer: { "1": "d", "2": "f", "3": "e", "4": "a", "5": "c", "6": "g", "7": "h", "8": "b" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p067-ex5b-pronomi",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Completiamo con i pronomi combinati.",
        tr: { vi: "Điền đại từ kép.", en: "Fill in the combined pronouns." },
        items: [
          { id: "a", prompt: "a. ___ ___ portano appena è pronta.", answers: ["Ve", "la"] },
          { id: "b", prompt: "b. Certo, ___ ___ prendo subito.", answers: ["te", "lo"] },
          { id: "c", prompt: "c. Sì, ___ ___ ho cucinati al dente, come li vuoi tu!", answers: ["te", "li"] },
          { id: "e", prompt: "e. Perché ho scoperto di essere allergico: ___ ___ ha detto il dottore.", answers: ["me", "lo|l'"] },
          { id: "f", prompt: "f. Potremmo andare da “Pino”: ___ ___ ha consigliato un mio amico.", answers: ["ce", "lo|l'"] },
          { id: "g", prompt: "g. No, ___ diamo più tardi.", answers: ["gliela"] },
          { id: "h", prompt: "h. ___ ___ ha detta Giovanni.", answers: ["Me", "l'|la"] },
        ],
      },
    },
  ],
};

export default page;
