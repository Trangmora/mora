import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 29 (La situazione: All'ufficio anagrafe, bài 9). */
const page: BookPage = {
  id: "p029",
  number: 29,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "La situazione · All'ufficio anagrafe",
  addedOn: "2026-10-06",
  runningHead: "La situazione",
  ribbon: "All'ufficio anagrafe",
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "audio",
      src: "audio/u2-p29-ex9.mp3",
      autoTranscript: true,
      transcript: [
        "Ascolto 1",
        "Lorenzo: Buongiorno, signora, volevo un certificato…",
        "Impiegata: Sì, di che tipo?",
        "Lorenzo: Uno stato di famiglia, per favore.",
        "Impiegata: Bene, ho bisogno di alcuni dati: nome, cognome, indirizzo del capofamiglia.",
        "Lorenzo: Allora, mi chiamo Lorenzo Giannini, abito a Firenze, in Via Faenza numero 45.",
        "Impiegata: Perfetto: quante copie le servono?",
        "Lorenzo: Tre copie. Quanto devo pagare?",
        "Impiegata: Allora, sono tre euro per le marche da bollo.",
        "Ascolto 2",
        "Impiegato: Buongiorno, signora, desidera?",
        "Signora: Salve, ho bisogno di una serie di documenti perché mi devo sposare tra 6 mesi. Allora, vorrei il certificato di nascita e quello di residenza.",
        "Impiegato: Lei è nata nel comune di Bologna?",
        "Signora: No, sono nata nel comune di Teramo.",
        "Impiegato: Allora, deve compilare i moduli che trova a destra, accanto allo sportello numero 3.",
        "Signora: E per la residenza?",
        "Impiegato: Se lei abita a Bologna, ho bisogno solo del suo indirizzo, lo scrivo al computer e il suo certificato è pronto in pochi secondi.",
        "Signora: Grazie!",
      ].join("\n"),
    },
    {
      type: "exercise",
      ex: {
        id: "p029-ex9a",
        number: "9",
        label: "A",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo i dialoghi con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành các đoạn hội thoại với từ thích hợp.", en: "Let's listen and complete the dialogues with the right words." },
        parts: [
          {
            title: "1.",
            image: { src: "images/u2/p29-ufficio.jpg", alt: "Un ufficio anagrafe con scrivanie e computer", side: "right", width: 48 },
            text: [
              "• Buongiorno, signora, {{volevo}} un certificato…",
              "○ Sì, di che tipo?",
              "• Uno {{stato}} {{di}} {{famiglia}}, per favore.",
              "○ Bene, ho bisogno di alcuni {{dati}}: nome, cognome, indirizzo del {{capofamiglia|capo famiglia}}.",
              "• Allora, mi chiamo Lorenzo Giannini, abito a Firenze, in Via Faenza numero 45.",
              "○ Perfetto: quante {{copie}} le {{servono}}?",
              "• Tre copie. Quanto devo pagare?",
              "○ Allora, sono tre euro per le {{marche}} {{da}} {{bollo}}.",
            ].join("\n"),
          },
          {
            title: "2.",
            text: [
              "• Buongiorno, signora, desidera?",
              "○ Salve, ho bisogno di una serie di {{documenti}} perché mi devo sposare tra 6 mesi. Allora, vorrei il {{certificato}} {{di}} {{nascita}} e quello di {{residenza}}.",
              "• Lei è nata nel {{comune}} di Bologna?",
              "○ No, sono nata nel comune di Teramo.",
              "• Allora, deve {{compilare}} i {{moduli}} che trova a destra, accanto allo {{sportello}} numero 3.",
              "○ E per la residenza?",
              "• Se lei abita a Bologna, ho bisogno solo del suo {{indirizzo}}, lo scrivo al computer e il suo certificato è pronto in pochi secondi.",
              "○ Grazie!",
            ].join("\n"),
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p029-ex9b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo (a coppie).",
        tr: { vi: "Cùng nói (theo cặp).", en: "Let's talk (in pairs)." },
        items: [
          {
            id: "1",
            prompt: "Siete al comune e avete bisogno del certificato di matrimonio.",
            sample: "Buongiorno, avrei bisogno del certificato di matrimonio. Ci siamo sposati qui a Bologna il 12 giugno 2010. Ecco i miei documenti.",
          },
          {
            id: "2",
            prompt: "Siete in questura: chiedete come inserire nel passaporto i nomi dei vostri figli.",
            sample: "Buongiorno, vorrei sapere come posso inserire nel passaporto i nomi dei miei figli. Quali documenti devo portare?",
          },
          {
            id: "3",
            prompt: "È nato un bambino nella vostra famiglia: andate al comune per registrare la sua nascita.",
            sample: "Buongiorno, è nato mio figlio e vorrei registrare la sua nascita. Si chiama Luca ed è nato il 3 marzo all'ospedale di Firenze.",
          },
        ],
      },
    },
  ],
};

export default page;
