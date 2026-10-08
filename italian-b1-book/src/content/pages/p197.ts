import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 197 (Lessico, bài 13). */
const page: BookPage = {
  id: "p197",
  number: 197,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", color: "#d8333a" },
  title: "Lessico · Feste e parole",
  runningHead: "Lessico",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p197-ex13",
        number: "13",
        icons: ["look", "write"],
        kind: "choice",
        inline: true,
        skill: "reading",
        instruction: "Osserviamo le immagini e sottolineiamo le parole giuste.",
        example: { q: "1. Oggi è Carnevale / la festa del patrono.", a: "***Carnevale***" },
        tr: { vi: "Quan sát tranh và gạch chân các từ đúng.", en: "Let's look at the pictures and underline the right words." },
        items: [
          { id: "2", prompt: "2. Ho un amico che si chiama Pasquale, è un ragazzo molto simpatico, ama le feste: è un …", options: ["festivo", "festaiolo"], answer: 1 },
          { id: "3", prompt: "3. Maria Pia è una donna molto …", options: ["devota", "elegante"], answer: 0 },
          { id: "4", prompt: "4. Ieri Giacomo è andato a una festa di Carnevale e ha indossato una …", options: ["frittella", "parrucca"], answer: 1 },
          { id: "5", prompt: "5. Luigi e Marco sono andati a …", options: ["una sagra", "un funerale"], answer: 0 },
          { id: "6", prompt: "6. Luigino si è messo …", options: ["un coriandolo", "una maschera"], answer: 1 },
          { id: "7", prompt: "7. Padre Antonio è sacerdote in una …", options: ["parrocchia", "parata"], answer: 0 },
        ],
      },
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "photo", src: "images/u10/p197-1.jpg", alt: "1. Bambini mascherati con stelle filanti e coriandoli" }],
        [{ type: "photo", src: "images/u10/p197-2.jpg", alt: "2. Un ragazzo brinda a una festa" }],
      ],
    },
    {
      type: "columns",
      widths: [1, 1, 1],
      cols: [
        [{ type: "photo", src: "images/u10/p197-3.jpg", alt: "3. Una donna prega davanti a un altare" }],
        [{ type: "photo", src: "images/u10/p197-4.jpg", alt: "4. Un uomo con una parrucca settecentesca" }],
        [{ type: "photo", src: "images/u10/p197-5.jpg", alt: "5. Persone tra le bancarelle di una sagra" }],
      ],
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "photo", src: "images/u10/p197-6.jpg", alt: "6. Un bambino con una maschera da mostro" }],
        [{ type: "photo", src: "images/u10/p197-7.jpg", alt: "7. Un sacerdote con alcune famiglie" }],
      ],
    },
  ],
};

export default page;
