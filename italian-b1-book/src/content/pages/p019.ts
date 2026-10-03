import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 19 (Verifica). */
const page: BookPage = {
  id: "p019",
  number: 19,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Verifica",
  addedOn: "2026-10-07",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U1", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p019-ex1",
        number: "1",
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con i verbi.",
        tr: { vi: "Cùng viết: hoàn thành câu với động từ.", en: "Let's write: complete the sentences with the verbs." },
        example: { q: "Ieri (*venire*) ………… a trovarmi i miei zii.", a: "Ieri ***sono venuti*** a trovarmi i miei zii." },
        points: 10,
        items: [
          { id: "1", prompt: "Da piccolo Luca (*andare*) ___ sempre al mare con i suoi genitori.", answers: ["andava"] },
          { id: "2", prompt: "Quando (*arrivare*) ___ il treno ieri sera?", answers: ["è arrivato"] },
          { id: "3", prompt: "Cosa (*tu, fare*) ___ oggi? (*tu, uscire*) ___ con me?", answers: ["fai", "esci"] },
          { id: "4", prompt: "Due anni fa (*io, cambiare*) ___ lavoro.", answers: ["ho cambiato"] },
          { id: "5", prompt: "(*tu, preferire*) ___ guardare un film alla TV o al cinema?", answers: ["Preferisci"] },
          { id: "6", prompt: "Mentre (*tu, ascoltare*) ___ la musica, (*io, leggere*) ___ un libro.", answers: ["ascoltavi", "leggevo"] },
          { id: "7", prompt: "Ieri mattina Carla (*alzarsi*) ___ presto e (*farsi*) ___ la doccia.", answers: ["si è alzata", "si è fatta"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p019-ex2",
        number: "2",
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con i pronomi.",
        tr: { vi: "Cùng viết: hoàn thành câu với đại từ.", en: "Let's write: complete the sentences with pronouns." },
        example: { q: "Daniela compra un cellulare per regalar………… a Luigi.", a: "Daniela compra un cellulare per regalar***lo*** a Luigi." },
        points: 10,
        items: [
          { id: "1", prompt: "Abbiamo il forno a microonde, ma non ___ usiamo mai.", answers: ["lo"] },
          { id: "2", prompt: "• Hai detto a Silvia di venire stasera? ○ Sì, ___ ho detto anche di portare un'amica.", answers: ["le"] },
          { id: "3", prompt: "Quando vedo Giuseppe e Francesca ___ dico tutto.", answers: ["gli"] },
          { id: "4", prompt: "• ___ puoi accompagnare dal dentista? ○ Sì ___ accompagno subito.", answers: ["Mi|Ci", "ti|vi"] },
          { id: "5", prompt: "Nonno, ___ racconti una favola?", answers: ["mi|ci"] },
          { id: "6", prompt: "• Chi porta la macchina fotografica? ○ ___ porto io!", answers: ["La"] },
          { id: "7", prompt: "• Sai dove sono i miei occhiali? ○ No, non ___ avevi in borsa?", answers: ["li"] },
          { id: "8", prompt: "• ___ potete dare una mano? ○ Sì, adesso ___ aiutiamo.", answers: ["Mi|Ci", "ti|vi"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p019-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "1", lead: "usare i verbi al presente indicativo:", prompt: "Stasera Anna e Mario (*venire*) ___ a casa mia.", answers: ["vengono"] },
          { id: "2", lead: "usare i verbi al passato prossimo:", prompt: "Che cosa (*tu, fare*) ___ ieri sera?", answers: ["hai fatto"] },
          {
            id: "3",
            lead: "usare i verbi all'imperfetto indicativo:",
            prompt: "Quando (*io, andare*) ___ a casa dei miei nonni (*essere*) ___ molto contento.",
            answers: ["andavo", "ero"],
          },
          { id: "4", lead: "usare i pronomi atoni diretti:", prompt: "• Compri il pane? ○ Sì, ___ compro subito.", answers: ["lo"] },
          { id: "5", lead: "usare i pronomi atoni indiretti:", prompt: "Ho incontrato Cesare e ___ ho detto tutto.", answers: ["gli"] },
          { id: "6", lead: "usare le preposizioni semplici:", prompt: "Tre italiani ___ 10 non leggono il giornale.", answers: ["su"] },
          { id: "7", lead: "usare le preposizioni articolate:", prompt: "A che ora esci ___ ufficio?", answers: ["dall'"] },
        ],
      },
    },
  ],
};

export default page;
