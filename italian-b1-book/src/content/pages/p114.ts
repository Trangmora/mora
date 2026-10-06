import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 114 (La situazione: In biblioteca, bài 10). */
const page: BookPage = {
  id: "p114",
  number: 114,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "La situazione · In biblioteca",
  runningHead: "La situazione",
  ribbon: "In biblioteca",
  blocks: [
    {
      type: "audio",
      src: "audio/u6-p114-ex10a.mp3",
      title: "10 A",
      autoTranscript: true,
      transcript: [
        "Studente: Buongiorno, avrei bisogno di alcune informazioni su un testo di sociologia, perché il prossimo mese farò l'esame sui mezzi di comunicazione: TV, giornali, pubblicità… È un libro del professor Abruzzese: mi può aiutare a cercarlo?",
        "Bibliotecaria: Un attimo, guardo il catalogo e le dico che cosa abbiamo disponibile in prestito. Ecco, autore Alberto Abruzzese, titolo La società e le comunicazioni, casa editrice il Mulino, anno 2006.",
        "Studente: Sì, ecco, è proprio quello! Mi può dire la collocazione, così domani tornerò a prenderlo?",
        "Bibliotecaria: Certo! Allora è 8B 412, stanza 23.",
        "Studente: Quanto tempo lo potrò tenere?",
        "Bibliotecaria: Dovrà restituirlo entro quindici giorni; domani mi darà i suoi dati personali: studia in questa università?",
        "Studente: Sì.",
        "Bibliotecaria: Bene, allora basterà solo il suo tesserino universitario con il numero di matricola.",
        "Studente: Grazie e arrivederci.",
      ].join("\n"),
    },
    { type: "photo", src: "images/u6/p114-biblioteca.jpg", alt: "La sala di una grande biblioteca moderna" },
    {
      type: "exercise",
      ex: {
        id: "p114-ex10a",
        number: "10",
        label: "A",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        instruction: "Ascoltiamo e completiamo il dialogo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn hội thoại với từ thích hợp.", en: "Let's listen and complete the dialogue with the right words." },
        parts: [
          {
            text: "• Buongiorno, avrei bisogno di alcune informazioni su un testo di sociologia, perché il prossimo mese {{farò}} l'esame sui mezzi di {{comunicazione}}: TV, giornali, pubblicità… È un libro del professor Abruzzese: mi può aiutare a cercarlo?\n○ Un attimo, guardo il {{catalogo}} e le dico che cosa abbiamo disponibile in {{prestito}}. Ecco, {{autore}} Alberto Abruzzese, {{titolo}} *La società e le comunicazioni*, {{casa}} {{editrice}} il Mulino, anno 2006.\n• Sì, ecco, è proprio quello! Mi può dire la {{collocazione}}, così domani {{tornerò}} a prenderlo?\n○ Certo! Allora è 8B 412, stanza 23.\n• Quanto tempo lo {{potrò}} tenere?\n○ {{Dovrà}} restituirlo entro quindici giorni; domani mi {{darà}} i suoi dati personali: studia in questa università?\n• Sì.\n○ Bene, allora {{basterà}} solo il suo {{tesserino|libretto}} universitario con il numero di matricola.\n• Grazie e arrivederci.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p114-ex10b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [
          { id: "1", prompt: "Descrivete alcune biblioteche della vostra città: come sono, come funziona il prestito…", sample: "Nella mia città c'è una grande biblioteca moderna: per il prestito basta la tessera e si possono tenere i libri per due settimane." },
          { id: "2", prompt: "Immaginate di andare in biblioteca e chiedete in prestito un libro.", sample: "Buongiorno, vorrei prendere in prestito un libro di storia italiana. Per quanto tempo lo potrò tenere?" },
        ],
      },
    },
  ],
};

export default page;
