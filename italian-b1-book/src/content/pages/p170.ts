import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 170 (Osserviamo bene, bài 6: Donne al potere). */
const page: BookPage = {
  id: "p170",
  number: 170,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Osserviamo bene · Donne al potere",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p170-ex6a", number: "6", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Usiamo il congiuntivo dopo…", tr: { vi: "Cùng đọc: dùng thức giả định sau…", en: "Let's read: we use the subjunctive after…" }, items: [] },
    },
    { type: "theory", text: "- **prima che** | Devo andare in farmacia **prima che chiuda**.\n- **nonostante, benché, sebbene, malgrado** | **Nonostante abbia finito** l'università da due anni, Marco non ha trovato ancora lavoro.\n- **purché, a patto che, a condizione che, basta che** | Usciamo con voi **purché** non **facciate** troppo tardi." },
    {
      type: "exercise",
      ex: {
        id: "p170-ex6b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi al congiuntivo presente e passato.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thức giả định hiện tại và quá khứ.", en: "Let's read and complete the text with the verbs in the present and past subjunctive." },
        parts: [
          {
            boxed: true,
            title: "Donne al potere",
            image: { src: "images/u9/p170-gruber.jpg", alt: "Lilli Gruber davanti a un manifesto elettorale", side: "right", width: 30 },
            text: "Abbiamo intervistato Lilli Gruber, giornalista e parlamentare europea, sulla partecipazione delle donne italiane alla politica. Leggiamo le sue dichiarazioni:\n“Lavoro al Parlamento Europeo da alcuni anni: penso di essere una delle poche donne italiane a occupare una posizione importante. Infatti in questa Istituzione le italiane presenti sono solo il 10%, mentre per esempio la percentuale delle donne tedesche è maggiore (circa il 38%). Ritengo quindi che (*essere*) {{=sia}} fondamentale rafforzare la nostra partecipazione.\nPer ottenere questo risultato è essenziale che anche il governo italiano ci (*aiutare*) {{aiuti}}. Credo che il nostro governo, nel passato, non (*lavorare*) {{abbia lavorato}} bene per favorire una presenza più forte delle donne in tutti i settori della società: la mia opinione è che nel parlamento italiano, purtroppo,",
          },
          {
            boxed: true,
            image: { src: "images/u9/p170-parlamento.jpg", alt: "L'aula del Parlamento Europeo", side: "left", width: 55 },
            text: "la percentuale di donne (*essere*) {{sia}} ancora molto bassa (circa l'11%), nonostante (*esserci*) {{ci siano stati}} dei tentativi per aumentarla. Oggi ogni partito, prima che (*esserci*) {{ci siano}} le elezioni nazionali, decide il numero di donne da inserire nelle proprie liste elettorali: mi auguro che i partiti (*decidere*) {{abbiano deciso}} di dare uno spazio maggiore alle donne, sebbene in passato questa scelta non (*avere*) {{abbia avuto}} molto successo.”",
          },
        ],
      },
    },
  ],
};

export default page;
