import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 116 (Facciamo pratica, bài 12–13: La ricerca in Italia). */
const page: BookPage = {
  id: "p116",
  number: 116,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Facciamo pratica · La ricerca in Italia",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "audio",
      src: "audio/u6-p116-ex12.mp3",
      title: "12",
      autoTranscript: true,
      transcript: [
        "Giornalista: Intervistiamo il professor Andrea Ballabio, importante ricercatore al Policlinico di Napoli. Il professore risponderà ad alcune domande su un tema particolare: la “fuga dei cervelli” dall'Italia. Perché tanti bravi ricercatori lasciano il nostro paese per andare all'estero?",
        "Prof. Ballabio: Vede, ogni anno in Italia abbiamo più di 4.000 dottori di ricerca. In genere sono laureati brillanti: hanno vinto un concorso e una borsa di studio almeno triennale, hanno un buon curriculum e pubblicazioni importanti.",
        "Giornalista: Che cosa fanno per trovare un lavoro definitivo?",
        "Prof. Ballabio: Alcuni riescono ad avere una borsa di studio, altri abbandonano la ricerca e cambiano lavoro. Molti scappano: di fronte alle porte chiuse di casa propria girano le spalle e vanno all'estero, dove le porte, invece, sono aperte e le prospettive sono ben diverse. Queste persone lavorano con impegno e contribuiscono ad alzare il livello culturale e scientifico del paese che li ospita.",
        "Giornalista: Quali sono i motivi della fuga dei cervelli?",
        "Prof. Ballabio: Innanzi tutto ci sono pochi fondi investiti nella ricerca: i finanziamenti, infatti, in Italia sono la metà di quelli della media europea. Inoltre c'è stata, fino a poco tempo fa, la mancanza di una politica adeguata: non abbiamo premiato la qualità nell'università italiana.",
        "Giornalista: Dove vanno i nostri ricercatori?",
        "Prof. Ballabio: Soprattutto negli Usa, in Inghilterra e in Germania.",
        "Giornalista: Grazie, professore e speriamo che in futuro le cose cambieranno!",
      ].join("\n"),
    },
    {
      type: "exercise",
      ex: { id: "p116-ex12-intro", number: "12", icons: ["listen", "write"], kind: "speak", skill: "listening", instruction: "Ascoltiamo l'intervista e scriviamo le domande.", subtitle: "La ricerca in Italia", tr: { vi: "Nghe cuộc phỏng vấn và viết lại các câu hỏi.", en: "Let's listen to the interview and write the questions." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2],
      cols: [
        [{ type: "text", it: "• Intervistiamo il professor Andrea Ballabio, importante ricercatore al Policlinico di Napoli. Il professore risponderà ad alcune domande su un tema particolare: la “fuga dei cervelli” dall'Italia." }],
        [{ type: "photo", src: "images/u6/p116-ballabio.jpg", alt: "Il professor Andrea Ballabio a una conferenza" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p116-ex12",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        refText: "audio",
        instruction: "Scriviamo le domande del giornalista.",
        tr: { vi: "Viết các câu hỏi của nhà báo.", en: "Write the journalist's questions." },
        items: [
          { id: "1", prompt: "• ……? ○ Vede, ogni anno in Italia abbiamo più di 4.000 dottori di ricerca. In genere sono laureati brillanti: hanno vinto un concorso e una borsa di studio almeno triennale, hanno un buon curriculum e pubblicazioni importanti.", lines: 1, sample: "Perché tanti bravi ricercatori lasciano il nostro paese per andare all'estero?" },
          { id: "2", prompt: "• ……? ○ Alcuni riescono ad avere una borsa di studio, altri abbandonano la ricerca e cambiano lavoro. Molti scappano: di fronte alle porte chiuse di casa propria girano le spalle e vanno all'estero, dove le porte, invece, sono aperte e le prospettive sono ben diverse. Queste persone lavorano con impegno e contribuiscono ad alzare il livello culturale e scientifico del paese che li ospita.", lines: 1, sample: "Che cosa fanno per trovare un lavoro definitivo?" },
          { id: "3", prompt: "• ……? ○ Innanzi tutto ci sono pochi fondi investiti nella ricerca: i finanziamenti, infatti, in Italia sono la metà di quelli della media europea. Inoltre c'è stata, fino a poco tempo fa, la mancanza di una politica adeguata: non abbiamo premiato la qualità nell'università italiana.", lines: 1, sample: "Quali sono i motivi della fuga dei cervelli?" },
          { id: "4", prompt: "• ……? ○ Soprattutto negli Usa, in Inghilterra e in Germania.", lines: 1, sample: "Dove vanno i nostri ricercatori?" },
        ],
      },
    },
    { type: "text", it: "• Grazie, professore e speriamo che in futuro le cose cambieranno!" },
    {
      type: "exercise",
      ex: {
        id: "p116-ex13",
        number: "13",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        tr: { vi: "Cùng viết: viết thư cho một người bạn thân, kể về vài dự định tương lai của bạn trong công việc và cuộc sống.", en: "Let's write: write a letter to a dear friend about some of your future plans for work and personal life." },
        items: [{ id: "1", prompt: "Scrivete una lettera a un caro amico e informatelo su alcuni vostri progetti futuri nel campo del lavoro e della vita personale.", lines: 5, sample: "Caro Marco, ti scrivo per raccontarti i miei progetti. L'anno prossimo finirò l'università e cercherò un lavoro in un'azienda internazionale. Dopo che avrò trovato lavoro, andrò a vivere da solo e, se tutto andrà bene, farò un lungo viaggio in Italia. Ti scriverò presto! Un abbraccio." }],
      },
    },
  ],
};

export default page;
