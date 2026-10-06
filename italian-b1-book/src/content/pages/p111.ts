import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 111 (Osserviamo bene, bài 7: il futuro per ipotesi; stare per). */
const page: BookPage = {
  id: "p111",
  number: 111,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Osserviamo bene · Il futuro per fare ipotesi",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p111-ex7a", number: "7", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il futuro per… fare ipotesi o previsioni", tr: { vi: "Cùng đọc: thì tương lai để… đưa ra giả định hoặc dự đoán.", en: "Let's read: the future to… make guesses or predictions." }, items: [] },
    },
    { type: "theory", text: "%% • Quanti anni ha Giuseppe? || ○ Mah… **avrà** 30 anni.\n> Domani forse **pioverà**.\n===\n%% • Che ora è? || ○ Non lo so, **saranno** le due." },
    { type: "theory", text: "## Stare per + infinito per… esprimere un'azione futura immediata\n%% • **Sto per uscire**, hai bisogno del pane? || ○ No, grazie, lo comprerò più tardi.\n===\n%% • Perché non telefoni a Pietro? || ○ È inutile, ormai **starà per arrivare**." },
    {
      type: "exercise",
      ex: {
        id: "p111-ex7b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo il testo e trasformiamo i verbi dal presente al futuro.",
        tr: { vi: "Đọc đoạn văn và chuyển động từ từ hiện tại sang tương lai.", en: "Let's read the text and change the verbs from the present to the future." },
        source: "(adattato da www.repubblica.it, economia, febbraio 2006)",
        parts: [
          {
            boxed: true,
            title: "Dove andrà l'economia italiana?",
            image: { src: "images/u6/p111-auto.jpg", alt: "Un'automobile verde", side: "right", width: 34 },
            text: "Negli ultimi anni i progressi dell'economia italiana sono stati molti, ma ancora restano dei problemi. Attualmente i settori più produttivi sono quelli automobilistici e aerospaziali, ma in futuro *dobbiamo* → {{=dovremo}} dedicarci con più attenzione al settore finanziario e al commercio online: l'economia italiana *può* → {{potrà}} essere più stabile se *rispetta* → {{rispetterà}} le nuove richieste del mercato. La rivoluzione più importante, infatti, *è* → {{sarà}} nella rete internet: gli italiani si stanno per abituare, ormai, a comprare alcuni servizi e vari prodotti in questo modo. Fra pochi anni moltissime persone *usano* → {{useranno}} la carta di credito per fare acquisti online: *comprano* → {{compreranno}} strumenti elettronici, musica, libri e *vanno* → {{andranno}} in vacanza con un click del computer. Gli esperti pensano che gli italiani *risparmiano* → {{risparmieranno}} ancora di più per cercare di comprare una casa, ma non *rinunciano* → {{rinunceranno}} ad alcuni beni di lusso e alla tradizionale spesa alimentare di qualità.",
          },
        ],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u6/p111-aereo.jpg", alt: "Un aereo tra le nuvole" }],
        [{ type: "photo", src: "images/u6/p111-euro.jpg", alt: "Banconote in euro" }],
      ],
    },
  ],
};

export default page;
