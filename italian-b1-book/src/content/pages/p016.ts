import type { BookPage } from "../../types";

/** Unità 1 · Entriamo in Italia! — trang 16 (Grammatica: pronomi atoni indiretti, preposizioni semplici a / con / da). */
const page: BookPage = {
  id: "p016",
  number: 16,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Grammatica · Pronomi indiretti e preposizioni semplici",
  addedOn: "2026-10-07",
  runningHead: "Grammatica",
  sideTab: { unit: "U1", color: "#ef8a3a" },
  blocks: [
    {
      type: "theory",
      text: `
Nelle prime due persone e nella forma riflessiva i pronomi atoni indiretti (= con funzione di complemento di termine) sono uguali a quelli diretti (= con funzione di complemento oggetto):
> **Mi** piace questo film. = **A me** piace questo film.
> **Ti** consiglio un buon ristorante. = Consiglio **a te** un buon ristorante.
> **Ci** hanno spedito un telegramma. = Hanno spedito un telegramma **a noi**.
> **Vi** bastano questi soldi? = Bastano **a voi** questi soldi?
> Giorgia **si** lava le mani. = Giorgia lava le mani **a Giorgia**.

La terza persona singolare ha forme diverse per il maschile e per il femminile:
• Hai dato il regalo a Marco?
○ Sì, **gli** ho dato il regalo ieri. = Sì, ho dato ieri il regalo **a Marco**.

• Telefoni a Laura?
○ Sì, **le** telefono stasera. = Sì, telefono stasera **a Laura**.

La terza persona plurale ha invece la stessa forma per il maschile e per il femminile:
• Hai scritto agli amici?
○ Sì, **gli** ho scritto una cartolina. = Sì, ho scritto **agli amici** una cartolina.

• Hai offerto qualcosa a Enrica e Paola?
○ Sì, **gli** ho offerto un caffè. = Sì, ho offerto a **Enrica** e **Paola** un caffè.

! ATTENZIONE!
Quando ci rivolgiamo a una persona con il *Lei*, usiamo il femminile ***Le*** anche se questa persona è un uomo:
> Signor Rossi, **Le** chiedo scusa.

## I pronomi atoni *gli / loro*
Nella lingua scritta troviamo a volte il pronome ***loro*** al posto di ***gli*** per la terza persona plurale:
> Giulio ha incontrato Matteo e Ada e **gli** ha comunicato la notizia. / Giulio ha incontrato Matteo e Ada e ha comunicato **loro** la notizia.
===
Il pronome ***gli*** precede il verbo, mentre il pronome ***loro*** segue il verbo.

# Le preposizioni semplici
Le preposizioni semplici collegano le parole e hanno diversi significati.

Le preposizioni semplici sono: ***a***, ***con***, ***da***, ***di***, ***in***, ***per***, ***su***, ***tra/fra***.

## A
La preposizione ***a*** indica:
- termine: | Offro un caffè **a** Lucia.
- luogo: | 1. Vado **a** New York.
>> 2. Paolo sta **a** casa.
- tempo: | Arrivo **a** mezzogiorno.
- mezzo: | 1. Giochiamo **a** pallone?
>> 2. Vado **a** piedi.
- età: | I bambini cominciano la scuola **a** cinque anni.
- qualità: | Compro un quaderno **a** righe.
- modo: | Dario cammina **a** testa bassa.
- prezzo: | Ugo vende la moto **a** mille euro.
- fine: | Domani vado **a** pesca.

## Con
La preposizione ***con*** indica:
- compagnia: | Esco **con** Roberta.
- mezzo: | Vado a Madrid **con** l'aereo.
- qualità: | Carla è una ragazza **con** i capelli biondi.
- modo: | gli studenti ascoltano il professore **con** attenzione.

## Da
La preposizione ***da*** indica:
- provenienza: | Hugo viene **da** Parigi.
- luogo: | Passo **da** Bologna.
- luogo (persona): | 1. Vado **da** Marco.
>> 2. (con l'articolo) Vado **dal** dentista.
- tempo: | Sono qui **da** giugno.
`.trim(),
      tr: {
        vi: "Tóm tắt: Ở ngôi 1, 2 và dạng phản thân, đại từ gián tiếp giống đại từ trực tiếp (mi, ti, ci, vi, si). Ngôi 3 số ít: gli (nam), le (nữ), Le (lịch sự); ngôi 3 số nhiều: gli (văn viết có thể dùng loro, đứng sau động từ). Giới từ đơn: a, con, da, di, in, per, su, tra/fra. A: đích đến, nơi chốn, thời điểm, phương tiện, tuổi, đặc điểm, cách thức, giá, mục đích. Con: cùng với, phương tiện, đặc điểm, cách thức. Da: xuất xứ, đi qua, đến chỗ ai (da Marco, dal dentista), từ khi.",
        en: "Summary: in the 1st/2nd person and reflexive form, indirect pronouns look like the direct ones (mi, ti, ci, vi, si). 3rd person singular: gli (m), le (f), formal Le; plural: gli (in writing also loro, after the verb). Simple prepositions: a, con, da, di, in, per, su, tra/fra. A: recipient, place, time, means, age, quality, manner, price, purpose. Con: company, means, quality, manner. Da: origin, passing through, at someone's place (da Marco, dal dentista), since.",
      },
    },
  ],
};

export default page;
