import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 174 (La situazione, bài 11: All'ufficio postale). */
const page: BookPage = {
  id: "p174",
  number: 174,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "La situazione · All'ufficio postale",
  runningHead: "La situazione",
  banner: "All'ufficio postale",
  blocks: [
    { type: "audio", src: "audio/u9-p174-ex11a.mp3", title: "11A", autoTranscript: true, transcript: "• Buongiorno, avrei bisogno di fare un vaglia postale: a quale sportello devo rivolgermi?\n○ Sì, vada allo sportello numero 8 e prenda il numero per la prenotazione.\n• Ok, grazie.\n○ Prego, mi dica.\n• Dovrei spedire un vaglia postale per inviare una caparra per una vacanza che devo fare con la mia famiglia in un villaggio turistico.\n○ Sì, quant'è l'importo della caparra?\n• Devo dare 250 euro.\n○ Ha l'indirizzo del villaggio?\n• Sì: Villaggio “Onda”, Via Marina 25, San Benedetto del Tronto.\n○ Bene, compili questo modulo con i suoi dati personali.\n• Sì, quanti giorni ci vogliono perché il vaglia arrivi a destinazione?\n○ Ci vogliono di solito 4-5 giorni.\n• Senta, mi scusi, dovrei fare anche un telegramma: posso dettarle il testo?\n○ Sì, mi dica…\n• Caro Paolo, auguri per la nascita del vostro bambino. Saremo a San Benedetto fra due settimane.\n○ È tutto?\n• Sì, quanto le devo?\n○ Per il telegramma sono 3 euro." },
    {
      type: "exercise",
      ex: {
        id: "p174-ex11a",
        number: "11",
        label: "A",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn hội thoại với các từ đúng.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            image: { src: "images/u9/p174-sportelli.jpg", alt: "Gli sportelli di un ufficio postale con alcuni clienti", side: "right", width: 46 },
            text: "• Buongiorno, avrei bisogno di fare un vaglia {{postale}}: a quale sportello devo {{rivolgermi}}?\n○ Sì, vada allo sportello numero 8 e prenda il numero per la prenotazione.\n• Ok, grazie.\n○ Prego, mi dica.\n• Dovrei spedire un {{vaglia}} postale per inviare una {{caparra}} per una vacanza che devo fare con la mia famiglia in un {{villaggio}} {{turistico}}.\n○ Sì, quant'è l'{{importo}} della caparra?\n• Devo dare 250 euro.",
          },
          {
            image: { src: "images/u9/p174-lettere.jpg", alt: "Un pacco di lettere legate con lo spago", side: "right", width: 36 },
            text: "○ Ha l'indirizzo del villaggio?\n• Sì: Villaggio “Onda”, Via Marina 25, San Benedetto del Tronto.\n○ Bene, {{compili}} questo {{modulo}} con i suoi dati personali.\n• Sì, quanti giorni ci vogliono perché il vaglia {{arrivi}} a {{destinazione}}?",
          },
          {
            image: { src: "images/u9/p174-pacchi.jpg", alt: "Alcune scatole gialle di Poste Italiane", side: "left", width: 32 },
            text: "○ Ci vogliono di solito 4-5 giorni.\n• Senta, mi scusi, dovrei fare anche un {{telegramma}}: posso {{dettarle|dettare}} il testo?\n○ Sì, mi dica…\n• Caro Paolo, auguri per la nascita del vostro bambino. Saremo a San Benedetto fra due settimane.\n○ È tutto?\n• Sì, quanto le {{devo}}?\n○ Per il telegramma sono 3 euro.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p174-ex11b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo (a coppie).",
        tr: { vi: "Cùng nói (theo cặp).", en: "Let's talk (in pairs)." },
        items: [{ id: "1", prompt: "Siete all'ufficio postale e dovete pagare un bollettino o fare un telegramma…", sample: "• Buongiorno, devo pagare questo bollettino della luce. ○ Certo, sono 85 euro più la commissione. • Posso pagare con il bancomat? ○ Sì, inserisca la carta, prego." }],
      },
    },
  ],
};

export default page;
