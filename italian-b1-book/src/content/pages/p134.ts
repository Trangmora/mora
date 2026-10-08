import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 134 (Facciamo pratica, bài 10: 'O sole mio). */
const page: BookPage = {
  id: "p134",
  number: 134,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Facciamo pratica · 'O sole mio",
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica" },
    {
      type: "exercise",
      ex: { id: "p134-ex10a", number: "10", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "'O sole mio, la canzone napoletana più famosa nel mondo", tr: { vi: "Cùng đọc: 'O sole mio, bài hát Napoli nổi tiếng nhất thế giới.", en: "Let's read: 'O sole mio, the most famous Neapolitan song in the world." }, items: [] },
    },
    {
      type: "columns",
      widths: [3, 1],
      cols: [
        [{ type: "text", it: "George Bush è arrivato a Pechino e i cinesi gli hanno cantato la canzone 'O sole mio. I ragazzi di Ischia l'hanno cantata insieme a Giovanni Paolo II, molti cantanti continuano a proporla nel loro repertorio. La più italiana e la più napoletana delle nostre canzoni è nata nel 1898 a Napoli grazie a un poeta, Giovanni Capurro, e a un musicista, Edoardo Di Capua, ed è diventata famosa in tutto il mondo. La canzone descrive il sole, l'aria profumata, la nostalgia degli emigranti che andavano via da Napoli, l'amore per una donna e la malinconia per il giorno che finisce. Dopo la morte dei due autori nel 1910, il successo della canzone è ancora più grande. Il 14 agosto 1920 alle Olimpiadi di Anversa le squadre nazionali arrivano nello stadio: il maestro dell'orchestra non trova lo spartito dell'inno nazionale italiano e fa cantare 'O sole mio. Il pubblico la riconosce subito e la canta con passione. La cantano tutti i grandi interpreti lirici, da Fernando De Lucia a Enrico Caruso, la canta anche Josephine Baker. Elvis Presley, nel 1960, la trasforma in un successo rock mondiale con il suo It's now or never. E quelle tre semplici parole, 'O sole mio, in un napoletano comprensibile a tutti, fanno ancora piangere e cantare in tutto il mondo." }],
        [{ type: "photo", src: "images/u7/p134-spartito.jpg", alt: "Lo spartito originale di 'O sole mio" }, { type: "photo", src: "images/u7/p134-napoli.jpg", alt: "Il golfo di Napoli con il Vesuvio" }],
      ],
    },
    { type: "audio", src: "audio/u7-p134-ex10b.mp3", title: "10 B", transcript: "'O sole mio (canzone napoletana di G. Capurro e E. Di Capua, 1898)" },
    {
      type: "exercise",
      ex: { id: "p134-ex10b", label: "B", icons: ["read", "listen"], kind: "speak", skill: "listening", instruction: "Leggiamo e ascoltiamo la canzone.", subtitle: "'O SOLE MIO (1898) versi di G. Capurro – musica di E. Di Capua", tr: { vi: "Đọc và nghe bài hát.", en: "Let's read and listen to the song." }, items: [] },
    },
    {
      type: "theory",
      text: `
## Napoletano
**I** *Che bella cosa 'na jurnata 'e sole!…*
*'N'aria serena doppo a 'na tempesta…*
*Pe' ll'aria fresca pare giá 'na festa…*
*Che bella cosa 'na jurnata 'e sole!…*
*Ma 'n'atu sole / cchiù bello, oje né', / 'o sole mio, sta 'nfronte a te… / 'O sole, 'o sole mio, / sta 'nfronte a te… / sta 'nfronte a te!*
**II** *Lùceno 'e llastre d' 'a fenesta toja; / 'na lavannara canta e se ne vanta… / e pe' tramente torce, spanne e canta, / lùceno 'e llastre d' 'a fenesta toja… / Ma 'n'atu sole…*
**III** *Quanno fa notte e 'o sole se ne scenne, / mme vène quase 'na malincunia… / sott' 'a fenesta toja restarría, / quanno fa notte e 'o sole se ne scenne… / Ma 'n'atu sole…*
===
## Italiano
**I** Che bella cosa una giornata di sole!…
Un'aria serena dopo una tempesta…
Per l'aria fresca sembra già una festa…
Che bella cosa una giornata di sole!…
Ma un altro sole / più bello, o ragazza, / il sole mio, sta sulla tua fronte… / Il sole, il sole mio, / sta sulla tua fronte… / sta sulla tua fronte!
**II** Risplendono i vetri della tua finestra; / una lavandaia canta e se ne vanta… / e mentre strizza i panni, li stende e canta, / risplendono i vetri della tua finestra… / Ma un altro sole…
**III** Quando arriva la notte e il sole tramonta, / sento quasi una malinconia… / resterei sotto la tua finestra, / quando arriva la notte e il sole tramonta… / Ma un altro sole…
`.trim(),
    },
  ],
};

export default page;
