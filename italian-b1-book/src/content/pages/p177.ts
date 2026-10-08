import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 177 (Facciamo pratica, bài 13B–15). */
const page: BookPage = {
  id: "p177",
  number: 177,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Facciamo pratica · Moda e interviste",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p177-ex13b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Che cosa pensate della moda italiana?", sample: "Penso che la moda italiana sia elegante e di ottima qualità." },
          { id: "2", prompt: "Qual è la posizione dei prodotti made in Italy nel vostro paese?", sample: "Nel mio paese i prodotti made in Italy sono molto apprezzati, ma costano cari." },
          { id: "3", prompt: "Qual è lo stilista italiano che apprezzate di più?", sample: "Lo stilista che apprezzo di più è Giorgio Armani, per il suo stile semplice e raffinato." },
          { id: "4", prompt: "Per voi, è giusto spendere molti soldi per comprare abiti di importanti stilisti?", sample: "Secondo me non è necessario: preferisco comprare pochi capi di qualità." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p177-ex14",
        number: "14",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        tr: { vi: "Cùng viết.", en: "Let's write." },
        items: [{ id: "1", prompt: "Immaginiamo di intervistare lo stilista Valentino che sta preparando la sua ultima sfilata: scrivete l'intervista.", lines: 6, sample: "– Valentino, come si sente prima di questa sfilata? – Sono emozionato, come sempre. – Che cosa ci presenta quest'anno? – Una collezione elegante, con molto rosso, il mio colore preferito. – A quale donna pensa quando disegna un abito? – A una donna raffinata, che ama sentirsi bella." }],
      },
    },
    { type: "photo", src: "images/u9/p177-valentino.jpg", alt: "Lo stilista Valentino in passerella e alcune modelle con i suoi abiti" },
    {
      type: "exercise",
      ex: {
        id: "p177-ex15",
        number: "15",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [
          { id: "1", prompt: "Leggete un'intervista su un giornale italiano e presentatela alla classe.", sample: "Ho letto un'intervista a… sulla Repubblica. Parla di…" },
          { id: "2", prompt: "Discutete in classe sui seguenti temi (alcuni studenti fanno le domande e altri studenti rispondono: l'insegnante è il moderatore): – uso delle pellicce; – chirurgia estetica; – fumo.", sample: "– Che cosa pensi dell'uso delle pellicce? – Penso che sia crudele uccidere gli animali per la moda." },
          { id: "3", prompt: "Giochiamo insieme! Uno studente immagina di essere un personaggio famoso (nel campo della politica, dello sport, della cultura…) e un altro studente lo intervista.", sample: "– Buongiorno, lei è un campione di calcio: quando ha cominciato a giocare? – A sei anni, nella squadra del mio paese." },
        ],
      },
    },
  ],
};

export default page;
