import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 55 (Lessico: lettura, libro, attività del tempo libero). */
const page: BookPage = {
  id: "p055",
  number: 55,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", color: "#d8333a" },
  title: "Lessico · Lettura, libro, tempo libero",
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u3/p55-lettura.jpg", alt: "Un uomo legge il giornale" },
          { type: "theory", text: "## Lettura\n> articolo\n> biografia\n> diario\n> fiaba\n> favola\n> fumetto\n> giallo\n> giornale\n> guida turistica\n> lettera\n> manuale\n> poesia\n> quotidiano\n> racconto\n> recensione\n> relazione\n> riassunto\n> rivista\n> romanzo\n> testo" },
        ],
        [
          { type: "photo", src: "images/u3/p55-libreria.jpg", alt: "La vetrina di una libreria" },
          { type: "theory", text: "## Libro\n> autore\n> bibliografia\n> biblioteca\n> brano\n> capitolo\n> casa editrice\n> consultare\n> copertina\n> dedica\n> edizione\n> indice\n> introduzione\n> lettore\n> libreria\n> nota\n> pagina\n> paragrafo\n> sfogliare\n> stampa\n> titolo" },
        ],
        [
          { type: "photo", src: "images/u3/p55-pesca.jpg", alt: "Un uomo pesca nel fiume" },
          { type: "theory", text: "## Attività del tempo libero\n> andare fuori\n> ascoltare musica\n> ballare\n> cavalcare\n> dipingere\n> fare acquisti\n> fare bricolage\n> fare sport\n> fare volontariato\n> frequentare corsi\n> giocare\n> guardare la televisione\n> mangiare fuori\n> partecipare a spettacoli\n> passeggiare\n> pescare\n> suonare uno strumento\n> trascorrere tempo con gli amici\n> viaggiare\n> visitare luoghi" },
        ],
      ],
    },
  ],
};

export default page;
