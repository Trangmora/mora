import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 97 (Lessico, bài 16–18). */
const page: BookPage = {
  id: "p097",
  number: 97,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", color: "#d8333a" },
  title: "Lessico · Esercizi",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p097-ex16",
        number: "16",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo il significato delle parole e delle espressioni.",
        example: { q: "1. *Maleducazione* significa:", a: "***mancanza di cortesia e di rispetto verso gli altri.***" },
        tr: { vi: "Viết nghĩa của các từ và thành ngữ.", en: "Let's write the meaning of the words and expressions." },
        items: [
          { id: "2", prompt: "*Fare la raccolta differenziata* significa:", lines: 1, sample: "dividere i rifiuti per tipo (carta, vetro, plastica…) per poterli riciclare." },
          { id: "3", prompt: "*Guidare con prudenza* significa:", lines: 1, sample: "guidare con attenzione, senza correre e rispettando le regole." },
          { id: "4", prompt: "*Offendere* significa:", lines: 1, sample: "dire o fare qualcosa che ferisce un'altra persona." },
          { id: "5", prompt: "*Ridere smodatamente* significa:", lines: 1, sample: "ridere in modo esagerato e rumoroso." },
          { id: "6", prompt: "*Educazione civica* significa:", lines: 1, sample: "la materia che insegna i diritti e i doveri dei cittadini." },
          { id: "7", prompt: "*Ricevere un'educazione rigida* significa:", lines: 1, sample: "essere educati con regole molto severe." },
          { id: "8", prompt: "*Educazione fisica* significa:", lines: 1, sample: "la materia scolastica dedicata allo sport e al movimento." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p097-ex17",
        number: "17",
        icons: ["write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con le parole giuste.",
        tr: { vi: "Cùng viết: hoàn thành câu với từ thích hợp.", en: "Let's write: complete the sentences with the right words." },
        parts: [
          {
            text: "1. Se siamo degli {{=automobilisti}} corretti, a un incrocio diamo la {{precedenza}} a destra, non suoniamo il {{clacson}} quando non è necessario, non superiamo i limiti di {{velocità}}, non passiamo con il semaforo {{rosso}}.\n2. Rispettare i capolavori artistici significa: non toccare le {{opere}} d'arte, non {{rovinare|sporcare|toccare|danneggiare}} i monumenti antichi, non {{fotografare}} con il flash i dipinti, non {{lasciare|mettere|appoggiare|avvicinare}} oggetti vicino alle statue.\n3. Seguire un regime di vita sano significa: {{fare|praticare}} sport, avere un'{{alimentazione}} sana, {{passare|trascorrere}} ore all'aria aperta, non fare {{vita}} sedentaria, non fumare.\n4. Saper stare a tavola significa: {{alzarsi}} da tavola solo quando tutti hanno finito di mangiare, {{usare}} appropriatamente le posate, non {{mangiare|masticare}} rumorosamente, non {{fare|iniziare|avere}} conversazioni sgradevoli, fare dei {{commenti|complimenti}} positivi sul cibo.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p097-ex18",
        number: "18",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: associamo le parole.",
        tr: { vi: "Cùng viết: liên tưởng các từ cho mỗi chủ đề (cách nhau bằng dấu phẩy).", en: "Let's write: associate words with each topic (separate with commas)." },
        items: [
          { id: "1", prompt: "INQUINARE", starter: "gettare rifiuti per strada", lines: 2, sample: "gettare rifiuti per strada, usare troppo la macchina, sprecare l'acqua, non fare la raccolta differenziata" },
          { id: "2", prompt: "RISPETTARE LA CULTURA DEGLI ALTRI POPOLI", starter: "non giudicare le abitudini degli altri", lines: 2, sample: "non giudicare le abitudini degli altri, imparare la loro lingua, rispettare la religione, assaggiare la cucina locale" },
          { id: "3", prompt: "ESSERE MALEDUCATI", starter: "dire parolacce", lines: 2, sample: "dire parolacce, interrompere la conversazione, arrivare in ritardo, non salutare" },
        ],
      },
    },
  ],
};

export default page;
