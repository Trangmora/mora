import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 194 (Facciamo pratica, bài 10: Il Carnevale). */
const page: BookPage = {
  id: "p194",
  number: 194,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "Facciamo pratica · Il Carnevale",
  banner: "ALTRE FESTE!",
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica" },
    {
      type: "exercise",
      ex: {
        id: "p194-ex10a",
        number: "10",
        label: "A",
        icons: ["read", "write"],
        kind: "choice",
        inline: true,
        skill: "reading",
        instruction: "Leggiamo il testo e sottolineiamo le parole giuste.",
        subtitle: "Il Carnevale",
        example: { q: "Carnevale deriva da carne levare, perché nel giorno che precedeva l'inizio della Quaresima cessava il consumo della / alla carne.", a: "***della***" },
        tr: { vi: "Đọc đoạn văn và gạch chân các từ đúng.", en: "Let's read the text and underline the right words." },
        items: [
          { id: "1", prompt: "Il periodo del Carnevale comprende i … che precedono l'inizio della Quaresima.", options: ["momenti", "festeggiamenti"], answer: 1 },
          { id: "2", prompt: "L'inizio del Carnevale può essere il 1° gennaio, il 17 gennaio (Sant'Antonio) o il 2 febbraio (festa della Candelora) e arriva fino al mercoledì delle Ceneri. Il Carnevale è … contadina:", options: ["una stagione", "una festa"], answer: 1 },
          { id: "3", prompt: "l'esplosione di gioia e l'uso della … avevano la funzione di allontanare gli spiriti malefici.", options: ["maschera", "macchina"], answer: 0 },
          { id: "4", prompt: "Durante i “Saturnali”, feste dedicate al dio Saturno, gli antichi … facevano dei festeggiamenti che ricordano il Carnevale di oggi:", options: ["romani", "indiani"], answer: 0 },
          { id: "5", prompt: "i Saturnali iniziavano il 17 dicembre e … sette giorni. La festa cominciava a Roma con un sacrificio solenne, poi c'era un grande banchetto pubblico.", options: ["finivano", "duravano"], answer: 1 },
          { id: "6", prompt: "Seguivano … di vario genere (giochi d'azzardo, allegre bevute, scambi di doni).", options: ["festeggiamenti", "processioni"], answer: 0 },
          { id: "7", prompt: "Durante i Saturnali le persone facevano molte cose strane: per esempio, i padroni … gli schiavi e gli schiavi potevano avere ogni libertà!", options: ["servivano", "picchiavano"], answer: 0 },
          { id: "8", prompt: "Alcune persone sceglievano una specie di re … festa, che aveva ogni potere.", options: ["della", "sulla"], answer: 0 },
          { id: "9", prompt: "Con il cristianesimo molti continuano … celebrare il Carnevale, ma questa festa perde il suo contenuto magico. Solo durante i secoli XV e XVI abbiamo le prime feste in maschera pubbliche.", options: ["di", "a"], answer: 1 },
          { id: "10", prompt: "… quel momento in Italia …", options: ["Per", "Da"], answer: 1 },
          { id: "11", prompt: "… il Carnevale sontuosamente per secoli.", options: ["abbiamo celebrato", "abbiamo dimenticato"], answer: 0 },
          { id: "12", prompt: "Ancora oggi sono visibili alcuni aspetti antichi di questa festa popolare … Carnevale di Venezia o … Carnevale di Viareggio.", options: ["sul … sul", "nel … nel"], answer: 1 },
        ],
      },
    },
    { type: "photo", src: "images/u10/p194-maschere.jpg", alt: "Maschere del Carnevale di Venezia" },
    { type: "audio", src: "audio/u10-p194-ex10b.mp3", title: "10B", autoTranscript: true, transcript: "Il Carnevale di Venezia.\nRicco di storia e di tradizione, il Carnevale di Venezia affascina i suoi abitanti e soprattutto moltissimi turisti, grazie a un misto di arte, storia e cultura. Il Carnevale di Venezia ha avuto il suo momento più importante nel '700, ultimo secolo di vita della Repubblica Veneziana: in quel periodo il Carnevale, con le sue feste, i suoi spettacoli e le sue maschere, attirava nella città della laguna visitatori da tutta Europa. Ogni anno gli organizzatori scelgono un tema principale e lo sviluppano da vari punti di vista, da quello più culturale a quello più spettacolare. Inoltre, maschere di ogni tipo, alcune di incredibile bellezza, sfilano tra le strade di una città unica al mondo. Il cuore della festa è Piazza San Marco, dove c'è un grande palcoscenico, ma ci sono molti altri spettacoli in altre zone della città, anche per evitare troppa confusione: a Venezia, infatti, si cammina solo a piedi. Il Carnevale non è l'unica manifestazione veneziana a livello internazionale: ricordiamo la Regata Storica e, ad anni alterni, la Biennale. Ma senza alcun dubbio il Carnevale è la festa che richiama più turisti in questa città." },
    {
      type: "exercise",
      ex: {
        id: "p194-ex10b",
        label: "B",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo il testo e completiamo le frasi.",
        subtitle: "Il Carnevale di Venezia",
        tr: { vi: "Nghe đoạn văn và hoàn thành các câu.", en: "Let's listen to the text and complete the sentences." },
        items: [
          { id: "1", prompt: "1. Il Carnevale di Venezia ha avuto il suo momento più importante …", lines: 1, sample: "nel '700, ultimo secolo di vita della Repubblica Veneziana." },
          { id: "2", prompt: "2. Oggi gli organizzatori …", lines: 1, sample: "scelgono ogni anno un tema principale e lo sviluppano da vari punti di vista." },
          { id: "3", prompt: "3. Il cuore della festa è …", lines: 1, sample: "Piazza San Marco, dove c'è un grande palcoscenico." },
          { id: "4", prompt: "4. A Venezia ci sono anche altre manifestazioni come …", lines: 1, sample: "la Regata Storica e, ad anni alterni, la Biennale." },
        ],
      },
    },
  ],
};

export default page;
