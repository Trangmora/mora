import type { BookPage } from "../../types";

/** Unità 1 · Piacere, sono io! — trang 3 (Si parte!, bài 4–5). Nội dung tự soạn. */
const page: BookPage = {
  id: "p003",
  number: 3,
  unit: "1",
  unitTitle: "Piacere, sono io!",
  addedOn: "2026-10-10",
  sideTab: { unit: "U1", title: "Piacere, sono io!" },
  title: "Si parte! · La scheda di iscrizione",
  runningHead: "Si parte!",
  blocks: [
    {
      type: "columns",
      widths: [3, 1.2],
      align: "center",
      cols: [
        [
          {
            type: "exercise",
            ex: {
              id: "p002-ex4",
              number: "4",
              icons: ["write"],
              kind: "form",
              skill: "writing",
              formStyle: "corso",
              formTitle: "SCUOLA “PAROLA VIVA” · BOLOGNA",
              formSubtitle: "SCHEDA DI ISCRIZIONE",
              instruction: "Scriviamo: compiliamo la scheda con i nostri dati.",
              tr: {
                vi: "Cùng viết: điền phiếu với thông tin của bạn.",
                en: "Let's write: fill in the form with our details.",
              },
              items: [
                { id: "nome", label: "Nome e cognome:", col: 1 },
                { id: "nascita", label: "Nato/a a … il …:", col: 1 },
                { id: "naz", label: "Paese di provenienza:", col: 1 },
                { id: "lavoro", label: "Studio / lavoro:", col: 1 },
                { id: "lingue", label: "Lingue che parlo:", col: 1 },
                {
                  id: "q1",
                  label: "Da quanto tempo studi l'italiano?",
                  col: 2,
                  section: "Due parole su di te",
                  sectionNote: "Rispondi con una o due frasi:",
                },
                {
                  id: "q2",
                  label:
                    "Che cosa vuoi migliorare di più? (parlare, ascoltare, scrivere, leggere…)",
                  col: 2,
                  lines: 2,
                },
                {
                  id: "q3",
                  label:
                    "Una cosa dell'Italia che ami e una che non capisci ancora:",
                  col: 2,
                  lines: 2,
                },
                {
                  id: "corso",
                  label: "Corso scelto:",
                  col: "foot",
                  options: ["mattina", "pomeriggio", "sera"],
                  optionCols: 3,
                },
              ],
            },
          },
        ],
        [
          {
            type: "photo",
            src: "images/nb/u1-aula.jpg",
            alt: "Studenti in un'aula durante un corso di lingua",
            credit: "Foto: Rexdanato · CC BY-SA 4.0 · Wikimedia Commons",
            href: "https://commons.wikimedia.org/wiki/File:Japanese_course.jpg",
          },
        ],
      ],
    },
    {
      type: "columns",
      widths: [3, 1.3],
      align: "center",
      cols: [
        [
          {
            type: "exercise",
            ex: {
              id: "p002-ex5",
              number: "5",
              icons: ["write"],
              kind: "fill",
              skill: "grammar",
              instruction:
                "Completiamo con i verbi chiamarsi, essere, avere, fare al presente.",
              example: {
                q: "1. Io (chiamarsi) ___ Hoa.",
                a: "Io ***mi chiamo*** Hoa.",
              },
              tr: {
                vi: "Hoàn thành câu với các động từ chiamarsi, essere, avere, fare ở thì hiện tại.",
                en: "Let's complete with the verbs chiamarsi, essere, avere, fare in the present.",
              },
              items: [
                {
                  id: "2",
                  prompt:
                    "2. Tomás (essere) ___ argentino e (fare) ___ il cuoco.",
                  answers: ["è", "fa"],
                },
                {
                  id: "3",
                  prompt:
                    "3. Noi (avere) ___ lezione tutte le mattine alle nove.",
                  answers: ["abbiamo"],
                },
                {
                  id: "4",
                  prompt: "4. Come (chiamarsi) ___ la vostra insegnante?",
                  answers: ["si chiama"],
                },
                {
                  id: "5",
                  prompt: "5. Voi di dove (essere) ___?",
                  answers: ["siete"],
                },
                {
                  id: "6",
                  prompt: "6. Hoa e Tomás (avere) ___ quasi la stessa età.",
                  answers: ["hanno"],
                },
              ],
              rules: ["essere", "avere", "fare", "chiamarsi"],
              why: {
                "2": {
                  rule: "essere",
                  tr: {
                    vi: "Chủ ngữ **Tomás** = ngôi thứ ba số ít (lui). Quốc tịch dùng *essere* → «**è** argentino» (có dấu: è = là). Nghề dùng *fare* + mạo từ → «**fa** il cuoco».",
                    en: "Subject **Tomás** = third person singular (lui). Nationality takes *essere* → «**è** argentino» (with accent: è = is). Job takes *fare* + article → «**fa** il cuoco».",
                  },
                },
                "3": {
                  rule: "avere",
                  tr: {
                    vi: "Chủ ngữ **noi** → avere chia là «**abbiamo**». Nhớ: *avere lezione* = có giờ học.",
                    en: "Subject **noi** → avere becomes «**abbiamo**». Remember: *avere lezione* = to have class.",
                  },
                },
                "4": {
                  rule: "chiamarsi",
                  tr: {
                    vi: "Chủ ngữ là «**la vostra insegnante**» (một người → lei) chứ không phải «voi». Động từ phản thân → «**si chiama**».",
                    en: "The subject is «**la vostra insegnante**» (one person → lei), not «voi». Reflexive verb → «**si chiama**».",
                  },
                },
                "5": {
                  rule: "essere",
                  tr: {
                    vi: "Chủ ngữ **voi** → essere chia là «**siete**». «Di dove siete?» = Các bạn từ đâu đến?",
                    en: "Subject **voi** → essere becomes «**siete**». «Di dove siete?» = Where are you all from?",
                  },
                },
                "6": {
                  rule: "avere",
                  tr: {
                    vi: "**Hoa e Tomás** = hai người → loro → «**hanno**». Nói về tuổi (età) tiếng Ý dùng *avere*, không dùng essere.",
                    en: "**Hoa e Tomás** = two people → loro → «**hanno**». Age (età) in Italian takes *avere*, not essere.",
                  },
                },
              },
            },
          },
        ],
        [
          {
            type: "photo",
            src: "images/nb/u1-lavagna.svg",
            alt: "Una lavagna con il presente di essere, avere, fare e chiamarsi",
          },
        ],
      ],
    },
    {
      type: "theory",
      text: "! ATTENZIONE!\n- Con un amico: | **Ciao, come ti chiami?** — **Di dove sei?**\n- Con una persona che non conosciamo: | **Buongiorno, come si chiama?** — **Di dov'è?**",
    },
  ],
};

export default page;
