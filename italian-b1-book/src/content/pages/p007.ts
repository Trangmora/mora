import type { BookPage } from "../../types";

const img = (name: string, alt: string, side: "left" | "right" | "center", width: number) => ({
  src: `images/u1/${name}`,
  alt,
  side,
  width,
});

/** Unità 1 · Entriamo in Italia! — trang 7 (Osserviamo bene, bài 9). */
const page: BookPage = {
  id: "p007",
  number: 7,
  unit: "1",
  unitTitle: "Entriamo in Italia!",
  title: "Osserviamo bene · Giuseppe Russo, l'italiano medio",
  addedOn: "2026-10-04",
  runningHead: "Osserviamo bene",
  sideTab: { unit: "U1", title: "Entriamo in Italia!" },
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p007-ex9a",
        number: "9",
        label: "A",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        layout: "notes3",
        heading: "Giuseppe Russo, l'italiano medio",
        instruction: "Leggiamo e completiamo il testo con le preposizioni.",
        tr: { vi: "Đọc và hoàn thành đoạn văn với giới từ.", en: "Let's read and complete the text with prepositions." },
        parts: [
          // ---- Cột 1 ----
          {
            col: 1,
            variant: "note",
            title: "La carta d'identità.",
            text: "Il nome d'uomo più comune {{=in}} Italia è Giuseppe Russo. Gli italiani vivono {{in}} media 74 anni. La maggior parte {{degli}} italiani ha gli occhi marroni e i capelli (corti) di colore castano.",
          },
          {
            col: 1,
            variant: "note",
            title: "Non legge, telefona.",
            text: "Giuseppe Russo ha un cellulare e legge un quotidiano (il più comune è \"la Repubblica\") solo un giorno {{su}} sette.",
          },
          {
            col: 1,
            variant: "note",
            title: "Come Schumacher.",
            image: img("p7-formula1.png", "Una macchina di Formula 1", "center", 92),
            text: "Il sogno di quasi metà {{degli}} italiani è pilotare un'auto di Formula 1.",
          },
          {
            col: 1,
            variant: "note",
            title: "Al cinema e allo stadio.",
            text: "Gli svaghi preferiti sono il cinema e gli spettacoli sportivi. La squadra preferita è la Juventus.",
          },
          {
            col: 1,
            variant: "note",
            title: "TV e radio.",
            text: "L'italiano medio ha un televisore (uno {{su}} tre guarda la TV 3 ore {{al}} giorno), un lettore DVD e una radio.",
          },
          {
            col: 1,
            variant: "note",
            title: "Frigorifero.",
            image: img("p7-frigo.png", "Un frigorifero e una lavatrice", "left", 36),
            text: "Quasi tutti gli italiani hanno un frigorifero e una lavatrice, ma non tutti hanno la lavastoviglie.",
          },
          // ---- Cột 2 ----
          {
            col: 2,
            variant: "note",
            title: "Casa e famiglia.",
            image: img("p7-mamma.png", "Una mamma con il suo bambino", "right", 34),
            text: "La famiglia è {{in}} media di 3 persone; risiede {{al}} nord, {{in}} una casa di proprietà.",
          },
          {
            col: 2,
            variant: "note",
            title: "Sveglia alle sette.",
            text: "Per andare {{al|a}} lavoro l'italiano medio si sveglia ogni mattina {{tra|fra}} le 7 e le 7.30.",
          },
          {
            col: 2,
            text: "",
            image: img("p7-giuseppe.png", "Giuseppe Russo cammina, telefona e porta \"la Repubblica\"", "center", 86),
          },
          {
            col: 2,
            variant: "note",
            title: "A tavola.",
            image: img("p7-tavola.png", "Una tavola apparecchiata", "left", 38),
            text: "Il pasto principale è il pranzo, anche se la prima colazione è diventata più ricca.",
          },
          {
            col: 2,
            variant: "note",
            title: "Medicine.",
            image: img("p7-medicine.png", "Una scatola di medicine", "right", 40),
            text: "Un italiano {{su}} tre ha preso farmaci {{negli}} ultimi due giorni.",
          },
          // ---- Cột 3 ----
          {
            col: 3,
            variant: "note",
            title: "Pesce rosso.",
            image: img("p7-pesce.png", "Un pesce rosso nella boccia", "right", 34),
            text: "È l'animale domestico più presente {{nelle}} case.",
          },
          {
            col: 3,
            variant: "note",
            title: "Acqua in bottiglia.",
            image: img("p7-bottiglia.png", "Una bottiglia di acqua minerale", "left", 20),
            text: "La maggioranza {{degli}} italiani beve acqua minerale. Uno {{su}} tre beve vino ogni giorno.",
          },
          {
            col: 3,
            variant: "note",
            title: "A messa.",
            image: img("p7-messa.png", "Un prete davanti alla chiesa", "right", 44),
            text: "Gli italiani entrano {{in}} chiesa almeno una volta {{all'}} anno. Uno {{su}} tre una volta {{alla|a}} settimana.",
          },
          {
            col: 3,
            variant: "note",
            title: "Soldi da parte.",
            image: img("p7-salvadanaio.png", "Un salvadanaio", "right", 34),
            text: "Gli italiani sono i maggiori risparmiatori {{d'|di|in}} Europa.",
          },
          {
            col: 3,
            variant: "note",
            title: "Per muoversi.",
            text: "Gli italiani hanno una bicicletta e un'auto {{a}} benzina.",
          },
          {
            col: 3,
            variant: "note",
            title: "Scarpe.",
            text: "Giuseppe Russo porta scarpe numero 41. Compra 2-3 paia {{di}} scarpe {{all'}} anno.",
          },
          {
            col: 3,
            variant: "note",
            title: "Misure.",
            text: "Giuseppe Russo porta abiti taglia 50.",
          },
          {
            col: 3,
            variant: "note",
            title: "Vestirsi.",
            text: "Ogni famiglia spende 140 euro {{al}} mese {{in|per}} calzature e abbigliamento.",
          },
          {
            col: 3,
            variant: "note",
            title: "Casual.",
            text: "Blue jeans e camicia sono gli indumenti preferiti.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p007-ex9b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Chúng ta cùng nói.", en: "Let's talk." },
        items: [
          {
            id: "a",
            prompt:
              "Che cosa pensate dell'italiano medio? Commentate gli aspetti che vi interessano di più (il tipo di abbigliamento, la tavola, la macchina, …)",
            sample:
              "Secondo me l'italiano medio è una persona tranquilla: ama la famiglia, il calcio e il cinema. Mi interessa la tavola: il pranzo è il pasto principale e beve acqua minerale. Mi sembra strano che compri solo due o tre paia di scarpe all'anno!",
          },
        ],
      },
    },
  ],
};

export default page;
