import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 151 (Osserviamo bene, bài 9: l'uso del congiuntivo). */
const page: BookPage = {
  id: "p151",
  number: 151,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "Osserviamo bene · Diventare giornalisti",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p151-ex9a", number: "9", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    { type: "theory", text: "### Il congiuntivo per… esprimere un'opinione\n(pensare, credere, ritenere, supporre, avere l'impressione, immaginare…)\n> **Riteniamo** che il Corriere della Sera **sia** un giornale molto autorevole.\n### Il congiuntivo dopo è + aggettivo / avverbio\n(è meglio che, è probabile che, è importante che, è giusto che, è bene che…)\n> **È meglio** che lui **rimanga** a casa perché non sta molto bene.\n### Il congiuntivo dopo i verbi impersonali\n(bisogna, conviene, occorre, può darsi, sembra…)\n> **Può darsi** che tu **abbia** ragione, ma secondo me stai sbagliando." },
    {
      type: "exercise",
      ex: {
        id: "p151-ex9b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi al congiuntivo.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thức giả định.", en: "Let's read and complete the text with the verbs in the subjunctive." },
        parts: [
          {
            boxed: true,
            title: "Che cosa devono fare i giovani per diventare giornalisti?",
            image: { src: "images/u8/p151-testate.jpg", alt: "Le testate di alcuni quotidiani italiani su una pagina web", side: "right", width: 32 },
            text: "Ce lo dice Luigi Saitta, una delle firme più autorevoli della stampa italiana: “Molti ragazzi credono che (*essere*) {{=sia}} sufficiente scrivere bene per fare questo mestiere, ma non è così. Bisogna che (*loro, imparare*) {{imparino}}, per esempio, a saper riconoscere una notizia, e soprattutto è importante che la (*sapere*) {{sappiano}} comunicare al lettore. Chi vuole fare questa professione non deve solo raccontare, ma deve favorire la comprensione della realtà. Un giornalista deve cercare di essere obiettivo: quindi è bene che (*raccontare*) {{racconti}} il fatto nel modo più immediato possibile, senza dire il suo pensiero. Per diventare professionisti è necessario, poi, che i giovani (*fare*) {{facciano}} pratica giornalistica per almeno diciotto mesi in una testata regolare. Ovviamente occorre che il direttore di questo giornale (*essere*) {{sia}} un giornalista professionista. Alla fine di questo periodo bisogna che (*loro, sostenere*) {{sostengano}} un esame per iscriversi all'albo dei professionisti.",
          },
          {
            boxed: true,
            image: { src: "images/u8/p151-studenti.jpg", alt: "Tre giovani studiano insieme", side: "left", width: 45 },
            text: "Vorrei anche fare una raccomandazione: è bene che i giovani che si avvicinano a questa attività professionale (*rivolgersi*) {{si rivolgano}} a testate giornalistiche serie e che (*chiedere*) {{chiedano}} sempre informazioni aggiornate all'Ordine dei Giornalisti. Questo mestiere è molto affascinante, ma ogni giorno può rivelare nuove sorprese; perciò è importante che i giovani giornalisti (*avere*) {{abbiano}} molta costanza e molta umiltà”.",
          },
        ],
      },
    },
  ],
};

export default page;
