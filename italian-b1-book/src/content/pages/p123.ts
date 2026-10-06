import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 123 (Verifica). */
const page: BookPage = {
  id: "p123",
  number: 123,
  unit: "6",
  unitTitle: "Cultura e società",
  title: "Verifica",
  addedOn: "2026-10-08",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U6", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p123-ex1",
        number: "1",
        kind: "fill",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo le frasi con i verbi al futuro semplice.",
        example: { q: "Se il treno non è in ritardo, (*noi, arrivare*) …… in tempo a Roma.", a: "Se il treno non è in ritardo, ***arriveremo*** in tempo a Roma." },
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thì tương lai đơn.", en: "Let's write: complete the sentences with the verbs in the simple future." },
        items: [
          { id: "1", prompt: "1. Se non smettete di ridere, tutta la gente (*accorgersi*) ___ della vostra maleducazione.", answers: ["si accorgerà"] },
          { id: "2", prompt: "2. Quando torno a casa, (*io, dovere*) ___ aiutare mia sorella.", answers: ["dovrò"] },
          { id: "3", prompt: "3. Che cosa (*volere*) ___ dirci Giulia?", answers: ["vorrà"] },
          { id: "4", prompt: "4. Se vedono quel programma in TV, i bambini (*spaventarsi*) ___.", answers: ["si spaventeranno"] },
          { id: "5", prompt: "5. Molti (*rimanere*) ___ in città durante l'estate.", answers: ["rimarranno"] },
          { id: "6", prompt: "6. Se la politica non cambia, i cittadini non (*avere*) ___ più fiducia nei loro rappresentanti.", answers: ["avranno"] },
          { id: "7", prompt: "7. (*Voi, fare*) ___ tutto questo per me?", answers: ["Farete"] },
          { id: "8", prompt: "8. Se non risparmiamo un po' di più, quest'anno non (*noi, andare*) ___ in vacanza.", answers: ["andremo"] },
          { id: "9", prompt: "9. Quando (*tu, decidersi*) ___ a chiamare tuo padre?", answers: ["ti deciderai"] },
          { id: "10", prompt: "10. Noi (*stare*) ___ a casa il prossimo fine settimana.", answers: ["staremo"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p123-ex2",
        number: "2",
        kind: "write",
        skill: "grammar",
        points: 10,
        instruction: "Trasformiamo le frasi e usiamo i verbi al futuro semplice e al futuro anteriore.",
        example: { q: "Prima prendiamo i soldi in banca, poi andiamo a fare acquisti.", a: "***Quando / Dopo che / Appena avremo preso i soldi in banca, andremo a fare acquisti.***" },
        tr: { vi: "Biến đổi câu, dùng thì tương lai đơn và tương lai hoàn thành.", en: "Let's transform the sentences using the simple future and the future perfect." },
        items: [
          { id: "1", prompt: "1. Prima finisco il lavoro, poi esco.", lines: 1, sample: "Dopo che avrò finito il lavoro, uscirò." },
          { id: "2", prompt: "2. Prima ascolta il dibattito, poi scegli le proposte che ti piacciono di più.", lines: 1, sample: "Quando avrai ascoltato il dibattito, sceglierai le proposte che ti piacciono di più." },
          { id: "3", prompt: "3. Prima guardano la partita in TV, poi fanno una passeggiata.", lines: 1, sample: "Dopo che avranno guardato la partita in TV, faranno una passeggiata." },
          { id: "4", prompt: "4. Prima incontriamo Daniela, poi torniamo a casa.", lines: 1, sample: "Appena avremo incontrato Daniela, torneremo a casa." },
          { id: "5", prompt: "5. Prima frequenti la scuola, poi puoi fare quello che vuoi.", lines: 1, sample: "Dopo che avrai frequentato la scuola, potrai fare quello che vuoi." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p123-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "1", lead: "usare il futuro semplice dei verbi regolari:", prompt: "Quando (*partire, voi*) ___ per l'Austria?", answers: ["partirete"] },
          { id: "2", lead: "usare il futuro semplice dei verbi irregolari:", prompt: "Sai che domani (*io, andare*) ___ in Francia?", answers: ["andrò"] },
          { id: "3", lead: "usare il futuro anteriore:", prompt: "A quel tempo mio nonno (*avere*) ___ cinquant'anni.", answers: ["avrà avuto"] },
          { id: "4", lead: "usare il futuro anteriore e il futuro semplice insieme:", prompt: "Dopo che (*io, fare*) ___ colazione, (*io, uscire*) ___.", answers: ["avrò fatto", "uscirò"] },
        ],
      },
    },
  ],
};

export default page;
