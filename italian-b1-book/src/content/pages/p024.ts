import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 24 (Osserviamo bene, bài 3–4A: il passato prossimo). */
const page: BookPage = {
  id: "p024",
  number: 24,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Osserviamo bene · Il passato prossimo",
  addedOn: "2026-10-06",
  runningHead: "Osserviamo bene",
  banner: "IO HO... / IO SONO...",
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p024-ex3a",
        number: "3",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        subtitle: "Il passato prossimo",
        tr: { vi: "Cùng đọc: thì passato prossimo.", en: "Let's read: the passato prossimo." },
        items: [],
      },
    },
    {
      type: "gridTable",
      head: ["Verbi transitivi", "Verbi intransitivi"],
      rows: [
        ["Due anni fa Anna **ha comprato** una casa in città.", "Lucia e Stefano **hanno pranzato** insieme."],
        ["Ieri **ho visto** un film in televisione.", "Andrea e Luigi **sono partiti** per Lisbona."],
      ],
    },
    {
      type: "theory",
      text: `
### Verbi intransitivi con *avere*
> abitare → **Abbiamo** abitato a Milano.
> cenare → **Avete** cenato fuori?
> parlare → **Hai** parlato con Paolo?
===
> passeggiare → Maria **ha** passeggiato per Roma.
> rispondere → Perché non mi **hai** risposto?
> telefonare → **Ho** telefonato a Pietro.
`.trim(),
    },
    {
      type: "exercise",
      ex: {
        id: "p024-ex3b",
        label: "B",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con i verbi al passato prossimo.",
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thì passato prossimo.", en: "Let's write: complete the sentences with the verbs in the passato prossimo." },
        example: { q: "1. Ieri (*ballare*) ***ho ballato*** tutta la sera alla festa di Antonio.", a: "***ho ballato***" },
        items: [
          { id: "2", prompt: "Domenica scorsa (*noi, giocare*) ___ a pallone.", answers: ["abbiamo giocato"] },
          { id: "3", prompt: "Luca e Irene (*viaggiare*) ___ per tutto il mondo.", answers: ["hanno viaggiato"] },
          { id: "4", prompt: "(*voi, pranzare*) ___ al ristorante ieri?", answers: ["Avete pranzato"] },
          { id: "5", prompt: "Chi (*bussare*) ___ alla porta?", answers: ["ha bussato"] },
          { id: "6", prompt: "Il bambino (*nuotare*) ___ in piscina con i suoi amici.", answers: ["ha nuotato"] },
          { id: "7", prompt: "(*io, camminare*) ___ tutto il giorno, ma non sono stanco.", answers: ["Ho camminato"] },
          { id: "8", prompt: "Gianna (*abitare*) ___ dieci anni a Parigi.", answers: ["ha abitato"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p024-ex4a",
        number: "4",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        tr: { vi: "Cùng đọc.", en: "Let's read." },
        items: [],
      },
    },
    {
      type: "theory",
      text: `
### Verbi intransitivi con *essere*
> costare → Quanto **è costata** la tua borsa?
> durare → Il film **è durato** due ore.
> piacere → Mi **sono piaciuti** molto i tuoi figli.
> succedere → Ieri **è successo** un problema alla mia macchina.

! ATTENZIONE!
### Verbi transitivi e intransitivi
`.trim(),
    },
    {
      type: "gridTable",
      head: ["con avere (transitivi)", "con essere (intransitivi)"],
      rows: [
        ["cambiare → Io **ho cambiato** lavoro due settimane fa.", "Il tempo **è cambiato**."],
        ["cominciare → Il professore **ha cominciato** la lezione.", "Il film **è cominciato** alle 8."],
        ["finire → I bambini **hanno finito** i compiti.", "La lezione **è finita**."],
        ["iniziare → Marco **ha iniziato** la scuola a settembre.", "Le vacanze **sono iniziate** a giugno."],
        ["passare → **Ho passato** un bel fine settimana a Capri.", "Luisa **è passata** da te alle 8."],
        ["salire → **Ho salito** le scale in fretta.", "**Siamo saliti** al quinto piano."],
        ["scendere → **Abbiamo sceso** le scale insieme.", "**Siamo scesi** dal treno a Verona."],
      ],
    },
  ],
};

export default page;
