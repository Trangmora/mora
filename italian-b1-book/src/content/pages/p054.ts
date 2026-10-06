import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 54 (Facciamo pratica, bài 13: L'isola di Arturo; C'era una volta…). */
const page: BookPage = {
  id: "p054",
  number: 54,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Facciamo pratica · L'isola di Arturo",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p054-ex13a",
        number: "13",
        label: "A",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi giusti.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ thích hợp.", en: "Let's read and complete the text with the right verbs." },
        source: "(adattato da L'isola di Arturo di Elsa Morante)",
        parts: [
          {
            boxed: true,
            image: { src: "images/u3/p54-procida.jpg", alt: "L'isola di Procida vista dall'alto", side: "left", width: 42 },
            text: "(*Essere*) {{=Era}} inverno e quel giovedì la nebbia (*avvolgere*) {{avvolgeva}} Procida e il golfo di Napoli. In giornate simili, così rare da noi, l'isola (*sembrare*) {{sembrava}} una flotta che (*viaggiare*) {{viaggiava|viaggiasse}} sul mare. Io (*compiere*) {{avevo compiuto|compivo|ho compiuto}} da poco quattordici anni; solo pochi giorni prima (*sapere*) {{avevo saputo|ho saputo|sapevo}} che da quel giorno, con l'arrivo del piroscafo delle tre, la mia esistenza (*cambiare*) {{sarebbe cambiata}}. E, in attesa delle tre, io mi aggiravo per il porto. Tre giorni prima mio padre mi aveva detto che tra un mese (*sposare*) {{avrebbe}} {{sposato}} una donna napoletana e aveva aggiunto: “Così, tu avrai una nuova madre.” E io, per la prima volta, avevo provato un senso di rivolta contro di lui: nessuna donna poteva essere mia madre! In quel momento non cercavo per nulla di pensare all'aspetto o al carattere della nuova sposa di mio padre: (*respingere*) {{respingevo}} ogni curiosità. Mio padre (*scegliere*) {{aveva scelto|ha scelto}} questa donna e io non la (*dovere*) {{dovevo}} giudicare.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p054-ex13b",
        label: "B",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo un testo con le parole indicate.",
        intro: "castello · eroe · mago · fonte · bosco · rana · drago · cavallo · principe · fata",
        tr: { vi: "Viết một đoạn văn với các từ cho sẵn (lâu đài, anh hùng, phù thủy, con suối, khu rừng, con ếch, con rồng, con ngựa, hoàng tử, bà tiên).", en: "Let's write a text with the given words (castle, hero, wizard, spring, wood, frog, dragon, horse, prince, fairy)." },
        items: [
          {
            id: "a",
            prompt: "",
            starter: "C'era una volta…",
            lines: 5,
            sample: "C'era una volta un principe che viveva in un castello vicino a un bosco. Un giorno un mago cattivo trasformò il principe in una rana. La rana viveva vicino a una fonte, ma un drago la sorvegliava. Una fata buona chiamò un eroe: l'eroe arrivò sul suo cavallo, vinse il drago e la fata liberò il principe dall'incantesimo.",
          },
        ],
      },
    },
    { type: "photo", src: "images/u3/p54-drago.jpg", alt: "Una fata, un drago e un cavaliere a cavallo" },
  ],
};

export default page;
