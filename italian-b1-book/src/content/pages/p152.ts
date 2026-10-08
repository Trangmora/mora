import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 152 (Osserviamo bene, bài 10: Ladri in agguato vicino ai bancomat). */
const page: BookPage = {
  id: "p152",
  number: 152,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "Osserviamo bene · Il congiuntivo per…",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p152-ex10a", number: "10", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il congiuntivo per…", tr: { vi: "Cùng đọc: thức giả định dùng để…", en: "Let's read: the subjunctive to…" }, items: [] },
    },
    { type: "theory", text: "### esprimere un dubbio\n(dubitare, non essere sicuro, …)\n> **Non so** se Paul **sia** inglese o americano.\n> **Dubito** che in Italia tutti **leggano** il giornale ogni giorno.\n### esprimere una volontà\n(volere, preferire, pretendere, ordinare, vietare, permettere…)\n> Gli italiani **vogliono** che i giornali **dicano** la verità.\n### esprimere un sentimento\n(avere paura, desiderare, dispiacersi, essere felice/contento, sperare, stupirsi, temere, vergognarsi…)\n> **Siamo contenti** che i nostri studenti **leggano** alcune riviste italiane." },
    {
      type: "exercise",
      ex: { id: "p152-ex10b", label: "B", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo l'articolo.", tr: { vi: "Đọc bài báo.", en: "Let's read the article." }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 2],
      cols: [
        [{ type: "photo", src: "images/u8/p152-carte.jpg", alt: "Alcune carte di credito una sopra l'altra" }],
        [
          { type: "text", title: "Ladri in agguato vicino ai bancomat delle città italiane", it: "Da un po' di tempo nelle città italiane assistiamo a un fenomeno poco piacevole: quando le persone vanno al bancomat per prelevare il denaro e digitano il codice, alcune microtelecamere nascoste sopra la tastiera del bancomat spiano i loro movimenti; in questo modo i ladri riescono a clonare il codice segreto. I carabinieri pensano che dietro questo fenomeno ci sia una grande organizzazione criminale e credono che sia una situazione difficile da risolvere in poco tempo: raccomandano, quindi, che le persone stiano attente, che guardino bene chi sta davanti a loro prima di avvicinarsi allo sportello del bancomat e che chiamino subito la polizia se notano qualcosa di strano. È importante soprattutto che le persone molto anziane vadano a prelevare i soldi in compagnia di qualcuno." },
          { type: "photo", src: "images/u8/p152-bancomat.jpg", alt: "Un uomo preleva i soldi al bancomat" },
        ],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p152-ex10c",
        label: "C",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Questo fenomeno è presente anche nel vostro paese?", sample: "Sì, purtroppo anche nel mio paese ci sono ladri che clonano le carte al bancomat." },
          { id: "2", prompt: "Secondo voi che cosa possono fare le forze dell'ordine per eliminare questo problema?", sample: "Penso che la polizia debba controllare più spesso i bancomat e che le banche installino sistemi di sicurezza migliori." },
        ],
      },
    },
  ],
};

export default page;
