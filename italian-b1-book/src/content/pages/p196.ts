import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 196 (Lessico: festa, religione, Carnevale). */
const page: BookPage = {
  id: "p196",
  number: 196,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", color: "#d8333a" },
  title: "Lessico · Festa, religione, Carnevale",
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u10/p196-festa.jpg", alt: "Tre persone brindano con i fuochi d'artificio" },
          { type: "theory", text: "## Festa\n> anniversario\n> celebrare\n> centenario\n> cerimonia\n> commemorazione\n> festa del patrono\n> festa tradizionale\n> festaiolo\n> festeggiare\n> festeggiato\n> festivo\n> fuochi d'artificio\n> inaugurazione\n> istituire una festa\n> millenario\n> osservare le feste\n> palio\n> parata\n> ricorrenza\n> sagra" },
        ],
        [
          { type: "photo", src: "images/u10/p196-chiesa.jpg", alt: "Una piccola chiesa con il campanile" },
          { type: "theory", text: "## Religione\n> adorare\n> basilica\n> beato\n> cappella\n> chiesa\n> credente\n> credere\n> culto\n> devoto\n> fedele\n> liturgia\n> miracolo\n> parrocchia\n> pregare\n> processione\n> rito\n> sacerdote\n> sacro\n> santo\n> voto" },
        ],
        [
          { type: "photo", src: "images/u10/p196-maschere.jpg", alt: "Due maschere di Carnevale" },
          { type: "theory", text: "## Carnevale\n> carro\n> chiacchiere\n> coriandoli\n> costume\n> divertimento\n> festeggiamento\n> frittelle\n> giovedì grasso\n> martedì grasso\n> maschera\n> mascherarsi\n> parata\n> parrucca\n> quaresima\n> scherzo\n> sfilata\n> spettacolo\n> stelle filanti\n> travestirsi\n> truccarsi" },
        ],
      ],
    },
  ],
};

export default page;
