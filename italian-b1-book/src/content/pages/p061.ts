import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 61 (Verifica). */
const page: BookPage = {
  id: "p061",
  number: 61,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  title: "Verifica",
  addedOn: "2026-10-07",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U3", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p061-ex1",
        number: "1",
        kind: "fill",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo le frasi con i verbi al condizionale presente.",
        example: { q: "Chi (*volere*) …… venire al cinema con me stasera?", a: "Chi ***vorrebbe*** venire al cinema con me stasera?" },
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thì điều kiện hiện tại.", en: "Let's write: complete the sentences with the verbs in the present conditional." },
        items: [
          { id: "1", prompt: "Ti (*aiutare*) ___ ma non posso.", answers: ["aiuterei"] },
          { id: "2", prompt: "(*noi, bere*) ___ qualcosa di fresco perché fa molto caldo.", answers: ["Berremmo"] },
          { id: "3", prompt: "Scusate, (*potere*) ___ chiudere la porta?", answers: ["potreste"] },
          { id: "4", prompt: "Chi (*sapere*) ___ dirmi dov'è andato Luca?", answers: ["saprebbe"] },
          { id: "5", prompt: "Dobbiamo andare via presto, altrimenti (*rimanere*) ___ con voi.", answers: ["rimarremmo"] },
          { id: "6", prompt: "(*io, volere*) ___ andare a vedere quello spettacolo al teatro.", answers: ["Vorrei"] },
          { id: "7", prompt: "(*loro, dovere*) ___ studiare di più se vogliono passare l'esame.", answers: ["Dovrebbero"] },
          { id: "8", prompt: "Ci (*piacere*) ___ moltissimo vivere in Francia con i nostri amici.", answers: ["piacerebbe"] },
          { id: "9", prompt: "(*tu, tenere*) ___ il mio cane a casa tua questo pomeriggio?", answers: ["Terresti"] },
          { id: "10", prompt: "(*io, fare*) ___ tutto quello che vuoi per te!", answers: ["Farei"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p061-ex2",
        number: "2",
        kind: "fill",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo le frasi con i verbi al condizionale passato.",
        example: { q: "(*io, alzare*) …… più tardi ieri mattina, ma dovevo arrivare presto al lavoro.", a: "***Mi sarei alzato*** più tardi ieri mattina, ma dovevo arrivare presto al lavoro." },
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thì điều kiện quá khứ.", en: "Let's write: complete the sentences with the verbs in the past conditional." },
        items: [
          { id: "1", prompt: "(*noi, rimanere*) ___ volentieri, ma ci siamo accorti che era tardi.", answers: ["Saremmo rimasti|Saremmo rimaste"] },
          { id: "2", prompt: "(*io, dovere*) ___ andare all'ufficio postale, ma pensavo di andarci domani.", answers: ["Sarei dovuto|Sarei dovuta|Avrei dovuto"] },
          { id: "3", prompt: "(*noi, andare*) ___ a trovare Luca al mare, ma il tempo non era bello.", answers: ["Saremmo andati|Saremmo andate"] },
          { id: "4", prompt: "(*io, mangiare*) ___ volentieri delle ciliegie, ma erano finite.", answers: ["Avrei mangiato"] },
          { id: "5", prompt: "(*noi, dovere*) ___ andare via prima, ma ci dispiaceva lasciarvi.", answers: ["Saremmo dovuti|Saremmo dovute|Avremmo dovuto"] },
          { id: "6", prompt: "Al posto tuo (*io, riposare*) ___ invece di lavorare così tanto.", answers: ["mi sarei riposato|mi sarei riposata|avrei riposato"] },
          { id: "7", prompt: "Secondo una recente indagine gli italiani quest'anno (*leggere*) ___ più dell'anno scorso.", answers: ["avrebbero letto"] },
          { id: "8", prompt: "Non avevo il tuo numero di telefono, altrimenti (*io, chiamarti*) ___.", answers: ["ti avrei chiamato|ti avrei chiamata|avrei chiamato te"] },
          { id: "9", prompt: "Giorgio e Matteo (*volere*) ___ fare una bella vacanza, ma non avevano i soldi.", answers: ["avrebbero voluto"] },
          { id: "10", prompt: "Non potevamo aiutare Vincenzo, altrimenti (*farlo*) ___.", answers: ["l'avremmo fatto|lo avremmo fatto"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p061-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "1", lead: "usare il condizionale presente:", prompt: "1. Anna, (*essere*) ___ libera domenica?", answers: ["saresti"] },
          { id: "2", prompt: "2. Ho sete: (*bere*) ___ una birra.", answers: ["berrei"] },
          { id: "3", prompt: "3. Che cosa (*noi, potere*) ___ fare per te?", answers: ["potremmo"] },
          { id: "4", lead: "usare il condizionale passato:", prompt: "1. Sono dovuto tornare al lavoro, ma mi (*piacere*) ___ stare ancora qualche giorno in vacanza.", answers: ["sarebbe piaciuto"] },
          { id: "5", prompt: "2. Ieri ti avevo detto che oggi non (*dovere*) ___ chiamarmi perché non (*essere*) ___ in casa.", answers: ["avresti dovuto", "sarei stato|sarei stata"] },
          { id: "6", prompt: "3. Ieri il segretario dell'ONU (*incontrare*) ___ il presidente francese.", answers: ["avrebbe incontrato"] },
        ],
      },
    },
  ],
};

export default page;
