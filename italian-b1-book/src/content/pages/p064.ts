import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 64 (Cominciamo, bài 1: Buon appetito!). */
const page: BookPage = {
  id: "p064",
  number: 64,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  title: "Cominciamo · Buon appetito!",
  blocks: [
    {
      type: "unitHeader",
      unit: "4",
      title: "L'Italia a tavola",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "conoscere piatti della cucina regionale italiana", tr: { vi: "làm quen với các món ăn của ẩm thực vùng miền nước Ý", en: "get to know dishes of Italian regional cooking" } },
        { it: "conoscere aspetti culturali legati alla tradizione del cibo", tr: { vi: "tìm hiểu những nét văn hóa gắn với truyền thống ẩm thực", en: "learn cultural aspects linked to food traditions" } },
        { it: "dire ricette", tr: { vi: "nói công thức nấu ăn", en: "give recipes" } },
        { it: "fare e rifiutare inviti", tr: { vi: "mời và từ chối lời mời", en: "make and refuse invitations" } },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "BUON APPETITO!" },
    {
      type: "exercise",
      ex: {
        id: "p064-ex1",
        number: "1",
        icons: ["read", "match"],
        kind: "match",
        skill: "reading",
        instruction: "Leggiamo e abbiniamo i testi alle immagini.",
        tr: { vi: "Đọc và nối các đoạn văn với các bức ảnh.", en: "Let's read and match the texts to the pictures." },
        left: [
          { id: "1", text: "I bronzi di Riace e le cipolle rosse", image: "images/u4/p64-calabria.jpg" },
          { id: "2", text: "La pizza e il panorama di una città", image: "images/u4/p64-napoli.jpg" },
          { id: "3", text: "Un palazzo e un piatto di risotto", image: "images/u4/p64-mantova.jpg" },
          { id: "4", text: "Una cattedrale e i cannoli", image: "images/u4/p64-palermo.jpg" },
          { id: "5", text: "Gli spaghetti alla carbonara e una fontana", image: "images/u4/p64-roma.jpg" },
        ],
        right: [
          { id: "a", text: "Mantova è una meravigliosa città in Lombardia, ricca di opere d'arte: ci potete andare per visitare lo splendido Palazzo Te e per gustare il raffinato risotto che è un piatto tipico di queste zone." },
          { id: "b", text: "Napoli è una città dai mille volti e dai mille colori e anche la sua tradizione gastronomica è molto varia: ne potete avere una prova se venite qui. Sicuramente il piatto più famoso è la pizza." },
          { id: "c", text: "La Calabria ci offre bellezze naturali e anche capolavori artistici: sono molto famosi i bronzi di Riace. La cucina è ricca di sapori forti: squisite sono le cipolle rosse di Tropea." },
          { id: "d", text: "Roma è la città eterna, ha un fascino senza tempo e anche la sua cucina è molto buona. I piatti tipici romani? Vi suggeriamo gli spaghetti alla carbonara." },
          { id: "e", text: "Se andate a Palermo, in Sicilia, dovete assolutamente assaggiare i dolci: ne vedrete una quantità incredibile in tutte le pasticcerie siciliane. I cannoli, per esempio, sono veramente fantastici!" },
        ],
        answer: { "1": "c", "2": "b", "3": "a", "4": "e", "5": "d" },
      },
    },
  ],
};

export default page;
