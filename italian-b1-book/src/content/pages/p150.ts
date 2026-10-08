import type { BookPage } from "../../types";

/** Unità 8 · Andiamo in edicola! — trang 150 (Osserviamo bene, bài 8: Gli italiani e i giornali). */
const page: BookPage = {
  id: "p150",
  number: 150,
  unit: "8",
  unitTitle: "Andiamo in edicola!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U8", title: "Andiamo in edicola!" },
  title: "Osserviamo bene · Gli italiani e i giornali",
  runningHead: "Osserviamo bene",
  blocks: [
    { type: "audio", src: "audio/u8-p150-ex8.mp3", title: "8", autoTranscript: true, transcript: "Gli italiani e i giornali.\n– Buonasera, carissimi ascoltatori! Oggi vi proponiamo un servizio interessante sui nostri giornali: abbiamo chiesto in giro qual è il quotidiano che gli italiani leggono più spesso. Sentiamo cosa ci hanno risposto!\n– Io preferisco La Stampa, di Torino: mi piace leggere le notizie sulla mia città e penso che questo giornale proponga dei servizi molto interessanti. Non mi perdo mai, nella prima pagina, la rubrica della cantante Mina: credo che le sue osservazioni su alcuni comportamenti degli italiani siano sempre molto profonde e intelligenti.\n– Non ho un giornale preferito, mi piace leggere un po' di tutto: adoro lo sport, gli spettacoli, la moda. È importante, comunque, che il giornale abbia delle pagine a colori e delle pubblicità stimolanti…\n– Sono una vecchia lettrice del quotidiano La Nazione: lo compro sempre, ci sono articoli di cronaca locale, notizie sulla mia città e poi… mio figlio scrive proprio su questo giornale: mi sembra giusto leggerlo, no?\n– Studio economia, sto finendo l'ultimo anno all'università. Immagino che sappiate già che cosa leggo: Il Sole 24 Ore! Penso che sia un giornale molto utile per i miei studi e credo che anche l'inserto culturale della domenica sia veramente interessante!\n– A dire la verità non leggo tutti i giorni il giornale, preferisco i settimanali o i periodici: mi sembra che, per esempio, l'Espresso e Panorama offrano un ritratto della nostra società completo e approfondito." },
    {
      type: "exercise",
      ex: {
        id: "p150-ex8",
        number: "8",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn văn với các từ đúng.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            title: "Gli italiani e i giornali",
            image: { src: "images/u8/p150-giornali.jpg", alt: "Giornali piegati in un espositore rosso", side: "right", width: 50 },
            text: "– Buonasera, carissimi ascoltatori! Oggi vi proponiamo un *servizio* interessante sui nostri giornali: abbiamo chiesto in giro qual è il {{quotidiano}} che gli italiani leggono più spesso. Sentiamo cosa ci hanno risposto!\n– Io preferisco *La Stampa*, di Torino: mi piace leggere le {{notizie}} sulla mia città e penso che questo giornale {{proponga}} dei servizi molto interessanti. Non mi perdo mai, nella {{prima}} {{pagina}}, la rubrica della cantante Mina: credo che le sue {{osservazioni}} su alcuni comportamenti degli italiani {{siano}} sempre molto {{profonde}} e intelligenti.\n– Non ho un giornale {{preferito}}, mi piace leggere un po' di tutto: adoro lo sport, gli spettacoli, la moda. È importante, comunque, che il giornale {{abbia}} delle {{pagine}} a colori e delle {{pubblicità}} stimolanti…",
          },
          {
            image: { src: "images/u8/p150-lettore.jpg", alt: "Un ragazzo legge un giornale rosa per strada", side: "left", width: 25 },
            text: "– Sono una vecchia {{lettrice}} del quotidiano *La Nazione*: lo compro sempre, ci sono {{articoli}} di cronaca {{locale}}, notizie sulla mia città e poi… mio figlio scrive proprio su questo giornale: mi sembra giusto leggerlo, no?",
          },
          {
            image: { src: "images/u8/p150-espresso.jpg", alt: "La copertina del settimanale L'Espresso", side: "right", width: 22 },
            text: "– Studio economia, sto finendo l'ultimo anno all'università. Immagino che {{sappiate}} già che cosa leggo: *Il Sole 24ore*! Penso che {{sia}} un giornale molto utile per i miei studi e credo che anche l'{{inserto}} culturale della domenica {{sia}} veramente interessante!\n– A dire la verità non leggo tutti i giorni il giornale, preferisco i {{settimanali}} o i {{periodici}}: mi sembra che, per esempio, l'*Espresso* e *Panorama* {{offrano}} un {{ritratto}} della nostra società completo e {{approfondito}}.",
          },
        ],
      },
    },
  ],
};

export default page;
