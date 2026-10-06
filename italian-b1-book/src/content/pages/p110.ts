import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 110 (Osserviamo bene, bài 6: L'università italiana dei prossimi anni). */
const page: BookPage = {
  id: "p110",
  number: 110,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Osserviamo bene · L'università dei prossimi anni",
  runningHead: "Osserviamo bene",
  banner: "CHE FARAI?",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p110-ex6a", number: "6", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    { type: "theory", text: "! ATTENZIONE!\n> La prossima settimana **faremo** un viaggio in alcune città d'arte italiane.\n> Gianluca l'anno prossimo **vivrà** a Milano.\n^^ Per le forme irregolari dei verbi, consultate la GRAMMATICA." },
    {
      type: "exercise",
      ex: {
        id: "p110-ex6b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo l'intervista e correggiamo i verbi.",
        tr: { vi: "Đọc bài phỏng vấn và sửa các động từ viết sai.", en: "Let's read the interview and correct the verbs." },
        parts: [
          {
            boxed: true,
            title: "L'università italiana dei prossimi anni",
            text: "• Salve, oggi abbiamo con noi Nicola Cacace, ingegnere economista, che ci *parlererà* → {{=parlerà}} dell'università italiana. Allora, quanti studenti ci *sarano* → {{saranno}} nei prossimi anni nei nostri atenei?\n○ Bene… Oggi in Italia gli studenti universitari sono ormai quasi 2 milioni, ma noi prevediamo che *arriverranno* → {{arriveranno}} a circa 2 milioni e mezzo nei prossimi cinque anni. L'anno prossimo *entrerranno* → {{entreranno}} circa 350.000 matricole e *uscireranno* → {{usciranno}} 270.000 dottori. Purtroppo non è un numero molto elevato: gli altri paesi europei *avvranno* → {{avranno}} in media 400.000 nuovi dottori nel 2007.\n• Come mai nel nostro paese abbiamo meno studenti?\n○ Penso che *doveremo* → {{dovremo}} cambiare rapidamente molte cose nelle nostre università: per esempio, *pottremo* → {{potremo}} dare più importanza alla ricerca e alla mobilità degli studenti. Lo studio all'estero *aprirrà* → {{aprirà}} nuove frontiere di conoscenza e di scambio culturale.\n• Quindi, uno studente che *voglierà* → {{vorrà}} iscriversi l'anno prossimo all'università, che cosa potrebbe fare?\n○ Gli consiglio senz'altro di frequentare le facoltà di economia, di statistica, di matematica: la nostra società non *poterà* → {{potrà}} fare a meno di informatici, di professionisti di e-commerce, di statistici e di esperti dell'ambiente.\n• E chi *studierrà* → {{studierà}} nelle facoltà umanistiche?\n○ Questa è una domanda interessante. I nostri studenti *saprano* → {{sapranno}} stare al passo con i tempi se si *specializzerano* → {{specializzeranno}} e se *imparerranno* → {{impareranno}} almeno due lingue straniere: per loro il lavoro *diventererà* → {{diventerà}} sempre più internazionale. *Nascerranno* → {{Nasceranno}} laboratori di ricerca comuni, fra vari paesi, che *producerranno* → {{produrranno}} ricerche avanzate nel campo letterario.\n• Un'ultima domanda: gli studenti italiani ci *metterrano* → {{metteranno}} ancora tanto a finire i loro corsi?\n○ Speriamo di no: oggi in Italia gli studenti finiscono l'università a 26-27 anni, ma in futuro, con la riforma universitaria che abbiamo istituito alcuni anni fa, *prendranno* → {{prenderanno}} la laurea in tempo e *anderanno* → {{andranno}} a lavorare, come gli altri studenti europei, molto prima.",
          },
        ],
      },
    },
  ],
};

export default page;
