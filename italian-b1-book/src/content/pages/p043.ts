import type { BookPage } from "../../types";

/** Unità 3 · Ti piace leggere? — trang 43 (Cominciamo, bài 3). */
const page: BookPage = {
  id: "p043",
  number: 43,
  unit: "3",
  unitTitle: "Ti piace leggere?",
  addedOn: "2026-10-07",
  title: "Cominciamo · Tre romanzi",
  runningHead: "Cominciamo",
  sideTab: { unit: "U3", title: "Ti piace leggere?" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p043-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", tr: { vi: "Cùng đọc.", en: "Let's read." }, items: [] },
    },
    { type: "photo", src: "images/u3/p43-libri.jpg", alt: "Le copertine di Va' dove ti porta il cuore, Vita e La noia" },
    {
      type: "columns",
      cols: [
        [{ type: "text", title: "a. Susanna Tamaro, Va' dove ti porta il cuore (1994)", it: "Il romanzo ha appassionato lettori e lettrici di ogni età. Una nonna racconta, in una lunga lettera a una nipote lontana, una storia ricca di sentimento." }],
        [{ type: "text", title: "b. Melania Mazzucco, Vita (2003)", it: "New York è la città delle occasioni. Qui arrivano dodicimila stranieri al giorno. A New York nel 1903 arrivano anche dalla lontana Italia Diamante e Vita, due ragazzini di dodici e nove anni. Una storia buffa, comica, ma anche amara e dolorosa: la storia di una famiglia e insieme la storia di tutti noi alla ricerca della felicità." }],
        [{ type: "text", title: "c. Alberto Moravia, La noia (1960)", it: "La noia ci offre un ritratto profondo di una persona sola. Il protagonista non ha una vita sociale e si scontra con un'assurda realtà. Moravia lo descrive da diversi punti di vista: come artista, come uomo e come amante." }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p043-ex3b",
        label: "B",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo i testi ai libri dell'attività precedente.",
        tr: { vi: "Đọc và nối các đoạn văn với những cuốn sách ở bài trước.", en: "Let's read and match the texts to the books in the previous activity." },
        left: [
          { id: "1", text: "Camminavano vicino ai muri, per passare inosservati. Ma non passavano inosservati sulla Broadway alla Trentaquattresima strada, un ragazzino con un abito di cotone, un berretto e la fodera di un cuscino a righe sulla spalla e una bambina scalza con i capelli neri e un vestito a fiori più sporco del marciapiede. Vita guardava la vetrina di un negozio: tutte le donne qui, anche quelle vere, sembravano finte. Non erano vestite di nero, non portavano la tovaglia in testa. Erano altissime, magrissime, biondissime. Vita non aveva mai visto donne simili, ed era piena di sorpresa. Forse al sole di questa città, anche lei sarebbe diventata così da grande." },
          { id: "2", text: "Per molti la noia è il contrario del divertimento, per me, invece, la noia non è il contrario del divertimento, potrei dire, che, per certi aspetti, rassomiglia al divertimento, perché provoca distrazione. Quando mi annoio, la realtà mi sembra come una coperta troppo corta in una notte d'inverno." },
          { id: "3", text: "So che tra i nostri patti al momento della partenza c'era quello che non ci saremmo scritte. Queste righe, quindi, non prenderanno mai il volo per raggiungerti in America. Se non ci sarò più io al tuo ritorno, ci saranno le mie lettere qui ad aspettarti. Perché dico così? Perché meno di un mese fa, per la prima volta nella mia vita, sono stata male in modo grave." },
        ],
        right: [
          { id: "a", text: "Susanna Tamaro, Va' dove ti porta il cuore" },
          { id: "b", text: "Melania Mazzucco, Vita" },
          { id: "c", text: "Alberto Moravia, La noia" },
        ],
        answer: { "1": "b", "2": "c", "3": "a" },
      },
    },
  ],
};

export default page;
