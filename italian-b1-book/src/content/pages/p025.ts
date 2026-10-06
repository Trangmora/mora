import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 25 (Osserviamo bene, bài 4B–5). */
const page: BookPage = {
  id: "p025",
  number: 25,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Osserviamo bene · Avere o essere?",
  addedOn: "2026-10-06",
  runningHead: "Osserviamo bene",
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p025-ex4b",
        label: "B",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con i verbi al passato prossimo.",
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thì passato prossimo.", en: "Let's write: complete the sentences with the verbs in the passato prossimo." },
        example: { q: "1. Il figlio di Mario (*crescere*) ***è cresciuto*** moltissimo.", a: "***è cresciuto***" },
        items: [
          { id: "2", prompt: "Quanto (*costare*) ___ i tuoi pantaloni?", answers: ["sono costati"] },
          { id: "3", prompt: "La cerimonia di nozze di Vittoria (*finire*) ___ tardi.", answers: ["è finita"] },
          { id: "4", prompt: "A Paola e Beppe (*piacere*) ___ molto la tua festa.", answers: ["è piaciuta"] },
          { id: "5", prompt: "La mia mamma (*cominciare*) ___ ieri il nuovo lavoro.", answers: ["ha cominciato"] },
          { id: "6", prompt: "Il film (*durare*) ___ due ore.", answers: ["è durato"] },
          { id: "7", prompt: "La società italiana (*cambiare*) ___ molto in questi ultimi anni.", answers: ["è cambiata"] },
          { id: "8", prompt: "(*tu, scendere*) ___ con le scale mobili o a piedi?", answers: ["Sei sceso|Sei scesa"] },
          {
            id: "9",
            prompt: "(*io, correre*) ___ all'ospedale appena (*io, sapere*) ___ che (*nascere*) ___ tua figlia.",
            answers: ["Sono corso|Sono corsa", "ho saputo", "è nata"],
          },
          { id: "10", prompt: "Maria (*passare*) ___ da me ieri sera.", answers: ["è passata"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p025-ex5",
        number: "5",
        icons: ["read", "check"],
        kind: "choice",
        skill: "grammar",
        variant: "twoCol",
        instruction: "Leggiamo e scegliamo la frase giusta.",
        tr: { vi: "Đọc và chọn câu đúng.", en: "Let's read and choose the right sentence." },
        items: [
          { id: "1", prompt: "", options: ["Ho andato alla festa di Carlo.", "Sono andato alla festa di Carlo.", "Ho andata alla festa di Carlo."], answer: 1 },
          {
            id: "2",
            prompt: "",
            options: ["Il fidanzamento di Matteo e Alessia ha durato tre anni.", "Il fidanzamento di Matteo e Alessia ha durata tre anni.", "Il fidanzamento di Matteo e Alessia è durato tre anni."],
            answer: 2,
          },
          { id: "3", prompt: "", options: ["Dove avete stato ieri sera?", "Dove siete stato ieri sera?", "Dove siete stati ieri sera?"], answer: 2 },
          {
            id: "4",
            prompt: "",
            options: ["Paola ha passato un periodo molto stressante.", "Paola è passato un periodo molto stressante.", "Paola ha passata un periodo molto stressante."],
            answer: 0,
          },
          { id: "5", prompt: "", options: ["Le vacanze sono già finite.", "Le vacanze hanno già finito.", "Le vacanze hanno già finite."], answer: 0 },
          {
            id: "6",
            prompt: "",
            options: ["Giorgio ha cominciato a studiare il tedesco.", "Giorgio è cominciato a studiare il tedesco.", "Giorgio ha cominciata a studiare il tedesco."],
            answer: 0,
          },
          { id: "7", prompt: "", options: ["Siete scesi con l'ascensore?", "Avete scesi con l'ascensore?", "Siete sceso con l'ascensore?"], answer: 0 },
          { id: "8", prompt: "", options: ["È successo qualcosa?", "Ha successo qualcosa?", "Ha successa qualcosa?"], answer: 0 },
          { id: "9", prompt: "", options: ["Vi avete sposato in chiesa?", "Vi siete sposati in chiesa?", "Vi avete sposati in chiesa?"], answer: 1 },
          {
            id: "10",
            prompt: "",
            options: ["Veronica è viaggiata molto all'estero.", "Veronica ha viaggiata molto all'estero.", "Veronica ha viaggiato molto all'estero."],
            answer: 2,
          },
          { id: "11", prompt: "", options: ["Abbiamo appena salito sul treno.", "Abbiamo appena saliti sul treno.", "Siamo appena saliti sul treno."], answer: 2 },
        ],
      },
    },
  ],
};

export default page;
