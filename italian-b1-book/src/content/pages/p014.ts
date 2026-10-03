import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 14 (Grammatica: Lei, i pronomi personali complemento tonici). */
const page: BookPage = {
  id: "p014",
  number: 14,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Grammatica · I pronomi personali complemento",
  addedOn: "2026-10-06",
  runningHead: "Grammatica",
  sideTab: { unit: "U1", color: "#ef8a3a" },
  blocks: [
    {
      type: "theory",
      text: `
Usiamo il pronome ***Lei*** quando ci rivolgiamo a una persona con cui non siamo in confidenza (situazione formale):
> Buongiorno, **Lei** è il dottor Rossi?

! ATTENZIONE!
I nomi o gli aggettivi che si riferiscono al ***Lei*** vanno al maschile se ci rivolgiamo a un uomo, vanno al femminile se ci rivolgiamo a una donna:
> **Lei, signore, è italiano?**
> **Lei, signora, è italiana?**

# I pronomi personali complemento
I pronomi personali con funzione di complemento possono avere due forme:
- una **forma forte** o **tonica** (= con l'accento):
> Cercano **me**.
- una **forma debole** o **atona** (= senza accento).
> **Mi** cercano.

Nella forma forte o tonica l'accento cade sulla vocale del pronome; nella forma debole o atona l'accento cade sulla vocale della parola successiva.
Usiamo la forma forte quando vogliamo dare un maggiore rilievo al pronome:

> Cercano **me**. = Cercano proprio me, non altre persone.

## I pronomi personali tonici
| | SINGOLARE | PLURALE
| 1ª persona | me | noi
| 2ª persona | te | voi
| 3ª persona :: maschile | lui | loro
| :: femminile | lei | loro
| :: riflessivo | sé | sé

I pronomi tonici possono avere funzione di:
- complemento oggetto o diretto (= senza preposizione):
> Martina ama **me**.
> Il direttore vuole **te**.
> Chiamano **lui**.
> Desiderano **lei**.
===
>> Il professore interrogherà **voi**.
>> Alla festa hanno invitato **loro**, non **noi**.
- complemento indiretto (= con preposizione):
> Giorgio ha raccontato tutto **a me**.
> Andrea parla sempre bene **di te**.
> Chiara non vuole uscire **con lui**.
> Marco ha fatto questo **per lei**.
> **Tra noi** non c'è mai un litigio.
> Stasera vengo **da voi**.
> Abbiamo fiducia **in loro**.

! ATTENZIONE!
Dopo ***tra/fra*** e prima del pronome possiamo usare anche la preposizione ***di***:
> **Tra di noi** non c'è mai un litigio.

## Quando usiamo *me* e *te* invece di *io* e *tu*
Le forme ***me*** e ***te*** sostituiscono ***io*** e ***tu***:
- nelle esclamazioni senza verbo:
> Povero **me**!
> Beato **te**!
- dopo ***come*** e ***quanto***:
> Fai **come me**.
> Nessuno è fortunato **quanto te**.

Ma:
>> Fai come faccio **io**.
>> Nessuno è fortunato quanto sei fortunato **tu**.
- dopo ***più / meno di***:
> Sono **più** alto **di te**.
> Sei **meno** alto **di me**.
- nell'espressione ***io e te***:
> Siamo soli **io e te**.
> Andiamo **io e te** al cinema.

Ma:
>> Siamo soli **tu e io**.
>> Andiamo **tu e io** al cinema.

## Il pronome riflessivo *sé*
Il pronome ***sé*** si riferisce al soggetto della frase:
> Daniele pensa solo a **sé**. = Daniele pensa solo a Daniele.
> Giulia pensa solo a **sé**. = Giulia pensa solo a Giulia.
> Daniele e Giulia pensano solo a **sé**. = Daniele e Giulia pensano solo a Daniele e a Giulia.
`.trim(),
      tr: {
        vi: "Tóm tắt: Lei dùng khi trang trọng; tính từ/danh từ theo giống của người nghe (Lei, signore, è italiano? / Lei, signora, è italiana?). Đại từ tân ngữ có dạng mạnh (nhấn: me, te, lui, lei, sé, noi, voi, loro) và dạng yếu (mi, ti…). Dạng mạnh dùng để nhấn mạnh, làm tân ngữ trực tiếp hoặc sau giới từ (a me, di te, con lui…; tra di noi). Me/te thay io/tu trong câu cảm thán, sau come/quanto, sau più/meno di và trong 'io e te'. Sé = chính mình (chỉ chủ ngữ).",
        en: "Summary: Lei is the formal 'you'; nouns/adjectives agree with the listener's gender. Object pronouns have a strong (stressed: me, te, lui, lei, sé, noi, voi, loro) and a weak form (mi, ti…). Strong forms give emphasis, act as direct objects or follow prepositions (a me, di te, con lui…; tra di noi). Me/te replace io/tu in verbless exclamations, after come/quanto, after più/meno di and in 'io e te'. Sé refers back to the subject.",
      },
    },
  ],
};

export default page;
