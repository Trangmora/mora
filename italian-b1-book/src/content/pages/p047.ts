import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 47 (bài 6C–D). */
const page: BookPage = {
  id: "p047",
  number: 47,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Osserviamo bene · Consigli e richieste",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p047-ex6c",
        label: "C",
        icons: ["read", "write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Leggiamo e completiamo le frasi con i verbi al condizionale.",
        tr: { vi: "Đọc và hoàn thành câu với động từ ở thì điều kiện.", en: "Let's read and complete the sentences with the verbs in the conditional." },
        example: { q: "1. • Scusa, sai dov'è una biblioteca qui vicino? ○ Sì, (*tu, dovere*) ***dovresti*** andare in piazza Mazzini: lì c'è la biblioteca comunale.", a: "***dovresti***" },
        items: [
          { id: "2", prompt: "• Possiamo fare una fotocopia? ○ Sì, (*voi, dovere*) ___ andare nell'altro ufficio.", answers: ["dovreste"] },
          { id: "3", prompt: "• Scusi professore, che cosa devo studiare per l'esame di storia? ○ (*Fare*) ___ meglio a riguardare gli appunti e poi (*potere*) ___ leggere l'ultimo libro di Le Goff.", answers: ["Farebbe|Faresti", "potrebbe|potresti"] },
          { id: "4", prompt: "• Scusate, (*noi, volere*) ___ andare fuori a cena: ci (*potere*) ___ consigliare un buon ristorante? ○ Sì, (*potere*) ___ mangiare alla trattoria «Sotto le fonti».", answers: ["vorremmo", "potreste", "potreste"] },
          { id: "5", prompt: "• Come faccio ad andare a Roma domattina? ○ (*dovere*) ___ prendere il treno perché non posso accompagnarti.", answers: ["Dovresti"] },
          { id: "6", prompt: "• (*Io, volere*) ___ comprare un vestito elegante: conosci un bel negozio qui a Firenze? ○ Certamente, (*fare*) ___ bene a guardare prima di tutto in Via Tornabuoni.", answers: ["Vorrei", "faresti"] },
          { id: "7", prompt: "• Come faccio a tenermi in forma? ○ (*dovere*) ___ fare un po' di sport.", answers: ["Dovresti"] },
          { id: "8", prompt: "• Quando (*noi, potere*) ___ vedere il film di Visconti? ○ Se avete tempo (*potere*) ___ vederlo con me stasera.", answers: ["potremmo", "potreste"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p047-ex6d",
        label: "D",
        icons: ["read", "write"],
        kind: "write",
        skill: "writing",
        instruction: "Leggiamo e completiamo le frasi.",
        example: { q: "1. • Vogliamo comprare una macchina nuova: ci consigliate un buon concessionario?", a: "○ Noi ***andremmo da «Sartini» perché ha macchine bellissime a prezzi convenienti.***" },
        tr: { vi: "Đọc và hoàn thành câu (dùng thì điều kiện để khuyên).", en: "Let's read and complete the sentences (give advice with the conditional)." },
        items: [
          { id: "2", prompt: "• Ho lavorato troppo! Sono molto stanca… ○ Io …", lines: 1, sample: "Io mi riposerei un po' e andrei a letto presto." },
          { id: "3", prompt: "• Non so che cosa comprare a Giovanna per il suo compleanno: che cosa mi suggerisci? ○ Io …", lines: 1, sample: "Io le regalerei un bel libro o un profumo." },
          { id: "4", prompt: "• Domani dobbiamo presentare la nostra relazione al professore: come potremmo cominciare? ○ Noi …", lines: 1, sample: "Noi cominceremmo con una breve introduzione sull'argomento." },
          { id: "5", prompt: "• Laura e Paolo non vogliono mai leggere: quale consiglio gli dareste? ○ Noi …", lines: 1, sample: "Noi gli consiglieremmo di cominciare con un romanzo breve e divertente." },
          { id: "6", prompt: "• Siamo indecisi: andiamo al mare o in montagna questa estate? ○ Io …", lines: 1, sample: "Io andrei in montagna, perché fa meno caldo e c'è meno gente." },
        ],
      },
    },
  ],
};

export default page;
