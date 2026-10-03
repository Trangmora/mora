import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 13 (Grammatica: i pronomi personali soggetto). */
const page: BookPage = {
  id: "p013",
  number: 13,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Grammatica · I pronomi personali soggetto",
  addedOn: "2026-10-06",
  runningHead: "Grammatica",
  sideTab: { unit: "U1", color: "#ef8a3a" },
  blocks: [
    {
      type: "theory",
      text: `
# I pronomi personali
> Io guardo Sonia, ma **lei** guarda **te**.

***Io***, ***lei*** e ***te*** sono pronomi personali.
***Io*** e ***lei*** indicano la persona che compie l'azione di guardare: questi due pronomi hanno la funzione di soggetto.
***Te*** indica la persona che è l'oggetto dell'azione di guardare: questo pronome ha la funzione di complemento oggetto.

L'italiano ha due tipi di pronomi personali:
- i pronomi personali con funzione di soggetto;
- i pronomi personali con funzione di complemento.

# I pronomi personali soggetto
| | SINGOLARE | PLURALE
| 1ª persona | io | noi
| 2ª persona | tu | voi
| 3ª persona :: maschile | lui | loro
| :: femminile | lei | loro

> **Io** vado all'università.
> **Tu** parli inglese.
> **Lui** è mio fratello.
> **Lei** è un'amica di Martina.
> **Noi** partiamo domani.
> **Voi** state bene?
> **Loro** vengono da Madrid.

In italiano non è obbligatorio esprimere il pronome personale soggetto, perché il verbo già indica la persona:
> Vado all'università.
> Parli inglese?
> È mio fratello.
> È un'amica di Martina.
> Partiamo domani.
> State bene?
> Vengono da Madrid.

## Quando è obbligatorio il pronome soggetto
È obbligatorio esprimere il pronome personale soggetto:
===
- quando vogliamo mettere in evidenza il soggetto:
> Oggi pago **io**!
> Hai fatto **tu** questo disegno?
- quando vogliamo indicare un contrasto o una contrapposizione:
> **Lei** abita in campagna, **io** in città.
> **Io** lavoro dalla mattina alla sera e **tu** non fai niente tutto il giorno.
- quando manca il verbo:
%% • *Chi viene?* || • *Chi è stato?*
%% ○ ***Io.*** || ○ ***Lui.***
- quando la forma del verbo è uguale per più persone:
> È bene che **io** sia prudente.
> È bene che **tu** sia prudente.
> È bene che **lui** sia prudente.

## I pronomi *egli, ella, esso, essa, essi, esse*
In italiano le prime due persone hanno un'unica forma: ***io***, ***tu***, ***noi***, ***voi***.

La terza persona ha invece molte forme:
3ª persona singolare maschile: ***lui*** / ***egli*** / ***esso***
3ª persona singolare femminile: ***lei*** / ***ella*** / ***essa***
3ª persona plurale maschile: ***loro*** / ***essi***
3ª persona plurale femminile: ***loro*** / ***esse***

Usiamo normalmente ***lui***, ***lei*** e ***loro*** nella lingua scritta e parlata: questi pronomi si riferiscono a persone o ad animali.

***Egli*** ed ***ella*** compaiono solo nella lingua scritta formale e in testi letterari: il pronome femminile *ella* è raro anche nella lingua scritta. *Egli* ed *ella* si riferiscono soltanto a una persona.

***Esso***, ***essa***, ***essi***, ***esse*** si trovano solo nella lingua scritta: *esso* si riferisce a una cosa o a un animale; *essa*, *essi* ed *esse* possono riferirsi anche a persone.

## I pronomi *tu* e *Lei*
Usiamo il pronome ***tu*** quando ci rivolgiamo a una persona con cui siamo in confidenza (situazione informale):
> Ciao, **tu** sei Marco?
`.trim(),
      tr: {
        vi: "Tóm tắt: Đại từ nhân xưng chủ ngữ io, tu, lui/lei, noi, voi, loro. Tiếng Ý thường bỏ chủ ngữ vì động từ đã cho biết ngôi. Bắt buộc dùng khi: nhấn mạnh chủ ngữ, đối lập hai người, câu không có động từ, hoặc động từ giống nhau ở nhiều ngôi (che io/tu/lui sia). Egli/ella chỉ dùng trong văn viết trang trọng; esso/essa… chỉ trong văn viết (esso chỉ vật/con vật). Tu dùng khi thân mật.",
        en: "Summary: subject pronouns io, tu, lui/lei, noi, voi, loro. Italian usually drops the subject because the verb shows the person. It is required to stress the subject, to contrast two people, when there is no verb, or when the verb form is the same for several persons (che io/tu/lui sia). Egli/ella only in formal written Italian; esso/essa… only in writing (esso = thing/animal). Tu is informal.",
      },
    },
  ],
};

export default page;
