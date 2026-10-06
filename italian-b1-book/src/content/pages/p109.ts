import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 109 (Osserviamo bene, bài 5: il futuro semplice). */
const page: BookPage = {
  id: "p109",
  number: 109,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", title: "Cultura e società" },
  title: "Osserviamo bene · Il futuro semplice",
  runningHead: "Osserviamo bene",
  banner: "STUDIERÒ",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p109-ex5a", number: "5", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Il futuro semplice", tr: { vi: "Cùng đọc: thì tương lai đơn.", en: "Let's read: the simple future." }, items: [] },
    },
    { type: "theory", text: "> La prossima settimana **arriverà** mio fratello dal Messico.\n> **Leggerò** questo libro più tardi.\n===\n> Domani **sentirò** un concerto di musica classica." },
    { type: "gridTable", firstCol: true, head: ["", "GUARDARE", "SCRIVERE", "DORMIRE"], rows: [
        ["io", "**guarderò**", "**scriverò**", "**dormirò**"],
        ["tu", "**guarderai**", "**scriverai**", "**dormirai**"],
        ["lui / lei / Lei", "**guarderà**", "**scriverà**", "**dormirà**"],
        ["noi", "**guarderemo**", "**scriveremo**", "**dormiremo**"],
        ["voi", "**guarderete**", "**scriverete**", "**dormirete**"],
        ["loro", "**guarderanno**", "**scriveranno**", "**dormiranno**"],
      ] },
    { type: "gridTable", firstCol: true, head: ["", "ESSERE", "AVERE"], rows: [
        ["io", "**sarò**", "**avrò**"], ["tu", "**sarai**", "**avrai**"], ["lui / lei / Lei", "**sarà**", "**avrà**"],
        ["noi", "**saremo**", "**avremo**"], ["voi", "**sarete**", "**avrete**"], ["loro", "**saranno**", "**avranno**"],
      ] },
    {
      type: "exercise",
      ex: {
        id: "p109-ex5b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con i verbi al futuro.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với động từ ở thì tương lai.", en: "Let's read and complete the text with the verbs in the future." },
        source: "(adattato da Vera, ottobre 2004)",
        parts: [
          {
            boxed: true,
            title: "La scuola italiana del futuro",
            image: { src: "images/u6/p109-bambini.jpg", alt: "Bambini che disegnano a scuola", side: "right", width: 34 },
            text: "I bambini da 0 a 10 anni in Italia sono circa il 10% della popolazione. Giorgio Rembado, presidente dell'Associazione nazionale delle scuole italiane, ci illustra la probabile situazione della scuola nei prossimi anni: “La nostra scuola elementare si sta preparando a una grande sfida sociale: (*essere*) {{=sarà}} molto importante educare i nostri figli alla tolleranza e al rispetto degli altri. Infatti, in un futuro vicino, (*esserci*) {{ci saranno}} nelle classi più di 180.000 bambini stranieri. In molti istituti i docenti (*preparare*) {{prepareranno}} corsi di italiano proprio per questi bambini e li (*avvicinare*) {{avvicineranno}} a un mondo nuovo e affascinante. La famiglia e la scuola (*lavorare*) {{lavoreranno}} insieme per costruire un mondo migliore per i nostri figli. Noi (*cercare*) {{cercheremo}} anche di accostare tutti i bambini all'arte e alla musica: crediamo che un bambino educato a queste discipline (*avere*) {{avrà}} domani più amore per il nostro patrimonio artistico. Per questo nelle scuole (*nascere*) {{nasceranno}} servizi che (*organizzare*) {{organizzeranno}} corsi di educazione artistica e musicale. Infine, la scuola italiana (*dedicare*) {{dedicherà}} una parte fondamentale dei propri programmi a educare i bambini al rispetto dell'ambiente.”",
          },
        ],
      },
    },
  ],
};

export default page;
