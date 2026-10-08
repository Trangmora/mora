import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 167 (Cominciamo, bài 2–3: Leonardo Pieraccioni). */
const page: BookPage = {
  id: "p167",
  number: 167,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Cominciamo · Un'intervista a Pieraccioni",
  runningHead: "Cominciamo",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p167-ex2a",
        number: "2",
        label: "A",
        icons: ["write"],
        kind: "write",
        skill: "writing",
        instruction: "Scriviamo: completiamo la tabella.",
        intro: "Quali sono nel vostro paese i personaggi più importanti in questi settori?",
        tr: { vi: "Cùng viết: hoàn thành bảng.", en: "Let's write: complete the table." },
        items: [{ id: "1", prompt: "Cinema, economia, giornalismo, letteratura, medicina, moda, religione, scienza, sport: scrivete un nome per ogni settore.", lines: 3, sample: "Cinema: … · Economia: … · Giornalismo: … · Letteratura: … · Medicina: … · Moda: … · Religione: … · Scienza: … · Sport: …" }],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p167-ex2b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [{ id: "1", prompt: "Adesso a piccoli gruppi spiegate le vostre scelte.", sample: "Per il cinema ho scelto… perché i suoi film sono famosi in tutto il mondo. Per lo sport ho scelto…" }],
      },
    },
    { type: "audio", src: "audio/u9-p167-ex3.mp3", title: "3", autoTranscript: true, transcript: "– Oggi siamo in compagnia di Leonardo Pieraccioni, senza dubbio un attore e un regista molto amato. Vorremmo chiedergli come mai i suoi film hanno tanto successo.\n– Grazie mille per i complimenti. Tutti pensano che io abbia cominciato questa carriera seriamente; in realtà ho scoperto il mondo del cinema un po' per caso. All'inizio non ero un regista esperto, poi ho studiato e ho capito una cosa fondamentale: bisogna avere un contatto diretto con il pubblico, bisogna scoprire che cosa vuole la gente.\n– Sì, è vero, per questo i tuoi film sono semplici, divertenti…\n– Infatti penso che sia importante capire i gusti delle persone che vengono a guardare i miei film. In fondo, quando giro un film, penso sempre di essere anche uno spettatore e quindi mi voglio divertire.\n– Qual è il film che ti ha dato più successo?\n– Penso che sia stato Il ciclone. In quel film c'è tutto quello che la mia generazione voleva vedere: belle ragazze, avventure sentimentali, storie d'amore, scene divertenti e comiche.\n– E che cosa pensi in generale del cinema italiano?\n– Il nostro cinema non è in crisi, come invece molti sostengono. Abbiamo produzioni di successo che riescono a superare gli incassi dei film stranieri. Soprattutto preferiamo guardare i film comici, perché abbiamo voglia di passare un paio d'ore rilassanti.\n– E i film più impegnati?\n– Guardiamo spesso anche quelli. Oggi ci sono tantissimi attori bravi che lavorano anche all'estero e che tutto il mondo ci invidia.\n– C'è un film italiano che secondo te tutti dovremmo vedere?\n– Beh, ce ne sono molti, ma credo che nella storia del cinema La dolce vita sia stato un capolavoro veramente unico. È il film italiano che mi piace di più.\n– Un'ultima domanda: che ne dici dei nuovi registi italiani?\n– Penso che siano tutti molto preparati. Il migliore per me è Gabriele Salvatores: non è un caso che abbia vinto l'Oscar con Mediterraneo un po' di anni fa." },
    {
      type: "exercise",
      ex: {
        id: "p167-ex3",
        number: "3",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo l'intervista e rispondiamo alle domande.",
        tr: { vi: "Nghe bài phỏng vấn và trả lời các câu hỏi.", en: "Let's listen to the interview and answer the questions." },
        items: [
          { id: "1", prompt: "1. Qual è il rapporto di Leonardo Pieraccioni con il pubblico?", lines: 1, sample: "Ha un contatto diretto con il pubblico: cerca di capire che cosa vuole la gente e i suoi gusti." },
          { id: "2", prompt: "2. Qual è il suo film più famoso?", lines: 1, sample: "Il ciclone." },
          { id: "3", prompt: "3. Che cosa pensa Pieraccioni del cinema italiano?", lines: 1, sample: "Pensa che non sia in crisi: ci sono produzioni di successo che superano gli incassi dei film stranieri e tanti attori bravi che lavorano anche all'estero." },
          { id: "4", prompt: "4. Qual è il suo film e il suo regista preferito?", lines: 1, sample: "Il suo film preferito è La dolce vita; il suo regista preferito è Gabriele Salvatores." },
          { id: "5", prompt: "5. E voi che cosa pensate del cinema italiano?", lines: 2, sample: "Penso che il cinema italiano sia molto interessante: mi piacciono soprattutto le commedie e i film di…" },
        ],
      },
    },
    { type: "columns", widths: [1, 1], cols: [[{ type: "photo", src: "images/u9/p167-locandine.jpg", alt: "Le locandine dei film di Leonardo Pieraccioni Ti amo in tutte le lingue del mondo e Il ciclone" }], []] },
  ],
};

export default page;
