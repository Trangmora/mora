import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 66 (Osserviamo bene, bài 4: L'ho mangiato!). */
const page: BookPage = {
  id: "p066",
  number: 66,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Osserviamo bene · L'ho mangiato!",
  blocks: [
    { type: "sectionTitle", text: "Osserviamo bene", banner: "L'HO MANGIATO!" },
    {
      type: "exercise",
      ex: { id: "p066-ex4a", number: "4", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "theory",
      text: `
> Abbiamo cucinato le lasagne al ragù e **le** abbiamo mangiat**e** tutte!
%% • Hai mai provato l'anatra all'arancia? || ○ Sì, **l'**ho assaggiat**a** una volta in una trattoria.
===
%% • Dove hai messo il mestolo? || ○ **L'**ho mess**o** nel cassetto.
%% • Chi ha preparato questi ravioli? || ○ **Li** ha fatt**i** mia cugina, brava vero?
`.trim(),
    },
    {
      type: "exercise",
      ex: {
        id: "p066-ex4b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo.",
        tr: { vi: "Đọc và hoàn thành đoạn văn (đại từ tân ngữ và đuôi phân từ).", en: "Let's read and complete the text (object pronouns and participle endings)." },
        source: "(adattato da il Venerdì di Repubblica, 09-09-2005)",
        parts: [
          {
            boxed: true,
            title: "Sapevate che l'Italia ha circa 4.000 prodotti gastronomici regionali?",
            image: { src: "images/u4/p66-libro.jpg", alt: "Il libro Prodotti tipici d'Italia (Garzanti)", side: "left", width: 30 },
            text: "Volete conoscer{{=li}}?\nDavide Paolini, un esperto di cucina italiana, ha scoperto le tradizioni segrete di ogni regione e {{le}} ha catalogat{{e}}; ha conosciuto molti cuochi e {{li}} ha intervistat{{i}}; ha ricercato, città per città, i piatti e i vini caratteristici e {{li}} ha assaggiat{{i}}. Quindi, ha pubblicato nel 2005 *Prodotti tipici d'Italia*, un libro interessantissimo: noi {{lo|l'}} abbiamo lett{{o}} e abbiamo trovato molte notizie particolari. L'autore ha mostrato le delizie della tavola e {{le}} ha abbinat{{e}} alle bellezze artistiche di ogni territorio.\nUn esempio? Abbiamo deciso di passare un fine settimana in Emilia Romagna e abbiamo percorso la famosa “Strada del Prosciutto”, in provincia di Parma: {{la|l'}} abbiamo attraversat{{a}} tutta e ci siamo fermati a gustare, in alcune trattorie, l'inconfondibile prosciutto, l'eccezionale parmigiano reggiano, i vini delicati dei Colli e il salame di Felino. Come ci ha suggerito Paolini, siamo andati anche a scoprire i monumenti della provincia e {{li}} abbiamo vist{{i}} tutti: siamo entrati nel Castello di Felino e {{lo|l'}} abbiamo visitat{{o}} con una guida molto brava; siamo arrivati alla Rocca di Sala Baganza e {{la|l'}} abbiamo ammirat{{a}} in tutta la sua bellezza.",
          },
        ],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u4/p66-parmigiano.jpg", alt: "Una forma di parmigiano reggiano" }],
        [{ type: "photo", src: "images/u4/p66-salame.jpg", alt: "Il salame di Felino" }],
      ],
    },
  ],
};

export default page;
