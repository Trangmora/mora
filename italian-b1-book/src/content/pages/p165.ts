import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 165 (Un italiano famoso: Enzo Biagi). */
const page: BookPage = {
  id: "p165",
  number: 165,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  title: "Un italiano famoso · Enzo Biagi",
  addedOn: "2026-10-08",
  ribbon: "Un italiano famoso!",
  framed: true,
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p165-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Enzo Biagi", tr: { vi: "Cùng đọc: Enzo Biagi.", en: "Let's read: Enzo Biagi." }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "text", it: "– Nome: Enzo Biagi.\n– Nasce a Lizzano in Belvedere (provincia di Bologna) il 9 agosto 1920.\n– Muore il 6 novembre 2007.\n– Chi è? È stato un grande giornalista e uno scrittore. Enzo Biagi era di umili origini: il padre lavorava in una fabbrica di zucchero, la madre era una semplice casalinga. Fin da bambino dimostra di avere un particolare talento per la scrittura: quando compie diciotto anni si dedica al giornalismo. Lavora come cronista al Resto del Carlino e, a soli ventuno anni, diventa professionista." }],
        [{ type: "photo", src: "images/u8/p165-libri.jpg", alt: "Le copertine dei libri di Enzo Biagi Il Boss è solo e Il fatto" }],
      ],
    },
    { type: "text", it: "Dopo la guerra Biagi prende numerose iniziative: fonda un settimanale, Cronache, e un quotidiano, Cronache sera. Da questo momento inizia la grande carriera di uno dei giornalisti italiani più amati.\nFin da subito Enzo Biagi stabilisce un rapporto molto stretto con il mezzo televisivo: ciò ha contribuito ad aumentare la sua popolarità. Il suo ingresso in Rai (la rete televisiva pubblica) è nel 1961: comincia un periodo di intenso lavoro e di grandi soddisfazioni. Biagi è richiestissimo e la sua firma compare su La Stampa, la Repubblica, il Corriere della Sera e Panorama." },
    {
      type: "columns",
      widths: [2, 3],
      cols: [
        [{ type: "photo", src: "images/u8/p165-biagi.jpg", alt: "Enzo Biagi con un mazzo di fiori tra alcune persone" }],
        [{ type: "text", it: "Importante è anche la sua attività di scrittore: i suoi libri vendono alcuni milioni di copie. Fra le sue pubblicazioni ricordiamo: Cara Italia (2000), Lettera d'amore a una ragazza di una volta (2003), Era ieri (2005). Nel 1995 conduce in televisione Il Fatto, programma giornaliero di cinque minuti su avvenimenti e personaggi italiani. Enzo Biagi ha intervistato i grandi protagonisti della politica, della letteratura, dell'attualità e dello spettacolo: Woody Allen, il Dalai Lama, Federico Fellini, Robert Kennedy, Henry Kissinger, François Mitterand, Margareth Thatcher e moltissimi altri." }],
      ],
    },
    {
      type: "exercise",
      ex: { id: "p165-ex3b", label: "B", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo due frasi famose di Enzo Biagi.", tr: { vi: "Đọc hai câu nói nổi tiếng của Enzo Biagi.", en: "Let's read two famous sayings by Enzo Biagi." }, items: [] },
    },
    { type: "theory", text: "> ***“Le verità che contano, i grandi principi, alla fine, restano sempre due o tre. Sono quelli che ti ha insegnato tua madre da bambino.”***\n> ***“La democrazia è fragile e a piantarci sopra troppe bandiere si sgretola.”***" },
    {
      type: "exercise",
      ex: {
        id: "p165-ex3c",
        label: "C",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [{ id: "1", prompt: "Che cosa pensate di queste frasi? Esprimete le vostre opinioni.", sample: "Penso che la prima frase sia vera: i valori più importanti li impariamo in famiglia. Credo anche che la democrazia sia fragile e che bisogna proteggerla ogni giorno." }],
      },
    },
  ],
};

export default page;
