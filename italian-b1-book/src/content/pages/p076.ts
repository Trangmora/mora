import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 76 (Lessico: cucinare, strumenti in cucina, cibi). */
const page: BookPage = {
  id: "p076",
  number: 76,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", color: "#d8333a" },
  title: "Lessico · Cucinare, strumenti, cibi",
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u4/p76-cucinare.jpg", alt: "Una donna cucina ai fornelli" },
          { type: "theory", text: "## Cucinare\n> affettare\n> arrostire\n> bollire\n> condire\n> cuocere\n> farcire\n> friggere\n> gratinare\n> grattugiare\n> impastare\n> insaporire\n> lessare\n> mescolare\n> pepare\n> salare\n> scaldare\n> scolare\n> spremere\n> ungere\n> zuccherare" },
        ],
        [
          { type: "photo", src: "images/u4/p76-strumenti.jpg", alt: "Frullatore, bottiglia, ciotola, padella e grattugia" },
          { type: "theory", text: "## Strumenti in cucina\n> bollitore\n> bottiglia\n> caraffa\n> coltello\n> cucchiaino\n> cucchiaio\n> forchetta\n> formaggiera\n> frullatore\n> grattugia\n> mestolo\n> padella\n> passatutto\n> pentola\n> piatto\n> pirofila\n> recipiente\n> tazza\n> tegame\n> vassoio" },
        ],
        [
          { type: "photo", src: "images/u4/p76-cibi.jpg", alt: "Formaggio, pere, una mela e ciliegie" },
          { type: "theory", text: "## Cibi\n> aceto\n> acqua\n> birra\n> caffè\n> carne\n> dolce\n> formaggio\n> frutta\n> latte\n> legumi\n> olio\n> pane\n> pasta\n> pepe\n> riso\n> sale\n> spezie\n> verdura\n> vino\n> zucchero" },
        ],
      ],
    },
  ],
};

export default page;
