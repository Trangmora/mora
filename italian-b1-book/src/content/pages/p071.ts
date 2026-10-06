import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 71 (Osserviamo bene, bài 9A: ne). */
const page: BookPage = {
  id: "p071",
  number: 71,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Osserviamo bene · Ne",
  runningHead: "Osserviamo bene",
  banner: "NE",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p071-ex9a", number: "9", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    {
      type: "theory",
      text: `
- **Ne** = una quantità, una parte di qualcosa
%% • Vuoi del vino? || ○ Sì grazie, **ne** voglio un bicchiere.
%% • Quanti caffè bevi al giorno? || ○ **Ne** bevo due.
! ATTENZIONE!
- ci + **ne** = ce **ne**
%% • Quanto zucchero metti nel caffè? || ○ Ce **ne** metto due cucchiaini.
! ATTENZIONE!
%% • Quante bottiglie di acqua minerale hai comprato? || ○ **Ne** ho comprat**e** sei.
- **Ne** = di lui, di lei, di loro
%% • Sai qualcosa di Vincenzo? || ○ No, non **ne** so niente.
- **Ne** = di questa cosa
> Domani andiamo a mangiare fuori: che **ne** pensi?
===
### Parlare di, discutere di, intendersi di, ricordarsi di, dimenticarsi di, dubitare di, preoccuparsi di, accorgersi di, rendersi conto di, interessarsi di…
%% • Avete parlato della cucina toscana? || ○ Sì, **ne** abbiamo parlato spesso.
%% • Hai comprato il pane? || ○ No, me **ne** sono dimenticato.
### Essere contento di, essere felice di, essere soddisfatto di, essere orgoglioso di…
%% • So che hai superato l'esame con un buon voto. || ○ Sì, **ne** sono molto soddisfatto!
### Avere paura di, avere voglia di, avere nostalgia di, avere bisogno di…
%% • Hai bisogno di un po' d'acqua? || ○ Sì, grazie, **ne** ho proprio bisogno.
%% • Siete usciti ieri sera? || ○ No, perché non **ne** avevamo voglia.
! ATTENZIONE!
- andar**sene** = andare
> Sono stanco: **me ne vado** a casa.
- star**sene** = stare
> Federica **se ne sta** sempre in casa: non esce mai.
- uscir**sene** = dire all'improvviso, in modo inaspettato
> Ieri sera Amedeo **se ne è uscito** con un discorso strano.
`.trim(),
    },
  ],
};

export default page;
