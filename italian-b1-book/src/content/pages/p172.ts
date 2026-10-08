import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 172 (Osserviamo bene, bài 9: L'economia italiana). */
const page: BookPage = {
  id: "p172",
  number: 172,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Osserviamo bene · L'economia italiana",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p172-ex9a", number: "9", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Usiamo il congiuntivo dopo…", tr: { vi: "Cùng đọc: dùng thức giả định sau…", en: "Let's read: we use the subjunctive after…" }, items: [] },
    },
    { type: "theory", text: "### il più / meno … che\n> Questi libri sono **i più** interessanti **che** io **abbia letto**.\n===\n### più / meno … di quanto\n> È molto **più** giovane **di quanto sembri**.\n===\n### chiunque, comunque, dovunque, qualunque\n> **Qualunque** cosa tu **faccia** ti aiuterò." },
    { type: "audio", src: "audio/u9-p172-ex9b.mp3", title: "9B", autoTranscript: true, transcript: "L'economia italiana.\n• Parliamo con Mario Draghi, che è uno dei più esperti economisti italiani. Allora, come vede oggi l'economia italiana?\n○ La nostra economia gode di ottima salute in alcuni settori, ma in altri è decisamente sofferente, nonostante ci siano stati grossi sforzi per migliorare le condizioni di lavoro e la produzione.\n• Ci dica qualcosa sulle principali aziende italiane.\n○ Il settore delle telecomunicazioni va abbastanza bene, malgrado la concorrenza delle altre società sia forte: dovunque, per esempio, la Telecom abbia stabilito contatti economici, abbiamo avuto spesso risultati positivi. Nel campo automobilistico la FIAT è in buone condizioni di salute, sebbene abbia attraversato in passato un periodo di crisi: negli ultimi anni questa azienda ha fatto alcuni cambiamenti importanti nella produzione di macchine utilitarie. Credo che sia stato fondamentale adeguarsi alla produzione e alle richieste del mercato europeo: chiunque compri oggi una Fiat nuova, si accorgerà dell'alta qualità dei materiali e del design particolare.\n• E altre aziende in crescita?\n○ Direi quelle farmaceutiche e quelle legate al mondo della moda e dei prodotti enogastronomici di qualità. Oggi, in generale, i nostri consumi sono cambiati: andiamo di meno al ristorante ma vogliamo mangiare bene, ci compriamo meno vestiti ma pretendiamo che i tessuti siano migliori, ci ammaliamo e vogliamo che le medicine ci curino in fretta. Gli italiani si concedono dei piccoli lussi qualche volta, benché siano sempre attenti al risparmio e non amino fare spese superflue.\n• E per quanto riguarda l'agricoltura?\n○ In questo settore siamo un po' in difficoltà: penso che, oltre alle condizioni atmosferiche che ovviamente determinano la qualità di molti alimenti, sia importante anche considerare la competizione con i prodotti degli altri paesi europei." },
    {
      type: "exercise",
      ex: {
        id: "p172-ex9b",
        label: "B",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn văn với các từ đúng.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            boxed: true,
            title: "L'economia italiana",
            text: "• Parliamo con Mario Draghi, che è uno dei più esperti economisti italiani. Allora, come vede oggi l'economia italiana?\n○ La nostra economia *gode* di ottima salute in alcuni {{settori}}, ma in altri è decisamente sofferente, {{nonostante}} {{ci}} {{siano}} {{stati}} grossi sforzi per migliorare le condizioni di lavoro e la produzione.\n• Ci {{dica}} qualcosa sulle principali {{aziende}} italiane.\n○ Il settore delle telecomunicazioni va abbastanza bene, {{malgrado}} la {{concorrenza}} delle altre {{società}} {{sia}} forte: {{dovunque}}, per esempio, la Telecom {{abbia}} {{stabilito}} contatti economici, abbiamo avuto spesso risultati positivi. Nel campo automobilistico la FIAT è in buone condizioni di salute, {{sebbene}} {{abbia}} {{attraversato}} in passato un periodo di crisi: negli ultimi anni questa azienda ha fatto alcuni cambiamenti importanti nella produzione di macchine {{utilitarie}}. Credo che {{sia}} {{stato}} fondamentale adeguarsi alla produzione e alle {{richieste}} del mercato europeo: {{chiunque compri|chiunque acquisti}} oggi una Fiat nuova, si accorgerà dell'alta qualità dei {{materiali}} e del design particolare.\n• E altre aziende in {{crescita}}?",
          },
          {
            boxed: true,
            image: { src: "images/u9/p172-fiat.jpg", alt: "Un modellino di carta della FIAT 500 da ritagliare", side: "left", width: 32 },
            text: "○ Direi quelle {{farmaceutiche}} e quelle legate al mondo della moda e dei prodotti {{enogastronomici}} di qualità. Oggi, in generale, i nostri {{consumi}} sono cambiati: andiamo di meno al ristorante ma vogliamo mangiare bene, ci compriamo meno vestiti ma {{pretendiamo}} che i tessuti {{siano}} migliori, ci ammaliamo e vogliamo che le medicine ci {{curino}} in fretta. Gli italiani si concedono dei piccoli {{lussi}} qualche volta, {{benché siano|sebbene siano}} sempre attenti al {{risparmio}} e non {{amino}} fare {{spese}} superflue.\n• E per quanto riguarda l'agricoltura?\n○ In questo settore siamo un po' in difficoltà: penso che, oltre alle condizioni atmosferiche che ovviamente determinano la qualità di molti alimenti, {{sia}} importante anche considerare la {{competizione|concorrenza}} con i prodotti degli altri paesi europei.",
          },
        ],
      },
    },
  ],
};

export default page;
