import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 118 (Lessico, bài 14–16). */
const page: BookPage = {
  id: "p118",
  number: 118,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", color: "#d8333a" },
  title: "Lessico · Esercizi",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p118-ex14",
        number: "14",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo il significato delle parole e delle espressioni.",
        example: { q: "1. *Essere utile alla società* vuol dire:", a: "***aiutare il prossimo, partecipare a opere di beneficenza…***" },
        tr: { vi: "Viết nghĩa của các từ và thành ngữ.", en: "Let's write the meaning of the words and expressions." },
        items: [
          { id: "2", prompt: "*Fare vita di società* significa:", lines: 1, sample: "uscire spesso, frequentare feste e incontrare molte persone." },
          { id: "3", prompt: "*Essere pericoloso per la società* vuol dire:", lines: 1, sample: "essere una persona che può fare del male agli altri, per esempio un criminale." },
          { id: "4", prompt: "*Essere una matricola* vuol dire:", lines: 1, sample: "essere uno studente del primo anno di università." },
          { id: "5", prompt: "*Avere un titolo di studio* significa:", lines: 1, sample: "avere un diploma o una laurea." },
          { id: "6", prompt: "*La corsia* è:", lines: 1, sample: "il corridoio o la sala dell'ospedale dove ci sono i letti dei pazienti." },
          { id: "7", prompt: "*Il policlinico* è:", lines: 1, sample: "un grande ospedale con molti reparti, spesso legato all'università." },
          { id: "8", prompt: "*Il pronto soccorso* è:", lines: 1, sample: "il reparto dell'ospedale dove si curano le urgenze." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p118-ex15",
        number: "15",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: associamo le parole.",
        example: { q: "medicina →", a: "***medico, ospedale, infermiere…***" },
        tr: { vi: "Cùng viết: liên tưởng các từ.", en: "Let's write: associate the words." },
        items: [
          { id: "1", prompt: "facoltà:", lines: 1, sample: "università, studente, professore, esame, laurea…" },
          { id: "2", prompt: "società:", lines: 1, sample: "classe sociale, persone, giustizia, cittadini…" },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p118-ex16",
        number: "16",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo le parole con significato opposto.",
        tr: { vi: "Đọc và nối các từ trái nghĩa.", en: "Let's read and match the words with opposite meanings." },
        left: [
          { id: "1", text: "prossimo" }, { id: "2", text: "seguente" }, { id: "3", text: "immigrato" }, { id: "4", text: "futuro" }, { id: "5", text: "ultimo" },
          { id: "6", text: "veloce" }, { id: "7", text: "spendere" }, { id: "8", text: "educato" }, { id: "9", text: "credito" }, { id: "10", text: "progresso" },
        ],
        right: [
          { id: "a", text: "maleducato" }, { id: "b", text: "primo" }, { id: "c", text: "regresso" }, { id: "d", text: "lento" }, { id: "e", text: "scorso" },
          { id: "f", text: "debito" }, { id: "g", text: "emigrato" }, { id: "h", text: "precedente" }, { id: "i", text: "passato" }, { id: "l", text: "risparmiare" },
        ],
        given: { "1": "e" },
        answer: { "1": "e", "2": "h", "3": "g", "4": "i", "5": "b", "6": "d", "7": "l", "8": "a", "9": "f", "10": "c" },
      },
    },
  ],
};

export default page;
