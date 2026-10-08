import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 190 (Osserviamo bene, bài 6–7: ci si…, si dice che…). */
const page: BookPage = {
  id: "p190",
  number: 190,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "Osserviamo bene · Ci si…, si dice che…",
  runningHead: "Osserviamo bene",
  banner: "CI SI…",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p190-ex6a", number: "6", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Si impersonale con verbi riflessivi, pronominali e reciproci", tr: { vi: "Cùng đọc: si phiếm chỉ với động từ phản thân, đại từ và tương hỗ.", en: "Let's read: impersonal si with reflexive, pronominal and reciprocal verbs." }, items: [] },
    },
    { type: "theory", text: "> **Ci si sveglia** presto il lunedì. / **Ci si è svegliati** presto lunedì scorso.\n> **Ci si incontra** la sera al bar. / **Ci si è incontrati** la sera al bar." },
    {
      type: "exercise",
      ex: {
        id: "p190-ex6b",
        label: "B",
        icons: ["write"],
        kind: "write",
        skill: "grammar",
        instruction: "Scriviamo: trasformiamo i verbi.",
        example: { q: "1. D'inverno mi metto il cappotto.", a: "D'inverno ***ci si mette*** il cappotto. / D'inverno ***ci si è messi*** il cappotto." },
        tr: { vi: "Cùng viết: biến đổi động từ (dùng ci si).", en: "Let's write: transform the verbs (using ci si)." },
        items: [
          { id: "2", prompt: "2. Si incontrano sempre per la strada.", lines: 1, sample: "Ci si incontra sempre per la strada. / Ci si è incontrati sempre per la strada." },
          { id: "3", prompt: "3. La mattina vi svegliate sempre presto.", lines: 1, sample: "La mattina ci si sveglia sempre presto. / La mattina ci si è svegliati sempre presto." },
          { id: "4", prompt: "4. Ti dimentichi spesso di spegnere la luce.", lines: 1, sample: "Ci si dimentica spesso di spegnere la luce. / Ci si è dimenticati spesso di spegnere la luce." },
          { id: "5", prompt: "5. Mi sento male quando mangio troppo.", lines: 1, sample: "Ci si sente male quando si mangia troppo. / Ci si è sentiti male quando si è mangiato troppo." },
          { id: "6", prompt: "6. Si ricorda sempre di scrivere agli amici.", lines: 1, sample: "Ci si ricorda sempre di scrivere agli amici. / Ci si è ricordati sempre di scrivere agli amici." },
          { id: "7", prompt: "7. Si innamora sempre delle ragazze sbagliate.", lines: 1, sample: "Ci si innamora sempre delle ragazze sbagliate. / Ci si è innamorati sempre delle ragazze sbagliate." },
          { id: "8", prompt: "8. Mi pettino sempre prima di uscire di casa.", lines: 1, sample: "Ci si pettina sempre prima di uscire di casa. / Ci si è pettinati sempre prima di uscire di casa." },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p190-ex7a", number: "7", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "SI DICE CHE…", tr: { vi: "Cùng đọc: Người ta nói rằng…", en: "Let's read: They say that…" }, items: [] },
    },
    { type: "theory", text: "### Si impersonale + essere + aggettivo\n> **Si è contenti** quando si lavora bene.\n### Si dice + che + congiuntivo\n> **Si dice** che Venezia **sia** una delle città più belle del mondo." },
    {
      type: "exercise",
      ex: {
        id: "p190-ex7b",
        label: "B",
        icons: ["read", "write"],
        kind: "choice",
        inline: true,
        skill: "grammar",
        instruction: "Leggiamo e sottolineiamo le forme giuste del verbo.",
        subtitle: "Il Palio di Siena",
        tr: { vi: "Đọc và gạch chân dạng đúng của động từ.", en: "Let's read and underline the right forms of the verb." },
        items: [
          { id: "1", prompt: "In alcune città italiane del XII e XIII secolo esistevano molte corse di cavalli: … che in passato siano state un vero e proprio spettacolo pubblico.", options: ["si ci racconta", "si racconta"], answer: 1 },
          { id: "2", prompt: "La corsa dei cavalli … ancora oggi Palio perché prende il nome dal premio: il Palio, che era in genere un drappo di stoffa molto pregiata.", options: ["ci si chiama", "si chiama"], answer: 1 },
        ],
      },
    },
    { type: "photo", src: "images/u10/p190-palio.jpg", alt: "Le bandiere delle contrade al Palio di Siena" },
  ],
};

export default page;
