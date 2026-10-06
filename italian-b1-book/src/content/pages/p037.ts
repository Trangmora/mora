import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 37 (Grammatica: transitivi e intransitivi, passato prossimo, imperfetto). */
const page: BookPage = {
  id: "p037",
  number: 37,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Grammatica · Passato prossimo e imperfetto",
  addedOn: "2026-10-06",
  runningHead: "Grammatica",
  sideTab: { unit: "U2", color: "#ef8a3a" },
  blocks: [
    {
      type: "theory",
      text: `
# Verbi transitivi e intransitivi
Alcuni verbi possono essere transitivi e intransitivi: *aumentare, cambiare, cominciare, continuare, diminuire, finire, guarire, iniziare, migliorare, passare, salire, scendere, terminare*, ecc.
`.trim(),
    },
    {
      type: "gridTable",
      head: ["Transitivi", "Intransitivi"],
      rows: [
        ["Il direttore mi **ha aumentato** lo stipendio.", "I prezzi **sono aumentati**."],
        ["Io **ho cambiato** lavoro due settimane fa.", "Il tempo **è cambiato**."],
        ["Il professore **ha cominciato** la lezione.", "Il film **è cominciato** alle 8."],
        ["Dopo una breve sosta **abbiamo continuato** il viaggio.", "Lo spettacolo **è continuato**."],
        ["Il governo **ha diminuito** il prezzo della benzina.", "La febbre **è diminuita**."],
        ["I bambini **hanno finito** i compiti.", "La lezione **è finita**."],
        ["Le medicine lo **hanno guarito**.", "Il malato **è guarito**."],
        ["Marco **ha iniziato** la scuola a settembre.", "Le vacanze **sono iniziate** a giugno."],
        ["L'atleta **ha migliorato** il record del mondo.", "La situazione **è migliorata**."],
        ["**Ho passato** un bel fine settimana a Capri.", "Luisa **è passata** da te alle 8."],
        ["**Ho salito** le scale in fretta.", "**Siamo saliti** al quinto piano."],
        ["**Abbiamo sceso** le scale insieme.", "**Siamo scesi** dal treno alla stazione di Verona."],
        ["**Abbiamo terminato** il lavoro.", "La partita **è terminata**."],
      ],
    },
    {
      type: "theory",
      text: `
# Il passato prossimo
Usiamo il passato prossimo per:
- descrivere un'azione passata:
> Sabato sera **sono andato** in discoteca.
- descrivere azioni che avvengono una dopo l'altra nel passato:
> La scorsa settimana **ho comprato** un libro sulla vita di Garibaldi, l'**ho letto** tutto e poi l'**ho prestato** a Gianni.

# L'imperfetto indicativo
Usiamo l'imperfetto per:
- descrivere situazioni, persone, paesaggi, condizioni atmosferiche nel passato:
> Nel bar c'**era** molta gente: le persone **bevevano** e **parlavano**.
> Giulia **aveva** i capelli biondi e gli occhi azzurri.
> La campagna **era** stupenda in primavera.
> In montagna **nevicava** spesso.
===
- descrivere sentimenti, stati d'animo, sensazioni, condizioni fisiche nel passato:
> I tifosi **erano** felici per la vittoria della loro squadra.
> D'inverno Paola **sentiva** sempre freddo.
> Ieri non **stavo** bene: **avevo** mal di stomaco.
- descrivere le abitudini nel passato:
> Da bambini ogni giorno **giocavamo** nel parco.
> Quando **vivevamo** a Roma, **uscivamo** tutte le sere.
- descrivere azioni contemporanee nel passato:
> La mamma **cucinava** e i bambini **giocavano**.
> Mentre la mamma **cucinava**, i bambini **giocavano**.
- fare una richiesta in modo cortese:
> Scusi, **volevo** un'informazione. = Scusi, **vorrei** un'informazione.
> Buongiorno, **volevo** un litro di latte. = Buongiorno, **vorrei** un litro di latte.
`.trim(),
    },
  ],
};

export default page;
