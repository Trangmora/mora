import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 160 (Grammatica: il congiuntivo, il congiuntivo presente). */
const page: BookPage = {
  id: "p160",
  number: 160,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", color: "#ef8a3a" },
  title: "Grammatica · Il congiuntivo",
  blocks: [
    { type: "sectionTitle", text: "Grammatica" },
    {
      type: "theory",
      text: `
# Il congiuntivo
Usiamo il **modo congiuntivo** nelle frasi che non sono autonome (**frasi dipendenti** o **subordinate**), ma dipendono da un'altra frase (**frase principale** o **reggente**).
Introduciamo il congiuntivo con la congiunzione ***che***:
verbo della frase principale + ***che*** + frase con il verbo al congiuntivo.
## Usiamo il congiuntivo:
- per esprimere un'opinione (nella frase principale il verbo è *avere l'impressione, credere, immaginare, pensare, ritenere, supporre*, ecc.):
> **Credo che** Paolo **sia** a casa.
> **Immagino che** tu **sia** d'accordo con lui.
> **Penso che** tu **abbia** torto.
> **Riteniamo che** il Corriere della Sera **sia** un giornale molto autorevole.
> **Supponiamo che** le cose **stiano** in questo modo.
- per esprimere un sentimento, una speranza, un desiderio, un timore (nella frase principale il verbo è *augurarsi, avere paura, desiderare, dispiacersi, essere felice/contento, sperare, stupirsi, temere, vergognarsi*, ecc.):
> **Mi auguro che** tutto **proceda** bene.
> I bambini **hanno paura che** voi li **sgridiate**.
> Carla **desidera che** Marco **torni** da lei.
> **Mi dispiace che** Giulia non **venga** alla festa.
> **Siamo contenti che** gli studenti **leggano** alcune riviste italiane.
> **Spero che** tu **stia** bene.
> **Mi stupisco che** Gianni **si comporti** così.
> **Temo che** non ci **sia** più il pane.
- per esprimere una volontà, un comando, un divieto, un permesso (nella frase principale il verbo è *ordinare, preferire, pretendere, permettere, vietare, volere*, ecc.):
> **Preferisco che** gli **parliate** voi.
> **Permetti che** **faccia** una telefonata a Luigi?
> Gli italiani **vogliono che** i giornali **dicano** la verità.
===
- per esprimere un dubbio (nella frase principale il verbo è ***dubitare, non essere sicuro***, ecc.):
> **Dubito che** in Italia tutti **leggano** il giornale ogni giorno.
> **Non sono sicuro che** la notizia **sia** attendibile.
- dopo i verbi impersonali (*bisogna, conviene, occorre, può darsi, sembra*, ecc.):
> **Bisogna che** **facciate** in fretta se volete arrivare in orario.
> **Conviene che** tu gli **scriva** una lettera.
> **Occorre che** tu **prenda** subito una decisione.
> **Può darsi che** tu **abbia** ragione, ma secondo me stai sbagliando.
> **Sembra che** domani **ci sia** il sole.
- dopo è + aggettivo / avverbio (*è bene, è difficile, è facile, è giusto, è importante, è meglio, è necessario, è opportuno, è probabile*, ecc.):
> **È bene che** anche voi **siate** presenti alla riunione.
> **È difficile che** il Milan **perda** la partita.
> **È facile che** **vi prendiate** un raffreddore se non vi coprite bene.
> **È meglio che** lui **rimanga** a casa perché non sta molto bene.
> **È necessario che** **vi impegnate** di più.
> **È opportuno che** tu gli **chieda** scusa.
> **È probabile che** fra poco **piova**.
# Il congiuntivo presente
Usiamo il congiuntivo presente in una frase dipendente quando nella frase principale abbiamo un verbo all'indicativo presente. Il congiuntivo presente esprime un'azione contemporanea rispetto a quella della principale:
> **Penso** (adesso) **che** tu **dica** (adesso) la verità.
Con il congiuntivo presente possiamo anche indicare un'azione futura rispetto a quella della frase principale; in questo caso usiamo di solito il congiuntivo con un avverbio o un'espressione temporale come *domani, fra qualche giorno, la settimana prossima*, ecc.:
> **Credo che** Sandro **parta** domani.
> **Spero che** la prossima domenica il tempo **sia** bello.
`,
    },
  ],
};

export default page;
