import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 77 (Lessico, bài 15–17). */
const page: BookPage = {
  id: "p077",
  number: 77,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", color: "#d8333a" },
  title: "Lessico · Una cena indimenticabile",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p077-ex15",
        number: "15",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: rispondiamo alle domande.",
        example: { q: "1. Che cosa possiamo bollire?", a: "***la pasta, le patate, le verdure, …***" },
        tr: { vi: "Cùng viết: trả lời các câu hỏi.", en: "Let's write: answer the questions." },
        items: [
          { id: "2", prompt: "Che cosa grattugiamo?", lines: 1, sample: "il formaggio, il pane secco, le carote, la buccia del limone…" },
          { id: "3", prompt: "Che cosa possiamo arrostire?", lines: 1, sample: "la carne, il pollo, le castagne, i peperoni…" },
          { id: "4", prompt: "Che cosa friggiamo?", lines: 1, sample: "le patate, il pesce, le uova, le melanzane…" },
          { id: "5", prompt: "Che cosa impastiamo?", lines: 1, sample: "la farina, la pizza, il pane, la pasta fresca…" },
          { id: "6", prompt: "Che cosa possiamo spremere?", lines: 1, sample: "le arance, i limoni, i pompelmi…" },
          { id: "7", prompt: "Che cosa zuccheriamo?", lines: 1, sample: "il caffè, il tè, le fragole, i dolci…" },
          { id: "8", prompt: "Che cosa ungiamo?", lines: 1, sample: "la teglia, la pirofila, la padella…" },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p077-ex16",
        number: "16",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo gli aggettivi e abbiniamo i contrari.",
        tr: { vi: "Đọc các tính từ và nối với từ trái nghĩa.", en: "Let's read the adjectives and match the opposites." },
        left: [
          { id: "1", text: "leggero" },
          { id: "2", text: "condito" },
          { id: "3", text: "cotto" },
          { id: "4", text: "insipido" },
          { id: "5", text: "digeribile" },
          { id: "6", text: "naturale" },
          { id: "7", text: "grasso" },
          { id: "8", text: "amaro" },
        ],
        right: [
          { id: "a", text: "indigesto" },
          { id: "b", text: "dolce" },
          { id: "c", text: "magro" },
          { id: "d", text: "pesante" },
          { id: "e", text: "salato" },
          { id: "f", text: "scondito" },
          { id: "g", text: "crudo" },
          { id: "h", text: "sofisticato" },
        ],
        given: { "5": "a" },
        answer: { "1": "d", "2": "f", "3": "g", "4": "e", "5": "a", "6": "h", "7": "c", "8": "b" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p077-ex17",
        number: "17",
        icons: ["write"],
        kind: "cloze",
        skill: "writing",
        instruction: "Scriviamo: sostituiamo le parole sbagliate.",
        tr: { vi: "Cùng viết: thay các từ sai (in nghiêng) bằng từ đúng.", en: "Let's write: replace the wrong words (in italics)." },
        parts: [
          {
            boxed: true,
            title: "Una cena indimenticabile",
            text: "Francesco era innamorato cotto di Chiara, voleva invitarla a cena ma non sapeva che cosa prepararle. Ha comprato un libro di ricette, le ha lette tutte e alla fine ha deciso: avrebbe cucinato le penne al tartufo e l'arrosto di vitello.\nPrima *ha gratinato* → {{=bollito}} le penne nell'acqua, poi *ha annusato* → {{tagliato|ha tagliato|affettato|ha affettato}} il tartufo a pezzetti; in *un portafoglio* → {{una padella|un tegame|padella|tegame}} ha fatto sciogliere il burro e ci ha messo il tartufo; mentre preparava la pasta, *ha comprato* → {{acceso|ha acceso|scaldato|ha scaldato}} il forno, *ha fotografato* → {{tagliato|ha tagliato|affettato|ha affettato}} il vitello a fette e lo *ha guidato* → {{condito|ha condito|insaporito|ha insaporito}} con un po' di sale, di pepe nero e di rosmarino. Quando il forno era *dipinto* → {{caldo|pronto}}, ci ha messo *le scarpe* → {{la pirofila|una pirofila|il tegame|la teglia}} con la carne. Mentre la carne cuoceva, *ha ascoltato* → {{scolato|ha scolato}} la pasta, l'ha buttata nella padella e l'*ha presa* → {{condita|mescolata|insaporita}} con il tartufo. Alla fine ha tolto la carne *dalla macchina* → {{dal forno|forno}} e l'*ha stirata* → {{portata|servita|messa}} in tavola.\nÈ stata una cena indimenticabile: Chiara se ne è andata via dopo il primo boccone. Chissà perché…",
          },
        ],
      },
    },
  ],
};

export default page;
