import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 153 (La situazione, bài 11: In banca). */
const page: BookPage = {
  id: "p153",
  number: 153,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "La situazione · In banca",
  runningHead: "La situazione",
  banner: "In banca",
  blocks: [
    { type: "audio", src: "audio/u8-p153-ex11a.mp3", title: "11A", autoTranscript: true, transcript: "• Buongiorno, signora, avrei bisogno di alcune informazioni: mi hanno clonato la carta di credito, me ne sono accorto perché ho trovato degli addebiti di spese che non ho mai fatto. Cosa devo fare?\n○ È opportuno che lei compili questo modulo, con tutti i suoi dati, e mi consegni la sua carta: noi provvederemo a bloccare subito il suo conto corrente.\n• Sì, ho bisogno, allora, di una nuova carta di credito…\n○ Penso che ci voglia almeno una settimana perché lei possa avere a casa la nuova carta con il nuovo codice.\n• Sì, grazie mille. Avrei bisogno di fare anche un'altra operazione sul mio conto corrente.\n○ Un prelievo o un versamento?\n• Un prelievo, perché non ho più la possibilità di ritirare i soldi al bancomat.\n○ Certo, quanto vuole?\n• 300 euro e vorrei anche sapere quanti soldi ho sul conto corrente.\n○ Allora le do il saldo.\n• Grazie!" },
    {
      type: "exercise",
      ex: {
        id: "p153-ex11a",
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
            image: { src: "images/u8/p153-banca.jpg", alt: "Gli sportelli di una banca con alcuni clienti in fila", side: "right", width: 52 },
            text: "• Buongiorno, signora, avrei bisogno di alcune informazioni: mi {{hanno}} {{clonato}} la carta di credito, me ne sono accorto perché ho trovato degli {{addebiti}} di spese che non ho mai fatto. Cosa devo fare?\n○ È {{opportuno}} che lei {{compili}} questo modulo, con tutti i suoi {{dati}} e mi {{consegni}} la sua carta: noi provvederemo a {{bloccare}} subito il suo conto corrente.",
          },
          {
            image: { src: "images/u8/p153-carta.jpg", alt: "Una mano tiene una carta di credito", side: "right", width: 40 },
            text: "• Sì, ho bisogno, allora, di una nuova carta di credito…\n○ Penso che ci {{voglia|vuole}} almeno una settimana perché lei {{possa}} avere a casa la nuova carta con il nuovo {{codice}}.\n• Sì, grazie mille. Avrei bisogno di fare anche un'altra {{operazione}} sul mio conto corrente.\n○ Un {{prelievo}} o un versamento?\n• Un prelievo, perché non ho più la possibilità di {{ritirare|prelevare}} i soldi al bancomat.\n○ Certo, quanto vuole?\n• 300 euro e vorrei anche sapere quanti soldi ho sul conto corrente.\n○ Allora le do il {{saldo}}.\n• Grazie!",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p153-ex11b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo (a coppie).",
        tr: { vi: "Cùng nói (theo cặp).", en: "Let's talk (in pairs)." },
        items: [{ id: "1", prompt: "Siete in banca: dovete fare delle operazioni (prelievi, versamenti, pagamenti vari) e chiedete all'impiegato tutte le informazioni necessarie.", sample: "• Buongiorno, vorrei fare un versamento sul mio conto corrente. ○ Certo, quanto vuole versare? • 500 euro. E vorrei anche pagare questa bolletta. ○ Va bene, mi dia il codice del conto, per favore." }],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p153-ex11c",
        label: "C",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        tr: { vi: "Cùng viết.", en: "Let's write." },
        items: [{ id: "1", prompt: "Descrivete come sono le banche nel vostro paese: dite quali sono le più importanti, come funzionano…", lines: 5, sample: "Nel mio paese ci sono molte banche. Le più importanti sono… Di solito sono aperte dal lunedì al venerdì, dalle 8 alle 16. Oggi molte persone usano la banca online e pagano con il cellulare." }],
      },
    },
  ],
};

export default page;
