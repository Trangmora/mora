import type { BookPage } from "../../types";

/** Unità 2 · Ieri e oggi in famiglia — trang 27 (bài 7: passato prossimo o imperfetto; intervista a Miriam Mafai). */
const page: BookPage = {
  id: "p027",
  number: 27,
  unit: "2",
  unitTitle: "Ieri e oggi in famiglia",
  title: "Osserviamo bene · Passato prossimo o imperfetto?",
  addedOn: "2026-10-06",
  runningHead: " ",
  banner: "IO SONO ANDATO / IO ANDAVO",
  sideTab: { unit: "U2", title: "Ieri e oggi in famiglia" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p027-ex7a",
        number: "7",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        tr: { vi: "Cùng đọc.", en: "Let's read." },
        items: [],
      },
    },
    {
      type: "gridTable",
      head: ["Usiamo il passato prossimo per:", "Usiamo l'imperfetto per:"],
      rows: [
        [
          "- descrivere un'azione finita, non abituale:\nLa scorsa settimana **siamo andati** a teatro.",
          "- descrivere un'azione abituale:\nQuando ero giovane ^^andavo^^ sempre a teatro.",
        ],
        [
          "- descrivere azioni una dopo l'altra:\n**Mi sono alzata, ho fatto** una doccia e poi **mi sono vestita**.",
          "- descrivere azioni contemporanee:\nMentre ^^facevo^^ la doccia, ^^mi lavavo^^ i capelli.",
        ],
        [
          "- descrivere un'azione all'interno di una situazione:\nMentre ^^studiavo^^, mi **ha telefonato** Manuela.\n**Ho acceso** la TV perché ^^volevo^^ ascoltare le notizie.",
          "- descrivere una situazione:\nMentre Carla ^^passeggiava^^ **ha incontrato** Vittoria.",
        ],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p027-ex7b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo l'intervista con i verbi al passato prossimo o all'imperfetto.",
        tr: {
          vi: "Đọc và hoàn thành bài phỏng vấn với động từ ở thì passato prossimo hoặc imperfetto.",
          en: "Let's read and complete the interview with the verbs in the passato prossimo or the imperfetto.",
        },
        heading: "Miriam Mafai",
        source: "(adattato da: www.emsf.rai.it/grillo/trasmissioni)",
        parts: [
          {
            text: "",
            image: { src: "images/u2/p27-mafai.jpg", alt: "Miriam Mafai durante un'intervista", side: "left", width: 26 },
            title: "Risponde alle nostre domande sulla famiglia e sulla condizione della donna nella società italiana.",
          },
          {
            boxed: true,
            columns: 2,
            text: [
              "Secondo Lei com'{{=è cambiata}} la famiglia italiana? E in particolare (*cambiare*) {{è cambiato}} il ruolo del padre?",
              "MAFAI: Sì, (*cambiare*) {{è cambiato}} molto! Vedere oggi un padre che esce con i propri figli è un cambiamento delle abitudini, è un segno di progresso ed è un segno di una maggiore responsabilità dell'uomo. In passato, invece, i padri (*curarsi*) {{si curavano}} poco dei propri figli, almeno fino a una certa età: adesso sono molto più vicini alla famiglia.",
              "Negli anni del miracolo economico, come (*trasformarsi*) {{si è trasformato}} il ruolo della donna all'interno della casa?",
              "MAFAI: La vita delle donne (*modificarsi*) {{si è modificata}} molto. Prima degli anni '50, in molte case non (*esserci*) {{c'era}} il gas e le donne (*cucinare*) {{cucinavano}} con la stufa a legna. Il passaggio al gas (*rappresentare*) {{ha rappresentato|rappresentava}} una delle grandi rivoluzioni di questo paese: la casa (*cominciare*) {{ha cominciato|cominciava}} a essere più pulita e ordinata senza le stufe che (*sporcare*) {{sporcavano}} perché (*produrre*) {{producevano}} fumo e cenere.",
              "Prima non (*esistere*) {{esistevano}} i frigoriferi; dunque, le donne (*fare*) {{facevano}} la spesa tutte le mattine. Questo elettrodomestico (*segnare*) {{ha segnato|segnava}} un passaggio di condizione sociale, poiché, quando (*entrare*) {{è entrato}} nella casa degli italiani, (*essere*) {{è stato|era}} il primo segno della fine di un periodo di miseria. Voglio dire che, con l'introduzione degli elettrodomestici, le donne (*liberarsi*) {{si sono liberate}} da molte fatiche.",
            ].join("\n"),
          },
        ],
      },
    },
  ],
};

export default page;
