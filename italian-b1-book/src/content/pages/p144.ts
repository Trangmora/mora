import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 144 (Viaggiamo in Italia: La canzone italiana). */
const page: BookPage = {
  id: "p144",
  number: 144,
  unit: "7",
  unitTitle: "Parole e musica",
  title: "Viaggiamo in Italia · La canzone italiana",
  addedOn: "2026-10-08",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U7", title: "Parole e musica" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p144-ex1a", number: "1", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "La canzone italiana", tr: { vi: "Cùng đọc: Ca khúc Ý.", en: "Let's read: Italian song." }, items: [] },
    },
    {
      type: "text",
      it: "L'Italia è da sempre uno dei grandi esportatori di musica. La cultura, l'arte, il cibo e la moda sono dei simboli del “made in Italy”; la musica si affianca a questi settori ed è un'ambasciatrice dello stile italiano nel mondo. Tutti conoscono la tradizione della musica lirica, ma anche la canzone melodica ha vissuto e vive ancora momenti di straordinaria notorietà. La tradizione melodica non ha mai perduto il suo fascino se cantanti come Iva Zanicchi e Al Bano sono tutt'ora molto popolari anche all'estero. L'elemento melodico costituisce una parte essenziale del successo anche di cantanti moderni come Eros Ramazzotti o Laura Pausini. Dalla fine degli anni '50, per influenza dei modelli americani, è esploso in Italia il rock and roll: Adriano Celentano, uno dei migliori cantanti italiani, ha esordito proprio con questo genere musicale, che ha oggi in Vasco Rossi e Luciano Ligabue due importanti rappresentanti. Nel panorama della canzone italiana negli ultimi 30 anni è particolarmente significativa la canzone d'autore. Gino Paoli, Fabrizio De Andrè, Lucio Battisti e altri cantautori hanno espresso, spesso con un linguaggio semplice, i sentimenti umani più comuni e hanno dato vita a “scuole musicali” in varie città d'Italia (Genova, Bologna, Roma), dove sono nati molti altri artisti di successo (Biagio Antonacci, Jovanotti, Daniele Silvestri, Sergio Cammariere, ecc.). Nomi molto conosciuti della musica italiana sono anche quelli di Claudio Baglioni, di Antonello Venditti e dei poeti-cantastorie come Francesco De Gregori e Francesco Guccini. La musica leggera italiana ha inoltre splendide figure di cantanti-suonatori che trovano i loro modelli nel jazz, come il pianoforte di Paolo Conte, o nel blues, come la chitarra di Pino Daniele, o nel folk, come il violino di Angelo Branduardi. La canzone melodica italiana è molto cambiata nel tempo: siamo passati dalle famose note di Volare di Domenico Modugno al rap di Jovanotti o di Tiziano Ferro, ma resta ancora intatto il fascino di un accordo speciale fra musica e parola.",
    },
    { type: "photo", src: "images/u7/p144-guccini.jpg", alt: "Francesco Guccini canta" },
    {
      type: "exercise",
      ex: {
        id: "p144-ex1b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Conoscete alcuni cantanti italiani contemporanei?", sample: "Sì, conosco Laura Pausini, Tiziano Ferro e Jovanotti." },
          { id: "2", prompt: "Avete mai ascoltato una canzone melodica italiana? Quale?", sample: "Sì, ho ascoltato Volare di Domenico Modugno." },
          { id: "3", prompt: "Nel vostro paese ascoltate la musica italiana?", sample: "Sì, nel mio paese la musica italiana piace molto, soprattutto l'opera." },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p144-ex2", number: "2", icons: ["look"], kind: "speak", skill: "speaking", instruction: "Osserviamo le immagini.", subtitle: "I giovani italiani ai concerti…", tr: { vi: "Quan sát các bức tranh: Giới trẻ Ý đi xem hòa nhạc…", en: "Look at the pictures: Young Italians at concerts…" }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u7/p144-leggera.jpg", alt: "1. musica leggera: i ragazzi urlano e ballano a un concerto rock" }],
        [{ type: "photo", src: "images/u7/p144-classica.jpg", alt: "2. musica classica: gli spettatori dormono durante un concerto" }],
      ],
    },
  ],
};

export default page;
