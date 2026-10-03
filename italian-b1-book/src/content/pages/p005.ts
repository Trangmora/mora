import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 5 (Osserviamo bene, bài 6–7). */
const page: BookPage = {
  id: "p005",
  number: 5,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Osserviamo bene · Passato prossimo e imperfetto",
  addedOn: "2026-10-03",
  runningHead: "Osserviamo bene",
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p005-ex6",
        number: "6",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi al passato prossimo.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thì passato prossimo.", en: "Let's read and complete the text with verbs in the passato prossimo." },
        parts: [
          {
            boxed: true,
            title: "Sapete perché l'Italia è famosa nel mondo?",
            image: { photo: "Bialetti moka express", alt: "La moka del caffè", side: "right", width: 30 },
            text: [
              "Tutto il mondo conosce la nostra moda, le nostre scarpe, i nostri prodotti di pelle: gli italiani (*diventare*) {{=sono diventati}} famosi, ormai da tempo, grazie all'artigianato. Non sono solo questi, però, i settori economici più importanti: gli italiani (*avere*) {{hanno avuto}} molto successo, negli ultimi anni, anche nella produzione di macchine per la lavorazione dei metalli; molte industrie (*realizzare*) {{hanno realizzato}} elettrodomestici utili e unici (per esempio la moka del caffè). L'Italia (*avere*) {{ha avuto}} anche buoni risultati nel campo scientifico: i nostri astronomi (*progettare*) {{hanno progettato}} nuovi satelliti per studiare i pianeti del sistema solare, i fisici del Centro Nazionale della Ricerca (*fare*) {{hanno fatto}} importanti scoperte e molti medici (*preparare*) {{hanno preparato}} nuove medicine per la cura di alcune malattie. Inoltre, molti ricercatori (*andare*) {{sono andati}} all'estero per migliorare i propri studi e (*collaborare*) {{hanno collaborato}} con i centri internazionali più prestigiosi. E in campo culturale? Nel 1997, per esempio, lo scrittore Dario Fo (*vincere*) {{ha vinto}} il premio Nobel per la letteratura; nel 1999 l'attore Roberto Benigni (*conquistare*) {{ha conquistato}} l'Oscar per il migliore film straniero, *La vita è bella*; l'architetto Renzo Piano (*essere*) {{è stato}} l'ideatore di alcuni edifici moderni molto importanti in Giappone e negli Stati Uniti.",
            ].join("\n"),
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p005-ex7",
        number: "7",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi all'imperfetto.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thì imperfetto.", en: "Let's read and complete the text with verbs in the imperfetto." },
        parts: [
          {
            boxed: true,
            title: "Come eravamo…",
            image: { photo: "Italian emigrants Ellis Island", alt: "Emigranti italiani in attesa della nave", side: "right", width: 42 },
            text: "Nel 1861 è nato lo stato italiano, ma la popolazione (*avere*) {{=aveva}} ancora numerosi problemi da risolvere: (*esserci*) {{c'erano}} tanti analfabeti (circa il 70% della popolazione non sapeva leggere e scrivere), non (*esistere*) {{esistevano}} ancora varie industrie, molta gente (*lavorare*) {{lavorava}} soprattutto nell'agricoltura. Inoltre, circa 100.000 persone all'anno (*emigrare*) {{emigravano}} verso altri paesi, specialmente negli Stati Uniti.",
          },
          {
            image: { photo: "Lingotto Fiat factory Turin", alt: "Lo stabilimento Fiat del Lingotto a Torino", side: "left", width: 30 },
            text: "Verso la fine del secolo l'industria italiana, comunque, (*potere*) {{poteva}} già competere con quella degli altri paesi europei: mentre la famiglia Agnelli (*fondare*) {{fondava}} la Fiat, l'azienda più importante di automobili, (*nascere*) {{nascevano}} anche le industrie per l'elettricità e per la produzione di acciaio. Dopo il dramma delle guerre mondiali la società italiana (*volere*) {{voleva}} cambiare e costruire un mondo nuovo: durante gli anni del \"boom economico\" (1950-'60) (*esserci*) {{c'erano}} maggiori possibilità di lavoro e la gente (*essere*) {{era}} più istruita.",
          },
        ],
      },
    },
  ],
};

export default page;
