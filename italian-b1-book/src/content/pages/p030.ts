import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 30 (Facciamo pratica: Racconti di vita, bài 10–11A). */
const page: BookPage = {
  id: "p030",
  number: 30,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Facciamo pratica · Racconti di vita",
  addedOn: "2026-10-06",
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica", banner: "RACCONTI DI VITA" },
    {
      type: "exercise",
      ex: {
        id: "p030-ex10",
        number: "10",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [],
      },
    },
    { type: "photo", src: "images/u2/p30-collage.jpg", alt: "Famiglie di diversi paesi del mondo" },
    {
      type: "exercise",
      ex: {
        id: "p030-ex10q",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Rispondiamo.",
        tr: { vi: "Trả lời các câu hỏi.", en: "Answer the questions." },
        items: [
          {
            id: "1",
            prompt: "Raccontate la vostra esperienza personale: se siete ancora in famiglia oppure a quanti anni l'avete lasciata, quando avete ottenuto l'indipendenza economica…",
          },
          { id: "2", prompt: "Raccontate qualche episodio della vita dei vostri nonni." },
          { id: "3", prompt: "Vi ricordate un fatto divertente che è successo quando eravate bambini?" },
          { id: "4", prompt: "Raccontate la storia di qualche famiglia importante e famosa del vostro paese." },
          {
            id: "5",
            prompt: "Come sono cambiate le tradizioni della famiglia nel vostro paese? Quali sono le differenze che notate oggi? Com'è la situazione dei giovani nel vostro paese?",
          },
        ],
      },
    },
    {
      type: "audio",
      src: "audio/u2-p30-ex11.mp3",
      autoTranscript: true,
      transcript:
        "Patrizia: Quando ero piccola, andavo spesso a casa di mia nonna Rita in campagna. Ricordo che la mia stanza preferita era la cucina. In cucina c'era un tavolo di legno rotondo e un bel camino. Io non ero mai sola: incontravo sempre i miei tre cugini e ci divertivamo a giocare a impastare torte e pizze. A volte a casa della nonna veniva anche il fratello di mio padre, zio Sandro, che era molto bravo a costruire castelli di carta e piccoli aeroplani. Una volta, durante l'estate, siamo andati tutti insieme a fare una gita al lago. I nostri genitori avevano affittato una barca e ci avevano comprato le canne da pesca per trascorrere una bella giornata all'aria aperta. È stata una giornata stupenda! Abbiamo scattato delle foto meravigliose. Ecco, vedete l'immagine di questo grande gruppo di famiglia vicino al lago? Allora, il signore con i baffi che mostra una grande trota è lo zio Sandro. Quella simpatica vecchietta con il cappellino rosa è nonna Rita. Quel vecchietto con la pipa è nonno Osvaldo. Mia madre, Carla, è quella signora un po' grassa, con gli occhiali. Mio padre, Bruno, è quel signore alto con i capelli rossi. E la signora bionda con la gonna a fiori è zia Giovanna. Accanto a lei ci sono i miei cugini. Io sono Patrizia e sono quella bambina vicino al cane, al centro della foto.",
    },
    {
      type: "exercise",
      ex: {
        id: "p030-ex11a",
        number: "11",
        label: "A",
        icons: ["listen", "check"],
        kind: "truefalse",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo: vero o falso?",
        subtitle: "La famiglia di Patrizia",
        tr: { vi: "Nghe: đúng hay sai? — Gia đình của Patrizia", en: "Let's listen: true or false? — Patrizia's family" },
        items: [
          { id: "1", prompt: "Nonna Rita aveva un camino in cucina.", answer: true },
          { id: "2", prompt: "Patrizia giocava sempre da sola.", answer: false },
          { id: "3", prompt: "Zio Sandro spesso cucinava delle buone torte.", answer: false },
          { id: "4", prompt: "Una volta tutta la famiglia ha fatto una gita al mare.", answer: false },
          { id: "5", prompt: "I genitori di Patrizia hanno affittato una barca.", answer: true },
        ],
      },
    },
  ],
};

export default page;
