import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 189 (Osserviamo bene, bài 5B: Il calcio in costume). */
const page: BookPage = {
  id: "p189",
  number: 189,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "Osserviamo bene · Il calcio in costume",
  runningHead: "Osserviamo bene",
  banner: "QUI SI STA BENE!",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p189-ex5b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi giusti.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ đúng.", en: "Let's read and complete the text with the right verbs." },
        parts: [
          {
            boxed: true,
            title: "Il calcio in costume",
            image: { src: "images/u10/p189-santacroce.jpg", alt: "Una partita di calcio storico in Piazza Santa Croce a Firenze", side: "left", width: 32 },
            text: "Sapete che il calcio fiorentino, o “calcio in costume”, è una disciplina sportiva che ha origini molto antiche? Molti pensano che (*essere*) {{=sia}} il “padre” del gioco del calcio, sebbene (*essere*) {{sia}} molto simile anche al rugby. Secondo un'antica tradizione il gioco del calcio è nato infatti sulle rive dell'Arno e, soltanto dopo secoli, è arrivato in Inghilterra, dove, come sappiamo, ha ottenuto molto successo.\nNel Medioevo dove si (giocare) {{giocava}} a calcio?\nDi solito in ogni strada o piazza della città: per questo, però, c'erano qualche volta problemi di ordine pubblico.\nPerché (chiamarsi) {{si chiama|si chiamava}} “calcio in costume”?\nPerché i giocatori che scendevano in campo erano nobili e, per giocare, (*vestirsi*) {{si vestivano}} con i fastosi costumi dell'epoca: così è nato il nome di questa festa. È molto probabile che nel passato (*giocare*) {{abbiano giocato}} molte personalità famose del tempo, ma senza dubbio sappiamo che Piero II, figlio di Lorenzo il Magnifico, e Cosimo I, granduca di Toscana, si sono divertiti moltissimo a rincorrere il pallone nelle piazze fiorentine.",
          },
          {
            boxed: true,
            image: { src: "images/u10/p189-corteo.jpg", alt: "Il corteo storico del calcio fiorentino con le bandiere", side: "right", width: 30 },
            text: "Quando si (giocare) {{giocava}} nel passato?\nIl calcio in costume si (*praticare*) {{praticava}} di solito nel periodo di Carnevale: una delle partite più famose che ricordiamo è quella del 17 febbraio 1530. La popolarità di questo gioco dura per tutto il 1600, ma nel secolo successivo, a poco a poco, il calcio in costume scompare. Passano quasi due secoli prima che la città di Firenze (*potere*) {{possa}} praticare di nuovo il suo antico gioco. Nel 1930, finalmente, si (*tornare*) {{è tornati}} a giocare in Piazza Santa Croce.\nChe cos'è oggi il calcio fiorentino?\nÈ la manifestazione più importante di Firenze; (*sfidarsi*) {{si sfidano}} i quattro quartieri storici della città: i Bianchi di Santo Spirito, gli Azzurri di Santa Croce, i Rossi di Santa Maria Novella e i Verdi di San Giovanni. Attualmente le tre partite (*svolgersi*) {{si svolgono}} nel mese di giugno per i festeggiamenti di San Giovanni, il patrono di Firenze, nel bellissimo scenario di Piazza Santa Croce.",
          },
        ],
      },
    },
    { type: "photo", src: "images/u10/p189-bandiere.jpg", alt: "Gli sbandieratori del calcio storico fiorentino" },
  ],
};

export default page;
