import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 89 (Osserviamo bene, bài 5: l'imperativo). */
const page: BookPage = {
  id: "p089",
  number: 89,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "Osserviamo bene · L'imperativo",
  runningHead: "Osserviamo bene",
  banner: "GUARDA!",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p089-ex5a", number: "5", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "L'imperativo", tr: { vi: "Cùng đọc: thức mệnh lệnh.", en: "Let's read: the imperative." }, items: [] },
    },
    { type: "theory", text: "> Barbara, **compra** il giornale!\n> Signora, **scriva** il suo nome in questo modulo!\n===\n> Stasera **usciamo** tutti insieme!\n> Bambini, **finite** i compiti!" },
    { type: "gridTable", head: ["TU", "LEI", "NOI", "VOI"], rows: [["**guarda**", "**guardi**", "**guardiamo**", "**guardate**"], ["**scrivi**", "**scriva**", "**scriviamo**", "**scrivete**"], ["**senti**", "**senta**", "**sentiamo**", "**sentite**"]] },
    { type: "theory", text: "## L'imperativo negativo\n> **Non buttare** i rifiuti per terra!\n> **Non prenda** il treno! Oggi c'è sciopero…\n===\n> **Non fumiamo**! Fa male alla salute.\n> Bambini, **non aprite** la finestra!" },
    { type: "gridTable", head: ["TU", "LEI", "NOI", "VOI"], rows: [["**non guardare**", "**non guardi**", "**non guardiamo**", "**non guardate**"], ["**non scrivere**", "**non scriva**", "**non scriviamo**", "**non scrivete**"], ["**non sentire**", "**non senta**", "**non sentiamo**", "**non sentite**"]] },
    {
      type: "exercise",
      ex: {
        id: "p089-ex5b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi all'imperativo.",
        intro: "contribuire (noi) • non esagerare (noi) • utilizzare (voi) • non posteggiare (voi) • spegnere (noi) • controllare (voi) • riscoprire (noi) • preferire (voi)",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thức mệnh lệnh.", en: "Let's read and complete the text with the verbs in the imperative." },
        parts: [
          {
            boxed: true,
            title: "Poche regole per vivere in un ambiente più pulito",
            image: { src: "images/u5/p89-lago.jpg", alt: "Un lago di montagna", side: "right", width: 38 },
            text: "{{=Contribuiamo}} tutti a proteggere l'ambiente e la salute delle persone! Ecco qualche accorgimento che costa poco e rende molto.\n• {{Utilizzate}} il meno possibile l'automobile.\n• {{Preferite}} i mezzi di trasporto pubblici.\n• {{Riscopriamo}} il piacere della bicicletta o di una passeggiata.\n• {{Controllate}} il motore diesel: se non è in regola, inquina molto.\n• {{Spegniamo}} il motore per le soste.\n• {{Non posteggiate}} l'auto in seconda fila.\n• {{Non esageriamo}} con il riscaldamento (né con il condizionatore) in casa e in ufficio.",
          },
        ],
      },
    },
    { type: "photo", src: "images/u5/p89-traffico.jpg", alt: "Una fila di automobili nel traffico" },
  ],
};

export default page;
