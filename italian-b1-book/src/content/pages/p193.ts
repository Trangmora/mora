import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 193 (La situazione, bài 9: All'ufficio turistico). */
const page: BookPage = {
  id: "p193",
  number: 193,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "La situazione · All'ufficio turistico",
  runningHead: "La situazione",
  banner: "All'ufficio turistico",
  blocks: [
    { type: "audio", src: "audio/u10-p193-ex9a.mp3", title: "9A", autoTranscript: true, transcript: "• Buongiorno. Vorremmo delle informazioni.\n○ Prego, ditemi.\n• Io e mia moglie siamo qui a Catania per tre giorni e poi proseguiremo per il nostro tour della Sicilia. Potrebbe dirci che cosa c'è di interessante da fare in questa città?\n○ Ah, bene! Siete arrivati proprio in un momento particolare perché in questi giorni celebriamo una festa molto importante.\n• Davvero? Quale?\n○ È la festa di Sant'Agata, una celebrazione molto antica che si svolge ogni anno.\n• Che cosa possiamo fare in città?\n○ Potete visitare la Chiesa di Sant'Agata, dove c'è il sacro Velo, che i fedeli conservano per ricordare il miracolo di Sant'Agata: nel 1669 la Santa, con il suo Velo, ha spostato la lava che aveva già fatto molti danni alla città.\n• E poi?\n○ È possibile visitare i monumenti e passeggiare per le vie del centro, che è molto caratteristico: nei balconi dei palazzi più antichi ci sono drappi di seta con i simboli della Santa e nelle piazze più importanti ci sono delle bandiere.\n• E nei giorni successivi?\n○ Beh, un gruppo di fedeli porta in processione la Santa: nel Palazzo degli Elefanti le autorità cittadine aspettano il passaggio della statua; i palazzi di via Etnea sono pieni di gente ai balconi.\n• Oh, immagino che sia uno spettacolo meraviglioso!\n○ Sì: luci, candele, fuochi d'artificio… e, poi, potete anche assaggiare delle buonissime specialità che si preparano a Catania in questa occasione e che si possono comprare in pasticceria o sulle bancarelle per le strade!\n• Ci può dare dei dépliant per guardare gli orari di apertura dei musei e una piantina della città?\n○ Certo! Qui trovate anche una lista dei negozi e dei ristoranti.\n• Grazie!" },
    {
      type: "exercise",
      ex: {
        id: "p193-ex9a",
        number: "9",
        label: "A",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn hội thoại với các từ đúng.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            image: { src: "images/u10/p193-turisti.jpg", alt: "Una coppia di turisti chiede informazioni a un impiegato", side: "right", width: 46 },
            text: "• Buongiorno. Vorremmo delle informazioni.\n○ Prego, ditemi.\n• Io e mia moglie siamo qui a Catania per tre giorni e poi proseguiremo per il nostro tour della Sicilia. Potrebbe dirci che cosa c'è di interessante da fare in questa città?\n○ Ah, bene! Siete arrivati proprio in un momento particolare perché in questi giorni {{celebriamo|si celebra|si festeggia}} una festa molto importante.\n• Davvero? Quale?\n○ È la festa di Sant'Agata, una celebrazione molto antica che {{si}} {{svolge}} ogni anno.\n• Che cosa possiamo fare in città?\n○ Potete visitare la Chiesa di Sant'Agata, dove c'è il sacro Velo, che i fedeli conservano per ricordare il {{miracolo}} di Sant'Agata: nel 1669 la Santa, con il suo Velo, ha spostato la lava che aveva già fatto molti danni alla città.\n• E poi?\n○ È possibile visitare i monumenti e passeggiare per le vie del centro, che è molto {{caratteristico}}: nei {{balconi}} dei palazzi più antichi ci sono drappi di seta con i {{simboli}} della Santa e nelle piazze più importanti ci sono delle {{bandiere}}.\n• E nei giorni successivi?\n○ Beh, un gruppo di fedeli porta in {{processione}} la Santa: nel Palazzo degli Elefanti le autorità cittadine aspettano il passaggio della {{statua}}; i palazzi di via Etnea sono pieni di gente ai balconi.\n• Oh, immagino che sia uno spettacolo meraviglioso!\n○ Sì: luci, candele, {{fuochi}} d'artificio… e, poi, potete anche {{assaggiare}} delle buonissime specialità che {{si}} {{preparano}} a Catania in questa occasione e che si possono comprare in pasticceria o sulle {{bancarelle}} per le strade!\n• Ci può dare dei dépliant per guardare gli orari di apertura dei musei e una {{piantina|cartina|mappa}} della città?\n○ Certo! Qui trovate anche una lista dei negozi e dei ristoranti.\n• Grazie!",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p193-ex9b",
        label: "B",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [
          { id: "1", prompt: "Siete in un ufficio turistico di una città italiana: chiedete informazioni.", sample: "• Buongiorno, siamo a Firenze per due giorni: che cosa ci consiglia di vedere? ○ Potete visitare gli Uffizi e salire sulla cupola del Duomo." },
          { id: "2", prompt: "Avete mai assistito a una festa particolare nelle strade del vostro paese o all'estero? Raccontatela!", sample: "Sì, l'anno scorso ho visto il Carnevale di Venezia: c'erano maschere bellissime dappertutto." },
        ],
      },
    },
  ],
};

export default page;
