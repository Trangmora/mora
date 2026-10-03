import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 17 (Grammatica: preposizioni da / di / in / per / su / tra-fra). */
const page: BookPage = {
  id: "p017",
  number: 17,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Grammatica · Le preposizioni semplici (2)",
  addedOn: "2026-10-07",
  runningHead: "Grammatica",
  sideTab: { unit: "U1", color: "#ef8a3a" },
  blocks: [
    {
      type: "theory",
      text: `
- separazione: | Le Alpi separano l'Italia **da** altri paesi.
- prezzo: | Vuoi un gelato **da** due euro o **da** tre euro?
- fine: | Abbiamo comprato le tazze **da** tè.
- età: | **Da** bambino ero grasso.
- qualità (con l'articolo): | Paola è una bambina **dagli** occhi azzurri.

## Di
La preposizione ***di*** indica:
- possesso o specificazione:
>> 1. L'orologio **di** Loredana è nuovo.
>> 2. In classe c'è il professore **di** italiano.
- origine: | Mark è **di** Edimburgo.
- argomento: | Oggi parliamo **di** storia italiana.
- materia: | Questo anello **d'**oro è molto bello.
- età: | Giulia è una ragazza **di** sedici anni.
- tempo: | 1. **D'**inverno il tempo è brutto.
>> 2. Spesso lavoro **di** notte.
- denominazione: | La città **di** Siena è stupenda.
- causa: | 1. Tremo **di** freddo.
>> 2. Muoio **di** fame!
- paragone: | Marco è più alto **di** Luigi.
- una parte: | Molti **di** noi amano la musica classica.
- modo: | Vengo **di** corsa!
- mezzo: | Il cuoco unge la padella **di** burro.

## In
La preposizione ***in*** indica:
- luogo: | 1. Silvia va **in** banca.
>> 2. Pauline vive **in** Francia.
>> 3. Sonia abita **in** Via Roma 8.
- tempo: | 1. Il mio compleanno è **in** aprile.
>> 2. **In** autunno piove spesso.
- mezzo: | Vado a Milano **in** treno.
- materia: | La libreria è **in** legno o **in** metallo?
- modo: | Ti piace il riso **in** bianco?
- limitazione: | Stefania è brava **in** matematica.

## Per
La preposizione ***per*** indica:
- luogo: | 1. Domani partiamo **per** Parigi.
>> 2. Passo **per** Genova.
===
- vantaggio: | Il regalo è **per** Giulia.
- tempo: | L'estate non lavoro **per** un mese.
- limitazione: | **Per** me hai ragione.
- causa: | Sono felice **per** la tua promozione.
- fine: | Devo prendere lo sciroppo **per** la tosse.
- mezzo: | Abbiamo parlato **per** telefono.
- distribuzione: | I soldati sono in fila **per** due.

## Su
La preposizione ***su*** indica:
- luogo: | Il gatto dorme **su** questo divano.
- argomento: | Leggo un libro **su** Napoleone.
- distribuzione: | Quattro italiani **su** dieci non fanno sport.
- prezzo (con l'articolo): | Il libro costa **sui** venti euro. = Il libro costa **circa** venti euro.
- quantità o misura (con l'articolo): | Peso **sui** settanta chili. = Peso **circa** settanta chili.
- età (con l'articolo): | Mario ha **sui** vent'anni. = Mario ha **circa** vent'anni.

## Tra / Fra
Le preposizioni ***tra / fra*** indicano:
- luogo: | Il cinema è **tra / fra** l'università e la biblioteca.
- compagnia o relazione: | siamo **tra / fra** amici.
- un insieme: | **Tra / Fra** le squadre di calcio italiane c'è la Juventus.
- tempo: | Ci vediamo **tra / fra** due ore.
- una parte: | Molti **tra** i presenti sono italiani.

! ATTENZIONE!
> Sono a casa. / Sono **in** casa.
> **D'**estate fa caldo. / **In** estate fa caldo.
> Passo **per** Napoli. / Passo **da** Napoli.

## Le preposizioni semplici con i verbi
Le preposizioni semplici possono stare anche prima di un verbo:
> Giorgio va **a** prendere l'autobus.
> Penso **di** venire.
> Il forno è utile **per** cucinare.
`.trim(),
      tr: {
        vi: "Tóm tắt: Da còn chỉ sự tách rời, giá, công dụng (tazze da tè), tuổi (da bambino), đặc điểm (dagli occhi azzurri). Di: sở hữu, xuất xứ, chủ đề, chất liệu, tuổi, thời gian, tên gọi, nguyên nhân, so sánh, một phần, cách thức, phương tiện. In: nơi chốn, thời gian, phương tiện, chất liệu, cách thức, giới hạn. Per: đi đến/đi qua, cho ai, khoảng thời gian, ý kiến, nguyên nhân, mục đích, phương tiện, phân chia. Su: trên, về (chủ đề), trên tổng số, khoảng (sui venti euro). Tra/fra: giữa, trong số, sau (thời gian). Giới từ cũng đứng trước động từ nguyên mẫu (va a prendere, penso di venire).",
        en: "Summary: da also shows separation, price, purpose (tazze da tè), age (da bambino), features (dagli occhi azzurri). Di: possession, origin, topic, material, age, time, naming, cause, comparison, part, manner, means. In: place, time, means, material, manner, limitation. Per: destination/through, for someone, duration, opinion, cause, purpose, means, distribution. Su: on, about, out of, approximately (sui venti euro). Tra/fra: between, among, in (time). Prepositions also introduce infinitives (va a prendere, penso di venire).",
      },
    },
  ],
};

export default page;
