import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 75 (Facciamo pratica, bài 13–14: la pizza; Giochiamo insieme!). */
const page: BookPage = {
  id: "p075",
  number: 75,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Facciamo pratica · Pizza",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p075-ex13", number: "13", icons: ["read", "write"], kind: "speak", skill: "reading", instruction: "Leggiamo e riordiniamo il testo.", subtitle: "Pizza", tr: { vi: "Đọc và sắp xếp lại đoạn văn theo đúng thứ tự.", en: "Let's read and put the text in order." }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 3],
      align: "center",
      cols: [[{ type: "photo", src: "images/u4/p75-pizzaiolo.jpg", alt: "Un pizzaiolo prepara la pizza" }], [{ type: "text", it: "a) Un giorno, nel 1899, un famoso pizzaiolo di Napoli, Raffaele Esposito, decide di fare un omaggio alla regina che è in visita alla Reggia di Capodimonte a Napoli; così le prepara una pizza con i colori della bandiera italiana, con il pomodoro (rosso), con la mozzarella (bianco) e con il basilico (verde)." }]],
    },
    {
      type: "columns",
      widths: [3, 1],
      align: "center",
      cols: [[{ type: "text", it: "b) Non esiste al mondo una ricetta più diffusa, amata, interpretata, cucinata. Puoi mangiare la pizza in mille modi diversi: con il curry, con le uova fritte, con le cozze e perfino con l'ananas!" }], [{ type: "photo", src: "images/u4/p75-pizza.jpg", alt: "Una pizza con uova, salsicce e ananas" }]],
    },
    {
      type: "columns",
      widths: [1, 3],
      align: "center",
      cols: [[{ type: "photo", src: "images/u4/p75-regina.jpg", alt: "La regina assaggia la pizza" }], [{ type: "text", it: "c) La regina si innamora di questa ricetta: da quel momento tutte le pizzerie di Napoli la propongono e la pizza margherita diventa in poco tempo un simbolo dell'Italia nel mondo." }]],
    },
    {
      type: "columns",
      widths: [3, 1],
      align: "center",
      cols: [[{ type: "text", it: "d) La storia della pizza, però, è molto antica: la pizza margherita, infatti, prende il suo nome dalla regina Margherita, moglie di re Umberto I." }], [{ type: "photo", src: "images/u4/p75-re.jpg", alt: "Il re e la regina Margherita" }]],
    },
    {
      type: "columns",
      widths: [1, 3],
      align: "center",
      cols: [[{ type: "photo", src: "images/u4/p75-mondo.jpg", alt: "Persone di paesi diversi mangiano la pizza" }], [{ type: "text", it: "e) La trovi in Laos e a Stoccolma, buonissima a Brooklyn e, qualche volta, non proprio gustosa a Milano. Puoi mangiarla in ristoranti di lusso e in locali molto economici: piace a tutti, giovani e anziani, ed è accessibile a tutte le tasche!" }]],
    },
    {
      type: "exercise",
      ex: {
        id: "p075-ex13-ordine",
        icons: ["write"],
        kind: "fill",
        skill: "reading",
        instruction: "Scriviamo l'ordine giusto (a, b, c, d, e).",
        tr: { vi: "Viết thứ tự đúng của các đoạn (a, b, c, d, e).", en: "Write the right order of the paragraphs (a, b, c, d, e)." },
        items: [{ id: "1", prompt: "1. ___; 2. ___; 3. ___; 4. ___; 5. ___", answers: ["b", "e", "d", "a", "c"] }],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p075-ex14",
        number: "14",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        subtitle: "Giochiamo insieme!",
        intro: "L'insegnante divide la classe in due gruppi: uno studente per squadra deve descrivere un piatto senza dirne il nome e l'altro gruppo deve indovinarlo!\nVince la squadra che indovina più piatti!",
        tr: { vi: "Cùng chơi: lớp chia hai đội; một bạn tả một món ăn mà không nói tên, đội kia phải đoán. Đội đoán đúng nhiều món nhất sẽ thắng!", en: "Let's play: the class splits into two teams; one student describes a dish without naming it and the other team must guess. The team that guesses the most dishes wins!" },
        items: [{ id: "1", prompt: "Descrivi un piatto senza dirne il nome.", sample: "È un primo piatto tipico di Roma: è fatto con gli spaghetti, le uova, il guanciale, il pecorino e il pepe nero. (Gli spaghetti alla carbonara)" }],
      },
    },
  ],
};

export default page;
