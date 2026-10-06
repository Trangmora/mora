import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 68 (Osserviamo bene, bài 6: La cucina della Lombardia; bài 7A: ci). */
const page: BookPage = {
  id: "p068",
  number: 68,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Osserviamo bene · La cucina della Lombardia",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p068-ex6",
        number: "6",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il dialogo.",
        tr: { vi: "Đọc và hoàn thành đoạn hội thoại (đại từ và đuôi phân từ).", en: "Let's read and complete the dialogue (pronouns and participle endings)." },
        parts: [
          {
            boxed: true,
            title: "La cucina italiana del Nord: la Lombardia",
            image: { src: "images/u4/p68-gorgonzola.jpg", alt: "Forme di gorgonzola e un bicchiere di vino rosso", side: "left", width: 36 },
            text: [
              "*A cena da Sandro*",
              "• Sandro, {{=mi}} dici il segreto dei tuoi primi? Sono buonissimi, ricchi di sapore, semplici e raffinati.",
              "○ Cara Silvia, {{te}} {{lo}} spiego subito: cerco di rispettare i tempi di cottura, di mettere la pasta nella pentola quando l'acqua bolle, di aggiungere il sale nell'acqua un attimo prima della pasta…",
              "• Sì, bene! Ma la ricetta di stasera è deliziosa, {{me}} {{la}} dai?",
              "○ Senz'altro! È un piatto lombardo con influenze venete, è una ricetta antica, si chiama “stracci alla trevigiana”. {{Me}} {{l'|la}} ha consigliat{{a}} un mio amico che lavora in un ristorante di Cremona: i suoi clienti adorano questo primo e lui {{lo}} prepara veramente ad arte! Allora, prendi una bella fetta di gorgonzola, uno spicchio di zucca, un rametto di rosmarino, un po' di insalata trevigiana, uno spicchio d'aglio…",
              "• Aspetta, aspetta, perché non {{me}} {{la}} scrivi?",
              "○ Va bene, se vuoi {{te}} {{la}} posso mandare al tuo indirizzo e-mail. Conosci il sito “Cibovagando”? {{Te}} {{lo}} suggerisco perché puoi trovare molte specialità regionali.",
              "• Grazie mille! Sai che sono un'appassionata di formaggi? {{Li}} mangio tutti, ma il gorgonzola è veramente il mio preferito: è un formaggio squisito, cremoso, sta bene con tutto. La scorsa settimana {{l'|lo}} ho assaggiat{{o}} sulla pizza: era speciale!",
              "○ Sì, infatti. Pensa che una volta sono andato proprio a Gorgonzola, vicino a Milano, e ho visitato una fattoria che lo produce: {{l'|lo}} avrei mangiat{{o}} tutto!",
              "• Perché non ci torniamo insieme?",
            ].join("\n"),
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p068-ex7a", number: "7", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "CI", tr: { vi: "Cùng đọc: từ «ci».", en: "Let's read: the word «ci»." }, items: [] },
    },
    {
      type: "theory",
      text: `
- **Ci** = in quel luogo, lì; in questo luogo, qui
! ATTENZIONE!
- mi, ti, vi + **ci** = mi **ci**, ti **ci**, vi **ci**
- **ci** + lo, la, li, le = **ce** lo, **ce** la, **ce** li, **ce** le
===
%% • Venite in trattoria con noi? || ○ Sì, **ci** veniamo volentieri.
%% • Mi porti a casa? || ○ Sì, ti **ci** porto subito.
%% • Chi accompagna le bambine a scuola? || ○ **Ce** le accompagna Franco.
`.trim(),
    },
  ],
};

export default page;
