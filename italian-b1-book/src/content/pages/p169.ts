import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 169 (Osserviamo bene, bài 5: il congiuntivo passato). */
const page: BookPage = {
  id: "p169",
  number: 169,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Osserviamo bene · Il congiuntivo passato",
  runningHead: "Osserviamo bene",
  banner: "PENSO CHE SIA PARTITO",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p169-ex5a", number: "5", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il congiuntivo passato", tr: { vi: "Cùng đọc: thức giả định quá khứ.", en: "Let's read: the past subjunctive." }, items: [] },
    },
    { type: "theory", text: "> Credo che molte persone **abbiano visto** il film di Pieraccioni.\n> Mi dispiace che non **abbiate ricevuto** la mia cartolina.\n===\n> Pensiamo che Gianni **sia arrivato** ieri.\n---\ncongiuntivo presente di ***avere*** o ***essere*** + participio passato del verbo" },
    { type: "gridTable", firstCol: true, head: ["", "ASCOLTARE", "LEGGERE", "SALIRE"], rows: [
        ["io", "**abbia ascoltato**", "**abbia letto**", "**sia salito/a**"],
        ["tu", "**abbia ascoltato**", "**abbia letto**", "**sia salito/a**"],
        ["lui / lei / Lei", "**abbia ascoltato**", "**abbia letto**", "**sia salito/a**"],
        ["noi", "**abbiamo ascoltato**", "**abbiamo letto**", "**siamo saliti/e**"],
        ["voi", "**abbiate ascoltato**", "**abbiate letto**", "**siate saliti/e**"],
        ["loro", "**abbiano ascoltato**", "**abbiano letto**", "**siano saliti/e**"],
      ] },
    { type: "gridTable", firstCol: true, head: ["", "AVERE", "ESSERE"], rows: [
        ["io", "**abbia avuto**", "**sia stato/a**"], ["tu", "**abbia avuto**", "**sia stato/a**"], ["lui / lei / Lei", "**abbia avuto**", "**sia stato/a**"],
        ["noi", "**abbiamo avuto**", "**siamo stati/e**"], ["voi", "**abbiate avuto**", "**siate stati/e**"], ["loro", "**abbiano avuto**", "**siano stati/e**"],
      ] },
    {
      type: "exercise",
      ex: {
        id: "p169-ex5b",
        label: "B",
        icons: ["write"],
        kind: "fill",
        skill: "grammar",
        instruction: "Scriviamo: completiamo le frasi con i verbi al congiuntivo passato.",
        example: { q: "1. Pare che Alberto (*trasferirsi*) …… a Verona la settimana scorsa.", a: "Pare che Alberto ***si sia trasferito*** a Verona la settimana scorsa." },
        tr: { vi: "Cùng viết: hoàn thành câu với động từ ở thức giả định quá khứ.", en: "Let's write: complete the sentences with the verbs in the past subjunctive." },
        items: [
          { id: "2", prompt: "2. Abbiamo paura che non (*loro, superare*) ___ l'esame.", answers: ["abbiano superato"] },
          { id: "3", prompt: "3. Non credo che quel film (*essere*) ___ bello.", answers: ["sia stato"] },
          { id: "4", prompt: "4. Siamo molto contenti che (*voi, scrivere*) ___ a Giorgio.", answers: ["abbiate scritto"] },
          { id: "5", prompt: "5. Mi sembra che Federica (*dire*) ___ la verità.", answers: ["abbia detto"] },
          { id: "6", prompt: "6. Non so che cosa (*succedere*) ___ ieri in città.", answers: ["sia successo"] },
          { id: "7", prompt: "7. È impossibile che Domenico e Guido (*andare*) ___ via: hanno detto che volevano restare con noi altri due giorni.", answers: ["siano andati"] },
          { id: "8", prompt: "8. Pensate che Sandro (*riuscire*) ___ a fare quel lavoro?", answers: ["sia riuscito"] },
        ],
      },
    },
  ],
};

export default page;
