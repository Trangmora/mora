import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 133 (La situazione, bài 9: Tutti al concerto!). */
const page: BookPage = {
  id: "p133",
  number: 133,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "La situazione · Tutti al concerto!",
  runningHead: "La situazione",
  banner: "Tutti al concerto!",
  blocks: [
    { type: "audio", src: "audio/u7-p133-ex9a.mp3", title: "9A", autoTranscript: true, transcript: "• Buongiorno, qui è l'ufficio prevendite box-office per i concerti.\n○ Buongiorno, vorrei acquistare dei biglietti per il concerto di Laura Pausini.\n• Quale, quello di Firenze?\n○ Sì, siamo un gruppo di persone e vorremmo comprare i biglietti per la serata del 25 giugno.\n• Mi dispiace, ma per quella serata lo stadio è pienissimo. Se vuole, abbiamo qualcosa per il 26.\n○ Va bene.\n• Quante persone siete?\n○ Siamo otto persone e vorremmo i posti da 25 euro.\n• Non ci sono più, abbiamo solo i biglietti un po' più costosi, da 35 euro. Però vi possiamo fare uno sconto perché siete un gruppo.\n○ Sì, va bene, ma possiamo prenotarli subito?\n• Sì, ho bisogno del suo nome e del numero della carta di credito.\n○ Sì, un attimo… e poi, dove ritiriamo i biglietti?\n• Dovete andare al botteghino almeno un'ora prima dell'inizio del concerto.\n○ Oddio, ma dobbiamo fare la fila?\n• No no, c'è lo sportello “prevendita”: lì vanno le persone che hanno già comprato i biglietti per telefono.\n○ Ah, benissimo! Allora le do il numero di carta di credito…" },
    {
      type: "exercise",
      ex: {
        id: "p133-ex9a",
        number: "9",
        label: "A",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo il dialogo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn hội thoại với các từ đúng.", en: "Let's listen and complete the dialogue with the right words." },
        parts: [
          {
            image: { src: "images/u7/p133-telefono.jpg", alt: "Una ragazza telefona per comprare i biglietti, vicino a lei un ragazzo sorride", side: "right", width: 48 },
            text: "• Buongiorno, qui è l'ufficio prevendite box-office per i concerti.\n○ Buongiorno, vorrei *acquistare* dei biglietti per il concerto di Laura Pausini.\n• Quale, quello di Firenze?\n○ Sì, siamo un {{gruppo}} di persone e vorremmo comprare i biglietti per la {{serata}} del 25 giugno.\n• Mi dispiace, ma per quella serata lo stadio è {{pienissimo}}. Se vuole, abbiamo qualcosa per il 26.\n○ Va bene.\n• Quante persone siete?\n○ Siamo otto persone e vorremmo i posti da 25 euro.\n• Non ci sono più, abbiamo solo i biglietti un po' {{più}} {{costosi|cari}}, da 35 euro. Però vi possiamo fare uno {{sconto}} perché siete un gruppo.",
          },
          {
            image: { src: "images/u7/p133-album.jpg", alt: "La copertina dell'album Io canto di Laura Pausini", side: "left", width: 55 },
            text: "○ Sì, va bene, ma possiamo {{prenotarli|prenotare}} subito?\n• Sì, ho bisogno del suo nome e del numero della carta di credito.\n○ Sì, un attimo… e poi, dove {{ritiriamo|prendiamo}} i biglietti?\n• Dovete andare al {{botteghino}} almeno un'ora prima dell'inizio del concerto.\n○ Oddio, ma dobbiamo fare la {{fila|coda}}?\n• No no, c'è lo sportello “prevendita”: lì vanno le persone che hanno già comprato i biglietti per telefono.\n○ Ah, benissimo! Allora le do il numero di carta di credito…",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p133-ex9b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo (a coppie).",
        tr: { vi: "Cùng nói (theo cặp).", en: "Let's talk (in pairs)." },
        items: [{ id: "1", prompt: "Acquistate dei biglietti per telefono per un concerto.", sample: "• Buongiorno, vorrei due biglietti per il concerto di Jovanotti a Milano. ○ Per quale serata? • Per sabato, se possibile. ○ Ci sono ancora posti in tribuna da 40 euro. • Va bene, posso pagare con la carta di credito?" }],
      },
    },
  ],
};

export default page;
