import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 201 (Grammatica: verbi riflessivi, pronominali, reciproci; si impersonale). */
const page: BookPage = {
  id: "p201",
  number: 201,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", color: "#ef8a3a" },
  title: "Grammatica · Il si impersonale",
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# I verbi riflessivi
Con i verbi riflessivi:
- il soggetto e l'oggetto sono la stessa persona:
> Io **mi lavo**. = Io lavo me.
> Tu **ti vesti**. = Tu vesti te.
> Gino **si è pettinato**. = Gino ha pettinato Gino.
- il soggetto e il complemento indiretto sono la stessa persona:
> Io **mi metto** la giacca. = Io metto la giacca a me.
> Gianni **si è lavato** i denti. = Gianni ha lavato i denti di Gianni.
# I verbi pronominali
I verbi pronominali hanno le particelle *mi, ti, si, ci, vi*, ma non hanno il significato di un verbo riflessivo:
> Io **mi vergogno**. = SÌ: Io provo vergogna. = NO: Io vergogno me.
> Il bambino **si è addormentato**. = SÌ: Il bambino ha cominciato a dormire. = NO: Il bambino ha addormentato il bambino.
> Mario **si è svegliato**. = SÌ: Mario ha smesso di dormire. = NO: Mario ha svegliato Mario.
# I verbi riflessivi reciproci
Con i verbi riflessivi reciproci i soggetti sono due (o più) e ognuno dei due soggetti ha l'altro come oggetto dell'azione:
> Mauro e Laura **si amano**. = Mauro ama Laura e Laura ama Mauro.
> Carlo e Giulia **si baciano**. = Carlo bacia Giulia e Giulia bacia Carlo.
> Piero e Lucia non **si sono salutati**. = Piero non ha salutato Lucia e Lucia non ha salutato Piero.
===
# Il pronome si impersonale
Nella frase con il *si* impersonale non c'è un soggetto determinato. Il pronome *si* impersonale precede un verbo di terza persona singolare:
> In questa trattoria **si mangia** bene. = In questa trattoria uno mangia bene / la gente mangia bene.
> In montagna **si va** a sciare. = In montagna uno va a sciare / la gente va a sciare.
Il *si* impersonale + un verbo alla terza persona singolare può anche sostituire una prima persona plurale:
> Questa sera **si va** al cinema. = Questa sera noi andiamo al cinema.
Spesso usiamo il *si* impersonale per esprimere un ordine o un divieto:
> Qui non **si fuma**. = Qui non si può fumare / non si deve fumare.
# Il si impersonale con i verbi al passato
Con i verbi al passato preceduti dal *si* impersonale usiamo l'ausiliare *essere*:
> In questa trattoria **si è mangiato** sempre bene. = In questa trattoria noi abbiamo mangiato sempre bene.
Usiamo il participio passato al plurale solo con i verbi che al passato hanno l'ausiliare *essere*:
> L'anno scorso a Natale **si è andati** in montagna a sciare. = L'anno scorso a Natale noi siamo andati in montagna a sciare.
# Il si impersonale con i verbi riflessivi, pronominali e reciproci
Questi verbi hanno già la particella *si*. Per la forma impersonale usiamo allora *ci*:
> Al mattino **ci si lava**.
> **Ci si sveglia** presto il lunedì.
> **Ci si incontra** la sera al bar.
`,
    },
  ],
};

export default page;
