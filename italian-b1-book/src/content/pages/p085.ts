import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 85 (Un'italiana famosa: Sophia Loren). */
const page: BookPage = {
  id: "p085",
  number: 85,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  title: "Un'italiana famosa · Sophia Loren",
  addedOn: "2026-10-07",
  ribbon: "Un'italiana famosa!",
  framed: true,
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  blocks: [
    {
      type: "exercise",
      ex: { id: "p085-ex3a", number: "3", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "Sophia Loren", tr: { vi: "Cùng đọc: Sophia Loren.", en: "Let's read: Sophia Loren." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 2, 3],
      cols: [
        [{ type: "text", it: "– Nome: Sophia Loren (nome d'arte di Sofia Scicolone).\n– Nasce a Roma nel 1934.\n– Chi è? È una famosa attrice italiana. Ha cominciato la sua carriera nel 1954 con L'oro di Napoli e ha recitato in tanti film: Ieri, oggi e domani (1963), Matrimonio all'italiana (1964), La contessa di Hong Kong (1967), I girasoli (1970), Una giornata particolare (1977). Molti registi italiani e stranieri l'hanno considerata l'attrice più rappresentativa del cinema italiano." }],
        [{ type: "photo", src: "images/u4/p85-giovane.jpg", alt: "Sophia Loren giovane" }],
        [{ type: "photo", src: "images/u4/p85-ritratto.jpg", alt: "Sophia Loren in un abito nero" }],
      ],
    },
    {
      type: "columns",
      widths: [1, 3, 2],
      cols: [
        [{ type: "photo", src: "images/u4/p85-ricette.jpg", alt: "Il libro Sophia Loren's Recipes & Memories" }],
        [{ type: "text", it: "Nel 1960 ha ottenuto la Palma d'oro al festival di Cannes e nel 1961 il premio Oscar per la sua interpretazione nel film La ciociara. Ha lavorato spesso con l'attore Marcello Mastroianni e con il regista Vittorio de Sica. Nel 1991 ha ricevuto il premio Oscar alla carriera e nel 1998 il Leone d'oro al Festival di Venezia. Sophia Loren piace agli italiani perché è un simbolo di bellezza e di femminilità. L'attrice, da tempo, si interessa anche alla grande tradizione gastronomica del nostro paese e ha pubblicato un libro di ricette." }],
        [{ type: "photo", src: "images/u4/p85-ciociara.jpg", alt: "Una scena del film La ciociara" }],
      ],
    },
    {
      type: "exercise",
      ex: {
        id: "p085-ex3b",
        label: "B",
        icons: ["look", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Osserviamo e abbiniamo le immagini alle frasi.",
        tr: { vi: "Quan sát và nối các bức ảnh với các câu.", en: "Look and match the pictures to the sentences." },
        left: [
          { id: "1", text: "Sophia Loren con gli occhiali e una collana di perle", image: "images/u4/p85-oscar.jpg" },
          { id: "2", text: "Sophia Loren in una strada di Napoli", image: "images/u4/p85-strada.jpg" },
          { id: "3", text: "Sophia Loren e Marcello Mastroianni in cucina", image: "images/u4/p85-cucina.jpg" },
        ],
        right: [
          { id: "a", text: "Sophia Loren è la protagonista del film Ieri, oggi e domani." },
          { id: "b", text: "Sophia Loren ha recitato spesso con Marcello Mastroianni." },
          { id: "c", text: "Nel 1991 Sophia Loren ha vinto il premio Oscar alla carriera." },
        ],
        answer: { "1": "c", "2": "a", "3": "b" },
      },
    },
  ],
};

export default page;
