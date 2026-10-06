import type { BookPage } from "../../types";

/** Unità 4 · L'Italia a tavola — trang 72 (Osserviamo bene, bài 9B: Alla scoperta della frutta italiana). */
const page: BookPage = {
  id: "p072",
  number: 72,
  unit: "4",
  unitTitle: "L'Italia a tavola",
  addedOn: "2026-10-07",
  sideTab: { unit: "U4", title: "L'Italia a tavola" },
  title: "Osserviamo bene · La frutta italiana",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p072-ex9b",
        label: "B",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo.",
        tr: { vi: "Đọc và hoàn thành đoạn văn (ne, ce ne, lo, la…).", en: "Let's read and complete the text (ne, ce ne, lo, la…)." },
        source: "(adattato da Bene Insieme, ottobre 2005)",
        parts: [
          {
            boxed: true,
            title: "Alla scoperta della frutta italiana",
            image: { src: "images/u4/p72-frutta.jpg", alt: "La carta d'Italia con castagne, pesche, limoni e arance", side: "right", width: 45 },
            text: "Molte regioni italiane hanno una ricchezza di frutti unica al mondo: per questo sono nati i marchi DOP (Denominazione di Origine Protetta) e IGP (Indicazione Geografica Protetta), che {{=ne}} tutelano la genuinità e {{ne}} garantiscono la qualità.\nAvete mai provato le castagne del Monte Amiata (in Toscana)? {{Ce}} {{ne}} sono di vari tipi; sono frutti autunnali, molto buoni per fare il famoso “castagnaccio”, un dolce squisito che mangiamo soprattutto in inverno.\nLe nocciole tonde di Giffoni (vicino ai Monti Piacentini, in Emilia Romagna) hanno un sapore molto intenso. Se {{ne}} mangiate tre o quattro, avrete una bella carica di energia. Di solito {{le}} usiamo nel cioccolato e nei dolci.\nLa pesca nettarina di Romagna è unica: {{l'|la}} avete mai assaggiat{{a}}? È una varietà di pesca noce con la polpa che si stacca facilmente dal nocciolo: è ideale nelle macedonie e con il gelato.\nTutti sanno quanto sono importanti gli agrumi in Italia: in Campania abbiamo due varietà di limoni, quello di Amalfi e quello di Sorrento. Il primo ha una buccia chiara e una polpa senza semi con un succo buonissimo. Il secondo ha una buccia ricca di oli essenziali: {{ne}} possiamo fare un prodotto di bellezza per le mani. Da tutti e due otteniamo il famoso limoncello.\nLa clementina di Calabria (frutto simile al mandarino) è molto dolce e succosa: se {{ne}} mangiate una a colazione, {{ne}} sentirete il sapore in bocca per tutto il giorno!\nDeliziose sono le arance siciliane: {{ce}} {{ne}} sono tre varietà molto conosciute (tarocco, moro, sanguinello) che nascono vicino all'Etna. Dovete provar{{le}} tutte, perché hanno un gusto molto diverso: in Sicilia {{le}} usano in molte ricette e {{ne}} mangiano almeno due al giorno.",
          },
        ],
      },
    },
  ],
};

export default page;
