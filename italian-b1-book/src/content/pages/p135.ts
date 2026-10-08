import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 135 (Facciamo pratica, bài 10C, 11A: La Traviata). */
const page: BookPage = {
  id: "p135",
  number: 135,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Facciamo pratica · La Traviata",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p135-ex10c",
        label: "C",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Conoscevate già questa canzone?", sample: "Sì, la conoscevo: l'ho sentita cantare da Pavarotti." },
          { id: "2", prompt: "Che sensazioni vi comunica?", sample: "Mi comunica allegria, ma anche un po' di nostalgia." },
          { id: "3", prompt: "Che cosa vi colpisce di più?", sample: "Mi colpisce la melodia, è molto romantica." },
        ],
      },
    },
    { type: "audio", src: "audio/u7-p135-ex11a.mp3", title: "11 A", transcript: "Giuseppe Verdi, La Traviata (brano musicale)" },
    {
      type: "exercise",
      ex: { id: "p135-ex11a", number: "11", label: "A", icons: ["listen", "read"], kind: "speak", skill: "listening", instruction: "Ascoltiamo un brano della Traviata e leggiamo la storia.", subtitle: "La Traviata", tr: { vi: "Nghe một đoạn trong vở La Traviata và đọc câu chuyện.", en: "Let's listen to an excerpt from La Traviata and read the story." }, items: [] },
    },
    {
      type: "columns",
      widths: [5, 2],
      cols: [
        [{ type: "photo", src: "images/u7/p135-traviata.jpg", alt: "Una scena de La Traviata a teatro" }],
        [{ type: "photo", src: "images/u7/p135-verdi.jpg", alt: "Ritratto di Giuseppe Verdi" }],
      ],
    },
    {
      type: "columns",
      align: "center",
      cols: [
        [{ type: "photo", src: "images/u7/p135-libro.jpg", alt: "Il libretto de La Traviata, opera in tre atti" }],
        [{ type: "theory", text: "## La Traviata\n*Opera in tre atti*\n**Libretto:** Francesco Maria Piave dal dramma “La dame aux camélias” di Alexandre Dumas figlio\n**Musica:** Giuseppe Verdi\n**Prima rappresentazione:** Venezia, Teatro “La Fenice”, 6 marzo 1853\n**Ambientazione:** Parigi e sue vicinanze, 1850 circa" }],
      ],
    },
  ],
};

export default page;
