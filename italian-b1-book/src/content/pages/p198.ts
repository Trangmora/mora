import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 198 (Lessico, bài 14–15: La Pasqua). */
const page: BookPage = {
  id: "p198",
  number: 198,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", color: "#d8333a" },
  title: "Lessico · La Pasqua",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p198-ex14",
        number: "14",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "reading",
        instruction: "Leggiamo e completiamo il testo con le parole giuste.",
        intro: "tradizione • parrocchie • popolare • mondo • uova • processioni • precedono",
        tr: { vi: "Đọc và hoàn thành đoạn văn với các từ đúng.", en: "Let's read and complete the text with the right words." },
        parts: [
          {
            boxed: true,
            title: "La Pasqua",
            image: { src: "images/u10/p198-uova.jpg", alt: "Uova di Pasqua colorate sull'erba", side: "right", width: 45 },
            text: "In Italia la Pasqua è una festa molto importante, che ha una lunga {{=tradizione}} e ha una grande partecipazione {{popolare}}. Si celebra in tutto il paese; in particolare, sono importanti i tre giorni che {{precedono}} la Pasqua: si comincia il venerdì santo con le famose {{processioni}} della Via Crucis per commemorare gli ultimi momenti della passione di Gesù; i fedeli delle {{parrocchie}} vanno in strada e partecipano al rito.",
          },
          {
            boxed: true,
            image: { src: "images/u10/p198-colomba.jpg", alt: "Una colomba pasquale", side: "left", width: 30 },
            text: "È molto famosa la Via Crucis che il Papa fa nei Fori Imperiali e nel Colosseo a Roma e che le televisioni di tutto il {{mondo}} riprendono.\nLa Pasqua è anche una festa tradizionale per il cibo: ci sono tanti piatti tipici molto buoni. Ricordiamo la colomba pasquale (un dolce di pasta e mandorle), le famose {{uova}} di cioccolata e l'agnello al forno o alla brace.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p198-ex15",
        number: "15",
        icons: ["read", "check"],
        kind: "choice",
        skill: "reading",
        variant: "twoCol",
        instruction: "Leggiamo e scegliamo la risposta giusta.",
        tr: { vi: "Đọc và chọn câu trả lời đúng.", en: "Let's read and choose the right answer." },
        items: [
          { id: "1", prompt: "I coriandoli sono:", options: ["dei dolci.", "dei pezzetti di carta colorati."], answer: 1 },
          { id: "2", prompt: "I fuochi d'artificio sono:", options: ["dei fuochi spettacolari per le feste.", "degli incendi."], answer: 0 },
          { id: "3", prompt: "La festa patronale è:", options: ["solo a Pasqua.", "per il santo patrono di una città."], answer: 1 },
          { id: "4", prompt: "La sfilata è:", options: ["la vendita di prodotti.", "un passaggio di persone che stanno in fila."], answer: 1 },
          { id: "5", prompt: "Un oggetto sacro è:", options: ["un oggetto molto costoso.", "un oggetto che ha un valore divino."], answer: 1 },
          { id: "6", prompt: "Travestirsi significa:", options: ["mettersi un costume per una festa.", "lavare i vestiti."], answer: 0 },
          { id: "7", prompt: "Il centenario è:", options: ["una ricorrenza che avviene ogni cento anni.", "una moneta."], answer: 0 },
          { id: "8", prompt: "Il calcio in costume è:", options: ["una rievocazione di una festa antica.", "una maschera di Carnevale."], answer: 0 },
        ],
      },
    },
  ],
};

export default page;
