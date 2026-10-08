import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 205 (Un'italiana famosa: Monica Bellucci). */
const page: BookPage = {
  id: "p205",
  number: 205,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  title: "Un'italiana famosa · Monica Bellucci",
  addedOn: "2026-10-08",
  ribbon: "Un'italiana famosa!",
  framed: true,
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p205-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Monica Bellucci", tr: { vi: "Cùng đọc: Monica Bellucci.", en: "Let's read: Monica Bellucci." }, items: [] },
    },
    {
      type: "columns",
      widths: [2, 3],
      cols: [
        [{ type: "photo", src: "images/u10/p205-bellucci1.jpg", alt: "Monica Bellucci in camicia bianca" }],
        [{ type: "text", it: "– Nome: Monica Bellucci.\n– Nasce a Città di Castello (Perugia) il 30 settembre 1969.\n– Chi è? È un'attrice e una modella.\nA diciotto anni si iscrive all'università e frequenta per un anno la facoltà di Giurisprudenza all'Università di Perugia. Nel 1988 si trasferisce a Milano per fare la modella e, in breve tempo, diventa una delle indossatrici più richieste sulle passerelle di tutto il mondo. Ma la sua ambizione è quella di recitare: nel 1990 riesce ad avere una parte nel film Vita coi figli di Dino Risi." }],
      ],
    },
    {
      type: "columns",
      widths: [3, 2],
      cols: [
        [{ type: "text", it: "In seguito è la protagonista del film La riffa (1991) di Francesco Laudadio e una delle donne-vampiro in Dracula (1992) di Francis Ford Coppola. Poiché non trova uno spazio importante nel cinema italiano, si trasferisce in Francia, dove riesce a conquistare un posto tra le attrici preferite dai registi francesi. Nel 1996, sul set del film L'appartamento di Gilles Mimouni, conosce l'attore Vincent Cassel: i due si innamorano e si sposano. Nel 2000 Monica Bellucci è la protagonista del film Malena di Giuseppe Tornatore, che la porta al successo internazionale.\nNello stesso anno gira anche Under Suspicion con Gene Hackman e Morgan Freeman. Nel 2003 recita nel film La Passione di Cristo con la regia di Mel Gibson nella parte di Maria Maddalena." }],
        [{ type: "photo", src: "images/u10/p205-bellucci2.jpg", alt: "Monica Bellucci in un abito di pizzo nero" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p205-ex3b",
        label: "B",
        icons: ["look", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Osserviamo e abbiniamo le immagini ai titoli dei film con Monica Bellucci.",
        tr: { vi: "Quan sát và nối các bức tranh với tên các bộ phim có Monica Bellucci.", en: "Let's look and match the pictures to the titles of Monica Bellucci's films." },
        left: [
          { id: "1", text: "1.", image: "images/u10/p205-1.jpg" },
          { id: "2", text: "2.", image: "images/u10/p205-2.jpg" },
          { id: "3", text: "3.", image: "images/u10/p205-3.jpg" },
        ],
        right: [
          { id: "a", text: "The Matrix Revolutions (2003)." },
          { id: "b", text: "I fratelli Grimm e l'incantevole strega (2004)." },
          { id: "c", text: "Asterix & Obelix Missione Cleopatra (2001)." },
        ],
        answer: { "1": "b", "2": "c", "3": "a" },
      },
    },
  ],
};

export default page;
