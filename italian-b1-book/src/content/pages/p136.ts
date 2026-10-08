import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 136 (Facciamo pratica, bài 11B: la storia della Traviata). */
const page: BookPage = {
  id: "p136",
  number: 136,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Facciamo pratica · La storia della Traviata",
  runningHead: "Facciamo pratica",
  blocks: [
    {
      type: "text",
      title: "Introduzione",
      it: "Giuseppe Verdi, con La Traviata, mette in scena la storia vera di una donna, Violetta. Alla sua prima rappresentazione a Venezia, il 6 marzo 1853, La Traviata è un fallimento: al pubblico non piace questo argomento; inoltre, gli interpreti non sono particolarmente bravi. Nelle successive rappresentazioni, però, il pubblico accoglie La Traviata molto bene. Quest'opera diventerà uno dei drammi in musica più famosi di tutto il mondo.",
    },
    { type: "text", title: "Atto I", it: "La Traviata parla di una stupenda storia d'amore. Nella casa di Parigi di Violetta Valéry, una prostituta, c'è una splendida festa: stanno arrivando ormai gli ultimi ospiti e, tra loro, c'è Alfredo Germont che ama segretamente Violetta. Durante il ricevimento Alfredo fa un brindisi e canta la bellezza dell'amore (“Libiam ne' lieti calici”). Violetta risponde che nel suo cuore non c'è posto per un vero amore e che tutto quello che può dargli è soltanto amicizia (“Solo amistade io v'offro”)." },
    { type: "text", title: "Atto II", it: "Violetta si innamora di Alfredo e da tre mesi vive felicemente con lui in una casa di campagna vicino a Parigi. Ma Alfredo ha delle difficoltà economiche e Violetta deve vendere tutto quello che ha per pagare i debiti di Alfredo. Il giovane se ne vergogna e decide di partire per Parigi per cercare una soluzione. Non appena Alfredo lascia la casa di campagna, arriva suo padre Giorgio Germont. In una violenta discussione con Violetta, Germont le chiede di lasciare per sempre Alfredo (“Ed a tai sensi un sacrifizio chieggo”). Violetta non vuole perdere il suo primo grande amore (“Non sapete quale affetto, vivo, immenso, m'arda in petto?”) e rivela a Germont di essere ammalata (“Non sapete che colpita d'altro morbo è la mia vita?”). Germont, alla fine, la convince a lasciare Alfredo: Violetta, tra le lacrime, scappa a Parigi. Alfredo si dispera e parte anche lui per Parigi. I due si incontrano a una festa, dove Violetta arriva con il barone Douphol. Alfredo le chiede spiegazioni: lei dice che lo ha lasciato perché ama il barone Douphol. Alfredo è pieno di rabbia e di gelosia: davanti a tutti gli invitati, allora, le butta in faccia i soldi che aveva vinto al gioco. Violetta, a quel punto, cade tra le braccia di un'amica." },
    { type: "text", title: "Atto III", it: "Da alcune settimane la malattia di Violetta è peggiorata: le rimangono poche ore di vita. Violetta spera di rivedere ancora una volta Alfredo prima di morire. Alla fine Alfredo capisce la situazione e corre ad abbracciare Violetta. Dopo la prima gioia dell'incontro, Alfredo vede che la donna sta male: dopo poco Violetta muore tra le sue braccia." },
    {
      type: "exercise",
      ex: {
        id: "p136-ex11b",
        label: "B",
        icons: ["read", "check"],
        kind: "choice",
        skill: "reading",
        variant: "twoCol",
        instruction: "Leggiamo e scegliamo la risposta giusta.",
        tr: { vi: "Đọc và chọn câu trả lời đúng.", en: "Let's read and choose the right answer." },
        items: [
          { id: "1", prompt: "La prima rappresentazione della Traviata è un fallimento perché:", options: ["non è una storia vera.", "al pubblico non piace l'argomento.", "perché era simile ad altri melodrammi."], answer: 1 },
          { id: "2", prompt: "Violetta rifiuta l'amore di Alfredo perché:", options: ["nel suo cuore non c'è posto per l'amore vero.", "è innamorata di un'altra persona.", "non le piace Alfredo."], answer: 0 },
          { id: "3", prompt: "Alfredo va a Parigi:", options: ["perché è stanco di Violetta.", "perché è innamorato di un'altra donna.", "per cercare soldi."], answer: 2 },
          { id: "4", prompt: "Il padre di Alfredo chiede a Violetta di:", options: ["sposare il figlio.", "di lasciare il figlio.", "di dare dei soldi al figlio."], answer: 1 },
          { id: "5", prompt: "Violetta confessa al padre di Alfredo:", options: ["di essere ammalata.", "di non amare Alfredo.", "di amare un altro uomo."], answer: 0 },
          { id: "6", prompt: "Alfredo torna da Violetta e:", options: ["i due si sposano.", "i due vanno a vivere insieme.", "la trova in punto di morte."], answer: 2 },
        ],
      },
    },
  ],
};

export default page;
