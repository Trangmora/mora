import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 93 (La situazione: In autobus, bài 11). */
const page: BookPage = {
  id: "p093",
  number: 93,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "La situazione · In autobus",
  runningHead: "La situazione",
  ribbon: "In autobus",
  blocks: [
    { type: "audio", src: "audio/u5-p93-ex11a.mp3", title: "11 A", autoTranscript: true, transcript: "Turista: Buongiorno, avrei bisogno di un aiuto, sono una turista inglese: è la prima volta che prendo l'autobus qui a Siena. Mi potrebbe dare delle informazioni?\nImpiegato: Certo, qui trova gli orari. Poi deve comprare un biglietto: lo può trovare nelle tabaccherie o nelle edicole. Mi raccomando, deve obliterare il biglietto, lo deve conservare per la durata del percorso e lo deve mostrare al personale di vigilanza.\nTurista: Se la macchinetta non funziona, che faccio?\nImpiegato: Se la macchinetta per obliterare il biglietto non funziona, scriva la data e l'ora di inizio del viaggio sul biglietto. Comunque può leggere il regolamento sull'autobus.\nTurista: Oh, grazie mille, lo leggo senz'altro. Ah, eccolo! Guarda, Paul, leggiamolo! Occupate un solo posto a sedere. Rispettate i posti riservati. Non disturbate gli altri viaggiatori. Non sporcate e non danneggiate i mezzi. Non trasportate oggetti pericolosi. Non portate armi. Non usate segnali di allarme se non in caso di pericolo. Non fumate. Non gettate oggetti dai finestrini." },
    {
      type: "exercise",
      ex: {
        id: "p093-ex11a",
        number: "11",
        label: "A",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn văn với từ thích hợp.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            image: { src: "images/u5/p93-autobus.jpg", alt: "Un autobus arancione a Siena", side: "right", width: 38 },
            text: "• Buongiorno, avrei bisogno di un aiuto, sono una turista inglese: è la prima volta che prendo l'autobus qui a Siena. Mi potrebbe dare delle informazioni?\n○ Certo, qui trova gli {{orari}}. Poi deve comprare un biglietto: lo può trovare nelle tabaccherie o nelle edicole. Mi {{raccomando}}, deve obliterare il biglietto, lo deve {{conservare}} per la durata del percorso e lo deve mostrare al personale di vigilanza.\n• Se la macchinetta non funziona, che faccio?\n○ Se la macchinetta per obliterare il biglietto non funziona, scriva la data e l'ora di inizio del viaggio sul biglietto. Comunque può leggere il regolamento sull'autobus.\n• Oh, grazie mille, lo leggo senz'altro. Ah, eccolo! Guarda, Paul, leggiamolo.",
          },
        ],
      },
    },
    { type: "photo", src: "images/u5/p93-regole.jpg", alt: "Il regolamento dell'autobus: nove disegni con le regole" },
    {
      type: "exercise",
      ex: {
        id: "p093-ex11a-regole",
        icons: ["listen", "write"],
        kind: "fill",
        skill: "listening",
        instruction: "Il regolamento: completiamo le regole.",
        tr: { vi: "Nội quy xe buýt: hoàn thành các quy định.", en: "The bus rules: complete the rules." },
        items: [
          { id: "1", prompt: "1. ___ un solo posto a sedere.", answers: ["Occupate"] },
          { id: "2", prompt: "2. ___ i posti riservati.", answers: ["Rispettate"] },
          { id: "3", prompt: "3. Non ___ gli altri viaggiatori.", answers: ["disturbate"] },
          { id: "4", prompt: "4. Non ___ e non ___ i mezzi.", answers: ["sporcate", "danneggiate"] },
          { id: "5", prompt: "5. Non ___ oggetti pericolosi.", answers: ["trasportate"] },
          { id: "6", prompt: "6. Non ___ armi.", answers: ["portate"] },
          { id: "7", prompt: "7. Non ___ segnali di allarme se non in caso di pericolo.", answers: ["usate"] },
          { id: "8", prompt: "8. Non ___.", answers: ["fumate"] },
          { id: "9", prompt: "9. Non ___ oggetti dai finestrini.", answers: ["gettate|buttate"] },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p093-ex11b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo (a coppie).",
        intro: "Siete alla stazione di Milano: dovete prendere un treno per andare a Bologna, chiedete informazioni.",
        tr: { vi: "Nói theo cặp: bạn ở ga Milano, cần đi tàu đến Bologna, hãy hỏi thông tin.", en: "Talk in pairs: you're at Milan station and need a train to Bologna: ask for information." },
        items: [{ id: "1", prompt: "Chiedete informazioni sul treno per Bologna.", sample: "Scusi, a che ora parte il prossimo treno per Bologna? Da quale binario? Quanto costa il biglietto e dove devo convalidarlo?" }],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p093-ex11c",
        label: "C",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo.",
        tr: { vi: "Cùng viết.", en: "Let's write." },
        items: [
          { id: "1", prompt: "Scrivete il regolamento di un villaggio turistico elegante in una località della Sardegna.", lines: 4, sample: "Rispettate il silenzio dalle 14 alle 16 e dopo le 23. Non lasciate rifiuti in spiaggia. Vestitevi in modo adeguato al ristorante. Non portate animali in piscina." },
          { id: "2", prompt: "Siete i proprietari di una piscina: decidete il regolamento per i bagnanti.", lines: 4, sample: "Fate la doccia prima di entrare in acqua. Mettete la cuffia. Non correte intorno alla piscina. Non tuffatevi dove l'acqua è bassa. Non mangiate in acqua." },
        ],
      },
    },
  ],
};

export default page;
