import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 164 (Viaggiamo in Italia: Il Corriere della Sera). */
const page: BookPage = {
  id: "p164",
  number: 164,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  title: "Viaggiamo in Italia · Il Corriere della Sera",
  addedOn: "2026-10-08",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p164-ex1a", number: "1", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il Corriere della Sera", tr: { vi: "Cùng đọc: Corriere della Sera.", en: "Let's read: Il Corriere della Sera." }, items: [] },
    },
    {
      type: "columns",
      widths: [2, 1],
      cols: [
        [{ type: "text", it: "“Pubblico, vogliamo parlarti chiaro: questo giornale vuole esprimere la sua opinione, anche se non piace a chi sta in alto o a chi sta in basso”. Così il Corriere della Sera si presentava ai suoi lettori 130 anni fa, nel primo numero in edicola a Milano il 5 marzo 1876: quattro pagine al costo di cinque centesimi di lira. Tiratura iniziale: 15.000 copie. Eugenio Torelli Viollier dirige per primo il quotidiano, per più di ventidue anni; ma è con Luigi Alberini, una firma storica del giornalismo italiano, che il Corriere raggiungerà livelli di diffusione e di prestigio notevolissimi. Nelle sue intenzioni iniziali il giornale si definisce conservatore e moderato, ma vuole anche mantenere la sua indipendenza dal governo ed essere, se possibile, obiettivo." }],
        [
          { type: "photo", src: "images/u8/p164-corriere.jpg", alt: "Una prima pagina storica del Corriere della Sera" },
          { type: "photo", src: "images/u8/p164-piccoli.jpg", alt: "La copertina del Corriere dei Piccoli" },
        ],
      ],
    },
    {
      type: "columns",
      widths: [1, 3],
      cols: [
        [{ type: "photo", src: "images/u8/p164-palazzo.jpg", alt: "Il palazzo storico del Corriere in via Solferino a Milano" }],
        [{ type: "text", it: "Il Corriere attraversa praticamente tutta la storia dell'Italia unita; cambia varie sedi fino a quando, nel 1904, si stabilisce nel palazzo storico di Via Solferino, a Milano. Nel corso del tempo ha avuto molte iniziative editoriali: la Domenica del Corriere, La Lettura, il Corriere dei Piccoli. Le firme più prestigiose del giornalismo italiano (come Indro Montanelli ed Enzo Biagi) hanno scritto e curato molte pagine importanti del giornale. Al suo successo hanno contribuito grandi intellettuali e letterati, come lo scrittore e drammaturgo Luigi Pirandello, il poeta Eugenio Montale, lo scrittore e poeta Pier Paolo Pasolini." }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p164-ex1b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Avete mai letto un articolo del Corriere della Sera?", sample: "Sì, ho letto un articolo di cultura sul sito del Corriere." },
          { id: "2", prompt: "Visitate il sito del Corriere (www.corriere.it): che cosa vi piace di più? Provate a leggere un articolo e presentatelo alla classe.", sample: "Mi piace la sezione Cultura. Ho letto un articolo su una mostra a Milano: parla di…" },
          { id: "3", prompt: "Qual è il giornale più antico nel vostro paese? E quello più autorevole?", sample: "Il giornale più antico del mio paese è… Secondo me il più autorevole è…" },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p164-ex2", number: "2", icons: ["look"], kind: "speak", skill: "speaking", instruction: "Osserviamo l'immagine.", tr: { vi: "Quan sát bức tranh.", en: "Let's look at the picture." }, items: [{ id: "1", prompt: "Gli italiani leggono poco i giornali… eppure li comprano! Che uso ne fanno?", sample: "Li usano per proteggere il pavimento quando dipingono, per fare cappelli di carta, per lavare la macchina, per accendere il fuoco e per giocare." }] },
    },
    { type: "photo", src: "images/u8/p164-vignetta.jpg", alt: "Vignetta: persone che usano i giornali per dipingere, lavare la macchina, accendere il fuoco e giocare" },
  ],
};

export default page;
