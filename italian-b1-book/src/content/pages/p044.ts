import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 44 (Cominciamo, bài 4: il tempo libero). */
const page: BookPage = {
  id: "p044",
  number: 44,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  title: "Cominciamo · Il tempo libero",
  runningHead: "Cominciamo",
  banner: "IL TEMPO LIBERO",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  blocks: [
    { type: "photo", src: "images/u3/p44-foto.jpg", alt: "Tako con le cuffie, un tennista, una donna che dipinge, due calciatori" },
    {
      type: "audio",
      src: "audio/u3-p44-ex4.mp3",
      autoTranscript: true,
      transcript: [
        "Ascolto 1 — Tako: Ciao, mi chiamo Tako. Sono giapponese e vivo in Italia da due anni, per motivi di studio. Nel tempo libero mi piace andare al cinema, andare a trovare le mie amiche e seguire lezioni di canto. Farei volentieri un corso d'equitazione, ma purtroppo non ci sono maneggi vicino a casa mia. Mi piace anche leggere, ma soprattutto mi piace ascoltare tanta musica. La mia cantante italiana preferita è Giorgia.",
        "Ascolto 2 — Saverio: Buongiorno, sono Saverio, ho 30 anni e sono avvocato. Abito a Roma, una città molto bella ma caotica. Non ho molto tempo libero, ma la mia passione è il tennis. Da piccolo avrei voluto fare il tennista. Nel fine settimana organizzo delle partite con gli amici e poi tutti insieme andiamo a mangiare fuori.",
        "Ascolto 3 — Linda: Sono Linda, ho 52 anni e lavoro come impiegata in un ufficio postale. Nel tempo libero frequento un corso di ballo, dipingo e adoro cucinare. Non mi piace molto leggere libri, preferisco le riviste di moda e di cucina.",
        "Ascolto 4 — Gino: Ciao, sono Gino. Ho 40 anni, sono di Siena e sono professore di storia all'Università di Ferrara. Durante la giornata insegno, preparo le mie lezioni e seguo i miei studenti. Nel tardo pomeriggio, appena finisco i miei impegni di lavoro, torno a casa, mi cambio e vado a giocare a calcio con i miei amici. Pratico questo sport da molti anni e mi diverto molto con la mia squadra. La domenica vado allo stadio per vedere le partite del campionato e poi vado al cinema insieme agli amici. Siamo appassionati di film d'avventura.",
      ].join("\n"),
    },
    {
      type: "exercise",
      ex: {
        id: "p044-ex4",
        number: "4",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo i testi e completiamo le frasi.",
        tr: { vi: "Nghe các đoạn và hoàn thành câu.", en: "Let's listen to the texts and complete the sentences." },
        items: [
          { id: "1", prompt: "Tako vive in Italia …", lines: 1, sample: "da due anni, per motivi di studio." },
          { id: "2", prompt: "Nel tempo libero Tako …", lines: 1, sample: "va al cinema, va a trovare le sue amiche, segue lezioni di canto e ascolta tanta musica." },
          { id: "3", prompt: "Tako non può frequentare un corso d'equitazione perché …", lines: 1, sample: "non ci sono maneggi vicino a casa sua." },
          { id: "4", prompt: "Saverio è …", lines: 1, sample: "avvocato, ha 30 anni e abita a Roma." },
          { id: "5", prompt: "La sua passione è …", lines: 1, sample: "il tennis." },
          { id: "6", prompt: "Nel fine settimana Saverio …", lines: 1, sample: "organizza delle partite con gli amici e poi vanno tutti insieme a mangiare fuori." },
          { id: "7", prompt: "Linda lavora …", lines: 1, sample: "come impiegata in un ufficio postale." },
          { id: "8", prompt: "Nel tempo libero Linda …", lines: 1, sample: "frequenta un corso di ballo, dipinge e cucina." },
          { id: "9", prompt: "A Linda non piace …", lines: 1, sample: "molto leggere libri: preferisce le riviste di moda e di cucina." },
          { id: "10", prompt: "Gino insegna …", lines: 1, sample: "storia all'Università di Ferrara." },
          { id: "11", prompt: "Dopo il lavoro Gino …", lines: 1, sample: "torna a casa, si cambia e va a giocare a calcio con i suoi amici." },
          { id: "12", prompt: "La domenica Gino …", lines: 1, sample: "va allo stadio a vedere le partite e poi va al cinema con gli amici." },
        ],
      },
    },
  ],
};

export default page;
