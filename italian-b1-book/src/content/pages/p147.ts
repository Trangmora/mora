import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 147 (Cominciamo, bài 2–4: Le notizie). */
const page: BookPage = {
  id: "p147",
  number: 147,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "Cominciamo · Le notizie",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p147-ex2",
        number: "2",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Quali giornali leggete, di solito, nel vostro paese?", sample: "Di solito leggo un quotidiano nazionale e, la domenica, un settimanale." },
          { id: "2", prompt: "Qual è il rapporto tra la stampa e la politica nel vostro paese?", sample: "Nel mio paese molti giornali sono vicini a un partito politico." },
          { id: "3", prompt: "Avete mai scritto una lettera a un giornale? Su quale argomento?", sample: "Sì, una volta ho scritto al giornale della mia città sul problema del traffico." },
          { id: "4", prompt: "Quali riviste comprate?", sample: "Compro riviste di viaggi e di cucina." },
          { id: "5", prompt: "Avete mai fatto un abbonamento a una rivista? Perché?", sample: "Sì, sono abbonato a una rivista di scienza perché costa meno e arriva a casa." },
        ],
      },
    },
    { type: "audio", src: "audio/u8-p147-ex3.mp3", title: "3", autoTranscript: true, transcript: "Ascolto 1.\n– Sandra, hai letto oggi il giornale?\n– No, non l'ho ancora comprato. Perché, c'è qualcosa di interessante?\n– Sì, sulla Nazione, nella pagina della cronaca di Firenze, c'è un articolo molto interessante sui lavori che il Comune vuole fare nella zona dello stadio, vicino a casa tua.\n– Oh, che cosa faranno?\n– Vogliono costruire un grande parcheggio.\n– Mmm, non credo sia una buona idea. Ci sono già altri due parcheggi nella zona. E poi penso che sia giusto che il Comune impieghi più soldi per costruire una nuova scuola.\n– Eh sì, lo penso anch'io.\n\nAscolto 2.\n– Riccardo, che cosa stai leggendo?\n– Sto leggendo una recensione sull'ultimo libro di Massimo Giannini, che parla dell'ex presidente della Repubblica Carlo Azeglio Ciampi. Credo che questo libro sia molto interessante: infatti l'autore racconta le cose più importanti che questo presidente ha fatto per il nostro Paese.\n– Bene, lo compro anch'io.\n\nAscolto 3.\n– Nella pagina degli spettacoli della rivista Il Venerdì di Repubblica ho letto una bellissima intervista all'attore Luca Zingaretti.\n– Davvero, Martina? E che cosa dice?\n– Parla del prossimo episodio che interpreterà in TV per una fiction: sarà un sacerdote che combatte la mafia.\n– Immagino che sia un ruolo molto interessante. Credo che Zingaretti abbia tutte le caratteristiche per interpretarlo al meglio.\n– Eh sì, lo guarderò sicuramente." },
    {
      type: "exercise",
      ex: {
        id: "p147-ex3",
        number: "3",
        icons: ["listen", "check"],
        kind: "truefalse",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo i dialoghi e leggiamo: vero o falso?",
        tr: { vi: "Nghe các đoạn hội thoại và đọc: đúng hay sai?", en: "Let's listen to the dialogues and read: true or false?" },
        items: [
          { id: "1", prompt: "L'articolo di cronaca della Nazione dice che il Comune vuole costruire una nuova scuola.", answer: false },
          { id: "2", prompt: "Riccardo sta leggendo un articolo di economia.", answer: false },
          { id: "3", prompt: "Martina ha letto un'intervista a un attore.", answer: true },
          { id: "4", prompt: "Zingaretti interpreterà il ruolo di un professore.", answer: false },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p147-ex4",
        number: "4",
        icons: ["read", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Leggiamo la tabella e parliamo.",
        tr: { vi: "Đọc bảng và cùng nói.", en: "Let's read the table and talk." },
        items: [{ id: "1", prompt: "Osservate la lista degli argomenti che leggete di solito nei giornali: quali preferite? Spiegate perché.", sample: "Preferisco leggere le notizie di cronaca estera e le recensioni cinematografiche, perché mi piace sapere che cosa succede nel mondo e scegliere un buon film." }],
      },
    },
    { type: "gridTable", head: ["", "", ""], rows: [
        ["– ambiente", "– informazioni sui programmi tv", "– politica estera"],
        ["– annunci", "– musica", "– recensioni cinematografiche, teatrali e letterarie"],
        ["– cronaca estera", "– notizie di finanza", "– rubriche religiose"],
        ["– cronaca interna", "– notizie socioeconomiche", "– scienza e tecnologia"],
        ["– cronaca nera", "– notizie sul traffico, sui trasporti, sul tempo", "– sport"],
        ["– cronaca rosa", "", ""],
        ["– hobbies", "", ""],
      ] },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "photo", src: "images/u8/p147-redazione.jpg", alt: "Due giornalisti al lavoro in redazione, tra fogli sparsi sul pavimento" }],
        [{ type: "photo", src: "images/u8/p147-meteo.jpg", alt: "Immagine satellitare dell'Europa per le previsioni del tempo" }],
      ],
    },
  ],
};

export default page;
