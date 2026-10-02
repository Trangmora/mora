import type { BookPage } from "../../types";

/** TRANG MẪU (demo) — sẽ xoá khi có trang thật. */
const page: BookPage = {
  id: "p000b",
  number: 0.2,
  unit: "0",
  unitTitle: "Pagina di prova",
  title: "Lettura, ascolto e produzione",
  blocks: [
    { type: "heading", text: "2 · Una cartolina da Firenze", tr: { vi: "Bưu thiếp từ Florence", en: "A postcard from Florence" } },
    { type: "image", photo: "Florence Ponte Vecchio Arno", scene: "travel", float: "right", caption: { vi: "Chuyến đi Toscana", en: "A trip to Tuscany" } },
    {
      type: "text",
      readAloud: true,
      it: "Cara Anna,\nti scrivo da Firenze! Sono arrivata venerdì mattina con il treno e il tempo è stato bellissimo. Sabato ho fatto una lunga passeggiata lungo l'Arno e la sera ho cenato in una piccola trattoria. Domani torno a Milano, ma spero di tornare presto.\nUn abbraccio, Giulia",
      tr: {
        vi: "Anna thân mến, mình viết cho bạn từ Florence! Mình đến vào sáng thứ Sáu bằng tàu và thời tiết rất đẹp. Thứ Bảy mình đi dạo dài dọc sông Arno và buổi tối ăn ở một quán trattoria nhỏ. Ngày mai mình về Milan nhưng mong sớm quay lại. Ôm bạn, Giulia",
        en: "Dear Anna, I'm writing from Florence! I arrived on Friday morning by train and the weather was beautiful. On Saturday I took a long walk along the Arno and in the evening I had dinner in a small trattoria. Tomorrow I'm going back to Milan, but I hope to come back soon. A hug, Giulia",
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p000b-ex3",
        number: "3",
        kind: "truefalse",
        refText: "cartolina",
        instruction: "Vero o falso?",
        tr: { vi: "Đúng hay sai?", en: "True or false?" },
        items: [
          { id: "a", prompt: "Giulia è arrivata a Firenze in macchina.", answer: false },
          { id: "b", prompt: "Sabato Giulia ha camminato vicino al fiume.", answer: true },
          { id: "c", prompt: "Giulia resta a Firenze per un mese.", answer: false },
        ],
      },
    },
    { type: "heading", text: "Ascolto", tr: { vi: "Bài nghe", en: "Listening" }, level: 3 },
    {
      type: "audio",
      track: "0.01",
      title: "Al telefono con Anna",
      transcript:
        "Anna: Pronto, Giulia? Sei già tornata da Firenze?\nGiulia: Sì, sono arrivata ieri sera. Che stanchezza!\nAnna: Allora ci vediamo domani per un caffè?\nGiulia: Volentieri! Alle dieci al Bar Roma?\nAnna: Perfetto, a domani!",
      tr: {
        vi: "Anna: Alô, Giulia? Bạn về từ Florence rồi à? — Giulia: Ừ, mình về tối qua. Mệt quá! — Anna: Vậy mai gặp nhau uống cà phê nhé? — Giulia: Sẵn lòng! Mười giờ ở Bar Roma nhé? — Anna: Tuyệt, mai gặp!",
        en: "Anna: Hello, Giulia? Are you back from Florence? — Giulia: Yes, I arrived last night. So tired! — Anna: Shall we meet tomorrow for a coffee? — Giulia: Gladly! Ten o'clock at Bar Roma? — Anna: Perfect, see you tomorrow!",
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p000b-ex3b",
        number: "3b",
        kind: "choice",
        refText: "audio",
        instruction: "Ascolta e scegli la risposta giusta.",
        tr: { vi: "Nghe và chọn câu trả lời đúng.", en: "Listen and choose the right answer." },
        items: [
          { id: "a", prompt: "Quando è tornata Giulia?", options: ["ieri sera", "stamattina", "venerdì"], answer: 0 },
          { id: "b", prompt: "Dove si incontrano domani?", options: ["a casa di Anna", "al Bar Roma", "in stazione"], answer: 1 },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p000b-ex4",
        number: "4",
        kind: "match",
        instruction: "Abbina le espressioni al loro significato.",
        tr: { vi: "Nối cụm từ với nghĩa của nó.", en: "Match the expressions to their meaning." },
        left: [
          { id: "1", text: "Un abbraccio" },
          { id: "2", text: "fare una passeggiata" },
          { id: "3", text: "spero di" },
        ],
        right: [
          { id: "a", text: "camminare per piacere" },
          { id: "b", text: "saluto affettuoso" },
          { id: "c", text: "ho il desiderio di" },
        ],
        answer: { "1": "b", "2": "a", "3": "c" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p000b-ex5",
        number: "5",
        kind: "write",
        instruction: "Scrivi una breve cartolina (3-4 frasi) a un amico su un tuo viaggio.",
        tr: { vi: "Viết một tấm bưu thiếp ngắn (3-4 câu) cho bạn kể về một chuyến đi.", en: "Write a short postcard (3-4 sentences) to a friend about a trip." },
        items: [
          {
            id: "a",
            prompt: "Caro/a …",
            lines: 4,
            sample: "Caro Luca, sono a Napoli da tre giorni. Ieri ho visitato Pompei e ho mangiato una pizza fantastica. Domani parto per Capri. A presto!",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p000b-ex6",
        number: "6",
        kind: "speak",
        instruction: "Parla! Racconta cosa hai fatto lo scorso fine settimana.",
        tr: { vi: "Nói! Kể lại bạn đã làm gì cuối tuần trước.", en: "Speak! Tell what you did last weekend." },
        items: [
          {
            id: "a",
            prompt: "Lo scorso fine settimana…",
            sample: "Lo scorso fine settimana sono andata al mare con i miei amici. Abbiamo fatto il bagno e la sera abbiamo mangiato il pesce.",
          },
        ],
      },
    },
    {
      type: "tip",
      it: "Attenzione!",
      tr: {
        vi: "Bấm 🔊 để nghe giọng mẫu, 🎙️ để luyện đọc và được chấm phát âm từng từ.",
        en: "Press 🔊 to hear the model voice, 🎙️ to practise reading and get word-by-word feedback.",
      },
    },
  ],
};

export default page;
