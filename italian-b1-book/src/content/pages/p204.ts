import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 204 (Viaggiamo in Italia: Feste e tradizioni). */
const page: BookPage = {
  id: "p204",
  number: 204,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  title: "Viaggiamo in Italia · Feste e tradizioni",
  addedOn: "2026-10-08",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  blocks: [
    { type: "photo", src: "images/u10/p204-feste.jpg", alt: "Cinque foto di feste italiane numerate da 1 a 5" },
    {
      type: "exercise",
      ex: {
        id: "p204-ex1",
        number: "1",
        icons: ["look", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Osserviamo e abbiniamo le immagini ai nomi delle feste.",
        subtitle: "Feste e tradizioni",
        tr: { vi: "Quan sát và nối các bức ảnh với tên các lễ hội.", en: "Let's look and match the pictures to the names of the festivals." },
        left: [
          { id: "1", text: "Barche storiche sul Canal Grande" },
          { id: "2", text: "Un cavaliere colpisce un bersaglio con la lancia" },
          { id: "3", text: "Figuranti con le bandiere a croce rossa su un prato" },
          { id: "4", text: "Fantini su asini in mezzo alla folla" },
          { id: "5", text: "Una statua della Madonna tra le candele, di notte" },
        ],
        right: [
          { id: "a", text: "Il Palio di Legnano." },
          { id: "b", text: "La Processione dei Misteri a Trapani." },
          { id: "c", text: "Il Palio dei somari di Todi." },
          { id: "d", text: "La Regata storica delle Repubbliche Marinare." },
          { id: "e", text: "La Giostra del Saracino ad Arezzo." },
        ],
        answer: { "1": "d", "2": "e", "3": "a", "4": "c", "5": "b" },
      },
    },
    {
      type: "exercise",
      ex: { id: "p204-ex2", number: "2", icons: ["look"], kind: "speak", skill: "speaking", instruction: "Osserviamo l'immagine.", tr: { vi: "Quan sát bức tranh.", en: "Let's look at the picture." }, items: [{ id: "1", prompt: "Quanto amano gli italiani le loro feste e le loro tradizioni?", sample: "Moltissimo: nella vignetta un uomo va al lavoro ancora festeggiando, perché ieri la sua contrada ha vinto il Palio!" }] },
    },
    { type: "photo", src: "images/u10/p204-vignetta.jpg", alt: "Vignetta in Piazza del Campo: «Ma… signora, che cosa succede, dove va quell'uomo?» «Va al lavoro… la sua contrada ieri ha vinto il Palio!»" },
  ],
};

export default page;
