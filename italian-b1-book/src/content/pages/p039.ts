import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 39 (Verifica). */
const page: BookPage = {
  id: "p039",
  number: 39,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Verifica",
  addedOn: "2026-10-06",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U2", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p039-ex1",
        number: "1",
        kind: "cloze",
        skill: "grammar",
        points: 20,
        instruction: "Scriviamo: completiamo il testo con i verbi al passato.",
        tr: { vi: "Cùng viết: hoàn thành đoạn văn với động từ ở thì quá khứ.", en: "Let's write: complete the text with the verbs in the past." },
        parts: [
          {
            boxed: true,
            text: [
              "Ciao Massimo,",
              "ti scrivo per dirti che finalmente il 4 giugno (*sposarsi*) {{=mi sono sposato}}! Noi l'(*decidere*) {{avevamo deciso|abbiamo deciso}} già da molto tempo, ma non (*trovare*) {{avevamo trovato|abbiamo trovato|avevamo mai trovato|abbiamo mai trovato}} mai il giorno giusto. Non ti dico quante difficoltà (*avere*) {{abbiamo avuto}}: prima di sposarci (*dovere*) {{abbiamo dovuto}} trovare la chiesa libera, (*incontrarsi*) {{ci siamo incontrati}} con il prete, (*dovere*) {{abbiamo dovuto}} scrivere la lista degli invitati in un'ora e l'(*portare*) {{abbiamo portata|abbiamo portato}} al ristorante che (*allestire*) {{aveva allestito|aveva già allestito}} già la sala per il rinfresco. (*noi, passare*) {{Abbiamo passato}} un periodo veramente stressante! Sai, (*io, divertirsi*) {{mi sono divertito}} anche a scegliere l'abito e le scarpe per me e per i miei!",
              "La festa (*essere*) {{è stata}} bellissima: (*cominciare*) {{è cominciata}} alle 7 di sera ed (*finire*) {{è finita}} alle 4 di notte! Gli invitati (*essere*) {{erano|sono stati}} felicissimi, Katrin (*essere*) {{era|è stata}} splendida. Il giorno dopo (*noi, partire*) {{siamo partiti}} per Buenos Aires, (*noi, viaggiare*) {{abbiamo viaggiato}} per 12 ore, ma il volo ci (*piacere*) {{è piaciuto}} moltissimo.",
              "(*noi, tornare*) {{Siamo tornati}} due settimane fa: stanchi ma entusiasti. È proprio vero: la mia vita (*cambiare*) {{è cambiata}}!",
              "Ti saluto e ti aspetto a casa nostra! Con affetto",
              "Pino",
            ].join("\n"),
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p039-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "1", lead: "usare il passato prossimo dei verbi transitivi e intransitivi:", prompt: "1. Gianni (*scendere*) ___ le scale in fretta.", answers: ["ha sceso"] },
          { id: "2", prompt: "2. I passeggeri (*scendere*) ___ dal treno.", answers: ["sono scesi"] },
          {
            id: "3",
            lead: "usare il passato prossimo e l'imperfetto insieme:",
            prompt: "1. Mentre Giorgio (*camminare*) ___, (*incontrare*) ___ Lucia.",
            answers: ["camminava", "ha incontrato"],
          },
          { id: "4", prompt: "2. (*io, accendere*) ___ la radio perché (*volere*) ___ ascoltare un po' di musica.", answers: ["Ho acceso", "volevo"] },
          {
            id: "5",
            lead: "usare il trapassato prossimo:",
            prompt: "Quando siamo arrivati a casa, Stefania (*partire*) ___ già ___.",
            answers: ["era", "partita"],
          },
        ],
      },
    },
  ],
};

export default page;
