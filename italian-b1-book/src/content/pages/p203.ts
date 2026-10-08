import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 203 (Verifica bài 2, Ora sono capace di…). */
const page: BookPage = {
  id: "p203",
  number: 203,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  title: "Verifica",
  addedOn: "2026-10-08",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U10", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p203-ex2",
        number: "2",
        kind: "write",
        skill: "grammar",
        points: 10,
        instruction: "Trasformiamo le frasi con il si impersonale.",
        example: { q: "Paola è bella quando si veste bene.", a: "***Si è belli quando ci si veste bene.***" },
        tr: { vi: "Biến đổi câu dùng si phiếm chỉ.", en: "Let's transform the sentences using the impersonal si." },
        items: [
          { id: "1", prompt: "1. Quando siamo stanchi, diventiamo nervosi.", lines: 1, sample: "Quando si è stanchi, si diventa nervosi." },
          { id: "2", prompt: "2. Quando ci vediamo, parliamo sempre di sport.", lines: 1, sample: "Quando ci si vede, si parla sempre di sport." },
          { id: "3", prompt: "3. Quando Pino viaggia, si diverte.", lines: 1, sample: "Quando si viaggia, ci si diverte." },
          { id: "4", prompt: "4. Se Giorgio è allegro, è molto simpatico.", lines: 1, sample: "Se si è allegri, si è molto simpatici." },
          { id: "5", prompt: "5. Quando ho caldo, mi vesto con abiti leggeri.", lines: 1, sample: "Quando si ha caldo, ci si veste con abiti leggeri." },
          { id: "6", prompt: "6. Quando Michele lavora, pensa sempre alle ferie.", lines: 1, sample: "Quando si lavora, si pensa sempre alle ferie." },
          { id: "7", prompt: "7. Se non partono subito, non arrivano in tempo.", lines: 1, sample: "Se non si parte subito, non si arriva in tempo." },
          { id: "8", prompt: "8. Ieri non ci siamo visti e non ci siamo sentiti per telefono.", lines: 1, sample: "Ieri non ci si è visti e non ci si è sentiti per telefono." },
          { id: "9", prompt: "9. Se ci incontriamo, ci fermiamo sempre al bar per un caffè.", lines: 1, sample: "Se ci si incontra, ci si ferma sempre al bar per un caffè." },
          { id: "10", prompt: "10. Quando sto male, non ho voglia di parlare con nessuno.", lines: 1, sample: "Quando si sta male, non si ha voglia di parlare con nessuno." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p203-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "1", lead: "usare il si impersonale con i verbi al presente:", prompt: "1. ___ lavora bene qui.", answers: ["Si"] },
          { id: "2", prompt: "2. Oggi ___ va in vacanza.", answers: ["si"] },
          { id: "3", lead: "usare il si impersonale con i verbi al passato:", prompt: "1. Ieri (*lavorare*) ___ ___ ___ molto.", answers: ["si", "è", "lavorato"] },
          { id: "4", prompt: "2. Ieri (*andare*) ___ ___ ___ in vacanza.", answers: ["si", "è", "andati"] },
          { id: "5", lead: "usare il si impersonale con i verbi riflessivi, pronominali e reciproci al presente:", prompt: "1. ___ ___ veste in fretta la mattina.", answers: ["Ci", "si"] },
          { id: "6", prompt: "2. ___ ___ vede sempre il lunedì.", answers: ["Ci", "si"] },
          { id: "7", lead: "usare il si impersonale con i verbi riflessivi, pronominali e reciproci al passato:", prompt: "1. ___ ___ ___ vestiti in fretta ieri mattina.", answers: ["Ci", "si", "è"] },
          { id: "8", prompt: "2. ___ ___ ___ visti lunedì scorso.", answers: ["Ci", "si", "è"] },
          { id: "9", lead: "usare il si impersonale con il verbo essere al presente + aggettivo:", prompt: "___ ___ (*contento*) ___ quando si guadagna bene.", answers: ["Si", "è", "contenti"] },
          { id: "10", lead: "usare il si impersonale con il verbo essere al passato + aggettivo:", prompt: "___ ___ (*contento*) ___ quando si guadagnava bene.", answers: ["Si", "era", "contenti"] },
        ],
      },
    },
  ],
};

export default page;
