import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 102 (Grammatica: imperativo con espressioni di cortesia, prego/pure, scusa/senti). */
const page: BookPage = {
  id: "p102",
  number: 102,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", color: "#ef8a3a" },
  title: "Grammatica · L'imperativo di cortesia",
  runningHead: "Grammatica",
  blocks: [
    {
      type: "theory",
      text: `
…la consonante iniziale quando seguono gli imperativi *da', di', fa', sta'* e *va'*:
> Da' un bacio a me! → **Dammi** un bacio! → **Dammelo!**
> Di' a me il tuo problema! → **Dimmi** il tuo problema! → **Dimmelo!**
> Fa' una vacanza! → **Falla!**
> Sta' qui! → **Stacci!**
> Va' a casa tua! → **Vacci!**
! ATTENZIONE!
Il pronome *gli* e i pronomi combinati *glielo, gliela*, ecc. non raddoppiano la consonante iniziale:
> Di' a lei la verità! → **Dille** la verità! → **Digliela!**
# L'imperativo con le espressioni di cortesia
## Per favore / per piacere
Usiamo spesso l'imperativo con le espressioni di cortesia *per favore, per piacere, per cortesia, ti prego, se non ti dispiace*, ecc. per rendere meno forte il comando:
> **Chiudi** la finestra! / **Per piacere, chiudi** la finestra! / **Chiudi** la finestra, **per piacere**!
> **Accompagnami** a casa! / **Per favore, accompagnami** a casa! / **Accompagnami** a casa, **per favore**!
> **Passami** il sale! / **Per cortesia, passami** il sale! / **Passami** il sale, **per cortesia**!
> **Avverti** mia madre! / **Ti prego, avverti** mia madre! / **Avverti** mia madre, **ti prego**!
> **Stia zitto**! / **La prego, stia zitto**! / **Stia zitto, la prego**!
> **Apri** la porta! / **Se non ti dispiace, apri** la porta! / **Apri** la porta, **se non ti dispiace**!
===
Con espressioni di cortesia come ***ti prego, ti dispiace***, ecc. possiamo usare l'infinito invece dell'imperativo:
> **Ti prego di avvertire** mia madre.
> **La prego di stare** zitto.
> **Ti dispiace chiudere** la finestra?
> **Le dispiacerebbe aprire** la porta?
## Prego / pure
Usiamo anche l'imperativo con le parole ***prego*** (prima o dopo il verbo) e ***pure*** (sempre dopo il verbo):
%% • Posso entrare? || ○ **Prego, entra**! / **Entra, prego**! / **Entra pure**! / **Prego, entra pure**!
%% • Posso sedermi? || ○ **Prego, si accomodi**! / **Si accomodi, prego**! / **Si accomodi pure**! / **Prego, si accomodi pure**!
# Gli imperativi per segnalare qualcosa nel discorso
## Scusa / scusi
Usiamo le forme ***scusa / scusi*** quando facciamo una domanda o quando facciamo qualcosa che può dare disturbo:
> **Scusa**, che ora è?
> **Scusi**, non ho capito, può ripetere?
> **Scusi**, non volevo urtarla!
## Senti / senta, guarda / guardi, vedi / vede
Usiamo le forme ***senti / senta, guarda / guardi, vedi / vede*** per richiamare l'attenzione di una persona:
> **Senti** un po', quella moto è tua?
> **Senta**, vorrei chiederle una cosa.
> **Guardi**, la situazione è molto difficile.
> **Vede**, io non sono d'accordo.
`.trim(),
    },
  ],
};

export default page;
