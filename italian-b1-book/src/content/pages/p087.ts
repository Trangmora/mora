import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 87 (Cominciamo, bài 3: Arrivare a 100 anni). */
const page: BookPage = {
  id: "p087",
  number: 87,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "Cominciamo · Arrivare a 100 anni",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "exercise",
      ex: { id: "p087-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Arrivare a 100 anni: le regole per vivere bene degli italiani", tr: { vi: "Cùng đọc: Sống đến 100 tuổi: những quy tắc sống khỏe của người Ý.", en: "Let's read: Reaching 100: Italians' rules for living well." }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "text", it: "Le persone che si avvicinano ai 100 anni in buona salute sono sempre di più. Il segreto? In gran parte nei loro geni. Ma non solo in quelli.\nTra i centenari in gamba ci sono anche diversi italiani. Loro abitano tutti in Sardegna e continuano ancora a lavorare: Giovanni Occhioni, 102 anni, di Aglientu; Rosa Frau, 103 anni, di Ovodda e la coetanea Antonia Biddittu. Forse l'obiettivo, per tutti, è quello di battere il record della francese Jeanne Calment, morta a 122 anni." }],
        [{ type: "photo", src: "images/u5/p87-falegname.jpg", alt: "Un anziano falegname lavora il legno con alcuni bambini" }],
      ],
    },
    { type: "text", it: "Vediamo, allora, una serie di regole che questi anziani ci suggeriscono:\n«Bevete un goccio di vino rosso prima di dormire e, possibilmente, bevetelo in compagnia».\n«Mangiate molta verdura e molti legumi come fave e ceci».\n«Cercate di leggere tanto».\n«Dedicatevi ad attività tranquille e rilassanti come lavorare all'uncinetto».\n«Andate a letto presto».\n«Siate calmi: non arrabbiatevi mai troppo!».\n«Fate regolare attività fisica»." },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u5/p87-centenari.jpg", alt: "Un centenario sorridente con alcuni giovani" }],
        [{ type: "text", it: "I ricercatori, però, sanno che non possono essere solo queste le ricette di lunga vita e, da anni, tentano di scoprire perché alcune persone vivono molto più di altre: nel mondo i centenari sono circa 145 mila, più donne che uomini. Che cosa gli permette di passare attraverso il tempo, senza avere tumori, infarti, ictus? Lo stile di vita? O nel loro Dna c'è qualcosa di speciale? In Italia, per esempio, gli scienziati studiano le abitudini di vita nel Cilento, una zona dove ci sono persone molto anziane, per scoprire il segreto della longevità… Quale sarà?" }, { type: "tip", it: "(adattato da Panorama, 16-02-2006)", tr: { vi: "Nguồn trích", en: "Source" } }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p087-ex3b",
        label: "B",
        icons: ["read", "check"],
        kind: "truefalse",
        skill: "reading",
        instruction: "Leggiamo: vero o falso?",
        tr: { vi: "Đọc: đúng hay sai?", en: "Let's read: true or false?" },
        items: [
          { id: "1", prompt: "Il numero delle persone anziane è oggi in aumento.", answer: true },
          { id: "2", prompt: "In Italia non vivono persone con più di cento anni.", answer: false },
          { id: "3", prompt: "La donna più anziana d'Europa è una francese.", answer: true },
          { id: "4", prompt: "Gli anziani dicono che non bisogna bere vino.", answer: false },
          { id: "5", prompt: "Le donne vivono più a lungo degli uomini.", answer: true },
        ],
      },
    },
  ],
};

export default page;
