import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 142 (Grammatica: il superlativo relativo e assoluto). */
const page: BookPage = {
  id: "p142",
  number: 142,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", color: "#ef8a3a" },
  title: "Grammatica · Il superlativo",
  runningHead: "Grammatica",
  blocks: [
    {
      type: "theory",
      text: `
# Il superlativo relativo
Il superlativo relativo indica una qualità che una persona o una cosa possiede al massimo grado in rapporto a un gruppo di altre persone o cose. Formiamo il superlativo relativo con “articolo determinativo (*il, lo, la*, ecc.) + *più / meno* + aggettivo qualificativo + *di / tra (fra)*”:
> I concerti di Pino Daniele sono **i più** emozionanti **di** tutti.
> Questa musica è **la meno** interessante **tra / fra** quelle che conosciamo.
> Fabrizio de André è **il più** famoso **tra / fra** i cantautori italiani.
Prima o dopo “*più* + aggettivo” ci può essere un nome:
> Mina è **la** cantante **più** brava **d'**Italia.
> Mina è **la più** brava cantante **d'**Italia.
Al posto della preposizione *di* possiamo usare altri elementi:
> Mina è **la** cantante **più** brava **che** conosco.
## I superlativi relativi irregolari
- il/la più buono/a = **il / la migliore**
- il/la più cattivo/a = **il / la peggiore**
- il/la più grande = **il / la maggiore**
- il/la più piccolo/a = **il / la minore**
> **Il migliore** album della stagione è quello di Franco Battiato.
> Il disco **peggiore** del Festival di Sanremo è quello di Mino Reitano.
! ATTENZIONE!
Il superlativo relativo può perdere la *e* finale quando si trova davanti ai nomi:
> **La maggior** parte dei cantanti italiani ha molto successo all'estero.
> Tiziano Ferro è **il miglior** cantante italiano degli ultimi anni.
! ATTENZIONE!
***il maggiore*** = il più grande di età, il più vecchio
> Mario è **il maggiore** di tre fratelli.
***il maggiore*** = il più importante
> Italo Calvino è forse **il maggiore** degli scrittori italiani del Novecento.
===
# Il superlativo assoluto
Il superlativo assoluto indica una qualità che una persona o una cosa possiede al massimo grado senza fare confronti con altre persone o cose. Per formare il superlativo assoluto aggiungiamo *-issimo/a/i/e* all'aggettivo o mettiamo l'avverbio *molto* davanti all'aggettivo.
> L'ultimo CD di Francesco Guccini è **bellissimo / molto bello**.
> Enrico Caruso era un tenore **famosissimo / molto famoso**.
Al posto di *molto* possiamo usare altri avverbi, come ***assai, estremamente, notevolmente, particolarmente, veramente, davvero, proprio***, ecc.:
> L'ultimo CD di Francesco Guccini è **assai bello / estremamente bello / notevolmente bello / particolarmente bello / veramente bello / davvero bello / proprio bello**.
## I superlativi assoluti irregolari
- molto buono/a, buonissimo/a = **ottimo/a**
- molto cattivo/a, cattivissimo/a = **pessimo/a**
- molto grande, grandissimo/a = **massimo/a**
- molto piccolo/a, piccolissimo/a = **minimo/a**
> Ennio Morricone è un **ottimo** musicista.
> L'interpretazione della cantante è stata **pessima**.
> Tra questo CD e quello c'è una **minima** differenza di prezzo.
! ATTENZIONE!
***il massimo*** = il più grande · ***il minimo*** = il più piccolo
> All'esame ha preso **il massimo** dei voti.
> Non ho **il minimo** dubbio: è lui il colpevole!
> Ha ottenuto **il massimo** risultato con **il minimo** sforzo.
## Il superlativo degli avverbi *bene* e *male*
- molto bene, benissimo = **ottimamente**
- molto male, malissimo = **pessimamente**
> Riccardo Muti ha diretto l'orchestra **ottimamente**.
> Questa sera il tenore ha cantato **pessimamente**.
`.trim(),
    },
  ],
};

export default page;
