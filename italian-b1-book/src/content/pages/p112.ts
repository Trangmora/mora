import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 112 (Osserviamo bene, bài 8: il futuro anteriore). */
const page: BookPage = {
  id: "p112",
  number: 112,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Osserviamo bene · Il futuro anteriore",
  runningHead: "Osserviamo bene",
  banner: "SARÀ USCITO",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p112-ex8a", number: "8", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il futuro anteriore", tr: { vi: "Cùng đọc: thì tương lai hoàn thành.", en: "Let's read: the future perfect." }, items: [] },
    },
    { type: "theory", text: "> Appena **saremo tornati** a casa, vi chiameremo.\n> Andrò all'università dopo che **avrò finito** la scuola superiore.\n===\n> Quando **avrai letto** quel libro, capirai molte cose.\n^^ ***futuro semplice di avere o essere + participio passato del verbo***" },
    { type: "gridTable", firstCol: true, head: ["", "ASCOLTARE", "PARTIRE"], rows: [
        ["io", "**avrò ascoltato**", "**sarò partito/a**"], ["tu", "**avrai ascoltato**", "**sarai partito/a**"], ["lui / lei / Lei", "**avrà ascoltato**", "**sarà partito/a**"],
        ["noi", "**avremo ascoltato**", "**saremo partiti/e**"], ["voi", "**avrete ascoltato**", "**sarete partiti/e**"], ["loro", "**avranno ascoltato**", "**saranno partiti/e**"],
      ] },
    { type: "gridTable", firstCol: true, head: ["", "AVERE", "ESSERE"], rows: [
        ["io", "**avrò avuto**", "**sarò stato/a**"], ["tu", "**avrai avuto**", "**sarai stato/a**"], ["lui / lei / Lei", "**avrà avuto**", "**sarà stato/a**"],
        ["noi", "**avremo avuto**", "**saremo stati/e**"], ["voi", "**avrete avuto**", "**sarete stati/e**"], ["loro", "**avranno avuto**", "**saranno stati/e**"],
      ] },
    { type: "theory", text: "## Il futuro anteriore per… esprimere incertezza nel passato\n> Franco non è arrivato: il treno **avrà avuto** un ritardo." },
    {
      type: "exercise",
      ex: {
        id: "p112-ex8b",
        label: "B",
        icons: ["match", "write"],
        kind: "match",
        skill: "grammar",
        instruction: "Abbiniamo e completiamo le frasi con i verbi al futuro semplice e anteriore.",
        tr: { vi: "Nối và hoàn thành câu với động từ ở thì tương lai đơn và tương lai hoàn thành.", en: "Let's match and complete the sentences with the simple future and future perfect." },
        left: [
          { id: "1", text: "Quando Luca (andare) sarà andato al lavoro," },
          { id: "2", text: "Dopo che (loro, aprire) …… un conto in banca," },
          { id: "3", text: "Quella trasmissione (essere) …… importante," },
          { id: "4", text: "Quando (tu, comprare) …… il giornale e (tu, leggere) …… le ultime notizie di economia," },
          { id: "5", text: "Dopo che Clara (prenotare) …… il biglietto in agenzia," },
          { id: "6", text: "Appena (noi, chiedere) …… un consiglio a Piero," },
        ],
        right: [
          { id: "a", text: "(noi, sapere) …… cosa fare." },
          { id: "b", text: "ma non mi è piaciuta." },
          { id: "c", text: "(partire) …… per l'Egitto." },
          { id: "d", text: "(tu, capire) …… un po' la situazione finanziaria europea." },
          { id: "e", text: "(loro, potere) …… chiedere un mutuo per la casa." },
          { id: "f", text: "(parlare) parlerà con il suo capoufficio." },
        ],
        given: { "1": "f" },
        answer: { "1": "f", "2": "e", "3": "b", "4": "d", "5": "c", "6": "a" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p112-ex8b-verbi",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Completiamo con i verbi al futuro semplice e anteriore.",
        tr: { vi: "Điền động từ ở thì tương lai đơn và tương lai hoàn thành.", en: "Complete with the simple future and the future perfect." },
        items: [
          { id: "2", prompt: "2. Dopo che (*loro, aprire*) ___ un conto in banca, (*loro, potere*) ___ chiedere un mutuo per la casa.", answers: ["avranno aperto", "potranno"] },
          { id: "3", prompt: "3. Quella trasmissione (*essere*) ___ importante, ma non mi è piaciuta.", answers: ["sarà stata"] },
          { id: "4", prompt: "4. Quando (*tu, comprare*) ___ il giornale e (*tu, leggere*) ___ le ultime notizie di economia, (*tu, capire*) ___ un po' la situazione finanziaria europea.", answers: ["avrai comprato", "avrai letto", "capirai"] },
          { id: "5", prompt: "5. Dopo che Clara (*prenotare*) ___ il biglietto in agenzia, (*partire*) ___ per l'Egitto.", answers: ["avrà prenotato", "partirà"] },
          { id: "6", prompt: "6. Appena (*noi, chiedere*) ___ un consiglio a Piero, (*noi, sapere*) ___ cosa fare.", answers: ["avremo chiesto", "sapremo"] },
        ],
      },
    },
  ],
};

export default page;
