import type { BookPage } from "../../types";

const im = (n: number | string) => `images/u1/p11-${n}.jpg`;

/** Unità 1 · Entriamo in Italia! — trang 11 (Lessico, bài 15: Giochiamo insieme!). */
const page: BookPage = {
  id: "p011",
  number: 11,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Lessico · Giochiamo insieme!",
  addedOn: "2026-10-05",
  runningHead: "Lessico",
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p011-ex15",
        number: "15",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        layout: "board",
        instruction: "Parliamo.",
        subtitle: "Giochiamo insieme!",
        intro:
          "L'insegnante divide la classe in due (o più) gruppi.\nIn ogni gruppo uno studente, con l'aiuto della sua squadra, risponde al comando delle caselle.\nOgni risposta esatta vale due punti.\nBuon divertimento!",
        tr: {
          vi: "Cùng nói — Cùng chơi nhé! Lớp chia thành 2 (hoặc nhiều) nhóm. Mỗi nhóm một bạn, với sự giúp đỡ của cả đội, làm theo yêu cầu của từng ô. Mỗi câu đúng được 2 điểm. Chơi vui nhé!",
          en: "Let's talk — Let's play together! The class is split into two (or more) groups. In each group one student, helped by the team, answers each square's command. Each right answer is worth two points. Have fun!",
        },
        board: {
          palette: "orange",
          total: "Totale: 34 punti",
          example: { prompt: "Descrivete la camera.", image: im("es"), answer: "C'è un letto, ci sono due sedie, ci sono molti libri sulla scrivania, …" },
        },
        items: [
          { id: "1", prompt: "Descrivete le immagini.", image: im(1), sample: "C'è una gonna a righe arancioni, una maglietta gialla e un paio di jeans." },
          { id: "2", prompt: "Trovate tre aggettivi per questi cibi.", image: im(2), sample: "Le lasagne sono calde e saporite, il muffin è dolce, il limone è aspro." },
          { id: "3", prompt: "Dite che lavoro fa Luigi.", image: im(3), sample: "Luigi fa il postino: porta le lettere." },
          { id: "4", prompt: "Per lavarsi i denti c'è bisogno di…", image: im(4), sample: "Per lavarsi i denti c'è bisogno di uno spazzolino, del dentifricio e dell'acqua." },
          { id: "5", prompt: "Dite che animali sono.", image: im(5), sample: "Sono una mucca, un maiale e un cavallo." },
          { id: "6", prompt: "Dite che cosa c'è sulla scrivania.", image: im(6), sample: "Sulla scrivania ci sono un giornale, dei libri e delle riviste." },
          { id: "7", prompt: "Dite che lavoro fa Cristina.", image: im(7), sample: "Cristina fa la parrucchiera: ha in mano un phon." },
          { id: "8", prompt: "Dite che cosa c'è sul tavolo.", image: im(8), sample: "Sul tavolo ci sono un piatto, una forchetta e un coltello." },
          { id: "9", prompt: "Descrivete la ragazza.", image: im(9), sample: "La ragazza ha i capelli biondi e ricci, gli occhi azzurri e porta una camicia blu." },
          { id: "10", prompt: "Dite che cosa fa Michela.", image: im(10), sample: "Michela si trucca davanti allo specchio: si mette il rossetto." },
          { id: "11", prompt: "Dite che cosa c'è sul letto.", image: im(11), sample: "Sul letto ci sono i cuscini e le lenzuola." },
          { id: "12", prompt: "Dite che cosa fa Mauro.", image: im(12), sample: "Mauro si mette il deodorante (il profumo)." },
          { id: "13", prompt: "Dite che cosa fa il vigile.", image: im(13), sample: "Il vigile fa la multa a una macchina parcheggiata male." },
          { id: "14", prompt: "Descrivete gli oggetti.", image: im(14), sample: "Ci sono una bicicletta, un cappello, una collana e un libro aperto." },
          { id: "15", prompt: "Dite che cosa c'è in salotto.", image: im(15), sample: "In salotto ci sono un divano, due poltrone, un tavolino con dei fiori e le tende alla finestra." },
          { id: "16", prompt: "Dove comprate un francobollo?", image: im(16), sample: "Compro un francobollo all'ufficio postale o dal tabaccaio." },
          { id: "17", prompt: "Il contrario di PULITO è…", image: im(17), sample: "Il contrario di pulito è sporco." },
        ],
      },
    },
  ],
};

export default page;
