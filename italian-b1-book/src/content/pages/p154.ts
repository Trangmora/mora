import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 154 (Facciamo pratica, bài 12: Gli articoli del giornale). */
const page: BookPage = {
  id: "p154",
  number: 154,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "Facciamo pratica · Gli articoli del giornale",
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica" },
    {
      type: "exercise",
      ex: { id: "p154-ex12a", number: "12", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "text", title: "Gli articoli del giornale", it: "Analizziamo adesso la tipologia e la struttura degli articoli. Guardiamo, per prima cosa, il contenuto.\nUn articolo può:\n1. informare: come gli articoli di cronaca, di economia o di sport che presentano semplicemente il fatto;\n2. attivare gli interessi del lettore: come gli articoli che trattano di argomenti di interesse generale;\n3. convincere: come l'articolo di fondo che esprime un'opinione (l'articolo di fondo compare nella prima pagina, di solito nella colonna di sinistra, ed è dedicato a un fatto del giorno fondamentale; normalmente lo scrive il direttore del giornale o un giornalista autorevole);" }],
        [{ type: "photo", src: "images/u8/p154-corriere.jpg", alt: "La prima pagina del Corriere della Sera" }],
      ],
    },
    { type: "text", it: "4. commentare: come gli articoli che spiegano una situazione in maniera personale;\n5. divertire: come gli articoli che propongono riflessioni in modo umoristico;\n6. insegnare: come le recensioni di libri o di spettacoli.\n\nSolitamente il giornalista, quando scrive un articolo, deve dare le informazioni più importanti all'inizio e descrivere dopo i dettagli. Ecco un possibile schema di un articolo:\n1. idea o informazione centrale;\n2. paragrafo che sviluppa l'argomento del titolo;\n3. altre informazioni;\n4. dettagli meno importanti." },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "photo", src: "images/u8/p154-scienza.jpg", alt: "Una pagina di scienza: Intelligenza, contesto la legge di Gardner" }],
        [{ type: "photo", src: "images/u8/p154-moto.jpg", alt: "Una pagina sportiva: Valentino Rossi in moto, «Finalmente mi diverto»" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p154-ex12b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [{ id: "1", prompt: "Adesso cercate degli articoli di un giornale italiano su vari argomenti (cronaca, politica, sport, finanza…), sceglietene uno, leggetelo e presentatelo alla classe.", sample: "Ho scelto un articolo di cronaca della Repubblica. Parla di… Secondo me l'articolo vuole informare, perché presenta semplicemente il fatto." }],
      },
    },
  ],
};

export default page;
