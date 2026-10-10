import type { BookPage } from "../../types";

/** Unità 1 · Piacere, sono io! — trang 1 (Si parte!, bài 1–2). Nội dung tự soạn. */
const page: BookPage = {
  id: "p001",
  number: 1,
  unit: "1",
  unitTitle: "Piacere, sono io!",
  addedOn: "2026-10-10",
  title: "Si parte! · Il primo giorno di corso",
  blocks: [
    {
      type: "unitHeader",
      unit: "1",
      title: "Piacere, sono io!",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "presentarci e presentare un'altra persona", tr: { vi: "giới thiệu bản thân và giới thiệu người khác", en: "introduce ourselves and someone else" } },
        { it: "raccontare i nostri gusti e le nostre passioni", tr: { vi: "kể về sở thích và niềm đam mê của mình", en: "talk about our tastes and passions" } },
        { it: "compilare la scheda di iscrizione a una scuola di lingue", tr: { vi: "điền phiếu đăng ký vào một trường ngoại ngữ", en: "fill in the enrolment form of a language school" } },
        { it: "scoprire come gli italiani si salutano, ieri e oggi", tr: { vi: "khám phá cách người Ý chào hỏi, xưa và nay", en: "find out how Italians greet each other, then and now" } },
      ],
    },
    { type: "sectionTitle", text: "Si parte!", banner: "IO IN CINQUE PAROLE" },
    {
      type: "exercise",
      ex: {
        id: "p001-ex1",
        number: "1",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: presentiamoci al compagno di banco.",
        intro: "Scegliete cinque parole che vi descrivono (per esempio: città, lavoro, famiglia, sport, cibo) e usatele per presentarvi.",
        tr: { vi: "Cùng nói: giới thiệu bản thân với bạn ngồi cạnh. Chọn năm từ mô tả bạn (ví dụ: thành phố, công việc, gia đình, thể thao, món ăn) và dùng chúng để giới thiệu.", en: "Let's talk: introduce ourselves to our deskmate. Choose five words that describe you (e.g. city, job, family, sport, food) and use them to introduce yourself." },
        items: [
          { id: "1", prompt: "Le mie cinque parole: …", sample: "Danang, infermiera, due fratelli, nuoto, phở. Sono di Danang, faccio l'infermiera, ho due fratelli più piccoli, nuoto tre volte alla settimana e il mio piatto preferito è il phở." },
        ],
      },
    },
    { type: "sticker", text: "PIACERE!", tr: { vi: "Rất vui được gặp!", en: "Nice to meet you!" } },
    {
      type: "exercise",
      ex: { id: "p001-ex2a", number: "2", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo il dialogo.", subtitle: "Il primo giorno alla scuola “Parola Viva” di Bologna", tr: { vi: "Đọc đoạn hội thoại: Ngày đầu tiên ở trường “Parola Viva” tại Bologna.", en: "Let's read the dialogue: The first day at the “Parola Viva” school in Bologna." }, items: [] },
    },
    {
      type: "dialogue",
      lines: [
        { speaker: "Hoa", it: "Scusa, è questa l'aula del corso intermedio?" },
        { speaker: "Tomás", it: "Sì, credo di sì. Anch'io sono nuovo. Mi chiamo Tomás, piacere." },
        { speaker: "Hoa", it: "Piacere, io sono Hoa. Di dove sei?" },
        { speaker: "Tomás", it: "Sono argentino, di Rosario. Faccio il cuoco e sono qui per un tirocinio in un ristorante. E tu?" },
        { speaker: "Hoa", it: "Io sono vietnamita, di Hué. Studio architettura e a febbraio comincio un semestre all'università di Bologna." },
        { speaker: "Tomás", it: "Che bello! Ti piace la città?" },
        { speaker: "Hoa", it: "Moltissimo: i portici, le biciclette, i mercati… E nel tempo libero vado sempre a disegnare in Piazza Santo Stefano." },
        { speaker: "Tomás", it: "Io invece, quando non lavoro, gioco a calcetto con i colleghi. Ah, ecco l'insegnante!" },
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p001-ex2b",
        label: "B",
        icons: ["read", "check"],
        kind: "truefalse",
        skill: "reading",
        instruction: "Leggiamo di nuovo: vero o falso?",
        tr: { vi: "Đọc lại: đúng hay sai?", en: "Let's read again: true or false?" },
        items: [
          { id: "1", prompt: "Hoa e Tomás si conoscono già.", answer: false },
          { id: "2", prompt: "Tomás lavora in cucina.", answer: true },
          { id: "3", prompt: "Hoa studia medicina.", answer: false },
          { id: "4", prompt: "A Hoa piace disegnare all'aperto.", answer: true },
          { id: "5", prompt: "Nel tempo libero Tomás va in bicicletta.", answer: false },
        ],
      },
    },
  ],
};

export default page;
