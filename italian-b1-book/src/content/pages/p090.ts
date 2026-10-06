import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 90 (Osserviamo bene, bài 6: l'imperativo con i pronomi; il test dell'ospite). */
const page: BookPage = {
  id: "p090",
  number: 90,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "Osserviamo bene · L'imperativo con i pronomi",
  runningHead: "Osserviamo bene",
  banner: "PENSACI!",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p090-ex6a", number: "6", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "L'imperativo con i pronomi", tr: { vi: "Cùng đọc: thức mệnh lệnh với đại từ.", en: "Let's read: the imperative with pronouns." }, items: [] },
    },
    {
      type: "theory",
      text: "> Porta a me quel giornale! → **Portamelo!**\n> Signor Mattei, spieghi a noi che cosa è successo! → Signor Mattei, **ce lo spieghi!**\n> Pensate all'esame → **Pensateci!**\n> Quante pizze dobbiamo comprare? → **Compriamone** cinque!\n> Non scrivere la lettera a Chiara! → **Non gliela scrivere! / Non scrivergliela!**\n> Non parlate sempre di calcio! → **Non ne parlate! / Non parlatene!**",
    },
    {
      type: "exercise",
      ex: {
        id: "p090-ex6b",
        label: "B",
        icons: ["read"],
        kind: "choice",
        skill: "reading",
        noKey: true,
        instruction: "Leggiamo.",
        intro: "Un amico vi ospita una settimana a casa sua… come vi comportate?\nLeggete questi consigli, scegliete quelli più adatti a voi, attribuitevi il punteggio e poi controllate il vostro profilo: siete o non siete ospiti perfetti?",
        tr: { vi: "Một người bạn cho bạn ở nhờ một tuần… bạn sẽ cư xử thế nào? Đọc các lời khuyên, chọn những điều hợp với bạn, tự chấm điểm rồi xem mình có phải vị khách hoàn hảo không.", en: "A friend has you to stay for a week… how do you behave? Read the tips, choose those that suit you, give yourself the points and check your profile: are you a perfect guest or not?" },
        items: [
          { id: "1", prompt: "Continua a seguire i tuoi ritmi e i tuoi orari! Se è un vero amico, farà quello che dici tu. (punti: 1)", options: ["sì", "no"], answer: 1 },
          { id: "2", prompt: "Non adeguarti alla sua cucina! Preparagli un piatto diverso ogni giorno: lo apprezzerà! (punti: 3)", options: ["sì", "no"], answer: 0 },
          { id: "3", prompt: "Portagli un piccolo regalo quando arrivi a casa sua! (punti: 3)", options: ["sì", "no"], answer: 0 },
          { id: "4", prompt: "Se ci sono dei bambini, non giocarci insieme! Potrebbero urlare e litigare. (punti: 1)", options: ["sì", "no"], answer: 1 },
          { id: "5", prompt: "Non curarti della tua camera! Non metterla a posto: ci penserà il tuo amico. (punti: 1)", options: ["sì", "no"], answer: 1 },
          { id: "6", prompt: "Apparecchia la tavola e sparecchiala a fine pasto. (punti: 3)", options: ["sì", "no"], answer: 0 },
          { id: "7", prompt: "Se ti accorgi che il tuo amico ha un problema, non parlargli: potrebbe offendersi. (punti: 1)", options: ["sì", "no"], answer: 1 },
          { id: "8", prompt: "Se hai rotto il suo vaso cinese preferito, non dirglielo: ne ricomprerà un altro. (punti: 1)", options: ["sì", "no"], answer: 1 },
          { id: "9", prompt: "Offrigli una cena al ristorante: è una buona occasione per stare insieme! (punti: 3)", options: ["sì", "no"], answer: 0 },
          { id: "10", prompt: "Alla fine della settimana salutalo con affetto! (punti: 3)", options: ["sì", "no"], answer: 0 },
        ],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "theory", text: "**Se hai ottenuto dai 5 agli 8 punti:**\nnon sei un ospite perfetto… il tuo amico potrebbe arrabbiarsi per il tuo comportamento e non invitarti mai più. Pensaci bene!" }],
        [{ type: "theory", text: "**Se hai ottenuto più di 8 punti:**\nsei un ospite perfetto! Complimenti! I tuoi amici ti invitano sempre volentieri perché sei gentile ed educato." }],
      ],
    },
  ],
};

export default page;
