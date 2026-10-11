import type { BookPage } from "../../types";

/** Unità 1 · Piacere, sono io! — trang 2 (Si parte!, bài 2B–3). Nội dung tự soạn. */
const page: BookPage = {
  id: "p002",
  number: 2,
  unit: "1",
  unitTitle: "Piacere, sono io!",
  addedOn: "2026-10-10",
  sideTab: { unit: "U1", title: "Piacere, sono io!" },
  title: "Si parte! · Vero o falso? Domande e risposte",
  runningHead: "Si parte!",
  blocks: [
    {
      type: "columns",
      widths: [3, 1.4],
      align: "center",
      cols: [
        [
          {
            type: "exercise",
            ex: {
              id: "p002-ex2b",
              number: "2",
              label: "B",
              icons: ["read", "check"],
              kind: "truefalse",
              skill: "reading",
              instruction: "Leggiamo di nuovo: vero o falso?",
              tr: {
                vi: "Đọc lại: đúng hay sai?",
                en: "Let's read again: true or false?",
              },
              items: [
                {
                  id: "1",
                  prompt: "Hoa e Tomás si conoscono già.",
                  answer: false,
                },
                { id: "2", prompt: "Tomás lavora in cucina.", answer: true },
                { id: "3", prompt: "Hoa studia medicina.", answer: false },
                {
                  id: "4",
                  prompt: "A Hoa piace disegnare all'aperto.",
                  answer: true,
                },
                {
                  id: "5",
                  prompt: "Nel tempo libero Tomás va in bicicletta.",
                  answer: false,
                },
              ],
              rules: ["tu-lei", "chiamarsi"],
              why: {
                "1": {
                  rule: "chiamarsi",
                  tr: {
                    vi: "**Falso.** Tomás nói «Mi chiamo Tomás, **piacere**» — người ta chỉ nói *piacere* khi gặp nhau **lần đầu**. Họ dùng «tu» (Di dove **sei**?) vì cùng là học viên trẻ.",
                    en: "**False.** Tomás says «Mi chiamo Tomás, **piacere**» — you only say *piacere* when you meet someone for the **first time**. They use «tu» (Di dove **sei**?) because they are both young students.",
                  },
                },
                "2": {
                  tr: {
                    vi: "**Vero.** «Faccio il **cuoco**… un tirocinio in un **ristorante**» → đầu bếp làm việc trong bếp (cucina).",
                    en: "**True.** «Faccio il **cuoco**… un tirocinio in un **ristorante**» → a cook works in the kitchen (cucina).",
                  },
                },
                "3": {
                  tr: {
                    vi: "**Falso.** Hoa nói «Studio **architettura**» (kiến trúc), không phải medicina (y khoa).",
                    en: "**False.** Hoa says «Studio **architettura**», not medicina.",
                  },
                },
                "4": {
                  tr: {
                    vi: "**Vero.** «Nel tempo libero vado sempre a **disegnare** in Piazza Santo Stefano» → vẽ ngoài trời, ở quảng trường.",
                    en: "**True.** «Nel tempo libero vado sempre a **disegnare** in Piazza Santo Stefano» → drawing outdoors, in a square.",
                  },
                },
                "5": {
                  tr: {
                    vi: "**Falso.** Hoa nhắc đến «le biciclette» của thành phố, còn Tomás thì «gioco a **calcetto**» (đá bóng 5 người).",
                    en: "**False.** Hoa mentions the city's «biciclette»; Tomás «gioca a **calcetto**» (five-a-side football).",
                  },
                },
              },
            },
          },
        ],
        [
          {
            type: "photo",
            src: "images/nb/u1-tempo-libero.svg",
            alt: "Un album con il disegno di Santo Stefano e un pallone da calcetto",
          },
        ],
      ],
    },
    {
      type: "columns",
      widths: [3, 1.2],
      align: "center",
      cols: [
        [
          {
            type: "exercise",
            ex: {
              id: "p002-ex3",
              number: "3",
              icons: ["read", "match"],
              kind: "match",
              skill: "reading",
              instruction: "Abbiniamo le domande alle risposte di Tomás.",
              tr: {
                vi: "Nối các câu hỏi với câu trả lời của Tomás.",
                en: "Let's match the questions to Tomás's answers.",
              },
              left: [
                { id: "1", text: "Come ti chiami?" },
                { id: "2", text: "Quanti anni hai?" },
                { id: "3", text: "Che lavoro fai?" },
                { id: "4", text: "Perché studi l'italiano?" },
                { id: "5", text: "Che cosa fai nel tempo libero?" },
              ],
              right: [
                { id: "a", text: "Faccio il cuoco." },
                { id: "b", text: "Gioco a calcetto e guardo vecchi film." },
                { id: "c", text: "Tomás Herrera." },
                { id: "d", text: "Ne ho ventotto." },
                {
                  id: "e",
                  text: "Perché voglio lavorare in un ristorante italiano.",
                },
              ],
              given: { "1": "c" },
              rules: ["domande", "ne-quantita", "fare"],
              why: {
                "2": {
                  rule: "ne-quantita",
                  tr: {
                    vi: "«**Quanti** anni hai?» hỏi số lượng → câu trả lời có con số: «**Ne** ho ventotto». *Ne* thay cho «anni» để khỏi lặp lại.",
                    en: "«**Quanti** anni hai?» asks for a number → the answer has a number: «**Ne** ho ventotto». *Ne* replaces «anni» so it isn't repeated.",
                  },
                },
                "3": {
                  rule: "fare",
                  tr: {
                    vi: "«Che lavoro **fai**?» dùng động từ *fare* → trả lời cũng bằng *fare*: «**Faccio il** cuoco» (fare + mạo từ + nghề).",
                    en: "«Che lavoro **fai**?» uses *fare* → answer with *fare* too: «**Faccio il** cuoco» (fare + article + job).",
                  },
                },
                "4": {
                  rule: "domande",
                  tr: {
                    vi: "Hỏi bằng «**Perché**…?» (tại sao) → trả lời cũng bắt đầu bằng «**Perché**…» (vì).",
                    en: "A «**Perché**…?» (why) question → the answer also starts with «**Perché**…» (because).",
                  },
                },
                "5": {
                  rule: "domande",
                  tr: {
                    vi: "«Che cosa **fai** nel tempo libero?» hỏi về hoạt động → câu trả lời là các động từ chia ngôi io: «**gioco**… **guardo**…».",
                    en: "«Che cosa **fai** nel tempo libero?» asks about activities → the answer has io-form verbs: «**gioco**… **guardo**…».",
                  },
                },
              },
              answer: { "1": "c", "2": "d", "3": "a", "4": "e", "5": "b" },
            },
          },
        ],
        [
          {
            type: "photo",
            src: "images/nb/u1-cuoco.svg",
            alt: "Tomás, cuoco, nella cucina del ristorante",
          },
        ],
      ],
    },
  ],
};

export default page;
