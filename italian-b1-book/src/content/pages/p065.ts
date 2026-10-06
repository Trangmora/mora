import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 65 (Cominciamo, bài 2–3: Dolci d'Italia). */

const page: BookPage = {
  id: "p065",
  number: 65,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Cominciamo · Dolci d'Italia",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p065-ex2",
        number: "2",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Conoscete alcuni piatti tipici italiani? Quali?", sample: "Sì, conosco la pizza margherita, le lasagne e il tiramisù." },
          { id: "2", prompt: "Che tipo di alimentazione preferite nella vostra dieta quotidiana?", sample: "Preferisco mangiare riso, verdura e pesce; mangio poca carne." },
          { id: "3", prompt: "Vi interessate di cucina? Leggete riviste o vedete programmi televisivi specifici?", sample: "Sì, mi interessa molto: guardo spesso video di ricette su Internet." },
          { id: "4", prompt: "Sapete cucinare? Che cosa in particolare?", sample: "So cucinare abbastanza bene: preparo soprattutto zuppe e piatti di pasta." },
          { id: "5", prompt: "Quando andate a mangiare fuori, che tipo di cucina preferite?", sample: "Quando mangio fuori preferisco la cucina italiana o giapponese." },
          { id: "6", prompt: "Dovete preparare una cena per i vostri amici: che cosa mettereste a tavola?", sample: "Metterei a tavola un antipasto di salumi, un piatto di spaghetti e un dolce al cioccolato." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p065-ex3",
        number: "3",
        icons: ["listen", "write"],
        kind: "speak",
        skill: "listening",
        instruction: "Ascoltiamo i testi e completiamo le tabelle con le informazioni.",
        subtitle: "DOLCI D'ITALIA",
        tr: { vi: "Nghe các đoạn và điền thông tin vào bảng (vùng, tên món tráng miệng, nguyên liệu, món/đồ uống đi kèm).", en: "Let's listen and complete the tables (region, name of the dessert, ingredients, pairing)." },
        items: [],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u4/p65-pasticceria.jpg", alt: "Ascolto 1: la vetrina di una pasticceria con cannoli e dolci" }],
        [{ type: "photo", src: "images/u4/p65-ingredienti.jpg", alt: "Ascolto 2: burro, farina, uova e latte" }],
        [{ type: "photo", src: "images/u4/p65-cioccolato.jpg", alt: "Ascolto 3: cioccolato fondente" }],
      ],
    },
    {
      type: "audio",
      src: "audio/u4-p65-ex3.mp3",
      title: "3",
      autoTranscript: true,
      transcript: [
        "Ascolto 1",
        "Buongiorno a tutti, mi presento. Sono Edoardo Raspelli, un critico gastronomico. Oggi vi propongo un itinerario speciale: vi parlerò dei dolci tipici di alcune regioni italiane. Il primo dolce che vi voglio presentare si chiama gubana ed è del Friuli Venezia Giulia. Ha la forma di una chiocciola, il suo segreto è tutto nel ripieno: ci sono ben 19 ingredienti, come le nocciole, le noci, i pinoli, il miele e la grappa, che la rendono particolarmente gustosa. L'abbinamento ideale: in inverno con un bicchiere di grappa, in estate con un gelato alla vaniglia.",
        "Ascolto 2",
        "Continuiamo la nostra presentazione gastronomica e andiamo in Emilia Romagna. Vi parlo della torta Barozzi: l'ha creata nel 1886 il pasticciere Eugenio Gollini, che ha messo insieme alcuni ingredienti come uova, cacao, cioccolato fondente, mandorle. Il risultato è una torta dalla pasta morbida: ve la suggerisco insieme a un bicchiere di champagne o a un bicchiere di porto.",
        "Ascolto 3",
        "La nostra ultima tappa è la Sardegna, con alcuni particolari biscotti, i mustazzolus. È tradizione mangiarli soprattutto in occasione dei matrimoni. Richiedono una preparazione molto lenta: pensate che bisogna aspettare almeno una settimana prima di cuocerli in forno. Gli ingredienti fondamentali sono acqua, farina, lievito e zucchero. Sono molto buoni insieme a un bicchiere di vernaccia. In Sardegna potete acquistare questi biscotti in tutti i negozi di alimentari e nelle pasticcerie.",
      ].join("\n"),
    },
    {
      type: "exercise",
      ex: {
        id: "p065-ex3-tab",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        refText: "audio",
        instruction: "Completiamo le tabelle.",
        tr: { vi: "Điền bảng: vùng, tên món tráng miệng, nguyên liệu, món/đồ uống đi kèm.", en: "Complete the tables: region, name of the dessert, ingredients, pairing." },
        items: [
          { id: "1-r", prompt: "Ascolto 1 · REGIONE", lines: 1, sample: "Friuli Venezia Giulia" },
          { id: "1-d", prompt: "Ascolto 1 · NOME DEL DOLCE", lines: 1, sample: "la gubana" },
          { id: "1-i", prompt: "Ascolto 1 · INGREDIENTI", lines: 1, sample: "19 ingredienti: nocciole, noci, pinoli, miele, grappa…" },
          { id: "1-a", prompt: "Ascolto 1 · ABBINAMENTO", lines: 1, sample: "in inverno con un bicchiere di grappa, in estate con un gelato alla vaniglia" },
          { id: "2-r", prompt: "Ascolto 2 · REGIONE", lines: 1, sample: "Emilia Romagna" },
          { id: "2-d", prompt: "Ascolto 2 · NOME DEL DOLCE", lines: 1, sample: "la torta Barozzi" },
          { id: "2-i", prompt: "Ascolto 2 · INGREDIENTI", lines: 1, sample: "uova, cacao, cioccolato fondente, mandorle" },
          { id: "2-a", prompt: "Ascolto 2 · ABBINAMENTO", lines: 1, sample: "un bicchiere di champagne o di porto" },
          { id: "3-r", prompt: "Ascolto 3 · REGIONE", lines: 1, sample: "Sardegna" },
          { id: "3-d", prompt: "Ascolto 3 · NOME DEL DOLCE", lines: 1, sample: "i mustazzolus (biscotti)" },
          { id: "3-i", prompt: "Ascolto 3 · INGREDIENTI", lines: 1, sample: "acqua, farina, lievito, zucchero" },
          { id: "3-a", prompt: "Ascolto 3 · ABBINAMENTO", lines: 1, sample: "un bicchiere di vernaccia" },
        ],
      },
    },
  ],
};

export default page;
