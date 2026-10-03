import type { BookPage } from "../../types";

const im = (n: number | string) => `images/u1/p12-${n}.jpg`;

/** Ô chép chính tả: khung chữ như sách + đáp án (nghe từ file audio của sách). */
const w = (n: number, hint: string, answer: string) => ({
  id: String(n),
  prompt: `${hint} → ___`,
  hint,
  answers: [answer],
  image: im(n),
});

/** Unità 1 · Entriamo in Italia! — trang 12 (Scrittura e pronuncia, bài 16: Giochiamo insieme!). */
const page: BookPage = {
  id: "p012",
  number: 12,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Scrittura e pronuncia · Giochiamo insieme!",
  addedOn: "2026-10-06",
  sideTab: { unit: "U1", color: "#d8333a" },
  blocks: [
    { type: "sectionTitle", text: "Scrittura e pronuncia" },
    {
      type: "audio",
      src: "audio/u1-p12-ex16.mp3",
      autoTranscript: true,
      transcript: [
        "Esempio: chiodo.",
        "Numero 1: acquedotto. Numero 2: attrezzo. Numero 3: accelerare. Numero 4: buio. Numero 5: tetto. Numero 6: camminare.",
        "Numero 7: cucchiaio. Numero 8: cassa. Numero 9: chiacchierare. Numero 10: aglio. Numero 11: sciare. Numero 12: scimmia.",
        "Numero 13: lasagne. Numero 14: cannocchiale. Numero 15: giglio. Numero 16: Inghilterra. Numero 17: uova.",
      ].join("\n"),
    },
    {
      type: "exercise",
      ex: {
        id: "p012-ex16",
        number: "16",
        icons: ["listen", "write"],
        kind: "fill",
        skill: "listening",
        layout: "board",
        instruction: "Ascoltiamo e scriviamo.",
        subtitle: "Giochiamo insieme!",
        intro:
          "L'insegnante divide la classe in due (o più) gruppi. In ogni gruppo uno studente, con l'aiuto della sua squadra, scrive nelle caselle le parole ascoltate.\nOgni parola scritta correttamente vale due punti.\nBuon divertimento!",
        tr: {
          vi: "Nghe và viết — Cùng chơi nhé! Mỗi nhóm một bạn, với sự giúp đỡ của cả đội, viết vào ô những từ nghe được. Mỗi từ viết đúng được 2 điểm. Chơi vui nhé!",
          en: "Let's listen and write — Let's play together! In each group one student, helped by the team, writes the words they hear in the squares. Each word written correctly is worth two points. Have fun!",
        },
        board: {
          palette: "red",
          total: "Totale: 34 punti",
          example: { pattern: "_ _ _ _ _ o", image: im("es"), answer: "Chiodo" },
        },
        items: [
          w(1, "a _ _ _ _ do _ _ o", "acquedotto"),
          w(2, "a _ _ _ _ zo", "attrezzo"),
          w(3, "a _ _ _ _ _ _ are", "accelerare"),
          w(4, "b _ _ o", "buio"),
          w(5, "_ _ _ _ _", "tetto"),
          w(6, "_ _ _ _ _ _ _ _ _", "camminare"),
          w(7, "cu _ _ _ i _ i _", "cucchiaio"),
          w(8, "_ _ _ _ _", "cassa"),
          w(9, "chi _ _ _ _ _ _ _ _ _ _", "chiacchierare"),
          w(10, "_ _ _ _ _", "aglio"),
          w(11, "_ _ _ are", "sciare"),
          w(12, "_ _ _ _ _ _ _", "scimmia"),
          w(13, "_ _ _ _ _ _ _", "lasagne"),
          w(14, "ca _ _ o _ _ _ _ ale", "cannocchiale"),
          w(15, "_ _ _ _ _ _", "giglio"),
          w(16, "In _ _ _ lte _ _ a", "Inghilterra"),
          w(17, "_ _ _ _", "uova"),
        ],
      },
    },
  ],
};

export default page;
