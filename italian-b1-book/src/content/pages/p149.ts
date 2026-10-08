import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 149 (Osserviamo bene, bài 6–7: congiuntivo dei verbi irregolari). */
const page: BookPage = {
  id: "p149",
  number: 149,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "Osserviamo bene · Spero che venga",
  runningHead: "Osserviamo bene",
  banner: "SPERO CHE VENGA",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p149-ex6a", number: "6", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    { type: "theory", text: "! ATTENZIONE!\n> Credo che Marco e Lucia **vadano** in vacanza in Sardegna.\n> Penso che Matteo domani **esca** con Marina.\n> È giusto che Giulio **scelga** la facoltà che gli piace di più.\n===\n> È opportuno che tu **rimanga** in ufficio oggi.\n> Spero che voi **veniate** alla festa.\n---\nPer le forme irregolari dei verbi, consultate la GRAMMATICA." },
    {
      type: "exercise",
      ex: {
        id: "p149-ex6b",
        label: "B",
        icons: ["match", "write"],
        kind: "match",
        skill: "grammar",
        instruction: "Abbiniamo e completiamo le frasi con i verbi al congiuntivo.",
        tr: { vi: "Nối và hoàn thành câu với động từ ở thức giả định.", en: "Let's match and complete the sentences with the verbs in the subjunctive." },
        left: [
          { id: "1", text: "Luisa vuole che" },
          { id: "2", text: "Il direttore del giornale ha bisogno che" },
          { id: "3", text: "Noi giornalisti pensiamo che" },
          { id: "4", text: "Marco ha paura che" },
          { id: "5", text: "Ieri ho visto il film di Monicelli: spero che" },
          { id: "6", text: "Vi do un consiglio da amica: è meglio che" },
          { id: "7", text: "Il caporedattore desidera che" },
          { id: "8", text: "È giusto che" },
        ],
        right: [
          { id: "a", text: "tu (uscire) …… con chi vuoi." },
          { id: "b", text: "voi (dire) …… sempre quello che pensate." },
          { id: "c", text: "tu (andare) vada con lei stasera." },
          { id: "d", text: "i critici cinematografici (fare) …… una critica positiva." },
          { id: "e", text: "i suoi collaboratori (sapere) …… lavorare in modo efficiente." },
          { id: "f", text: "(volerci) …… troppo tempo per andare a Venezia in treno: per questo prenderà la macchina." },
          { id: "g", text: "l'opinionista (scrivere) …… un bell'articolo di fondo." },
          { id: "h", text: "nessuno (potere) …… scrivere un articolo di fondo in poco tempo." },
        ],
        given: { "1": "c" },
        answer: { "1": "c", "2": "e", "3": "h", "4": "f", "5": "d", "6": "b", "7": "g", "8": "a" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p149-ex6b-verbi",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        variant: "twoCol",
        instruction: "Scriviamo i verbi al congiuntivo.",
        tr: { vi: "Viết các động từ ở thức giả định.", en: "Let's write the verbs in the subjunctive." },
        items: [
          { id: "a", prompt: "a. tu (*uscire*) ___", answers: ["esca"] },
          { id: "b", prompt: "b. voi (*dire*) ___", answers: ["diciate"] },
          { id: "d", prompt: "d. i critici (*fare*) ___", answers: ["facciano"] },
          { id: "e", prompt: "e. i collaboratori (*sapere*) ___", answers: ["sappiano"] },
          { id: "f", prompt: "f. (*volerci*) ___", answers: ["ci voglia"] },
          { id: "g", prompt: "g. l'opinionista (*scrivere*) ___", answers: ["scriva"] },
          { id: "h", prompt: "h. nessuno (*potere*) ___", answers: ["possa"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p149-ex7",
        number: "7",
        icons: ["read", "write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Leggiamo le frasi e correggiamo gli errori se necessario.",
        example: { q: "1. Penso che Marco e Marina vadino al ristorante stasera.", a: "Penso che Marco e Marina ***vadano*** al ristorante stasera." },
        tr: { vi: "Đọc các câu và sửa lỗi nếu cần (câu đúng thì ghi “corretta”).", en: "Let's read the sentences and correct the mistakes if necessary (write “corretta” if the sentence is right)." },
        items: [
          { id: "2", prompt: "2. Immaginiamo che il professore sia in ritardo. ___", answers: ["corretta|giusta|sia|ok"] },
          { id: "3", prompt: "3. Luca dubita che i suoi amici escino stasera. ___", answers: ["escano"] },
          { id: "4", prompt: "4. La mamma ha paura che Stefano non scelghi la facoltà universitaria giusta. ___", answers: ["scelga"] },
          { id: "5", prompt: "5. Paolo desidera che i bambini faccino i compiti presto. ___", answers: ["facciano"] },
          { id: "6", prompt: "6. Non credo che Lucia rimanghi a casa stasera. ___", answers: ["rimanga"] },
          { id: "7", prompt: "7. Credete che Tiziana non guidi bene la macchina? ___", answers: ["corretta|giusta|guidi|ok"] },
        ],
      },
    },
  ],
};

export default page;
