import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 202 (Grammatica tiếp; Verifica bài 1). */
const page: BookPage = {
  id: "p202",
  number: 202,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", color: "#ef8a3a" },
  title: "Grammatica · Verifica",
  runningHead: "Grammatica",
  blocks: [
    {
      type: "theory",
      text: `
Con i verbi riflessivi, pronominali e reciproci al passato usiamo il participio passato al plurale:
> Ieri mattina **ci si è lavati** con l'acqua fredda.
> **Ci si è svegliati** presto lunedì scorso.
> **Ci si è incontrati** la sera al bar.
## Si impersonale + essere + aggettivo
Nelle frasi con il *si* impersonale + il verbo *essere* + l'aggettivo, l'aggettivo è sempre al plurale maschile:
> **Si è contenti** quando si lavora bene.
===
Con il verbo *essere* al passato usiamo anche il participio passato al plurale:
> **Si è stati contenti** quando si è lavorato bene.
## Si dice + che + congiuntivo
Dopo *si dice* usiamo *che* e il verbo al congiuntivo:
> **Si dice** che Venezia **sia** una delle città più belle del mondo.
`,
    },
    { type: "sectionTitle", text: "Verifica" },
    {
      type: "exercise",
      ex: {
        id: "p202-ex1",
        number: "1",
        kind: "choice",
        skill: "grammar",
        points: 10,
        variant: "twoCol",
        instruction: "Leggiamo e scegliamo la frase giusta.",
        tr: { vi: "Đọc và chọn câu đúng.", en: "Let's read and choose the right sentence." },
        items: [
          { id: "1", prompt: "Dopo l'esame:", options: ["ci vuole riposare un poco.", "ci si vuole riposare un poco.", "si ci vuole riposare un poco."], answer: 1 },
          { id: "2", prompt: "Quando si è in vacanza:", options: ["si ci è contenti.", "ci si è contenti.", "si è contenti."], answer: 2 },
          { id: "3", prompt: "Chi fa sport:", options: ["si sente meglio.", "ci si sente meglio.", "si ci sente meglio."], answer: 0 },
          { id: "4", prompt: "Quando si abita da soli:", options: ["ci si deve arrangiare.", "si ci deve arrangiare.", "si deve arrangiare."], answer: 0 },
          { id: "5", prompt: "Di solo pane:", options: ["non ci si vive.", "non si vive.", "non ci vive."], answer: 1 },
          { id: "6", prompt: "In quell'enoteca:", options: ["si è bevuto bene.", "si è bevuti bene.", "ci è bevuto bene."], answer: 0 },
          { id: "7", prompt: "Ieri sera al concerto:", options: ["si è entrato con i biglietti ridotti.", "si è entrati con i biglietti ridotti.", "ci è entrati con i biglietti ridotti."], answer: 1 },
          { id: "8", prompt: "Ieri:", options: ["si ci è incontrati.", "si è incontrati.", "ci si è incontrati."], answer: 2 },
          { id: "9", prompt: "In paese:", options: ["ci si dice che Luca si sia trasferito all'estero.", "si dice che Luca si sia trasferito all'estero.", "si dice che Luca ci sia trasferito all'estero."], answer: 1 },
          { id: "10", prompt: "Ieri sera:", options: ["si è andati a una festa e ci si è divertiti.", "ci si è andati a una festa e ci si è divertiti.", "si ci è andati a una festa e ci si è divertiti."], answer: 0 },
        ],
      },
    },
  ],
};

export default page;
