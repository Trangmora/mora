import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 15 (Grammatica: i pronomi personali atoni). */
const page: BookPage = {
  id: "p015",
  number: 15,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Grammatica · I pronomi personali atoni",
  addedOn: "2026-10-07",
  runningHead: "Grammatica",
  sideTab: { unit: "U1", color: "#ef8a3a" },
  blocks: [
    {
      type: "theory",
      text: `
Possiamo rafforzare il pronome ***sé*** con ***stesso*** / ***stessa*** / ***stessi*** / ***stesse***:
> Daniele pensa solo a **sé stesso**.
> Giulia pensa solo a **sé stessa**.
> Daniele e Giulia pensano solo a **sé stessi**.

## I pronomi personali atoni
I pronomi atoni precedono il verbo e possono avere funzione di:
- complemento oggetto o diretto (= senza preposizione):
> Laura non **mi** ha salutato. = Laura non ha salutato **me**.
- complemento di termine (= con la preposizione ***a***):
> Patrizia **mi** ha prestato un libro. = Patrizia ha prestato un libro **a me**.

Chiamiamo **pronomi diretti** quelli con funzione di complemento oggetto e **pronomi indiretti** quelli con funzione di complemento di termine.

## I pronomi atoni diretti
| | SINGOLARE | PLURALE
| 1ª persona | mi | ci
| 2ª persona | ti | vi
| 3ª persona :: maschile | lo | li
| :: femminile | la / La | le
| :: riflessivo | si | si

> Mio padre **mi** ha rimproverato. = Mio padre ha rimproverato **me**.
> Luca **ti** ama. = Luca ama te.
> **Ci** perdoni? = Perdoni **noi**?
> **Vi** ammiro. = Ammiro **voi**.
> Anna **si** guarda allo specchio. = Anna guarda **Anna** allo specchio.

Alla terza persona i pronomi atoni diretti (= con funzione di complemento oggetto) hanno forme diverse per il maschile e per il femminile, per il singolare e il plurale e possono riferirsi anche a cose:
• Aspetti Carlo?
○ Sì, **lo** aspetto qui. = Sì, aspetto **Carlo** qui.
===
• Vedi spesso Marta?
○ Sì, **la** vedo tutti i giorni. = Sì, vedo **Marta** tutti i giorni.

• Bevi i liquori?
○ No, non **li** bevo. = No, non bevo **i liquori**.

• Mangi le patatine?
○ Sì, **le** mangio volentieri. = Sì, mangio **le patatine** volentieri.

! ATTENZIONE!
Quando ci rivolgiamo a una persona con il *Lei*, usiamo il femminile ***La*** anche se questa persona è un uomo:
> Dottore, **La** disturbo?

! ATTENZIONE!
I pronomi atoni seguono il verbo:
- se il verbo è all'imperativo:
> Sandro, aiuta**mi** per favore!
- se il verbo è all'infinito:
> Spero di rivederti presto.

Con l'imperativo negativo i pronomi atoni possono seguire o precedere il verbo:
• Fumo una sigaretta.
○ Non fumar**la**! / Non **la** fumare!

Con i verbi servili ***potere***, ***dovere*** e ***volere*** i pronomi atoni possono precedere il verbo servile o seguire l'infinito:
• Puoi comprare i biglietti?
○ No, non **li** posso comprare. / No, non posso comprar**li**.
• Devi fare i compiti?
○ Sì, **li** devo fare. / Sì, devo far**li**.

## I pronomi atoni indiretti
| | SINGOLARE | PLURALE
| 1ª persona | mi | ci
| 2ª persona | ti | vi
| 3ª persona :: maschile | gli | gli
| :: femminile | le / Le | gli
| :: riflessivo | si | si
`.trim(),
      tr: {
        vi: "Tóm tắt: sé stesso/stessa/stessi/stesse nhấn mạnh 'chính mình'. Đại từ không nhấn (atoni) đứng trước động từ: trực tiếp mi, ti, lo/la (La lịch sự), ci, vi, li/le, si; gián tiếp (= a + người) mi, ti, gli/le (Le lịch sự), ci, vi, gli, si. Chúng đứng sau và dính vào động từ ở mệnh lệnh (aiutami) và nguyên mẫu (rivederti); với potere/dovere/volere có thể đứng trước động từ khuyết thiếu hoặc dính sau nguyên mẫu (li posso comprare / posso comprarli).",
        en: "Summary: sé stesso/stessa/stessi/stesse stresses 'oneself'. Unstressed (atoni) pronouns come before the verb: direct mi, ti, lo/la (formal La), ci, vi, li/le, si; indirect (= a + person) mi, ti, gli/le (formal Le), ci, vi, gli, si. They follow and attach to imperatives (aiutami) and infinitives (rivederti); with potere/dovere/volere they go before the modal or attach to the infinitive (li posso comprare / posso comprarli).",
      },
    },
  ],
};

export default page;
