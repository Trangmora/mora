import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 49 (bài 8A: il condizionale passato). */
const page: BookPage = {
  id: "p049",
  number: 49,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Osserviamo bene · Il condizionale passato",
  banner: "CHE COSA AVRESTI FATTO?",
  runningHead: " ",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p049-ex8a", number: "8", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [
        [{ type: "image", src: "images/u3/p49-gita.jpg", alt: "Cecilia malata a letto sogna la Spagna" }],
        [{ type: "text", it: "Cecilia avrebbe fatto volentieri una gita in Spagna, ma due giorni prima di prendere l'aereo si è ammalata e non è potuta più partire." }],
      ],
    },
    {
      type: "columns",
      widths: [3, 2],
      align: "center",
      cols: [
        [{ type: "image", src: "images/u3/p49-festa.jpg", alt: "Una ragazza studia e pensa alla festa" }],
        [{ type: "text", it: "Domenica sera sarei andata alla festa, ma lunedì avevo un esame e non potevo fare tardi." }],
      ],
    },
    { type: "theory", text: "^^ ***Il condizionale passato***\n^^ condizionale semplice di *avere* o *essere* + participio passato del verbo" },
    { type: "gridTable", firstCol: true, split: [2, 3], head: ["", "parlare", "uscire", "avere", "essere"], rows: [
        ["io", "avrei parlato", "sarei uscito/a", "avrei avuto", "sarei stato/a"],
        ["tu", "avresti parlato", "saresti uscito/a", "avresti avuto", "saresti stato/a"],
        ["lui / lei / Lei", "avrebbe parlato", "sarebbe uscito/a", "avrebbe avuto", "sarebbe stato/a"],
        ["noi", "avremmo parlato", "saremmo usciti/e", "avremmo avuto", "saremmo stati/e"],
        ["voi", "avreste parlato", "sareste usciti/e", "avreste avuto", "sareste stati/e"],
        ["loro", "avrebbero parlato", "sarebbero usciti/e", "avrebbero avuto", "sarebbero stati/e"],
      ] },
  ],
};

export default page;
