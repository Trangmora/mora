import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 48 (bài 7: il condizionale per…). */
const page: BookPage = {
  id: "p048",
  number: 48,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Osserviamo bene · Marco e Giovanni",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p048-ex7a", number: "7", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il condizionale per…", tr: { vi: "Cùng đọc: thì điều kiện để…", en: "Let's read: the conditional to…" }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "image", src: "images/u3/p48-vestito.jpg", alt: "Una ragazza sceglie un vestito" }, { type: "theory", text: "### esprimere un dubbio:\n> Tra questo vestito e quello non **saprei** quale scegliere." }],
        [{ type: "image", src: "images/u3/p48-attore.jpg", alt: "Un attore seduto" }, { type: "theory", text: "### presentare una notizia come non certa nel presente:\n> Secondo la stampa l'attore Stefano Accorsi **sarebbe** già a Cannes per ricevere il premio." }],
        [{ type: "image", src: "images/u3/p48-passaggio.jpg", alt: "Due colleghi parlano" }, { type: "theory", text: "### esprimere un'azione che dipende da un'altra:\n> Non ho la macchina, altrimenti ti **darei** un passaggio." }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p048-ex7b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi al condizionale.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thì điều kiện.", en: "Let's read and complete the text with the verbs in the conditional." },
        parts: [
          {
            boxed: true,
            title: "Aiutiamo Marco e Giovanni a prendere una decisione!",
            text: "Marco e Giovanni, due fratelli, vivono a Trieste: Marco studia economia, Giovanni ingegneria. Questa estate (*volere*) {{=vorrebbero}} andare in vacanza insieme. A Marco (*piacere*) {{piacerebbe}} rimanere in Italia, vicino a casa; Giovanni (*preferire*) {{preferirebbe}} invece andare in Olanda, perché desidera vedere Amsterdam: tutti e due (*potere*) {{potrebbero}} dormire da un amico, Hans, che hanno conosciuto l'anno scorso.\nMarco (*avere*) {{avrebbe}} voglia comunque di riposarsi, (*dovere*) {{dovrebbe}} anche pensare a prepararsi un po' per la tesi, perché sta finendo i suoi corsi all'università. Ancora non sa quale (*potere*) {{potrebbe}} essere l'argomento della tesi, ma a settembre (*dovere*) {{dovrebbe}} cominciare a leggere almeno alcuni libri che gli hanno suggerito i suoi professori.\nChe consigli dareste ai due fratelli?",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p048-ex7c",
        label: "C",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: continuiamo la storia di Marco e Giovanni.",
        tr: { vi: "Cùng viết: viết tiếp câu chuyện của Marco và Giovanni.", en: "Let's write: continue the story of Marco and Giovanni." },
        items: [
          {
            id: "a",
            prompt: "",
            starter: "Secondo me Marco e Giovanni dovrebbero…",
            lines: 3,
            sample: "Secondo me Marco e Giovanni dovrebbero andare insieme ad Amsterdam per una settimana: potrebbero dormire da Hans e spendere poco. Poi Marco potrebbe tornare a Trieste, riposarsi e cominciare a leggere i libri per la tesi.",
          },
        ],
      },
    },
  ],
};

export default page;
