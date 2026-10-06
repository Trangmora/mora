import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 103 (Verifica). */
const page: BookPage = {
  id: "p103",
  number: 103,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  title: "Verifica",
  addedOn: "2026-10-07",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U5", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p103-ex1",
        number: "1",
        kind: "fill",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo le frasi con i verbi all'imperativo.",
        example: { q: "(*Ascoltare, voi*) …… la radio!", a: "***Ascoltate*** la radio!" },
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thức mệnh lệnh.", en: "Let's write: complete the sentences with the verbs in the imperative." },
        items: [
          { id: "1", prompt: "1. (*Scegliere, tu*) ___ il dolce che ti piace!", answers: ["Scegli"] },
          { id: "2", prompt: "2. (*Dire, tu*) ___ quella cosa a Sandra!", answers: ["Di'"] },
          { id: "3", prompt: "3. (*Andare, noi*) ___ a casa!", answers: ["Andiamo"] },
          { id: "4", prompt: "4. Non (*andare, lei*) ___ in quel ristorante!", answers: ["vada"] },
          { id: "5", prompt: "5. (*Essere, voi*) ___ più pazienti!", answers: ["Siate"] },
          { id: "6", prompt: "6. Non (*avere, tu*) ___ paura: rimango con te!", answers: ["avere"] },
          { id: "7", prompt: "7. (*Stare, tu*) ___ tranquilla!", answers: ["Sta'|Stai"] },
          { id: "8", prompt: "8. (*Fare, lei*) ___ silenzio!", answers: ["Faccia"] },
          { id: "9", prompt: "9. (*Venire, voi*) ___ da noi stasera!", answers: ["Venite"] },
          { id: "10", prompt: "10. (*Dare, tu*) ___ un bacio alla zia!", answers: ["Da'|Dai"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p103-ex2",
        number: "2",
        kind: "cloze",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo il testo con i verbi all'imperativo.",
        tr: { vi: "Cùng viết: hoàn thành đoạn văn với động từ ở thức mệnh lệnh.", en: "Let's write: complete the text with the verbs in the imperative." },
        parts: [
          {
            title: "Devi andare a un matrimonio e non sai come vestirti?",
            text: "(*mettersi, tu*) {{=Mettiti}} di fronte allo specchio; (*guardarsi*) {{guardati}} bene: che cosa non ti piace? Hai trovato alcuni difetti: non (*preoccuparsi, tu*) {{preoccuparti|ti preoccupare}}, (*parlarne*) {{parlane}} con il tuo amico, (*dire a lui*) {{digli}} tutto quello che vorresti cambiare di te e poi (*andare, voi*) {{andate}} in un negozio di vestiti. Mi raccomando: (*andarci, tu*) {{vacci|andaci}} con lui, (*guardare, tu*) {{guarda}} i vestiti e (*farsi, tu*) {{fatti}} mostrare quelli che ti piacciono di più. (*Parlare, tu*) {{Parla}} con il commesso: (*fargli, tu*) {{fagli}} capire bene quali sono i tuoi gusti.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p103-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "1", lead: "usare l'imperativo:", prompt: "Vuoi un consiglio? (*Leggere, tu*) ___ questo libro!", answers: ["Leggi"] },
          { id: "2", lead: "usare l'imperativo con i pronomi:", prompt: "• Possiamo chiedervi un favore? ○ Certo, (*chiedere a noi il favore*) ___!", answers: ["chiedetecelo"] },
          { id: "3", lead: "usare gli imperativi irregolari:", prompt: "Per favore, (*stare, tu*) ___ qui con me!", answers: ["sta'|stai"] },
          { id: "4", lead: "usare gli imperativi irregolari con i pronomi:", prompt: "• Vuoi la carta di credito? ○ Sì, (*dare a me la carta di credito*) ___, per favore!", answers: ["dammela"] },
        ],
      },
    },
  ],
};

export default page;
