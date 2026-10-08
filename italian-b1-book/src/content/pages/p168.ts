import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 168 (Cominciamo, bài 4: il latin lover). */
const page: BookPage = {
  id: "p168",
  number: 168,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Cominciamo · Il latin lover",
  runningHead: "Cominciamo",
  blocks: [
    { type: "photo", src: "images/u9/p168-crepet.jpg", alt: "Lo psichiatra Paolo Crepet parla al microfono" },
    {
      type: "exercise",
      ex: {
        id: "p168-ex4a",
        number: "4",
        label: "A",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo le domande alle risposte.",
        tr: { vi: "Đọc và nối các câu hỏi với câu trả lời.", en: "Let's read and match the questions to the answers." },
        left: [
          { id: "1", text: "Intervistiamo lo psichiatra Paolo Crepet su un fenomeno particolare che riguarda una parte della nostra società: allora, professore, gli uomini italiani sono ancora dei latin lover?" },
          { id: "2", text: "Sono cambiate le tecniche di conquista?" },
          { id: "3", text: "Perché gli uomini latini vogliono essere seducenti?" },
          { id: "4", text: "E le donne che cosa pensano?" },
          { id: "5", text: "Che peso ha l'educazione familiare nella figura di un latin lover?" },
          { id: "6", text: "Un'ultima domanda: che cosa hanno in comune i “mammoni” e i latin lover?" },
        ],
        right: [
          { id: "a", text: "Perché hanno bisogno di sentirsi unici, vogliono che la donna li accetti sempre: questo comportamento nasconde spesso un senso di insicurezza." },
          { id: "b", text: "Grandissimo: specialmente al Sud ci sono ancora tante famiglie che considerano i figli maschi più importanti delle femmine. È per questo che molte ragazze, appena ci riescono, si allontanano dalle loro famiglie per avere una vita più indipendente e più libera." },
          { id: "c", text: "In generale no: i maschi italiani credono che per sedurre una donna ci vogliano ancora l'ironia e la complicità." },
          { id: "d", text: "Oggi le donne sono più aperte, si sposano, ma non vogliono rinunciare alla carriera: certamente vogliono sentirsi ammirate e quindi accettano il corteggiamento di un latin lover, ma pretendono anche che l'uomo le aiuti nella vita quotidiana e che sia un loro complice." },
          { id: "e", text: "Molte cose: un'indagine di poco tempo fa mostra che più del 54% dei giovani fino a 30 anni vive con mamma e papà. Molti latin lover sostengono che la loro mamma cucini meglio di tutte le donne che hanno conosciuto e pensano anche che sia l'unica che li capisca…" },
          { id: "f", text: "Beh, penso che il latin lover del passato, che abbiamo visto in molti film italiani e stranieri, sia un po' cambiato, ma mi sembra che ci sia ancora la disposizione degli uomini italiani a “conquistare” comunque le donne: credo che questo atteggiamento sia sempre esistito nella nostra cultura. Vi ricordate le passeggiate sul lungomare, nella Riviera romagnola, di molti giovani italiani che negli anni '50-'60 cercavano la straniera da conquistare? Non è cambiato molto da quel periodo…" },
        ],
        given: { "1": "f" },
        answer: { "1": "f", "2": "c", "3": "a", "4": "d", "5": "b", "6": "e" },
      },
    },
    { type: "photo", src: "images/u9/p168-spiaggia.jpg", alt: "Due ragazzi e due ragazze ballano sulla spiaggia" },
    {
      type: "exercise",
      ex: {
        id: "p168-ex4b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [
          { id: "1", prompt: "Che cosa pensate della figura del latin lover?", sample: "Penso che il latin lover sia un po' un luogo comune, ma credo che gli italiani siano davvero molto galanti." },
          { id: "2", prompt: "Nel vostro paese esiste questo fenomeno?", sample: "Nel mio paese non esiste proprio, però anche da noi molti giovani vivono con i genitori." },
        ],
      },
    },
  ],
};

export default page;
