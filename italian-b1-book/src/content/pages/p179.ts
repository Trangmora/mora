import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 179 (Lessico, bài 16–18). */
const page: BookPage = {
  id: "p179",
  number: 179,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", color: "#d8333a" },
  title: "Lessico · Contrari e professioni",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p179-ex16",
        number: "16",
        icons: ["write"],
        kind: "fill",
        skill: "writing",
        instruction: "Scriviamo: troviamo i contrari.",
        example: { q: "1. parlare →", a: "***stare in silenzio, tacere, …***" },
        tr: { vi: "Cùng viết: tìm từ trái nghĩa.", en: "Let's write: find the opposites." },
        items: [
          { id: "2", prompt: "2. crisi → ___", answers: ["sviluppo|crescita|benessere|ripresa|boom"] },
          { id: "3", prompt: "3. ricchezza → ___", answers: ["povertà|miseria"] },
          { id: "4", prompt: "4. importazione → ___", answers: ["esportazione"] },
          { id: "5", prompt: "5. lavorare → ___", answers: ["riposare|riposarsi|oziare|non fare niente"] },
          { id: "6", prompt: "6. domandare → ___", answers: ["rispondere"] },
          { id: "7", prompt: "7. offerta (in economia) → ___", answers: ["domanda"] },
          { id: "8", prompt: "8. sussurrare → ___", answers: ["gridare|urlare"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p179-ex17",
        number: "17",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: rispondiamo alle domande.",
        example: { q: "1. Che cosa fa un giornalista quando intervista un personaggio?", a: "***Fa domande, …***" },
        tr: { vi: "Cùng viết: trả lời các câu hỏi.", en: "Let's write: answer the questions." },
        items: [
          { id: "2", prompt: "2. Che cosa fa uno psichiatra quando analizza un paziente?", lines: 1, sample: "Lo ascolta, gli fa domande e cerca di capire i suoi problemi." },
          { id: "3", prompt: "3. Che cosa fa un regista quando gira un film?", lines: 1, sample: "Dirige gli attori e decide come girare le scene." },
          { id: "4", prompt: "4. Che cosa fa un manager d'azienda?", lines: 1, sample: "Organizza il lavoro, prende decisioni e gestisce il personale." },
          { id: "5", prompt: "5. Che cosa fa un impiegato delle Poste?", lines: 1, sample: "Spedisce lettere e pacchi, fa vaglia e telegrammi, riceve i pagamenti dei bollettini." },
          { id: "6", prompt: "6. Che cosa fa uno stilista?", lines: 1, sample: "Disegna e crea abiti e collezioni di moda." },
          { id: "7", prompt: "7. Che cosa fa un parlamentare?", lines: 1, sample: "Discute e vota le leggi in Parlamento." },
          { id: "8", prompt: "8. Che cosa fa un conduttore di trasmissioni televisive?", lines: 1, sample: "Presenta i programmi in TV e intervista gli ospiti." },
          { id: "9", prompt: "9. Che cosa fa un astronomo?", lines: 1, sample: "Studia le stelle, i pianeti e l'universo." },
          { id: "10", prompt: "10. Che cosa fa un interprete?", lines: 1, sample: "Traduce a voce da una lingua a un'altra." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p179-ex18",
        number: "18",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        tr: { vi: "Cùng viết.", en: "Let's write." },
        items: [{ id: "1", prompt: "Fate una lista di tutte le professioni che conoscete.", lines: 3, sample: "medico, infermiere, avvocato, insegnante, ingegnere, architetto, cuoco, cameriere, commesso, giornalista, attore, regista, poliziotto, idraulico, elettricista…" }],
      },
    },
  ],
};

export default page;
