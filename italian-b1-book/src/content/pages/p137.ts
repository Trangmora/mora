import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 137 (Lessico: strumenti musicali, canzone, concerto). */
const page: BookPage = {
  id: "p137",
  number: 137,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", color: "#d8333a" },
  title: "Lessico · Strumenti, canzone, concerto",
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u7/p137-strumenti.jpg", alt: "Una chitarra, un flauto e dei piatti" },
          { type: "theory", text: "## Strumenti musicali\n> arpa\n> batteria\n> bongos\n> chitarra\n> chitarra elettrica\n> clarinetto\n> clavicembalo\n> contrabbasso\n> flauto\n> mandolino\n> oboe\n> organo\n> pianoforte\n> piatti\n> sassofono\n> tamburo\n> tromba\n> trombone\n> violino\n> violoncello" },
        ],
        [
          { type: "photo", src: "images/u7/p137-coro.jpg", alt: "Un coro di bambini" },
          { type: "theory", text: "## Canzone\n> cantante\n> cantare\n> cantare a squarciagola\n> cantastorie\n> cantautore\n> canticchiare\n> canzone ballabile\n> canzone melodica\n> canzone napoletana\n> canzone popolare\n> canzone ritmica\n> canzone spirituale\n> canzone strumentale\n> canzone vocale\n> coro\n> festival della canzone\n> gorgheggiare\n> gridare\n> testo\n> vocalizzare" },
        ],
        [
          { type: "photo", src: "images/u7/p137-direttore.jpg", alt: "Un direttore d'orchestra con la bacchetta" },
          { type: "theory", text: "## Concerto\n> auditorium\n> bacchetta\n> complesso\n> compositore\n> concertista\n> concerto all'aperto\n> coro\n> direttore d'orchestra\n> duo / trio / quartetto\n> maestro\n> musicista\n> orchestra\n> palasport\n> palco\n> platea\n> sala da concerto\n> spartito\n> spettatore\n> stadio\n> teatro" },
        ],
      ],
    },
  ],
};

export default page;
