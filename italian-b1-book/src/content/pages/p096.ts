import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 96 (Lessico: comportamenti civili e incivili, educazione). */
const page: BookPage = {
  id: "p096",
  number: 96,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", color: "#d8333a" },
  title: "Lessico · Comportamenti ed educazione",
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u5/p96-civili.jpg", alt: "Un ragazzo fa la raccolta differenziata" },
          { type: "theory", text: "## Comportamenti civili\n> cedere il posto\n> dare la precedenza\n> dare soccorso a chi ha bisogno\n> essere ospitali\n> fare la raccolta differenziata dei rifiuti\n> guidare con prudenza\n> mantenere l'ambiente pulito\n> ringraziare\n> rispettare gli animali\n> rispettare gli orari\n> rispettare i monumenti artistici\n> rispettare l'ambiente\n> rispettare l'ordine\n> rispettare la cultura degli altri popoli\n> rispettare la fila\n> rispettare la tavola\n> rispettare le leggi\n> rispettare se stessi e gli altri\n> salutare\n> vestirsi adeguatamente" },
        ],
        [
          { type: "photo", src: "images/u5/p96-incivili.jpg", alt: "Un uomo si soffia il naso rumorosamente" },
          { type: "theory", text: "## Comportamenti incivili\n> arrivare in ritardo\n> avere scarsa pulizia personale\n> dire parolacce\n> fare gesti sgradevoli\n> fare rumore\n> inquinare\n> insultare\n> interrompere la conversazione\n> litigare\n> mangiare rumorosamente\n> offendere\n> picchiare\n> ridere smodatamente\n> rubare\n> sbattere le porte\n> soffiarsi il naso rumorosamente\n> sporcare\n> suonare il clacson quando non è necessario\n> tenere il cellulare sempre acceso\n> urlare" },
        ],
        [
          { type: "photo", src: "images/u5/p96-educazione.jpg", alt: "Due bambini dipingono" },
          { type: "theory", text: "## Educazione\n> dare un'educazione\n> educazione all'ambiente\n> educazione allo studio\n> educazione artistica\n> educazione civica\n> educazione fisica\n> educazione musicale\n> educazione permanente\n> educazione religiosa\n> educazione rigida\n> educazione sbagliata\n> educazione sessuale\n> educazione severa\n> educazione stradale\n> educazione tecnica\n> impartire un'educazione\n> ineducazione\n> insegnare l'educazione\n> maleducazione\n> ricevere un'educazione" },
        ],
      ],
    },
  ],
};

export default page;
