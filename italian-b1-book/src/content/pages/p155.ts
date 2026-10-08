import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 155 (Facciamo pratica, bài 13–14: Alessio Boni e La bestia nel cuore). */
const page: BookPage = {
  id: "p155",
  number: 155,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "Facciamo pratica · Un articolo di cinema",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p155-ex13a", number: "13", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo l'articolo.", tr: { vi: "Đọc bài báo.", en: "Let's read the article." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 1],
      cols: [
        [{ type: "text", it: "“Ho aspettato i risultati della notte degli Oscar, a casa mia, in montagna”: Alessio Boni non è stato a Los Angeles ad accompagnare La bestia nel cuore, il film di Cristina Comencini che è uscito nel 2005 e ha rappresentato l'Italia agli Oscar. Alessio Boni è il protagonista maschile, mentre Giovanna Mezzogiorno è la protagonista femminile. “Questa candidatura all'Oscar è una grande soddisfazione per il cinema italiano, che non vive un buon momento dal punto di vista economico. Purtroppo la politica considera poco il cinema: infatti, negli ultimi anni, il governo ha tagliato i fondi per lo spettacolo del quaranta per cento”." }],
        [{ type: "photo", src: "images/u8/p155-locandina.jpg", alt: "La locandina del film La bestia nel cuore" }],
      ],
    },
    {
      type: "columns",
      widths: [1, 1, 3],
      cols: [
        [{ type: "photo", src: "images/u8/p155-boni.jpg", alt: "Alessio Boni sorridente con gli occhiali" }],
        [{ type: "photo", src: "images/u8/p155-mezzogiorno.jpg", alt: "Giovanna Mezzogiorno" }],
        [{ type: "text", it: "Alessio Boni, 39 anni, era arrivato a Roma da Bergamo senza un soldo in tasca, ma con un entusiasmo straordinario. Oggi, dopo La meglio gioventù e La bestia nel cuore, è diventato uno dei volti italiani più famosi all'estero. “La bestia nel cuore racconta una storia profonda e intensa. Speriamo che questo film piaccia alla gente in tutto il mondo. Credo che sia il lavoro cinematografico più bello di Cristina Comencini”, conclude l'attore che ha da poco finito di interpretare un ruolo importante sul set del nuovo film di Roberto Andò, Viaggio segreto.\n(adattato da Il Venerdì di Repubblica, 03-03-2006)" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p155-ex13b",
        label: "B",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        tr: { vi: "Cùng viết.", en: "Let's write." },
        items: [
          { id: "1", prompt: "Date un titolo a questo articolo.", lines: 1, sample: "Alessio Boni: «La bestia nel cuore, un orgoglio per il cinema italiano»" },
          { id: "2", prompt: "Dite che tipo di articolo è.", lines: 1, sample: "È un'intervista / un articolo di spettacolo che informa e riporta le opinioni dell'attore." },
          { id: "3", prompt: "Dite in quale pagina del giornale lo potreste trovare.", lines: 1, sample: "Nella pagina degli spettacoli (cinema)." },
          { id: "4", prompt: "Sottolineate in nero le parti dell'articolo che danno informazioni e in rosso le parti dove l'attore esprime le sue opinioni.", lines: 2, sample: "Informazioni: Alessio Boni non è stato a Los Angeles…; il film è uscito nel 2005…; Alessio Boni, 39 anni, era arrivato a Roma da Bergamo… Opinioni: “Questa candidatura all'Oscar è una grande soddisfazione…”; “Speriamo che questo film piaccia…”; “Credo che sia il lavoro cinematografico più bello…”." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p155-ex14",
        number: "14",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        intro: "macchina • ladri • polizia • villa • cane lupo • ambulanza • carcere",
        tr: { vi: "Cùng viết.", en: "Let's write." },
        items: [{ id: "1", prompt: "Siete dei giornalisti e dovete scrivere un articolo di cronaca su un fatto accaduto nella vostra città. Vi diamo delle parole: usatele e scrivete l'articolo.", lines: 4, sample: "Ieri notte due ladri sono entrati in una villa del centro. Sono arrivati con una macchina rubata, ma il cane lupo del proprietario li ha sentiti e ha cominciato ad abbaiare. I vicini hanno chiamato la polizia, che ha arrestato i due uomini. Uno dei ladri, morso dal cane, è stato portato in ospedale con l'ambulanza. Adesso tutti e due sono in carcere." }],
      },
    },
  ],
};

export default page;
