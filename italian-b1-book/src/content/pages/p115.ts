import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 115 (Facciamo pratica, bài 11: un sondaggio). */
const page: BookPage = {
  id: "p115",
  number: 115,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Facciamo pratica · La società in un sondaggio",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p115-ex11a", number: "11", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "La società italiana in un sondaggio…", tr: { vi: "Cùng đọc: Xã hội Ý qua một cuộc thăm dò…", en: "Let's read: Italian society in a survey…" }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [
          { type: "theory", text: "## Il film più amato" },
          { type: "columns", widths: [1, 2], cols: [[{ type: "photo", src: "images/u6/p115-film.jpg", alt: "La locandina del film La meglio gioventù" }], [{ type: "text", it: "Gli italiani hanno votato per il film La meglio gioventù (2003): è piaciuto molto anche ai critici americani del New York Times, che lo hanno definito il film più bello dell'anno (2005). Il film del regista Marco Tullio Giordana mostra, con verità e poesia, la storia dell'Italia degli ultimi 40 anni attraverso la vita di una famiglia." }]] },
          { type: "theory", text: "## Il cantante più amato" },
          { type: "columns", widths: [2, 1], cols: [[{ type: "text", it: "Tra i cantanti vince Francesco De Gregori con l'album Titanic del 1982. L'artista romano ha raccontato, attraverso le sue canzoni, la società italiana di quel tempo." }], [{ type: "photo", src: "images/u6/p115-titanic.jpg", alt: "La copertina dell'album Titanic" }]] },
          { type: "theory", text: "## L'auto più amata" },
          { type: "photo", src: "images/u6/p115-panda.jpg", alt: "Una Fiat Panda azzurra" },
          { type: "text", it: "La Fiat Panda è la prima macchina nel cuore degli italiani, al secondo posto la Ferrari: vince la praticità dell'utilitaria sul sogno dell'auto da corsa." },
        ],
        [
          { type: "theory", text: "## Lo sportivo più amato" },
          { type: "photo", src: "images/u6/p115-pantani.jpg", alt: "Il ciclista Marco Pantani" },
          { type: "text", it: "L'atleta che gli italiani amano di più? Il grande ciclista Marco Pantani, che è rimasto nel cuore di tutti gli sportivi per le sue meravigliose imprese nel Giro d'Italia, nel Tour de France e in altre gare ciclistiche." },
          { type: "theory", text: "## Il libro più amato" },
          { type: "photo", src: "images/u6/p115-eco.jpg", alt: "La copertina de Il nome della rosa di Umberto Eco" },
          { type: "text", it: "Il nome della rosa di Umberto Eco è al primo posto nelle preferenze dei lettori. Nel 1980 Umberto Eco diventa lo scrittore italiano più noto nel mondo grazie all'improvviso successo del romanzo Il nome della rosa, un giallo ambientato nel Medioevo in un monastero dell'Italia settentrionale." },
        ],
      ],
    },
    { type: "tip", it: "(adattato da la Repubblica, 14-1-2006)", tr: { vi: "Nguồn trích", en: "Source" } },
    {
      type: "exercise",
      ex: {
        id: "p115-ex11b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        intro: "Fate un sondaggio nella vostra classe:",
        tr: { vi: "Cùng nói: làm một cuộc thăm dò trong lớp.", en: "Let's talk: do a survey in your class." },
        items: [
          { id: "1", prompt: "Qual è il film preferito?", sample: "Il film preferito della classe è Cinema Paradiso." },
          { id: "2", prompt: "Qual è lo sportivo più amato?", sample: "Lo sportivo più amato è un calciatore della nazionale." },
          { id: "3", prompt: "Qual è il cantante che vi piace di più?", sample: "Il cantante che ci piace di più è Eros Ramazzotti." },
          { id: "4", prompt: "Qual è l'auto ideale?", sample: "L'auto ideale è piccola, elettrica ed economica." },
        ],
      },
    },
  ],
};

export default page;
