import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 36 (Grammatica: verbi transitivi e intransitivi). */
const page: BookPage = {
  id: "p036",
  number: 36,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Grammatica · Verbi transitivi e intransitivi",
  addedOn: "2026-10-06",
  sideTab: { unit: "U2", color: "#ef8a3a" },
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# I verbi transitivi
I verbi transitivi hanno un oggetto diretto e al passato prossimo hanno l'ausiliare ***avere***:
> Due anni fa Anna **ha comprato** una casa in città.
> **Avete capito** la lezione?
> Edoardo **ha chiesto** un'informazione a Umberto.
> Non **hai chiuso** la porta.
> Paolo non **ha detto** la verità.
> Dove **hai messo** le chiavi?
> **Ho offerto** una birra ai miei amici.
> Io **ho perso** l'ombrello.
> **Ho speso** tutti i soldi.
> L'Italia **ha vinto** il campionato mondiale di calcio nel 2006.

# I verbi intransitivi
I verbi intransitivi non hanno un oggetto diretto e al passato prossimo possono avere l'ausiliare ***essere*** o ***avere***:
> Lucia e Stefano **sono tornati** dal viaggio di nozze la settimana scorsa.
> Ieri **ho camminato** molto.

## Alcuni verbi intransitivi con *avere*
> abitare → **Abbiamo abitato** a Milano.
> ballare → **Ho ballato** tutta la sera.
> bussare → Chi **ha bussato** alla porta?
> camminare → **Abbiamo camminato** per tutta la città.
> cenare → **Avete cenato** fuori?
> credere → Chi **ha creduto** alla tua storia?
> dormire → Questa notte **ho dormito** poco.
> lavorare → **Ho lavorato** tutto il giorno.
> nuotare → Ieri **ho nuotato** in piscina.
> parlare → **Hai parlato** con Paolo?
> passeggiare → Maria **ha passeggiato** per Roma.
===
> piangere → **Ho pianto** di gioia.
> pranzare → Oggi **ho pranzato** al ristorante.
> ridere → A teatro **ho riso** tanto.
> rispondere → **Hai risposto** alla sua lettera?
> sbadigliare → **Ho sbadigliato** per la noia.
> scherzare → **Abbiamo scherzato** un po'.
> telefonare → **Ho telefonato** a Pietro.
> viaggiare → **Ho viaggiato** per tutto il mondo.

## Alcuni verbi intransitivi con *essere*
> andare → **Siete andati** al cinema ieri sera?
> arrivare → A che ora **siete arrivati**?
> cadere → Paolo **è caduto**.
> costare → Quanto **è costata** la tua auto?
> crescere → Il bambino **è cresciuto**.
> diventare → Andrea **è diventato** ricco.
> durare → Il film **è durato** due ore.
> entrare → **Siamo entrati** in ufficio alle 9.
> morire → Garibaldi **è morto** a Caprera nel 1882.
> nascere → Patrizia **è nata** a Roma.
> partire → Marco **è partito** per gli Stati Uniti.
> piacere → Mi **è piaciuto** molto lo spettacolo.
> rimanere → Antonio **è rimasto** a casa.
> succedere → Ieri **è successo** un incidente.
> stare → L'estate scorsa **sono stato** a Londra.
> tornare → Ieri sera **siamo tornati** tardi.
> uscire → Rita **è uscita** con Sandro.
> venire → Perché non **sei venuto** con noi?

! ATTENZIONE!
Ci sono verbi intransitivi con l'ausiliare ***essere*** e ***avere***:
> **Sono corso** a casa.
> **Ho corso** per un'ora.
> **Sono vissuto** a Roma.
> **Ho vissuto** per un anno a Parigi.
`.trim(),
    },
  ],
};

export default page;
