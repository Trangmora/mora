import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 140 (Scrittura e pronuncia, bài 16–18: ni/gni/gn, gli/li/lli, Parlami d'amore Mariù). */
const page: BookPage = {
  id: "p140",
  number: 140,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", color: "#d8333a" },
  title: "Scrittura e pronuncia · ni/gni/gn, gli/li/lli",
  blocks: [
    { type: "sectionTitle", text: "Scrittura e pronuncia" },
    { type: "audio", src: "audio/u7-p140-ex16.mp3", title: "16", autoTranscript: true, transcript: "1. Impara i segnali stradali! 2. Non sognare ad occhi aperti! 3. Devi impegnarti per riuscire a laurearti in ingegneria. 4. Ascoltate la nona sinfonia di Beethoven! 5. Devi essere più mattiniero. 6. Domenica prossima andate in campagna o in montagna? 7. Non ho per niente fame! 8. Abbiamo bisogno di un giardiniere. 9. Questa tuta con la cerniera ha un prezzo conveniente." },
    {
      type: "exercise",
      ex: {
        id: "p140-ex16",
        number: "16",
        icons: ["listen", "write"],
        kind: "fill",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo le parole con ni, gni, gn.",
        example: { q: "1. Impara i se___ali stradali!", a: "Impara i se**gn**ali stradali!" },
        tr: { vi: "Nghe và điền ni, gni hoặc gn vào các từ.", en: "Let's listen and complete the words with ni, gni, gn." },
        items: [
          { id: "2", prompt: "2. Non so___are ad occhi aperti!", answers: ["gn"] },
          { id: "3", prompt: "3. Devi impe___arti per riuscire a laurearti in inge___eria.", answers: ["gn", "gn"] },
          { id: "4", prompt: "4. Ascoltate la nona sinfo___a di Beethoven!", answers: ["ni"] },
          { id: "5", prompt: "5. Devi essere più matti___ero.", answers: ["ni"] },
          { id: "6", prompt: "6. Domenica prossima andate in campa___a o in monta___a?", answers: ["gn", "gn"] },
          { id: "7", prompt: "7. Non ho per ___ente fame!", answers: ["ni"] },
          { id: "8", prompt: "8. Abbiamo biso___o di un giardi___ere.", answers: ["gn", "ni"] },
          { id: "9", prompt: "9. Questa tuta con la cer___era ha un prezzo conve___ente.", answers: ["ni", "ni"] },
        ],
      },
    },
    { type: "audio", src: "audio/u7-p140-ex17.mp3", title: "17", autoTranscript: true, transcript: "1. Il ladro ha rubato al gioielliere molti gioielli. 2. Che sollievo! Ho finito gli esami! 3. Andrea ha acquistato un bel maglione di lana. 4. Il maestro considera i suoi allievi come dei figli. 5. Alla vigilia di Natale i bambini erano molto agitati. 6. Abbiamo mangiato la pasta con aglio, olio e peperoncino. 7. Ho visto un film sugli alieni. 8. La famiglia di Carla è di origine emiliana. 9. Ho comprato un biglietto della lotteria e spero di vincere un milione di euro." },
    {
      type: "exercise",
      ex: {
        id: "p140-ex17",
        number: "17",
        icons: ["listen", "write"],
        kind: "fill",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo le parole con gli, li, lli.",
        example: { q: "1. Il ladro ha rubato al gioie___ere molti gioielli.", a: "Il ladro ha rubato al gioie**lli**ere molti gioielli." },
        tr: { vi: "Nghe và điền gli, li hoặc lli vào các từ.", en: "Let's listen and complete the words with gli, li, lli." },
        items: [
          { id: "2", prompt: "2. Che so___evo! Ho finito gli esami!", answers: ["lli"] },
          { id: "3", prompt: "3. Andrea ha acquistato un bel ma___one di lana.", answers: ["gli"] },
          { id: "4", prompt: "4. Il maestro considera i suoi a___evi come dei fi___.", answers: ["lli", "gli"] },
          { id: "5", prompt: "5. Alla vigi___a di Natale i bambini erano molto agitati.", answers: ["li"] },
          { id: "6", prompt: "6. Abbiamo mangiato la pasta con a___o, o___o e peperoncino.", answers: ["gli", "li"] },
          { id: "7", prompt: "7. Ho visto un film su___ a___eni.", answers: ["gli", "li"] },
          { id: "8", prompt: "8. La fami___a di Carla è di origine emi___ana.", answers: ["gli", "li"] },
          { id: "9", prompt: "9. Ho comprato un bi___etto della lotteria e spero di vincere un mi___one di euro.", answers: ["gli", "li"] },
        ],
      },
    },
    { type: "audio", src: "audio/u7-p140-ex18.mp3", title: "18", autoTranscript: true, transcript: "Parlami d'amore, Mariù,\ntutta la mia vita sei tu.\nGli occhi tuoi belli brillano,\nfiamme di sogno scintillano.\nDimmi che illusione non è,\ndimmi che sei tutta per me.\nQui sul tuo cuor non soffro più,\nparlami d'amore, Mariù…!" },
    {
      type: "exercise",
      ex: {
        id: "p140-ex18",
        number: "18",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo la canzone con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành bài hát với các từ đúng.", en: "Let's listen and complete the song with the right words." },
        parts: [
          {
            columns: 2,
            title: "PARLAMI D'AMORE, MARIÙ — di Beniamino Gigli",
            text: "{{Parlami}} d'amore, Mariù,\ntutta la {{mia}} {{vita}} sei tu.\nGli occhi tuoi belli {{brillano}},\n{{fiamme}} di sogno {{scintillano}}.\n{{Dimmi}} che illusione non è,\ndimmi che sei {{tutta}} {{per}} me.\nQui sul tuo cuor non {{soffro}} più,\n{{parlami|Parlami}} d'amore, Mariù…!",
          },
        ],
      },
    },
  ],
};

export default page;
