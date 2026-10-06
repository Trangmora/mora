import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 104 (Viaggiamo in Italia: gli italiani e il cellulare). */
const page: BookPage = {
  id: "p104",
  number: 104,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  title: "Viaggiamo in Italia · Gli italiani e il cellulare",
  addedOn: "2026-10-07",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p104-ex1a", number: "1", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "In vacanza: gli italiani e il cellulare", tr: { vi: "Cùng đọc: Đi nghỉ: người Ý và điện thoại di động.", en: "Let's read: On holiday: Italians and their mobile phones." }, items: [] },
    },
    {
      type: "columns",
      widths: [5, 1],
      cols: [
        [
          { type: "text", it: "C'è sempre qualcosa che rappresenta gli italiani nel mondo. Tutti ci riconoscono perché, quando viaggiamo, vogliamo avere vicini i nostri oggetti o prodotti preferiti: la brillantina (negli anni '40), la Vespa (negli anni '50), gli spaghetti e la pizza (negli anni '50), l'Alfa Romeo (negli anni '70), i Ray-Ban e le Clarks (negli anni '70), le radio per sentire le partite (negli anni '80), gli occhiali da sole e la videocamera (negli anni '90). L'oggetto del nuovo millennio – non ci sono dubbi – è il telefono cellulare. I nostri viaggi sono impossibili senza telefonino. In Europa siamo ormai “quelli del telefonino”. Se qualcuno vede un signore che parla da solo per strada, tiene la mano destra sull'orecchio e fa gesti strani con la sinistra, non ha dubbi: è un italiano. La sigla GSM, in città come Parigi o Londra, ha per gli italiani un nuovo significato: Gridare Senza Motivo. Negli aeroporti, subito dopo l'atterraggio, iniziano a sentirsi squilli e melodie di tutti i tipi: i passeggeri italiani accendono subito il cellulare e gridano nel telefonino molte informazioni personali, familiari e sentimentali. Quando rientriamo dall'estero, non c'è bisogno di cercare l'uscita del volo per l'Italia: è l'unica dove tutti parlano al cellulare. Cosa dobbiamo dirci? Be', dobbiamo annunciare alla moglie “Guarda che sto arrivando”; dobbiamo spiegare al figlio dove siamo stati; dobbiamo dire ad amici e parenti “Indovina da dove chiamo…”. Gli scandinavi – è vero – possiedono più telefonini di noi in percentuale, ma nessuno è più bravo di noi a mostrarlo, a toccarlo e a farlo vedere. Senza telefonino non ci sarebbe vacanza: a chi potremmo raccontarla?" },
          { type: "tip", it: "(adattato da Beppe Severgnini, Manuale dell'imperfetto viaggiatore, Rizzoli, 2000)", tr: { vi: "Nguồn trích", en: "Source" } },
        ],
        [{ type: "photo", src: "images/u5/p104-libro.jpg", alt: "Il libro Manuale dell'imperfetto viaggiatore di Beppe Severgnini" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p104-ex1b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Secondo voi, perché gli italiani amano tanto il telefonino anche in viaggio?", sample: "Secondo me perché amano stare sempre in contatto con la famiglia e gli amici." },
          { id: "2", prompt: "Avete mai visto gli italiani in vacanza?", sample: "Sì, li ho visti in spiaggia: parlavano sempre al telefono a voce alta." },
          { id: "3", prompt: "Chi è, per voi, un “viaggiatore perfetto”?", sample: "Per me è una persona curiosa, educata, che rispetta la cultura del posto." },
        ],
      },
    },
    {
      type: "exercise",
      ex: { id: "p104-ex2", number: "2", icons: ["look"], kind: "speak", skill: "speaking", instruction: "Osserviamo l'immagine.", subtitle: "Come è educato questo bambino…", tr: { vi: "Quan sát bức tranh: Đứa bé này ngoan làm sao…", en: "Look at the picture: How well-mannered this child is…" }, items: [] },
    },
    { type: "photo", src: "images/u5/p104-bambino.jpg", alt: "Una mamma si scusa con un'amica e il figlio racconta la verità" },
    {
      type: "dialogue",
      lines: [
        { speaker: "Mamma", it: "Mi dispiace, cara Emma, non sono potuta venire ieri, ho avuto una giornataccia: ho bucato la ruota della macchina, sono arrivata a lavoro in ritardo, ero così stanca che ieri sera ho mangiato solo un panino…" },
        { speaker: "Bambino", it: "Ma come, mamma? Non dici alla zia Emma che ieri sera hai fatto una festa per 30 persone? Hai fatto tutte quelle cose buone! Perché non l'hai invitata?" },
      ],
    },
  ],
};

export default page;
