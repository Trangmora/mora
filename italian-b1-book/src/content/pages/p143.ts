import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 143 (Verifica). */
const page: BookPage = {
  id: "p143",
  number: 143,
  unit: "7",
  unitTitle: "Parole e musica",
  title: "Verifica",
  addedOn: "2026-10-08",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U7", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p143-ex1",
        number: "1",
        kind: "fill",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo le frasi con le parole indicate.",
        intro: "minore • quanto • inferiore • più belle • come • maggior parte • più interessante della • peggiore di • peggio di • più facile del",
        tr: { vi: "Cùng viết: hoàn thành câu với các từ cho sẵn.", en: "Let's write: complete the sentences with the given words." },
        items: [
          { id: "1", prompt: "1. Raffaella Carrà canta ___ ___ Giorgia.", answers: ["peggio", "di"] },
          { id: "2", prompt: "2. Adoro la Quinta sinfonia di Beethoven: è ___ ___ ___ Sesta.", answers: ["più", "interessante", "della"] },
          { id: "3", prompt: "3. Oggi il numero degli spettatori è ___ a quello di ieri.", answers: ["inferiore"] },
          { id: "4", prompt: "4. Mario preferisce suonare il piano perché per lui è ___ ___ ___ violino.", answers: ["più", "facile", "del"] },
          { id: "5", prompt: "5. L'ultimo disco di Jovanotti è ___ ___ quello del 2003.", answers: ["peggiore", "di"] },
          { id: "6", prompt: "6. Ascoltare la musica classica è rilassante ___ istruttivo.", answers: ["quanto"] },
          { id: "7", prompt: "7. La ___ ___ dei cantanti italiani fa concerti anche all'estero.", answers: ["maggior", "parte"] },
          { id: "8", prompt: "8. Riccardo Cocciante ha composto canzoni ___ ___ di quelle di Ivan Graziani.", answers: ["più", "belle"] },
          { id: "9", prompt: "9. Il fratello ___ di Fiorello fa l'attore.", answers: ["minore"] },
          { id: "10", prompt: "10. I Rolling Stones sono bravi ___ i Pink Floyd.", answers: ["come"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p143-ex2",
        number: "2",
        kind: "write",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo le frasi con il superlativo relativo.",
        example: { q: "I Beatles, gruppo rock inglese, famoso, mondo.", a: "***I Beatles sono il gruppo rock inglese più famoso del mondo.***" },
        tr: { vi: "Viết câu với so sánh nhất.", en: "Write sentences with the relative superlative." },
        items: [
          { id: "1", prompt: "1. Verdi, compositore di musica lirica, celebre, Italia.", lines: 1, sample: "Verdi è il compositore di musica lirica più celebre d'Italia." },
          { id: "2", prompt: "2. Riccardo Muti, direttore d'orchestra, bravo, mondo.", lines: 1, sample: "Riccardo Muti è il direttore d'orchestra più bravo del mondo." },
          { id: "3", prompt: "3. 'O sole mio, sentimentale, canzoni napoletane.", lines: 1, sample: "'O sole mio è la più sentimentale delle canzoni napoletane." },
          { id: "4", prompt: "4. La musica da discoteca, ballabile, tutte le musiche.", lines: 1, sample: "La musica da discoteca è la più ballabile di tutte le musiche." },
          { id: "5", prompt: "5. L'orchestra dell'Opera di Roma, professionale, Italia.", lines: 1, sample: "L'orchestra dell'Opera di Roma è la più professionale d'Italia." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p143-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "1", lead: "usare il comparativo di maggioranza:", prompt: "Jovanotti è ___ noto ___ Niccolò Fabi.", answers: ["più", "di"] },
          { id: "2", lead: "usare il comparativo di minoranza:", prompt: "Pino Daniele ha fatto ___ concerti ___ Gigi D'Alessio.", answers: ["meno", "di"] },
          { id: "3", lead: "usare il comparativo di uguaglianza:", prompt: "Alex Britti è bravo ___ Biagio Antonacci.", answers: ["come|quanto"] },
          { id: "4", lead: "usare i comparativi irregolari:", prompt: "Il CD di Madonna è (*più buono*) ___ di quello di Anastacia.", answers: ["migliore"] },
          { id: "5", lead: "usare il superlativo relativo:", prompt: "Il concerto di Vasco Rossi di ieri è stato ___ ___ bello ___ tutti quelli che ha fatto.", answers: ["il", "più", "di"] },
          { id: "6", lead: "usare i superlativi relativi irregolari:", prompt: "La musica di Mozart è (*la più buona*) ___ ___ di tutte.", answers: ["la", "migliore"] },
          { id: "7", lead: "usare il superlativo assoluto:", prompt: "'O sole mio è una canzone (*molto famosa*) ___.", answers: ["famosissima"] },
          { id: "8", lead: "usare i superlativi assoluti irregolari:", prompt: "Placido Domingo è un (*molto buono*) ___ tenore.", answers: ["ottimo"] },
        ],
      },
    },
  ],
};

export default page;
