import type { BookPage } from "../../types";

const im = (n: number | string) => `images/u1/p10-${n}.jpg`;

/** Unità 1 · Entriamo in Italia! — trang 10 (Ripassiamo, bài 14: Giochiamo insieme!). */
const page: BookPage = {
  id: "p010",
  number: 10,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Facciamo pratica · Ripassiamo: Giochiamo insieme!",
  addedOn: "2026-10-05",
  runningHead: "Facciamo pratica",
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  notebook: { title: "Ripassiamo quello che abbiamo studiato!" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p010-ex14",
        number: "14",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        layout: "board",
        instruction: "Parliamo.",
        subtitle: "Giochiamo insieme!",
        intro:
          "L'insegnante divide la classe in due (o più) gruppi.\nIn ogni gruppo uno studente, con l'aiuto della sua squadra, risponde al comando delle caselle. Ogni risposta esatta vale due punti.\nBuon divertimento!",
        tr: {
          vi: "Cùng nói — Cùng chơi nhé! Lớp chia thành 2 (hoặc nhiều) nhóm. Mỗi nhóm một bạn, với sự giúp đỡ của cả đội, làm theo yêu cầu của từng ô. Mỗi câu đúng được 2 điểm. Chơi vui nhé!",
          en: "Let's talk — Let's play together! The class is split into two (or more) groups. In each group one student, helped by the team, answers each square's command. Each right answer is worth two points. Have fun!",
        },
        board: {
          palette: "green",
          total: "Totale: 34 punti",
          example: { prompt: "Chiedete il prezzo del vostro profumo preferito.", image: im("es"), answer: "Scusi, quanto costa il profumo di Gucci?" },
        },
        items: [
          { id: "1", prompt: "Chiedete il prezzo.", image: im(1), sample: "Scusi, quanto costa un caffè?" },
          { id: "2", prompt: "Fate la spesa.", image: im(2), sample: "Buongiorno, vorrei due etti di prosciutto crudo e un pezzo di formaggio, per favore." },
          { id: "3", prompt: "Chiedete e dite l'ora.", image: im(3), sample: "Scusi, che ore sono? — Sono le tre e un quarto." },
          { id: "4", prompt: "Chiedete di provare un abito.", image: im(4), sample: "Scusi, posso provare questo vestito? Dov'è il camerino?" },
          { id: "5", prompt: "Ordinate la cena.", image: im(5), sample: "Per primo vorrei gli spaghetti al pomodoro, per secondo una bistecca con insalata e da bere un bicchiere di vino rosso." },
          { id: "6", prompt: "Chiedete di cambiare i soldi.", image: im(6), sample: "Buongiorno, vorrei cambiare cento dollari in euro, per favore." },
          { id: "7", prompt: "Dovete iscrivervi a un corso di ginnastica: chiedete informazioni.", image: im(7), sample: "Buongiorno, vorrei iscrivermi a un corso di ginnastica. Quanto costa? Quali sono gli orari?" },
          { id: "8", prompt: "Prenotate un biglietto aereo.", image: im(8), sample: "Buongiorno, vorrei prenotare un biglietto aereo per Roma per venerdì prossimo, andata e ritorno." },
          { id: "9", prompt: "Dite dov'è la farmacia.", image: im(9), sample: "La farmacia è in fondo alla strada, a destra, vicino al bar." },
          { id: "10", prompt: "Comprate un biglietto per uno spettacolo.", image: im(10), sample: "Buonasera, vorrei due biglietti per lo spettacolo di stasera, in platea." },
          { id: "11", prompt: "Dite che cosa fa Alberto.", image: im(11), sample: "Alberto si fa la barba davanti allo specchio." },
          { id: "12", prompt: "Dite il plurale di re, moto, cinema.", image: im(12), sample: "I re, le moto, i cinema." },
          { id: "13", prompt: "Coniugate il verbo ANDARE e il verbo GUARDARE al passato prossimo.", sample: "Sono andato/a, sei andato/a, è andato/a, siamo andati/e, siete andati/e, sono andati/e. Ho guardato, hai guardato, ha guardato, abbiamo guardato, avete guardato, hanno guardato." },
          { id: "14", prompt: "Chiedete un appuntamento per una visita.", image: im(14), sample: "Buongiorno, vorrei prendere un appuntamento per una visita con il dottore. È possibile giovedì mattina?" },
          { id: "15", prompt: "Dovete andare al Colosseo: chiedete informazioni.", image: im(15), sample: "Scusi, per andare al Colosseo? Che autobus devo prendere?" },
          { id: "16", prompt: "Chiedete scusa.", image: im(16), sample: "Mi scusi tanto! Non l'ho fatto apposta." },
          { id: "17", prompt: "Dite una ricetta.", image: im(17), sample: "Per gli spaghetti al pomodoro: si fa bollire l'acqua, si butta la pasta, si prepara il sugo con pomodoro, olio, aglio e basilico e si condisce la pasta." },
        ],
      },
    },
  ],
};

export default page;
