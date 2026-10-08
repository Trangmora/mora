import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 175 (Facciamo pratica, bài 12: La solidarietà in Italia, intervista a Lino Banfi). */
const page: BookPage = {
  id: "p175",
  number: 175,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Facciamo pratica · Intervista a Lino Banfi",
  banner: "ANCORA INTERVISTE!",
  blocks: [
    { type: "sectionTitle", text: "Facciamo pratica" },
    {
      type: "exercise",
      ex: { id: "p175-ex12a", number: "12", label: "A", icons: ["read"], kind: "speak", skill: "reading", instruction: "Leggiamo.", subtitle: "La solidarietà in Italia: intervista all'attore Lino Banfi", tr: { vi: "Cùng đọc: Tinh thần tương thân tương ái ở Ý — phỏng vấn diễn viên Lino Banfi.", en: "Let's read: Solidarity in Italy — an interview with the actor Lino Banfi." }, items: [] },
    },
    {
      type: "columns",
      widths: [1, 1],
      cols: [
        [{ type: "photo", src: "images/u9/p175-banfi.jpg", alt: "Lino Banfi con due amici e un pallone" }],
        [{ type: "photo", src: "images/u9/p175-bambini.jpg", alt: "Un gruppo di bambini africani" }],
      ],
    },
    { type: "text", it: "Pasquale Zagaria, dopo anni di attività teatrale, ha raggiunto, con il nome d'arte di Lino Banfi, una grande popolarità grazie a oltre 100 film. Dal 1975 è diventato una star della televisione italiana: ha mostrato in numerose fiction le sue doti di attore non solo comico, ma anche drammatico.\nNelle seconda parte della sua carriera artistica Banfi ha scelto di privilegiare i valori della famiglia italiana e di difendere gli ideali della tolleranza e della solidarietà verso i meno fortunati. Per questo nel 2000 ha ricevuto la nomina a “Goodwill Ambassador” dell'Unicef-Italia, con il compito di “sensibilizzare l'opinione pubblica e in particolar modo le famiglie sui problemi dell'infanzia, testimoniare e promuovere, con l'impegno nel mondo dello spettacolo, la solidarietà alle iniziative dell'Unicef”." },
    { type: "audio", src: "audio/u9-p175-ex12b.mp3", title: "12B", autoTranscript: true, transcript: "– Oggi intervistiamo l'attore Lino Banfi per fargli alcune domande sul suo impegno per l'Unicef e per capire qual è oggi la situazione in Italia nel campo della beneficenza e dell'impegno nel sociale. Bene Lino, quante missioni hai svolto per l'Unicef?\n– Ecco, io ho fatto nel marzo 2001 una missione in Eritrea per avere materiale sportivo per i bambini e nel maggio 2003 una nuova missione in Angola.\n– Hai anche realizzato uno spot televisivo?\n– Sì, nell'autunno 2001 ho realizzato uno spot televisivo per sostenere la campagna a favore dei bambini dell'Afghanistan. Uno dei ricordi più emozionanti, però, è stato quando nel giugno 2002 ho partecipato, su invito del Segretario Generale dell'ONU Kofi Annan, alla riunione di tutti i Goodwill Ambassador e i Messaggeri di Pace delle Nazioni Unite.\n– Lino, quanto si impegnano gli italiani per aiutare i popoli più poveri?\n– Beh, oggi la situazione è migliore rispetto al passato: sembra che il 45% degli italiani abbia fatto almeno una donazione nell'ultimo anno.\n– In quali campi gli italiani concentrano le maggiori offerte di denaro?\n– Soprattutto nella ricerca medica, anche grazie a iniziative come Telethon. Molte offerte vanno poi alle vittime delle guerre e negli aiuti umanitari di emergenza, nella lotta contro la fame nel mondo e per la povertà in Italia.\n– Chi dona di più?\n– Sembra che la solidarietà sia una virtù femminile: il 51% delle donne rispetto al 39% degli uomini; e sembra che gli adulti e gli anziani diano di più dei giovani.\n– Cosa dovremmo fare per sensibilizzare di più i nostri ragazzi?\n– Credo che dovremmo andare nelle scuole per parlare con loro e mostrargli la realtà di chi è meno fortunato.\n– Grazie, Lino." },
    {
      type: "exercise",
      ex: {
        id: "p175-ex12b",
        label: "B",
        icons: ["listen", "write"],
        kind: "write",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo l'intervista e scriviamo: rispondiamo alle domande.",
        tr: { vi: "Nghe bài phỏng vấn và viết: trả lời các câu hỏi.", en: "Let's listen to the interview and write: answer the questions." },
        items: [
          { id: "1", prompt: "1. Quante missioni ha svolto Lino Banfi per l'Unicef?", lines: 1, sample: "Due: nel marzo 2001 in Eritrea e nel maggio 2003 in Angola." },
          { id: "2", prompt: "2. Che cosa ha fatto nel giugno del 2002?", lines: 2, sample: "Su invito del Segretario Generale dell'ONU Kofi Annan, ha partecipato alla riunione di tutti i Goodwill Ambassador e i Messaggeri di Pace delle Nazioni Unite." },
          { id: "3", prompt: "3. In quali campi gli italiani concentrano le maggiori offerte di denaro? (Scrivetene almeno due).", lines: 2, sample: "Nella ricerca medica, negli aiuti alle vittime delle guerre e negli aiuti umanitari di emergenza, nella lotta contro la fame nel mondo e per la povertà in Italia." },
          { id: "4", prompt: "4. Donano più le donne o gli uomini?", lines: 1, sample: "Le donne: il 51% delle donne rispetto al 39% degli uomini." },
          { id: "5", prompt: "5. Cosa propone di fare Lino Banfi per sensibilizzare i giovani?", lines: 2, sample: "Propone di andare nelle scuole per parlare con i ragazzi e mostrare loro la realtà di chi è meno fortunato." },
        ],
      },
    },
  ],
};

export default page;
