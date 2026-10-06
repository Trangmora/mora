import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 46 (bài 5C, 6A–B: il condizionale per dare consigli). */
const page: BookPage = {
  id: "p046",
  number: 46,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "Osserviamo bene · Il condizionale per dare consigli",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p046-ex5c",
        label: "C",
        icons: ["match", "write"],
        kind: "match",
        skill: "grammar",
        instruction: "Abbiniamo e completiamo le frasi con i verbi al condizionale.",
        tr: { vi: "Nối và hoàn thành câu với động từ ở thì điều kiện.", en: "Let's match and complete the sentences with the verbs in the conditional." },
        left: [
          { id: "1", text: "Chi mi (aiutare) aiuterebbe a spostare questo tavolo?" },
          { id: "2", text: "Scusate, (chiudere) …… la finestra?" },
          { id: "3", text: "Oggi (io, mangiare) …… volentieri un piatto di gnocchi," },
          { id: "4", text: "Scusa, mi (portare) …… un bicchiere d'acqua?" },
          { id: "5", text: "Ci (fermare) …… volentieri a casa vostra," },
          { id: "6", text: "Luca, (essere) …… libero domenica sera per andare al cinema?" },
        ],
        right: [
          { id: "a", text: "Mi dispiace, ma domenica sono già impegnato." },
          { id: "b", text: "Sì, certamente! La vuoi gasata?" },
          { id: "c", text: "ma abbiamo un impegno urgente." },
          { id: "d", text: "Non ti preoccupare: ti do una mano io!" },
          { id: "e", text: "Sì, subito." },
          { id: "f", text: "ma sono a dieta." },
        ],
        given: { "1": "d" },
        answer: { "1": "d", "2": "e", "3": "f", "4": "b", "5": "c", "6": "a" },
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p046-ex5c-verbi",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Completiamo con i verbi al condizionale.",
        tr: { vi: "Điền động từ ở thì điều kiện.", en: "Fill in the verbs in the conditional." },
        items: [
          { id: "2", prompt: "2. Scusate, (*chiudere*) ___ la finestra?", answers: ["chiudereste"] },
          { id: "3", prompt: "3. Oggi (*io, mangiare*) ___ volentieri un piatto di gnocchi,", answers: ["mangerei"] },
          { id: "4", prompt: "4. Scusa, mi (*portare*) ___ un bicchiere d'acqua?", answers: ["porteresti"] },
          { id: "5", prompt: "5. Ci (*fermare*) ___ volentieri a casa vostra,", answers: ["fermeremmo"] },
          { id: "6", prompt: "6. Luca, (*essere*) ___ libero domenica sera per andare al cinema?", answers: ["saresti"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p046-ex6a", number: "6", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "theory",
      text: `
! ATTENZIONE!
> **Andresti** a prendermi un caffè al bar?
> Ci **dareste** una mano? Siamo veramente stanchi!
> I nostri amici **verrebbero** con noi in vacanza, ma quest'anno non hanno soldi.
===
> Stasera **vorremmo** andare a mangiare una pizza.
> **Rimarrei** volentieri con te, ma devo finire i compiti.
^^ Per le forme irregolari dei verbi, consultate la GRAMMATICA.
`.trim(),
    },
    {
      type: "exercise",
      ex: { id: "p046-ex6b", label: "B", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il condizionale per… dare consigli", tr: { vi: "Cùng đọc: thì điều kiện để… đưa ra lời khuyên.", en: "Let's read: the conditional to… give advice." }, items: [] },
    },
    {
      type: "columns",
      cols: [
        [{ type: "image", src: "images/u3/p46-libro.jpg", alt: "«Dove posso trovare l'ultimo libro di Wilbur Smith?» «Potresti provare alla Libreria Feltrinelli.»" }],
        [{ type: "image", src: "images/u3/p46-capelli.jpg", alt: "«Avrei bisogno di tagliare i capelli: conosci un buon parrucchiere?» «Io andrei da Aldo Coppola.»" }],
      ],
    },
  ],
};

export default page;
