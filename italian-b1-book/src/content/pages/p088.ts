import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 88 (Cominciamo, bài 4: consigli a Roberto). */
const page: BookPage = {
  id: "p088",
  number: 88,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "Cominciamo · Consigli a Roberto",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p088-ex4",
        number: "4",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo le frasi.",
        subtitle: "Date dei consigli a Roberto che non sa cosa fare in alcune situazioni…",
        tr: { vi: "Đọc và nối các câu. Hãy cho Roberto lời khuyên khi cậu ấy không biết làm gì trong vài tình huống…", en: "Let's read and match the sentences. Give advice to Roberto, who doesn't know what to do in some situations…" },
        left: [
          { id: "1", text: "Devo andare a cena da nonna Pina, festeggia il suo compleanno: cosa le regalo?" },
          { id: "2", text: "Il mio nipotino Piero ha rotto un meraviglioso vaso in un negozio d'arredamento…" },
          { id: "3", text: "Devo andare a un pranzo di lavoro, ma sono in ritardo…" },
          { id: "4", text: "La mia vicina di casa guarda sempre la televisione con un volume altissimo!" },
          { id: "5", text: "Devo organizzare una cena per degli ospiti importanti, ma non so apparecchiare la tavola!" },
          { id: "6", text: "Sono in fila all'ufficio postale, ma una signora mi passa avanti…" },
          { id: "7", text: "Il mio amico Giorgio mi telefona molte volte al giorno e non vuole mai chiudere la comunicazione!" },
        ],
        right: [
          { id: "a", text: "Compra una rivista per la casa e leggi i suggerimenti per la tavola." },
          { id: "b", text: "Scrivile una lettera e chiedile di abbassare il volume della TV." },
          { id: "c", text: "Regalale dei fiori e dei cioccolatini." },
          { id: "d", text: "Dille di rispettare la fila." },
          { id: "e", text: "Cambia numero di telefono." },
          { id: "f", text: "Paga il danno e scusati con il negoziante." },
          { id: "g", text: "Telefona ai tuoi colleghi e di' che la tua macchina si è rotta." },
        ],
        given: { "1": "c" },
        answer: { "1": "c", "2": "f", "3": "g", "4": "b", "5": "a", "6": "d", "7": "e" },
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u5/p88-roberto.jpg", alt: "Roberto, un bambino con le braccia incrociate" }],
        [{ type: "photo", src: "images/u5/p88-ritardo.jpg", alt: "Una donna in ritardo mangia un panino" }],
        [{ type: "photo", src: "images/u5/p88-fiori.jpg", alt: "Un bambino con un mazzo di fiori" }],
        [{ type: "photo", src: "images/u5/p88-telefono.jpg", alt: "Un ragazzo al telefono" }],
      ],
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u5/p88-ologramma.jpg", alt: "Una donna davanti alla televisione" }],
        [{ type: "photo", src: "images/u5/p88-fila.jpg", alt: "La fila all'ufficio postale" }],
        [{ type: "photo", src: "images/u5/p88-tavola.jpg", alt: "Una tavola apparecchiata" }],
      ],
    },
  ],
};

export default page;
