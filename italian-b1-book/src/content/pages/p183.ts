import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 183 (Verifica). */
const page: BookPage = {
  id: "p183",
  number: 183,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  title: "Verifica",
  addedOn: "2026-10-08",
  runningHead: "Verifica",
  tint: "blue",
  sideTab: { unit: "U9", color: "#2e8cc9" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p183-ex1",
        number: "1",
        kind: "write",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: riordiniamo le parole e formiamo le frasi.",
        example: { q: "so / quella / già / abbia / non / ragazza / fatto / se / viaggio / questo.", a: "***Non so se quella ragazza abbia già fatto questo viaggio.***" },
        tr: { vi: "Cùng viết: sắp xếp lại các từ để tạo thành câu.", en: "Let's write: put the words in order and make sentences." },
        items: [
          { id: "1", prompt: "1. molti / siano / benissimo / nonostante / passati / me / ricordo / anni / la", lines: 1, sample: "Nonostante siano passati molti anni, me la ricordo benissimo." },
          { id: "2", prompt: "2. crediamo / quella / migliore / sia / non / che / soluzione / la", lines: 1, sample: "Non crediamo che quella sia la soluzione migliore." },
          { id: "3", prompt: "3. già / Giulio / pensi / arrivato / ? / che / sia", lines: 1, sample: "Pensi che Giulio sia già arrivato?" },
          { id: "4", prompt: "4. meglio / venuti / voi / è / anche / che / siate", lines: 1, sample: "È meglio che siate venuti anche voi." },
          { id: "5", prompt: "5. meno / di / sono / macchine / costose / possiate / queste / quanto / immaginare", lines: 1, sample: "Queste macchine sono meno costose di quanto possiate immaginare." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p183-ex2",
        number: "2",
        kind: "fill",
        skill: "grammar",
        points: 10,
        instruction: "Scriviamo: completiamo le frasi con le parole giuste.",
        intro: "qualunque • sebbene • a patto che • perché • basta che • nonostante • prima che • a meno che non • chiunque • senza che • dovunque",
        example: { q: "…… decisione tu prenda, ti aiuterò.", a: "***Qualunque*** decisione tu prenda, ti aiuterò." },
        tr: { vi: "Cùng viết: hoàn thành câu với các từ đúng.", en: "Let's write: complete the sentences with the right words." },
        items: [
          { id: "1", prompt: "1. Partiamo con voi, ___ non viaggiate di sera.", answers: ["a patto che|basta che"] },
          { id: "2", prompt: "2. ___ ci siano state molte difficoltà, abbiamo superato l'esame.", answers: ["Nonostante|Sebbene"] },
          { id: "3", prompt: "3. ___ l'Italia sia un paese mediterraneo, in inverno qualche volta fa molto freddo.", answers: ["Sebbene|Nonostante"] },
          { id: "4", prompt: "4. Porterò i bambini in montagna ___ si divertano con la neve.", answers: ["perché"] },
          { id: "5", prompt: "5. ___ vada, Luisa è molto conosciuta.", answers: ["Dovunque"] },
          { id: "6", prompt: "6. Esci ___ sia troppo tardi!", answers: ["prima che"] },
          { id: "7", prompt: "7. Andiamo in un ristorante italiano, ___ vogliate mangiare qualcosa di esotico.", answers: ["a meno che non"] },
          { id: "8", prompt: "8. Possono aprire un conto in banca, ___ abbiano versato i soldi prima.", answers: ["basta che|a patto che"] },
          { id: "9", prompt: "9. ___ abbia visto quel film ne parla bene.", answers: ["Chiunque"] },
          { id: "10", prompt: "10. Vuoi partire ___ tua sorella lo sappia?", answers: ["senza che"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p183-capace",
        kind: "fill",
        skill: "grammar",
        variant: "capace",
        instruction: "Ora sono capace di…",
        tr: { vi: "Bây giờ tôi có thể…", en: "Now I can…" },
        items: [
          { id: "0", lead: "usare il congiuntivo passato:", prompt: "Credo che Veronica (*uscire*) ___ già ___.", answers: ["sia", "uscita"] },
          { id: "1", lead: "usare alcune espressioni che introducono il congiuntivo:", prompt: "1. Marco, ___ stia male, non si lamenta mai.", answers: ["sebbene|benché|nonostante|malgrado"] },
          { id: "2", prompt: "2. Paolo vuole andare al mare ___ piova.", answers: ["a meno che non|nonostante|sebbene|benché"] },
          { id: "3", prompt: "3. È il momento di agire ___ sia troppo tardi.", answers: ["prima che"] },
          { id: "4", prompt: "4. Il professore rispiega la regola ___ gli studenti capiscano bene.", answers: ["perché|affinché"] },
          { id: "5", prompt: "5. Fai sempre tutto ___ io lo sappia.", answers: ["senza che"] },
          { id: "6", prompt: "6. ___ persona chieda di me, io non ci sono.", answers: ["Qualunque"] },
          { id: "7", prompt: "7. È ___ bel film ___ io abbia mai visto.", answers: ["il più", "che"] },
        ],
      },
    },
  ],
};

export default page;
