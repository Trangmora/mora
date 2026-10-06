import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 32 (Lessico: famiglia, matrimonio, attività domestiche). */
const page: BookPage = {
  id: "p032",
  number: 32,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Lessico · Famiglia, matrimonio, attività domestiche",
  addedOn: "2026-10-06",
  sideTab: { unit: "U2", color: "#d8333a" },
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u2/p32-famiglia.jpg", alt: "Una famiglia: nonno, padre, madre e figlio" },
          { type: "theory", text: "## Famiglia\n> bisnonno\n> celibe\n> cognato\n> convivenza\n> cugino\n> figlio\n> fratello\n> genero\n> genitore\n> madre\n> nipote\n> nonno\n> nubile\n> nucleo familiare\n> nuora\n> padre\n> parente\n> sorella\n> suocero\n> zio" },
        ],
        [
          { type: "photo", src: "images/u2/p32-matrimonio.jpg", alt: "Il sacerdote sposa una coppia" },
          { type: "theory", text: "## Matrimonio\n> bomboniera\n> chiedere la mano (oggi scherzoso)\n> coniugato\n> coppia\n> divorziare\n> fede\n> marito\n> moglie\n> nozze\n> pronunciare il sì\n> ricevimento\n> rinfresco\n> rito civile\n> rito religioso\n> separarsi\n> sposarsi\n> sposo\n> testimone\n> vedovo\n> viaggio di nozze" },
        ],
        [
          { type: "photo", src: "images/u2/p32-casa.jpg", alt: "Una ragazza stende i panni" },
          { type: "theory", text: "## Attività domestiche\n> apparecchiare la tavola\n> cambiare la disposizione dei mobili\n> cucinare\n> curare le piante\n> fare il bucato\n> fare il cambio di stagione\n> fare la lavastoviglie\n> fare la lavatrice\n> fare la spesa\n> lavare\n> mettere in ordine\n> passare l'aspirapolvere\n> pulire la casa\n> rifare i letti\n> riporre i vestiti negli armadi\n> sparecchiare la tavola\n> spazzare\n> spolverare\n> stendere i panni\n> stirare" },
        ],
      ],
    },
  ],
};

export default page;
