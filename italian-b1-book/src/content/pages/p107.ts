import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 107 (Cominciamo, bài 2–3: La società italiana). */
const page: BookPage = {
  id: "p107",
  number: 107,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Cominciamo · La società italiana",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "audio",
      src: "audio/u6-p107-ex2.mp3",
      title: "2",
      autoTranscript: true,
      transcript: [
        "Giornalista: Buongiorno! Oggi intervistiamo il prof. Bruno Spina, un esperto di società e di comunicazione dell'Università La Sapienza di Roma. Bene, professore, allora ci dica: quali sono i cambiamenti più importanti che abbiamo avuto nella società italiana negli ultimi anni?",
        "Prof. Spina: Ecco, è difficile descrivere in poche parole le trasformazioni profonde della nostra società, perché i cambiamenti sono diversi e hanno interessato vari settori. Alcune novità sono sotto gli occhi di tutti: l'uso di Internet e la diffusione dei cellulari, per esempio, hanno cambiato le abitudini degli italiani.",
        "Giornalista: Possiamo dire, quindi, che la rivoluzione del cellulare è stata velocissima?",
        "Prof. Spina: Certo! Dieci anni fa meno del 7% della popolazione aveva un telefono cellulare: tra breve il cellulare lo avrà il 100% degli italiani, siamo ai primi posti nel mondo!",
        "Giornalista: E il settore studio come va?",
        "Prof. Spina: Beh, ci sono meno analfabeti rispetto al passato e, probabilmente, diminuiranno sempre di più, ma la laurea resta un sogno per molti: tra i giovani sotto i 34 anni solo il 10% ha un titolo universitario e tra le persone di 50-60 anni appena il 6,7%, contro il 33% degli americani.",
        "Giornalista: E le abitudini di vita di oggi?",
        "Prof. Spina: Vede, dal 2001 ad oggi c'è stato un aumento dei prezzi notevole…",
        "Giornalista: Che cosa costa di più?",
        "Prof. Spina: Per esempio, le polizze d'assicurazione delle auto (il 30% in più), ma anche i ristoranti e le pizzerie (il 15% in più). Gli italiani cercano di non spendere molti soldi, anche se le previsioni economiche ci indicano che la situazione migliorerà.",
        "Giornalista: Ci dice, infine, qualcosa che sta cambiando in senso positivo nella nostra società?",
        "Prof. Spina: Certo! Oggi fumiamo di meno: dopo che la legge nel 2005 ha stabilito il divieto di fumare in tutti i luoghi pubblici, i numeri del Ministero della Sanità ci mostrano che, in dodici mesi, 500.000 persone hanno rinunciato al vizio del fumo.",
        "Giornalista: Grazie, professore.",
        "Prof. Spina: Grazie a lei!",
      ].join("\n"),
    },
    {
      type: "exercise",
      ex: {
        id: "p107-ex2",
        number: "2",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn văn với từ thích hợp.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            boxed: true,
            title: "La società italiana",
            text: "• Buongiorno! Oggi {{intervistiamo}} il prof. Bruno Spina, un esperto di società e di comunicazione dell'Università La Sapienza di Roma. Bene, professore, allora ci dica: quali sono i cambiamenti più importanti che abbiamo avuto nella {{società}} italiana negli ultimi anni?\n○ Ecco, è difficile descrivere in poche parole le trasformazioni profonde della nostra società, perché i cambiamenti sono diversi e hanno interessato vari {{settori}}. Alcune novità sono sotto gli occhi di tutti: l'uso di {{Internet}} e la diffusione dei {{cellulari}}, per esempio, hanno cambiato le abitudini degli italiani.\n• Possiamo dire, quindi, che la {{rivoluzione}} del cellulare è stata velocissima?\n○ Certo! Dieci anni fa meno del 7% della popolazione aveva un telefono cellulare: tra breve il cellulare lo {{avrà}} il 100% degli italiani, siamo ai primi posti nel mondo!\n• E il settore {{studio}} come va?\n○ Beh, ci sono meno analfabeti rispetto al passato e, probabilmente, {{diminuiranno}} sempre di più, ma la {{laurea}} resta un sogno per molti: tra i giovani sotto i 34 anni solo il 10% ha un titolo universitario e tra le persone di 50-60 anni appena il 6,7%, contro il 33% degli americani.\n• E le {{abitudini}} di vita di oggi?\n○ Vede, dal 2001 ad oggi c'è stato un {{aumento}} dei {{prezzi}} notevole…\n• Che cosa costa di più?\n○ Per esempio, le polizze d'assicurazione delle auto (il 30% in più), ma anche i ristoranti e le pizzerie (il 15% in più). Gli italiani cercano di non spendere molti soldi, anche se le previsioni economiche ci indicano che la situazione {{migliorerà}}.\n• Ci dice, infine, qualcosa che sta cambiando in senso positivo nella nostra società?\n○ Certo! Oggi {{fumiamo}} di meno: dopo che la legge nel 2005 ha stabilito il divieto di fumare in tutti i luoghi pubblici, i numeri del Ministero della Sanità ci mostrano che, in dodici mesi, 500.000 persone {{hanno}} {{rinunciato}} al {{vizio}} del fumo.\n• Grazie, professore.\n○ Grazie a lei!",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p107-ex3",
        number: "3",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Quali sono i cambiamenti più importanti degli ultimi anni nella vostra società nel campo dell'economia, della politica e della scuola?", sample: "Nel mio paese l'economia è cresciuta molto e oggi più giovani vanno all'università." },
          { id: "2", prompt: "Le abitudini delle persone nel vostro paese sono cambiate? In quali campi?", sample: "Sì, oggi le persone usano molto il telefono e fanno acquisti online." },
          { id: "3", prompt: "Per quanto riguarda la moda, le vacanze e il tempo libero, le vostre abitudini sono diverse rispetto a quelle dei vostri nonni?", sample: "Sì, i miei nonni non andavano in vacanza all'estero, io invece viaggio spesso." },
          { id: "4", prompt: "Quale immagine della società italiana avete nel vostro paese?", sample: "Nel mio paese l'Italia è famosa per la moda, il cibo e l'arte." },
        ],
      },
    },
  ],
};

export default page;
