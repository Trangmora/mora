import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 91 (Osserviamo bene, bài 7: imperativi irregolari). */
const page: BookPage = {
  id: "p091",
  number: 91,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "Osserviamo bene · Fa' presto!",
  runningHead: "Osserviamo bene",
  banner: "FA' PRESTO!",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p091-ex7a", number: "7", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    { type: "theory", text: "! ATTENZIONE!\n> Veronica, **stai / sta'** zitta!\n> Signor Rossi, **faccia** attenzione!\n> **Abbiate** un po' di pazienza!\n===\n> Signora, **non abbia** paura: l'intervento chirurgico è molto semplice!\n> Ragazzi, **non fate** tardi stanotte!" },
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
      type: "exercise",
      ex: {
        id: "p091-ex7b",
        label: "B",
        icons: ["match", "write"],
        kind: "match",
        skill: "grammar",
        instruction: "Abbiniamo e completiamo le frasi con i verbi all'imperativo.",
        subtitle: "Dovete fare un regalo?",
        intro: "Seguite alcuni consigli e non sbaglierete…",
        tr: { vi: "Nối và hoàn thành câu với động từ ở thức mệnh lệnh. Bạn phải tặng quà ư? Hãy làm theo vài lời khuyên và bạn sẽ không sai…", en: "Let's match and complete the sentences with the imperative. Do you have to give a present? Follow some advice and you won't go wrong…" },
        left: [
          { id: "1", text: "(tenere, tu) Tieni conto dei gusti della persona che riceverà il dono," },
          { id: "2", text: "(essere, tu) …… generoso," },
          { id: "3", text: "Non (regalare, tu) …… un oggetto inutile:" },
          { id: "4", text: "(dare, tu) …… il regalo il giorno giusto:" },
          { id: "5", text: "(andare, tu) …… a fare un giro nei negozi:" },
          { id: "6", text: "(ricordarsi, tu) …… sempre di scrivere un piccolo biglietto," },
          { id: "7", text: "Da molto tempo non ricevi un regalo?" },
        ],
        right: [
          { id: "a", text: "(sapere) …… che spesso rimane chiuso in un cassetto!" },
          { id: "b", text: "perché le parole arrivano subito al cuore!" },
          { id: "c", text: "non (dimenticare, tu) …… il regalo nel cassetto!" },
          { id: "d", text: "non (comprare) …… la prima cosa che vedi!" },
          { id: "e", text: "(Avere, tu) …… fiducia: qualcuno prima o poi si ricorderà di te!" },
          { id: "f", text: "ma non (spendere) …… tutto il tuo patrimonio!" },
          { id: "g", text: "non (fare) fare affidamento solo sui tuoi gusti." },
        ],
        given: { "1": "g" },
        answer: { "1": "g", "2": "f", "3": "a", "4": "c", "5": "d", "6": "b", "7": "e" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p091-ex7b-verbi",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Completiamo con i verbi all'imperativo.",
        tr: { vi: "Điền động từ ở thức mệnh lệnh.", en: "Complete with the verbs in the imperative." },
        items: [
          { id: "2", prompt: "2. (*essere, tu*) ___ generoso,", answers: ["Sii"] },
          { id: "3", prompt: "3. Non (*regalare, tu*) ___ un oggetto inutile:", answers: ["regalare"] },
          { id: "4", prompt: "4. (*dare, tu*) ___ il regalo il giorno giusto:", answers: ["Da'|Dai"] },
          { id: "5", prompt: "5. (*andare, tu*) ___ a fare un giro nei negozi:", answers: ["Va'|Vai"] },
          { id: "6", prompt: "6. (*ricordarsi, tu*) ___ sempre di scrivere un piccolo biglietto,", answers: ["Ricordati"] },
          { id: "a", prompt: "a. (*sapere*) ___ che spesso rimane chiuso in un cassetto!", answers: ["Sappi"] },
          { id: "c", prompt: "c. non (*dimenticare, tu*) ___ il regalo nel cassetto!", answers: ["dimenticare"] },
          { id: "d", prompt: "d. non (*comprare*) ___ la prima cosa che vedi!", answers: ["comprare"] },
          { id: "e", prompt: "e. (*Avere, tu*) ___ fiducia: qualcuno prima o poi si ricorderà di te!", answers: ["Abbi"] },
          { id: "f", prompt: "f. ma non (*spendere*) ___ tutto il tuo patrimonio!", answers: ["spendere"] },
        ],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u5/p91-regali.jpg", alt: "Pacchi regalo colorati" }],
        [{ type: "photo", src: "images/u5/p91-pacco.jpg", alt: "Un pacco regalo a pois" }],
      ],
    },
  ],
};

export default page;
