import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 156 (Lessico: giornale, sezioni, redazione). */
const page: BookPage = {
  id: "p156",
  number: 156,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", color: "#d8333a" },
  title: "Lessico · Il giornale e la redazione",
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u8/p156-rivista.jpg", alt: "Una rivista con una ragazza in costume sulla copertina" },
          { type: "theory", text: "## Giornale\n> bollettino\n> fascicolo\n> gazzetta\n> giornale per ragazzi\n> mensile\n> numero\n> numero arretrato\n> organo di stampa\n> periodico\n> quotidiano\n> rivista\n> rotocalco\n> serie\n> settimanale\n> stampa estera\n> stampa locale\n> stampa nazionale\n> tabloid\n> testata\n> tiratura" },
        ],
        [
          { type: "photo", src: "images/u8/p156-repubblica.jpg", alt: "La prima pagina di un quotidiano" },
          { type: "theory", text: "## Sezioni del giornale\n> annuncio\n> articolo di apertura\n> articolo di fondo\n> colonna\n> cronaca\n> illustrazione\n> inserto\n> inchiesta\n> inserzione\n> notiziario\n> prima pagina\n> pubblicità\n> rubrica\n> seconda pagina\n> sommario\n> sottotitolo\n> supplemento\n> terza pagina\n> titolo\n> trafiletto" },
        ],
        [
          { type: "photo", src: "images/u8/p156-redazione.jpg", alt: "Un giornalista scrive al computer in redazione" },
          { type: "theory", text: "## La redazione di un giornale\n> caporedattore\n> caposervizio\n> collaboratore\n> corrispondente\n> cronista\n> direttore\n> disegnatore\n> editore\n> fotoreporter\n> giornalista\n> intervistatore\n> inviato\n> opinionista\n> pubblicitario\n> recensore\n> redattore\n> sala stampa\n> segretario di redazione\n> vicedirettore\n> vignettista" },
        ],
      ],
    },
  ],
};

export default page;
