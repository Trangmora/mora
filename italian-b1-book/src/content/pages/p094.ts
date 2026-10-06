import type { BookPage } from "../../types";

/** Unità 5 · Rispetti le regole? — trang 94 (Facciamo pratica, bài 12: comportamenti nel mondo). */
const page: BookPage = {
  id: "p094",
  number: 94,
  unit: "5",
  unitTitle: "Rispetti le regole?",
  addedOn: "2026-10-07",
  sideTab: { unit: "U5", title: "Rispetti le regole?" },
  title: "Facciamo pratica · Paese che vai, usanza che trovi",
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica" },
    { type: "audio", src: "audio/u5-p94-ex12a.mp3", title: "12 A", autoTranscript: true, transcript: "Intervistatore: Bene, oggi facciamo delle interviste a degli amici di varie nazionalità per capire come si comportano in alcune situazioni. Cominciamo con Kiko, una ragazza giapponese di Tokyo. Allora Kiko, se veniamo in Giappone e abbiamo un invito a cena a casa di qualcuno, che cosa dobbiamo fare?\nKiko: Beh, sai, noi giapponesi siamo abbastanza formali, quindi quando entrate in una casa dovete togliervi le scarpe, lasciate parlare per primo il proprietario, non interrompetelo e non rifiutate la tazza di tè. Ah, poi non soffiatevi mai il naso in pubblico: dovete farlo in bagno!\nIntervistatore: Adesso è il turno di Gio, di Singapore. Nel tuo paese come dobbiamo comportarci per strada?\nGio: Ecco, non dovete mai buttare mozziconi di sigaretta per terra, altrimenti prendete una multa salata. Poi non portate mai cibi o bevande in metropolitana e non masticate chewing-gum in pubblico: per noi è un comportamento scortese.\nIntervistatore: Bene, Karl, tu sei austriaco, vero?\nKarl: Sì, sono di Salisburgo.\nIntervistatore: Bene, allora se veniamo in Austria, come ci dobbiamo comportare, per esempio, nei bar?\nKarl: Al bar non prendiamo il caffè al banco, ma ci sediamo al tavolo e possiamo stare per delle ore. Se avete un invito a cena, non portate torte, gelato o pasticcini: l'Austria ha una grande tradizione dolciaria e di solito il padrone di casa pensa al dolce.\nIntervistatore: Finiamo adesso con Pim. Tu sei tailandese, vero?\nPim: Sì, sono di Bangkok.\nIntervistatore: Allora, che cosa dobbiamo evitare nel tuo paese?\nPim: Beh, non dovete toccare mai la testa dei bambini, perché per noi la testa è sacra. Poi, se entrate in una casa e la padrona vi annusa l'orecchio, non spaventatevi: lo fa per capire se siete una persona positiva o negativa." },
    {
      type: "exercise",
      ex: { id: "p094-ex12a", number: "12", label: "A", icons: ["listen"], kind: "speak", skill: "listening", instruction: "Ascoltiamo le interviste.", tr: { vi: "Nghe các cuộc phỏng vấn.", en: "Let's listen to the interviews." }, items: [] },
    },
    {
      type: "exercise",
      ex: {
        id: "p094-ex12b",
        label: "B",
        icons: ["look", "speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo: rispondiamo alle domande.",
        intro: "1. Osservate le immagini: i seguenti comportamenti sono corretti o sbagliati? Perché?\n2. Come vi comportate nel vostro paese in queste situazioni?",
        tr: { vi: "Cùng nói: quan sát tranh: những cách cư xử sau đúng hay sai? Vì sao? Ở nước bạn, bạn cư xử thế nào trong những tình huống này?", en: "Let's talk: look at the pictures: are these behaviours right or wrong? Why? How do you behave in your country in these situations?" },
        items: [
          { id: "1", prompt: "Giappone: una ragazza rifiuta la tazza di tè.", image: "images/u5/p94-1.jpg", sample: "È sbagliato: in Giappone non si rifiuta mai la tazza di tè." },
          { id: "2", prompt: "Giappone: una ragazza entra in casa con le scarpe.", image: "images/u5/p94-2.jpg", sample: "È sbagliato: in Giappone ci si toglie le scarpe prima di entrare in casa." },
          { id: "3", prompt: "Singapore: un ragazzo mangia nella metropolitana.", image: "images/u5/p94-3.jpg", sample: "È sbagliato: a Singapore è vietato mangiare e bere in metropolitana." },
          { id: "4", prompt: "Austria: gli ospiti portano un regalo alla cena.", image: "images/u5/p94-4.jpg", sample: "I fiori vanno bene, ma non bisogna portare torte, gelato o pasticcini: il padrone di casa pensa al dolce." },
          { id: "5", prompt: "Thailandia: una donna tocca la testa di un bambino.", image: "images/u5/p94-5.jpg", sample: "È sbagliato: in Thailandia la testa è sacra e non si tocca." },
          { id: "6", prompt: "Thailandia: la padrona di casa annusa l'orecchio di un ospite.", image: "images/u5/p94-6.jpg", sample: "È corretto: non spaventatevi, lo fa per capire se siete una persona positiva o negativa." },
        ],
        layout: "board",
      },
    },
  ],
};

export default page;
