import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 95 (Facciamo pratica, bài 13–15). */
const page: BookPage = {
  id: "p095",
  number: 95,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "Facciamo pratica · Regole e comportamenti",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p095-ex13",
        number: "13",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Quali regole devono rispettare i figli a casa? Quali regole voi avete dovuto rispettare quando eravate bambini?", sample: "I figli devono rispettare gli orari e aiutare in casa. Da bambino dovevo tornare a casa prima di cena e fare i compiti subito." },
          { id: "2", prompt: "Quali sono i comportamenti culturalmente scorretti nel vostro paese?", sample: "Nel mio paese è scorretto non salutare gli anziani o parlare a voce alta in pubblico." },
          { id: "3", prompt: "Che cosa, invece, nel vostro paese è particolarmente apprezzato?", sample: "È molto apprezzato rispettare gli anziani e offrire il tè agli ospiti." },
          { id: "4", prompt: "La puntualità è importante per voi?", sample: "Sì, per me è importante: arrivo sempre in orario." },
          { id: "5", prompt: "Se andate a cena a casa di amici come vi comportate?", sample: "Porto un piccolo regalo, assaggio tutto e ringrazio per la cena." },
          { id: "6", prompt: "Le manifestazioni d'affetto fisiche (come abbracciarsi, baciarsi, stringersi) sono appropriate nel vostro paese in luoghi pubblici?", sample: "Non molto: nel mio paese le persone non si baciano in pubblico." },
          { id: "7", prompt: "In quali situazioni vi vestite in maniera formale?", sample: "Mi vesto in modo formale ai matrimoni, ai colloqui di lavoro e alle riunioni importanti." },
          { id: "8", prompt: "Se dovete rifiutare un invito o un cibo che non vi piace, come fate?", sample: "Ringrazio e dico gentilmente che sono già sazio o che ho un altro impegno." },
          { id: "9", prompt: "In quali situazioni usate un linguaggio informale?", sample: "Uso un linguaggio informale con gli amici e con la famiglia." },
          { id: "10", prompt: "Se dovete guidare la macchina nel vostro paese, quali sono le regole fondamentali?", sample: "Bisogna allacciare la cintura, rispettare i limiti di velocità e non usare il telefono." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p095-ex14",
        number: "14",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo le immagini e parliamo.",
        intro: "Che cosa suggerite in queste situazioni?",
        tr: { vi: "Quan sát tranh và nói: bạn sẽ khuyên gì trong những tình huống này?", en: "Look at the pictures and talk: what do you suggest in these situations?" },
        layout: "board",
        items: [
          { id: "1", prompt: "1.", image: "images/u5/p95-1.jpg", sample: "Sciate più piano e state attenti agli altri sulla pista!" },
          { id: "2", prompt: "2.", image: "images/u5/p95-2.jpg", sample: "Signora, si sistemi la gonna e si guardi allo specchio prima di uscire!" },
          { id: "3", prompt: "3.", image: "images/u5/p95-3.jpg", sample: "Non guardare le altre ragazze quando sei con la tua fidanzata!" },
          { id: "4", prompt: "4.", image: "images/u5/p95-4.jpg", sample: "Signore, si alzi e lasci il posto alla signora con il bambino!" },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p095-ex15",
        number: "15",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        tr: { vi: "Cùng viết: kể một kỷ niệm đáng xấu hổ trong đời bạn.", en: "Let's write: tell an embarrassing episode from your life." },
        items: [{ id: "1", prompt: "Raccontate un episodio imbarazzante della vostra vita.", lines: 4, sample: "Una volta, a una cena di lavoro, ho rovesciato un bicchiere di vino rosso sul vestito bianco della moglie del mio direttore. Mi sono scusato mille volte e volevo sparire!" }],
      },
    },
  ],
};

export default page;
