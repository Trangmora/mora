import type { BookPage } from "../../types";

/**
 * TRANG MẪU (demo) — để bạn xem thử mọi loại nội dung.
 * Khi bạn gửi trang sách thật đầu tiên, file này sẽ được xoá.
 */
const page: BookPage = {
  id: "p000a",
  number: 0.1,
  unit: "0",
  unitTitle: "Pagina di prova",
  title: "Al bar — dialogo e lessico",
  blocks: [
    {
      type: "unitHeader",
      unit: "0",
      title: "Pagina di prova",
      tr: { vi: "Trang mẫu — xem thử các chức năng", en: "Sample page — try the features" },
      goals: [
        { vi: "Nghe & luyện đọc một đoạn hội thoại", en: "Listen to and read a dialogue aloud" },
        { vi: "Ôn passato prossimo với essere / avere", en: "Review the passato prossimo with essere / avere" },
      ],
    },
    { type: "heading", text: "1 · Un caffè con Giulia", tr: { vi: "Một ly cà phê với Giulia", en: "A coffee with Giulia" } },
    { type: "image", photo: "Italian espresso bar cappuccino counter", scene: "cafe", caption: { vi: "Marco và Giulia gặp nhau ở quán bar.", en: "Marco and Giulia meet at the bar." } },
    {
      type: "dialogue",
      lines: [
        { speaker: "Marco", it: "Ciao Giulia! Che sorpresa! Cosa prendi?", tr: { vi: "Chào Giulia! Bất ngờ quá! Bạn uống gì?", en: "Hi Giulia! What a surprise! What are you having?" } },
        { speaker: "Giulia", it: "Un cappuccino, grazie. Sono appena tornata da Firenze.", tr: { vi: "Một ly cappuccino, cảm ơn. Mình vừa mới từ Florence về.", en: "A cappuccino, thanks. I've just come back from Florence." } },
        { speaker: "Marco", it: "Davvero? E com'è andato il viaggio?", tr: { vi: "Thật à? Chuyến đi thế nào?", en: "Really? How did the trip go?" } },
        { speaker: "Giulia", it: "Benissimo! Ho visitato gli Uffizi e ho mangiato una bistecca enorme.", tr: { vi: "Tuyệt lắm! Mình đã thăm bảo tàng Uffizi và ăn một miếng bít tết khổng lồ.", en: "Great! I visited the Uffizi and ate a huge steak." } },
      ],
    },
    {
      type: "vocab",
      title: "Parole utili",
      items: [
        { it: "la sorpresa", tr: { vi: "sự bất ngờ", en: "surprise" } },
        { it: "appena", tr: { vi: "vừa mới", en: "just (recently)" } },
        { it: "il viaggio", tr: { vi: "chuyến đi", en: "trip, journey" } },
        { it: "enorme", tr: { vi: "khổng lồ", en: "huge" } },
      ],
    },
    {
      type: "grammar",
      title: "Passato prossimo: essere o avere?",
      tr: { vi: "Thì quá khứ gần: dùng essere hay avere?", en: "Present perfect: essere or avere?" },
      explain: {
        vi: "Động từ chỉ chuyển động / thay đổi trạng thái (andare, tornare, partire…) dùng ESSERE và phân từ hợp giống-số với chủ ngữ. Phần lớn động từ khác dùng AVERE.",
        en: "Verbs of movement / change of state (andare, tornare, partire…) take ESSERE and the participle agrees with the subject. Most other verbs take AVERE.",
      },
      table: {
        head: ["", "tornare", "visitare"],
        rows: [
          ["io", "sono tornato/a", "ho visitato"],
          ["tu", "sei tornato/a", "hai visitato"],
          ["lui/lei", "è tornato/a", "ha visitato"],
          ["noi", "siamo tornati/e", "abbiamo visitato"],
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p000a-ex1",
        number: "1",
        kind: "fill",
        instruction: "Completa con il passato prossimo dei verbi tra parentesi.",
        tr: { vi: "Hoàn thành câu với passato prossimo của động từ trong ngoặc.", en: "Complete with the passato prossimo of the verbs in brackets." },
        items: [
          { id: "a", prompt: "Giulia ___ a Firenze tre giorni fa.", hint: "andare", answers: ["è andata"] },
          { id: "b", prompt: "Noi ___ una pizza buonissima.", hint: "mangiare", answers: ["abbiamo mangiato"] },
          { id: "c", prompt: "I ragazzi ___ tardi ieri sera.", hint: "tornare", answers: ["sono tornati"] },
          { id: "d", prompt: "Tu ___ gli Uffizi?", hint: "visitare", answers: ["hai visitato"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p000a-ex2",
        number: "2",
        kind: "choice",
        instruction: "Scegli l'opzione corretta.",
        tr: { vi: "Chọn đáp án đúng.", en: "Choose the correct option." },
        items: [
          { id: "a", prompt: "Marco e Giulia si ___ al bar.", options: ["sono incontrati", "hanno incontrato", "sono incontrato"], answer: 0 },
          { id: "b", prompt: "Ieri ___ molto a lungo.", options: ["sono dormito", "ho dormito", "ho dormita"], answer: 1 },
        ],
      },
    },
  ],
};

export default page;
