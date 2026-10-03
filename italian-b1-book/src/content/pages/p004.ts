import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 4 (Osserviamo bene, bài 5). */
const page: BookPage = {
  id: "p004",
  number: 4,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Osserviamo bene · Tutti i numeri del Bel Paese",
  addedOn: "2026-10-03",
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  blocks: [
    { type: "sectionTitle", text: "Osserviamo bene", banner: "CONOSCIAMO MEGLIO L'ITALIA" },
    {
      type: "exercise",
      ex: {
        id: "p004-ex5",
        number: "5",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi al presente.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thì hiện tại.", en: "Let's read and complete the text with verbs in the present tense." },
        source: "(adattato da Focus, n. 2, 2000)",
        parts: [
          {
            boxed: true,
            title: "Tutti i numeri… del Bel Paese",
            image: { src: "images/u1/p4-italia.jpg", alt: "L'Italia vista dal satellite", side: "right", width: 63 },
            text: [
              "Vi (*noi, presentare*) {{=presentiamo}} alcuni aspetti dell'Italia. (*voi, sapere*) {{sapete}} che, in confronto agli abitanti degli altri paesi, gli italiani (*essere*) {{sono}} meno grassi? Infatti, solo il 10% degli italiani è obeso, mentre, per esempio, in Germania, in Spagna e negli Stati Uniti la percentuale (*salire*) {{sale}} moltissimo (circa il 20%).",
              "Comunque, gli italiani non (*potere*) {{possono}} rinunciare a mangiare la pasta: in un anno (*consumare*) {{consumano}} circa 30 chili di pasta a testa.",
              "Agli italiani (*piacere*) {{piacciono}} anche i prodotti biologici: il nostro paese (*essere*) {{è}} il primo produttore in Europa di alimenti biologici.",
              "E la salute? Oggi circa 6 milioni di persone (*preferire*) {{preferiscono}} curarsi con medicine non tradizionali e, per questo, da qualche anno (*usare*) {{usano}} soprattutto l'omeopatia. Purtroppo, però, il nostro popolo (*stare*) {{sta}} invecchiando: le statistiche (*dire*) {{dicono}} che (*nascere*) {{nascono}} meno bambini.",
              "Il fatto positivo è che l'età degli italiani (*crescere*) {{cresce}} sempre di più: oggi un uomo (*potere*) {{può}} vivere in media fino a 78 anni e una donna fino a 84.",
            ].join("\n"),
          },
        ],
      },
    },
  ],
};

export default page;
