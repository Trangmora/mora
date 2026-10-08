import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 163 (Verifica). */
const page: BookPage = {
  id: "p163",
  number: 163,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  title: "Verifica",
  addedOn: "2026-10-08",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U8", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p163-ex1",
        number: "1",
        kind: "fill",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo le frasi con i verbi al congiuntivo presente.",
        intro: "partecipare • mangiare • leggere • trascorrere • arrivare • guarire • completare • avere • essere • finire",
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thức giả định hiện tại.", en: "Let's write: complete the sentences with the verbs in the present subjunctive." },
        items: [
          { id: "1", prompt: "1. Abbiamo paura che loro non ___ in tempo il lavoro.", answers: ["finiscano|completino"] },
          { id: "2", prompt: "2. Non sono sicuri che Marco ___ alla conferenza.", answers: ["partecipi"] },
          { id: "3", prompt: "3. Spero che i miei amici ___ quella notizia sul giornale.", answers: ["leggano"] },
          { id: "4", prompt: "4. Bisogna che il treno non ___ in ritardo.", answers: ["arrivi"] },
          { id: "5", prompt: "5. Credo che ___ già tardi per telefonare a Roberto.", answers: ["sia"] },
          { id: "6", prompt: "6. Mia madre si augura che io ___ i miei studi prima possibile.", answers: ["completi|finisca"] },
          { id: "7", prompt: "7. Ci dispiace che Pietro ___ l'influenza: speriamo che ___ presto.", answers: ["abbia", "guarisca"] },
          { id: "8", prompt: "8. Per dimagrire bisogna che tu ___ meno.", answers: ["mangi"] },
          { id: "9", prompt: "9. Francesca vuole che sua figlia ___ le vacanze in Inghilterra l'anno prossimo.", answers: ["trascorra"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p163-ex2",
        number: "2",
        kind: "fill",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo le frasi con i verbi al congiuntivo presente.",
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thức giả định hiện tại.", en: "Let's write: complete the sentences with the verbs in the present subjunctive." },
        items: [
          { id: "1", prompt: "1. Desidero che (*voi, venire*) ___ a trovarmi.", answers: ["veniate"] },
          { id: "2", prompt: "2. È probabile che Luigi (*sapere*) ___ questa notizia.", answers: ["sappia"] },
          { id: "3", prompt: "3. Immaginiamo che (*loro, andare*) ___ via presto.", answers: ["vadano"] },
          { id: "4", prompt: "4. È meglio che tu (*dire*) ___ la verità subito.", answers: ["dica"] },
          { id: "5", prompt: "5. Mi sembra che tu (*bere*) ___ troppi caffè.", answers: ["beva"] },
          { id: "6", prompt: "6. Pare che oggi gli studenti (*uscire*) ___ prima da scuola.", answers: ["escano"] },
          { id: "7", prompt: "7. Dubito che Maurizio (*scegliere*) ___ quella macchina.", answers: ["scelga"] },
          { id: "8", prompt: "8. Pensi che (*io, dovere*) ___ lavorare a quelle condizioni?", answers: ["debba"] },
          { id: "9", prompt: "9. Abbiamo paura che non (*loro, potere*) ___ fare quel lavoro.", answers: ["possano"] },
          { id: "10", prompt: "10. Credi che (*loro, fare*) ___ bene questi compiti?", answers: ["facciano"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p163-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "1", lead: "usare il congiuntivo presente dei verbi regolari:", prompt: "1. Credo che voi (*lavorare*) ___ bene in quell'ufficio.", answers: ["lavoriate"] },
          { id: "2", prompt: "2. È probabile che io (*vedere*) ___ Gianni domani.", answers: ["veda"] },
          { id: "3", prompt: "3. Bisogna che tu (*prendere*) ___ in fretta una decisione.", answers: ["prenda"] },
          { id: "4", prompt: "4. È meglio che tu (*telefonare*) ___ al medico.", answers: ["telefoni"] },
          { id: "5", lead: "usare il congiuntivo presente dei verbi irregolari:", prompt: "1. Immagino che (*tu, andare*) ___ in vacanza a giugno.", answers: ["vada"] },
          { id: "6", prompt: "2. Ho paura che (*essere*) ___ tardi.", answers: ["sia"] },
          { id: "7", prompt: "3. Siamo felici che (*voi, venire*) ___ a trovarci.", answers: ["veniate"] },
          { id: "8", prompt: "4. Sembra che domani (*dovere*) ___ piovere.", answers: ["debba"] },
        ],
      },
    },
  ],
};

export default page;
