import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 51 (La situazione: Acquistare libri e riviste per telefono, bài 9). */
const page: BookPage = {
  id: "p051",
  number: 51,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  title: "La situazione · Acquistare libri e riviste per telefono",
  runningHead: "La situazione",
  ribbon: "Acquistare libri e riviste per telefono",
  blocks: [
    {
      type: "audio",
      src: "audio/u3-p51-ex9a.mp3",
      title: "9 A",
      autoTranscript: true,
      transcript:
        "Signor Rossi: Pronto?\nOperatrice: Pronto, buongiorno, siamo della casa editrice il Mulino e la chiamiamo perché vorremmo proporle un abbonamento alla nostra nuova rivista «Spazio italiano». Potrebbe interessarle la nostra proposta?\nSignor Rossi: Sì… mi darebbe alcune informazioni in più?\nOperatrice: Certo, è una rivista bimestrale: tratta di politica, società e cultura. La spediremmo direttamente al suo recapito. Le potremmo intanto inviare una copia omaggio.\nSignor Rossi: Sì, ma quanto costa l'abbonamento per un anno?\nOperatrice: Il costo è di 50 euro. Le possiamo offrire diverse modalità di pagamento: lei potrebbe pagare a rate con il bollettino che trova nella rivista oppure può fare un bonifico dell'intero importo presso il numero di conto corrente che noi le mandiamo.\nSignor Rossi: Sì, va bene, potete inviarmi il numero omaggio. Mi mandereste anche un opuscolo con le vostre pubblicazioni? Sarei interessato ad acquistare un'enciclopedia per i miei ragazzi.\nOperatrice: Certo. Se mi dà i suoi dati, le inviamo tutto al più presto.",
    },
    {
      type: "exercise",
      ex: {
        id: "p051-ex9a",
        number: "9",
        label: "A",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn hội thoại với từ thích hợp.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            image: { src: "images/u3/p51-telefono.jpg", alt: "Un uomo e una donna parlano al telefono", side: "right", width: 40 },
            text: [
              "• Pronto?",
              "○ Pronto, buongiorno, siamo della {{casa}} {{editrice}} il Mulino e la chiamiamo perché {{vorremmo}} {{proporle}} un abbonamento alla nostra nuova rivista «Spazio italiano». {{Potrebbe}} interessarle la nostra proposta?",
              "• Sì… mi {{darebbe}} alcune informazioni in più?",
              "○ Certo, è una rivista {{bimestrale}}: tratta di politica, società e cultura. La {{spediremmo}} direttamente al suo recapito. Le {{potremmo}} intanto inviare una {{copia}} {{omaggio}}.",
              "• Sì, ma quanto costa l'abbonamento per un anno?",
              "○ Il costo è di 50 euro. Le possiamo offrire diverse {{modalità}} di {{pagamento}}: lei potrebbe pagare a {{rate}} con il {{bollettino}} che trova nella rivista oppure può fare un {{bonifico}} dell'intero {{importo}} presso il numero di conto corrente che noi le mandiamo.",
              "• Sì, va bene, potete inviarmi il numero omaggio. Mi {{mandereste}} anche un opuscolo con le vostre {{pubblicazioni}}? Sarei interessato ad acquistare un'{{enciclopedia}} per i miei ragazzi.",
              "○ Certo. Se mi dà i suoi dati, le inviamo tutto al più presto.",
            ].join("\n"),
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p051-ex9b",
        label: "B",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo le immagini e parliamo.",
        intro: "Dopo qualche giorno…",
        tr: { vi: "Quan sát tranh và nói. Vài ngày sau… Bạn sẽ làm gì vào lúc này?", en: "Look at the pictures and talk. A few days later… What would you do at this point?" },
        items: [
          { id: "1", prompt: "Che cosa fareste a questo punto?", sample: "Telefonerei alla casa editrice e direi che non ho ordinato una rivista sugli animali: chiederei di ricevere «Spazio italiano» e l'opuscolo con le pubblicazioni." },
        ],
      },
    },
    { type: "photo", src: "images/u3/p51-fumetto.jpg", alt: "Il postino consegna un pacco; il signore apre il pacco e trova una rivista sugli animali; poi telefona: «Che cosa fareste a questo punto?»" },
    {
      type: "exercise",
      ex: {
        id: "p051-ex9c",
        label: "C",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo (a coppie).",
        intro: "Uno studente immagina di essere un venditore di elettrodomestici e propone i suoi prodotti a un cliente.",
        tr: { vi: "Nói theo cặp: một bạn đóng vai người bán đồ điện gia dụng và giới thiệu sản phẩm cho khách.", en: "Talk in pairs: one student plays a home-appliance salesperson offering products to a customer." },
        items: [
          { id: "1", prompt: "Proponi i tuoi prodotti al cliente.", sample: "Buongiorno, la chiamo perché vorrei proporle la nostra nuova lavatrice: consumerebbe poca acqua e potrebbe pagarla a rate. Le interesserebbe?" },
        ],
      },
    },
  ],
};

export default page;
