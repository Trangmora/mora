import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 127 (Cominciamo, bài 2–3). */
const page: BookPage = {
  id: "p127",
  number: 127,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Cominciamo · La musica e voi",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p127-ex2",
        number: "2",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: rispondiamo alle domande.",
        tr: { vi: "Cùng viết: trả lời các câu hỏi.", en: "Let's write: answer the questions." },
        items: [
          { id: "1", prompt: "Ascoltate spesso la musica? Quando?", lines: 1, sample: "Sì, ascolto la musica ogni giorno, soprattutto quando vado al lavoro." },
          { id: "2", prompt: "Che tipo di musica ascoltate di solito?", lines: 1, sample: "Di solito ascolto musica pop e un po' di jazz." },
          { id: "3", prompt: "Qual è il vostro cantante preferito?", lines: 1, sample: "Il mio cantante preferito è Eros Ramazzotti." },
          { id: "4", prompt: "Ascoltate musica italiana?", lines: 1, sample: "Sì, ascolto spesso canzoni italiane per imparare la lingua." },
          { id: "5", prompt: "Conoscete cantanti italiani? Quali?", lines: 1, sample: "Conosco Laura Pausini, Andrea Bocelli e Vasco Rossi." },
          { id: "6", prompt: "Avete mai visto la rappresentazione di un'opera lirica italiana? Quale? Dove?", lines: 1, sample: "Sì, ho visto La Traviata al teatro dell'opera della mia città." },
          { id: "7", prompt: "Suonate uno strumento musicale?", lines: 1, sample: "Sì, suono un po' la chitarra." },
          { id: "8", prompt: "Qual è la vostra canzone preferita?", lines: 1, sample: "La mia canzone preferita è Volare." },
        ],
      },
    },
    { type: "text", it: "E adesso portate un testo di una canzone italiana in classe e provate a cantarla!" },
    {
      type: "exercise",
      ex: {
        id: "p127-ex3",
        number: "3",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e formiamo le frasi.",
        tr: { vi: "Đọc và ghép thành câu.", en: "Let's read and make sentences." },
        left: [
          { id: "1", text: "Il festival di Sanremo è" },
          { id: "2", text: "Riccardo Muti è" },
          { id: "3", text: "Laura Pausini" },
          { id: "4", text: "I ragazzi italiani conoscono" },
          { id: "5", text: "I teatri lirici italiani oggi sono" },
          { id: "6", text: "Luciano Pavarotti" },
          { id: "7", text: "Al concerto di Luciano Ligabue" },
          { id: "8", text: "La cantante lirica Cecilia Gasdia" },
        ],
        right: [
          { id: "a", text: "ha fatto meno concerti in Italia rispetto all'anno scorso." },
          { id: "b", text: "è il tenore più amato di tutti." },
          { id: "c", text: "è una delle cantanti italiane più apprezzate all'estero." },
          { id: "d", text: "la rappresentazione canora più conosciuta in Italia." },
          { id: "e", text: "in una situazione economica peggiore rispetto al passato." },
          { id: "f", text: "il direttore d'orchestra italiano più famoso nel mondo." },
          { id: "g", text: "hanno partecipato più persone che a quello di Vasco Rossi." },
          { id: "h", text: "meno la musica classica di quella moderna." },
        ],
        given: { "3": "c" },
        answer: { "1": "d", "2": "f", "3": "c", "4": "h", "5": "e", "6": "b", "7": "g", "8": "a" },
      },
    },
  ],
};

export default page;
