import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 92 (Osserviamo bene, bài 8–10: Lettere a Lina Sotis; Dammelo!). */
const page: BookPage = {
  id: "p092",
  number: 92,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "Osserviamo bene · Lettere a Lina Sotis",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p092-ex8",
        number: "8",
        icons: ["read", "write"],
        kind: "write",
        skill: "writing",
        instruction: "Leggiamo e completiamo i testi.",
        subtitle: "Lettere a Lina Sotis",
        intro: "1. Cara Lina, tra qualche giorno una mia cara amica compirà gli anni e vorrei regalarle dei fiori. Purtroppo non posso spedirglieli a casa il giorno del suo compleanno: quando devo mandarglieli? Grazie per la sua cortese risposta. — Anna, Taranto.\nCara Anna, faccia il regalo prima del compleanno: vada da un fioraio, scelga un bel mazzo di rose bianche e scriva un bel biglietto. Non si preoccupi! La sua amica apprezzerà il suo pensiero anche se in anticipo.",
        tr: { vi: "Đọc và viết thư trả lời (dùng thức mệnh lệnh với Lei).", en: "Let's read and complete the letters (reply using the Lei imperative)." },
        items: [
          { id: "2", prompt: "2. Cara Lina, devo regalare un candelabro. Le candele devo metterle da parte o non è necessario? — Fabiola, Pisa.", starter: "Cara Fabiola,", lines: 3, sample: "Cara Fabiola, metta anche le candele: scelga candele dello stesso colore del candelabro e le incarti insieme. Il regalo sarà subito pronto da usare!" },
          { id: "3", prompt: "3. Cara Lina, è giusto fare il regalo a una coppia di sposi che conosco, anche se loro non mi hanno invitato al pranzo di matrimonio? Grazie per i suoi consigli! — Stefano, Ferrara.", starter: "Caro Stefano,", lines: 3, sample: "Caro Stefano, non si senta obbligato: se vuole, mandi agli sposi un biglietto di auguri o un piccolo pensiero, ma non spenda troppo." },
          { id: "4", prompt: "4. Cara Lina, mi sono innamorato di un'altra donna, ma non ho il coraggio di dirlo a mia moglie: come devo fare? Aiutami! — Michele, disperato… Palermo.", starter: "Caro Michele,", lines: 3, sample: "Caro Michele, sia sincero: parli con sua moglie al più presto e le dica la verità con calma. Non aspetti troppo!" },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p092-ex9", number: "9", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "DAMMELO!", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "theory",
      text: "! ATTENZIONE!\n> Da' un bacio a me! → **Dammelo!**\n> Di' a me il tuo problema! → **Dimmelo!**\n> Fa' una vacanza! → **Falla!**\n> Sta' qui! → **Stacci!**\n> Va' a casa tua! → **Vacci!**\n===\n! ATTENZIONE!\n> Di' a lei la verità! → **Digliela!**\n! ATTENZIONE!\n> Signor Bianchi, mi dia il suo cappotto! → **Me lo dia!**\n> Signora Rossi, mi dia la sua borsa! → **Me la dia!**",
    },
    {
      type: "exercise",
      ex: {
        id: "p092-ex10",
        number: "10",
        icons: ["read", "check"],
        kind: "choice",
        skill: "grammar",
        variant: "twoCol",
        instruction: "Leggiamo e scegliamo la risposta giusta.",
        tr: { vi: "Đọc và chọn câu trả lời đúng.", en: "Let's read and choose the right answer." },
        items: [
          { id: "1", prompt: "Sapete che oggi è il compleanno di Alberto?", options: ["Sì, facciamogli un regalo!", "Sì, gli facciamo un regalo!", "Sì, lo facciamo un regalo!"], answer: 0 },
          { id: "2", prompt: "Posso chiederti un favore?", options: ["Dimi!", "Dimmi!", "Digli!"], answer: 1 },
          { id: "3", prompt: "Non ti sopporto più:", options: ["vattene!", "te ne vai!", "vatene!"], answer: 0 },
          { id: "4", prompt: "Hai le foto della vacanza?", options: ["Fammele vedere!", "Fattele vedere", "Fa mele vedere!"], answer: 0 },
          { id: "5", prompt: "Vuoi una fetta di dolce?", options: ["Sì, dame ne due, grazie!", "Sì, damme ne due, grazie!", "Sì, dammene due, grazie!"], answer: 2 },
          { id: "6", prompt: "Siete stanchi?", options: ["Andatevene!", "Vene andate!", "Andatene!"], answer: 0 },
          { id: "7", prompt: "Mi aspettate?", options: ["Certo, ma sbriga ti!", "Certo, ma sbrigati!", "Certo, ma ti sbrighi!"], answer: 1 },
          { id: "8", prompt: "Posso domandarle una cosa?", options: ["Prego, mi dica!", "Prego, mi dici!", "Prego, mi di'!"], answer: 0 },
          { id: "9", prompt: "Devo darvi le chiavi?", options: ["Daccele!", "Dacele!", "Dacceli!"], answer: 0 },
        ],
      },
    },
  ],
};

export default page;
