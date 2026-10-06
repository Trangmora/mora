import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 33 (Lessico, bài 13–14). */
const page: BookPage = {
  id: "p033",
  number: 33,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Lessico · Le parole della famiglia",
  addedOn: "2026-10-06",
  runningHead: "Lessico",
  sideTab: { unit: "U2", color: "#d8333a" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p033-ex13",
        number: "13",
        icons: ["read", "check"],
        kind: "choice",
        skill: "reading",
        variant: "twoCol",
        instruction: "Leggiamo e scegliamo la risposta giusta.",
        tr: { vi: "Đọc và chọn câu trả lời đúng.", en: "Let's read and choose the right answer." },
        items: [
          { id: "1", prompt: "*Celibe* significa:", options: ["un uomo non sposato.", "una donna non sposata.", "un uomo sposato."], answer: 0 },
          { id: "2", prompt: "Il *bisnonno* è:", options: ["il fratello del padre.", "il nonno del padre.", "il cugino della madre."], answer: 1 },
          { id: "3", prompt: "La *nuora* è:", options: ["la sorella della nonna.", "la figlia della zia.", "la moglie del figlio."], answer: 2 },
          { id: "4", prompt: "*Chiedere la mano* significa:", options: ["aiutare qualcuno.", "fidanzarsi con qualcuno.", "chiedere a qualcuno di sposarsi."], answer: 2 },
          { id: "5", prompt: "Il *cognato* è:", options: ["il marito della figlia.", "il fratello del marito o della moglie.", "il figlio della zia o dello zio."], answer: 1 },
          { id: "6", prompt: "La *fede* è:", options: ["l'anello degli sposi.", "una foto degli sposi.", "un documento."], answer: 0 },
          { id: "7", prompt: "La *bomboniera* è:", options: ["un viaggio.", "un ricordo che gli sposi danno agli amici.", "un tipo di musica."], answer: 1 },
          { id: "8", prompt: "*Spolverare* significa:", options: ["togliere la polvere.", "lavare.", "preparare la cena."], answer: 0 },
          { id: "9", prompt: "*Riordinare* significa:", options: ["mettere in disordine.", "ordinare il cibo al telefono.", "mettere le cose a posto."], answer: 2 },
          { id: "10", prompt: "*Fare il bucato* significa:", options: ["lavare i panni.", "stirare i panni.", "mettere i panni nell'armadio."], answer: 0 },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p033-ex14",
        number: "14",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: spieghiamo il significato delle parole.",
        tr: { vi: "Cùng viết: giải thích nghĩa của các từ.", en: "Let's write: explain the meaning of the words." },
        items: [
          { id: "1", prompt: "vedovo", lines: 1, sample: "Un uomo a cui è morta la moglie." },
          { id: "2", prompt: "coniugato", lines: 1, sample: "Una persona sposata." },
          { id: "3", prompt: "divorziare", lines: 1, sample: "Sciogliere legalmente il matrimonio." },
          { id: "4", prompt: "fare il cambio di stagione", lines: 1, sample: "Mettere via i vestiti della stagione passata e tirare fuori quelli della nuova stagione." },
          { id: "5", prompt: "stirare", lines: 1, sample: "Passare il ferro caldo sui vestiti per togliere le pieghe." },
          { id: "6", prompt: "fare la lavatrice", lines: 1, sample: "Lavare i panni con la lavatrice." },
          { id: "7", prompt: "rifare i letti", lines: 1, sample: "Sistemare lenzuola e coperte dopo la notte." },
        ],
      },
    },
  ],
};

export default page;
