import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 62 (Viaggiamo in Italia: Gli italiani e i libri). */
const page: BookPage = {
  id: "p062",
  number: 62,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  title: "Viaggiamo in Italia · Gli italiani e i libri",
  addedOn: "2026-10-07",
  ribbon: "Viaggiamo in Italia",
  framed: true,
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p062-ex1a",
        number: "1",
        label: "A",
        icons: ["read"],
        kind: "speak",
        skill: "reading",
        instruction: "Leggiamo.",
        subtitle: "Gli italiani e i libri",
        tr: { vi: "Cùng đọc: Người Ý và sách.", en: "Let's read: Italians and books." },
        items: [],
      },
    },
    {
      type: "theory",
      text: `
15 milioni di italiani hanno comprato libri nel 2004: un milione in più rispetto al 2003.

**Dove comprano i libri:** l'italiano acquista libri nelle grandi librerie (39,2%), nelle piccole librerie (27,5%), al supermercato (26,5%), in edicola (12,3%). Cresce anche il numero di persone che comprano libri on-line: l'1,6% nel 2002. Negli ultimi anni il 41% degli italiani ha acquistato libri con quotidiani e riviste.

**Dall'acquisto alla lettura:** un'indagine Istat ha scoperto che nel 2000 quasi 32,5 milioni di italiani (che hanno più di 6 anni) hanno letto almeno un libro in quell'anno. Le donne leggono di più degli uomini (64,9%). Gli uomini, invece, leggono di più per motivi professionali. Per un terzo circa della popolazione italiana (il 28,1%) la lettura è un'attività del tempo libero. Gli italiani del Nord leggono di più di quelli del Sud.

**I giovani:** sono un po' incostanti e “confusi” tra la TV, la radio, la musica, il cinema. Quanto leggono? In media il 70% della popolazione giovanile – tra i 15 e i 34 anni – legge un libro in sei mesi (ma tra i 25-29 anni la percentuale diventa il 76,4%), anche se il 95,2% preferisce comunque guardare la TV nel tempo libero.

**Che cosa leggono?** Agli italiani piacciono soprattutto romanzi, biografie, guide di viaggio o manuali.
`.trim(),
    },
    { type: "tip", it: "(adattato da www.domoskopea.it)", tr: { vi: "Nguồn trích", en: "Source" } },
    {
      type: "exercise",
      ex: {
        id: "p062-ex1b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        tr: { vi: "Cùng nói: trả lời các câu hỏi.", en: "Let's talk: answer the questions." },
        items: [
          { id: "1", prompt: "Quanto leggono gli italiani?", sample: "Nel 2000 quasi 32,5 milioni di italiani hanno letto almeno un libro; il 70% dei giovani legge un libro in sei mesi." },
          { id: "2", prompt: "Perché, secondo voi, le donne leggono di più?", sample: "Secondo me le donne leggono di più perché sono più curiose e amano i romanzi." },
          { id: "3", prompt: "I giovani italiani non leggono molto: è così anche nei vostri paesi?", sample: "Sì, anche nel mio paese i giovani preferiscono il telefono e la TV ai libri." },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p062-ex2",
        number: "2",
        icons: ["look"],
        kind: "speak",
        skill: "speaking",
        instruction: "Osserviamo l'immagine.",
        subtitle: "Come è bello leggere per gli italiani…",
        tr: { vi: "Quan sát bức tranh: Người Ý thích đọc sách biết bao…", en: "Look at the picture: How Italians love reading…" },
        items: [],
      },
    },
    { type: "photo", src: "images/u3/p62-professoressa.jpg", alt: "La professoressa: «Bene, caro Santini. Quanti libri hai letto per fare questa meravigliosa ricerca su Pirandello?» Lo studente: «Professoressa, ho studiato per un mese: ho letto con molta attenzione circa 6 libri.» Ma pensa a quando ha copiato la ricerca da Internet: «Uffa, presto!»" },
    {
      type: "dialogue",
      lines: [
        { speaker: "Prof.ssa", it: "Bene, caro Santini. Quanti libri hai letto per fare questa meravigliosa ricerca su Pirandello?" },
        { speaker: "Santini", it: "Professoressa, ho studiato per un mese: ho letto con molta attenzione circa 6 libri." },
        { speaker: "Santini (pensa)", it: "Uffa, presto!" },
      ],
    },
  ],
};

export default page;
