import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 28 (Osserviamo bene, bài 8: il trapassato prossimo). */
const page: BookPage = {
  id: "p028",
  number: 28,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Osserviamo bene · Il trapassato prossimo",
  addedOn: "2026-10-06",
  runningHead: "Osserviamo bene",
  banner: "IO ERO ANDATO",
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p028-ex8a",
        number: "8",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        tr: { vi: "Cùng đọc.", en: "Let's read." },
        items: [],
      },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [
        [{ type: "photo", src: "images/u2/p28-concerto.jpg", alt: "Un concerto di Giorgia" }],
        [{ type: "text", it: "Ieri Elena mi ha detto che la sera prima era andata a vedere un concerto di Giorgia." }],
      ],
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [
        [{ type: "photo", src: "images/u2/p28-esame.jpg", alt: "Un esame all'università" }],
        [{ type: "text", it: "Ieri sera Marco era felice perché aveva superato un esame difficile." }],
      ],
    },
    {
      type: "theory",
      text: `
^^ ***Il trapassato prossimo***
^^ imperfetto di *avere* o *essere* + participio passato del verbo
`.trim(),
    },
    {
      type: "gridTable",
      firstCol: true,
      split: [3],
      head: ["", "guardare", "partire", "avere", "essere"],
      rows: [
        ["io", "avevo guardato", "ero partito/a", "avevo avuto", "ero stato/a"],
        ["tu", "avevi guardato", "eri partito/a", "avevi avuto", "eri stato/a"],
        ["lui / lei / Lei", "aveva guardato", "era partito/a", "aveva avuto", "era stato/a"],
        ["noi", "avevamo guardato", "eravamo partiti/e", "avevamo avuto", "eravamo stati/e"],
        ["voi", "avevate guardato", "eravate partiti/e", "avevate avuto", "eravate stati/e"],
        ["loro", "avevano guardato", "erano partiti/e", "avevano avuto", "erano stati/e"],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p028-ex8b",
        label: "B",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con i verbi al trapassato prossimo.",
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thì trapassato prossimo.", en: "Let's write: complete the sentences with the verbs in the trapassato prossimo." },
        example: { q: "1. Sono arrivata a teatro, ma lo spettacolo (*iniziare*) ***era*** già ***iniziato***.", a: "***era iniziato***" },
        items: [
          { id: "2", prompt: "Abbiamo incontrato alcuni amici che (*noi, conoscere*) ___ tre anni fa.", answers: ["avevamo conosciuto"] },
          { id: "3", prompt: "Mi hanno telefonato alle 11, ma (*io, uscire*) ___ un'ora prima.", answers: ["ero uscito|ero uscita"] },
          {
            id: "4",
            prompt: "Angela e Valentina (*vestirsi*) ___ con abiti molto eleganti perché dovevano andare a cena fuori.",
            answers: ["si erano vestite"],
          },
          { id: "5", prompt: "Gli sposi (*partire*) ___ subito dopo cena perché erano stanchi e volevano riposarsi.", answers: ["erano partiti"] },
          { id: "6", prompt: "Che bella casa! Non (*io, vedere*) l' ___ ancora ___.", answers: ["avevo", "vista"] },
          { id: "7", prompt: "Quando ho cominciato l'università, mio fratello (*finire*) ___ la sua tesi.", answers: ["aveva finito"] },
          { id: "8", prompt: "Marta mi ha detto che sua cugina (*sposarsi*) ___ prima di lei.", answers: ["si era sposata"] },
          { id: "9", prompt: "Finalmente ho trovato le chiavi che (*io, perdere*) ___!", answers: ["avevo perso|avevo perduto"] },
          { id: "10", prompt: "Federico è nato nel 2003 quando sua madre (*avere*) ___ già ___ un altro bambino.", answers: ["aveva", "avuto"] },
        ],
      },
    },
  ],
};

export default page;
