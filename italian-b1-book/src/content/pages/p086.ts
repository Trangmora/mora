import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 86 (Cominciamo, bài 1–2). */
const page: BookPage = {
  id: "p086",
  number: 86,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  title: "Cominciamo · Diamoci una regola!",
  blocks: [
    {
      type: "unitHeader",
      unit: "5",
      title: "Rispetti le regole?",
      intro: "In questa Unità impariamo a:",
      goals: [
        { it: "conoscere alcuni aspetti del comportamento degli italiani", tr: { vi: "tìm hiểu vài nét về cách cư xử của người Ý", en: "learn some aspects of Italian behaviour" } },
        { it: "confrontare il comportamento degli italiani con quello degli abitanti di altri paesi", tr: { vi: "so sánh cách cư xử của người Ý với người các nước khác", en: "compare Italian behaviour with that of people from other countries" } },
        { it: "rispondere a comandi e dare comandi", tr: { vi: "đáp lại mệnh lệnh và ra lệnh", en: "respond to and give commands" } },
        { it: "proporre soluzioni per risolvere problemi di vita quotidiana", tr: { vi: "đề xuất giải pháp cho các vấn đề hằng ngày", en: "suggest solutions to everyday problems" } },
      ],
    },
    { type: "sectionTitle", text: "Cominciamo", banner: "DIAMOCI UNA REGOLA!" },
    {
      type: "exercise",
      ex: {
        id: "p086-ex1",
        number: "1",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        subtitle: "Immaginate di trovarvi in queste situazioni: che cosa fate?",
        tr: { vi: "Cùng nói: hãy tưởng tượng bạn ở trong những tình huống này: bạn sẽ làm gì?", en: "Let's talk: imagine you're in these situations: what do you do?" },
        items: [],
      },
    },
    {
      type: "columns",
      cols: [
        [{ type: "photo", src: "images/u5/p86-cena.jpg", alt: "1. A cena una signora fuma e il fumo dà fastidio a tutti" }],
        [{ type: "photo", src: "images/u5/p86-scarpe.jpg", alt: "2. In un negozio di scarpe un bambino suona la trombetta e una donna parla al telefono" }],
      ],
    },
    { type: "photo", src: "images/u5/p86-riunione.jpg", alt: "3. Un uomo entra in ritardo a una riunione" },
    {
      type: "exercise",
      ex: {
        id: "p086-ex1-r",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Che cosa fate?",
        tr: { vi: "Bạn sẽ làm gì?", en: "What do you do?" },
        items: [
          { id: "1", prompt: "Situazione 1: a cena qualcuno fuma a tavola.", sample: "Chiederei gentilmente alla signora di andare a fumare fuori." },
          { id: "2", prompt: "Situazione 2: in un negozio c'è troppo rumore.", sample: "Chiederei alla mamma di far smettere il bambino e uscirei dal negozio." },
          { id: "3", prompt: "Situazione 3: arrivate in ritardo a una riunione.", sample: "Entrerei in silenzio, chiederei scusa e mi siederei subito." },
        ],
      },
    },
    { type: "audio", src: "audio/u5-p86-ex2.mp3", title: "2", autoTranscript: true, transcript: "Maestra: Buongiorno, bambini. Oggi è il nostro primo giorno di lezione e vi dico alcune regole che dovete rispettare. Uno: non interrompete la maestra quando parla.\nBambini: Sì, sì, va bene.\nMaestra: Due: alzate la mano quando volete rispondere a una domanda. Mi raccomando, alzatela bene, così vi vedo subito. Tre: quando arrivate a scuola la mattina, appendete le giacche fuori dalla porta, aprite gli zaini, mettete solo alcuni quaderni sul banco, non prendeteli tutti. Quattro: fate silenzio durante la lezione. Cinque: quando andiamo a mensa, mettetevi in fila in modo ordinato, non spingetevi e non correte per le scale. Sei: scrivete bene i compiti che vi assegna la maestra e fateli vedere ai vostri genitori.\nIstruttore: Bene, signori, abbiamo studiato tutte le regole del codice stradale. Adesso vi do dei consigli sul comportamento del buon guidatore. Ricordatevi, quando vedete delle signore anziane o delle mamme con i passeggini, di dargli la precedenza. Non usate troppo il clacson nel centro delle città, per non creare rumore inutile. Poi, mi raccomando, se piove state attenti alle pozzanghere: non bagnate i poveri pedoni sui marciapiedi. Se avete dei bambini in macchina, ditegli di allacciare le cinture di sicurezza e di non gettare i rifiuti dai finestrini: è pericoloso e incivile. Cercate di essere sempre calmi al volante, non fate gesti sgradevoli agli automobilisti. E l'ultimo consiglio: fate spesso dei controlli alla vostra macchina." },
    {
      type: "exercise",
      ex: {
        id: "p086-ex2",
        number: "2",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo il testo e completiamo le frasi.",
        subtitle: "A scuola e in macchina…",
        tr: { vi: "Nghe đoạn văn và hoàn thành câu.", en: "Let's listen to the text and complete the sentences." },
        items: [
          { id: "1", sample: "non interrompetela.", prompt: "Quando la maestra parla,", lines: 1 },
          { id: "2", sample: "appendete le giacche fuori dalla porta, aprite gli zaini e mettete solo alcuni quaderni sul banco.", prompt: "Quando i bambini arrivano a scuola", lines: 1 },
          { id: "3", sample: "si mettono in fila in modo ordinato, non si spingono e non corrono per le scale.", prompt: "Quando i bambini vanno a mensa", lines: 1 },
          { id: "4", sample: "scriveteli bene e fateli vedere ai vostri genitori.", prompt: "Quando la maestra assegna i compiti,", lines: 1 },
          { id: "5", sample: "gli dà la precedenza.", prompt: "Il buon guidatore, quando vede delle signore anziane,", lines: 1 },
          { id: "6", sample: "stare attenti alle pozzanghere e non bagnare i pedoni.", prompt: "Se piove, gli autisti devono", lines: 1 },
          { id: "7", sample: "devono allacciare le cinture di sicurezza e non gettare i rifiuti dai finestrini.", prompt: "I bambini in macchina", lines: 1 },
          { id: "8", sample: "non devono fare gesti sgradevoli agli automobilisti.", prompt: "I guidatori devono essere sempre calmi al volante e", lines: 1 },
        ],
      },
    },
  ],
};

export default page;
