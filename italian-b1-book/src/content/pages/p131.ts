import type { BookPage } from "../../types";

/** Unità 7 · Parole e musica — trang 131 (Osserviamo bene, bài 7B: La classifica dei cantanti; 7C Parliamo). */
const page: BookPage = {
  id: "p131",
  number: 131,
  unit: "7",
  unitTitle: "Parole e musica",
  addedOn: "2026-10-08",
  sideTab: { unit: "U7", title: "Parole e musica" },
  title: "Osserviamo bene · La classifica dei cantanti",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "theory",
      text: "! ATTENZIONE!\nIl superlativo relativo può perdere la ***e*** finale quando si trova davanti ai nomi:\n> La **maggior** parte dei cantanti italiani ha molto successo all'estero.\n> Tiziano Ferro è **il miglior** cantante italiano degli ultimi anni.",
    },
    { type: "audio", src: "audio/u7-p131-ex7b.mp3", title: "7B", autoTranscript: true, transcript: "La classifica dei cantanti più richiesti alla radio. Carissimi ascoltatori, vi parla il vostro Linus da Radio Deejay. Oggi vi proponiamo una classifica un po' speciale: l'avete realizzata voi, in questi ultimi anni, con i cantanti più richiesti alla nostra radio! Partiamo? Bene, al decimo posto troviamo Mina, la cantante più importante del panorama musicale: chi non la conosce? Chi non ha mai cantato la canzone Parole, parole, parole…? Una canzone indimenticabile. Al nono posto abbiamo il nostro Franco Battiato, il miglior compositore degli ultimi tempi: chi non ricorda La cura? All'ottavo posto ecco Giorgia, non ci credevate vero? La ragazza con la voce più nuova e potente di tutte: una vera rivelazione! Al settimo posto Ivano Fossati, uno dei cantautori italiani più autorevoli: tutti abbiamo ballato La mia banda suona il rock, ve lo ricordate? In sesta posizione arriva Gianni Morandi, l'eterno ragazzo della musica italiana, uno dei più amati, perché ha dato tanto alla nostra storia musicale! Adesso siamo al quinto posto: incontriamo la splendida voce di Carmen Consoli, che ha realizzato la colonna sonora del film più visto del cinema italiano degli ultimi anni, L'ultimo bacio. In quarta posizione, ecco uno dei miei cantanti preferiti, Lucio Battisti, il maggior autore e interprete di tutta la musica melodica italiana. Siamo alla fine: al terzo posto Antonello Venditti, il cuore di Roma, il cantante che mette veramente una grande passione nelle sue canzoni! Al secondo posto il nostro Claudio Baglioni, il cantante più seguito nei concerti, che dal 1971 accompagna ogni nostra storia sentimentale. Ma il primo, il migliore di tutti, quello che ascoltiamo sempre, che riempie gli stadi e ci fa venire i brividi è sempre lui, Vasco Rossi, l'interprete più originale della nostra musica rock." },
    {
      type: "exercise",
      ex: {
        id: "p131-ex7b",
        label: "B",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn văn với các từ đúng.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            boxed: true,
            title: "La classifica dei cantanti più richiesti alla radio",
            image: { src: "images/u7/p131-mina.jpg", alt: "Mina", side: "left", width: 30 },
            text: "Carissimi ascoltatori, vi parla il vostro Linus da Radio Deejay. Oggi vi proponiamo una *classifica* un po' speciale: l'avete realizzata voi, in questi ultimi anni, con i {{cantanti}} più richiesti alla nostra radio! Partiamo? Bene, al decimo posto troviamo Mina, la cantante {{più}} {{importante}} del panorama {{musicale}}: chi non la conosce? Chi non ha mai cantato la canzone *Parole, parole, parole…*? Una canzone indimenticabile. Al nono posto abbiamo il nostro Franco Battiato, il {{miglior|migliore}} {{compositore}} degli ultimi tempi: chi non ricorda *La cura*? All'ottavo posto ecco Giorgia, non ci credevate vero? La ragazza con la voce più nuova e {{potente}} di tutte: una vera rivelazione! Al settimo posto Ivano Fossati, uno dei cantautori italiani {{più}} {{autorevoli}}: tutti abbiamo ballato *La mia banda suona il rock*, ve lo ricordate? In sesta posizione arriva Gianni Morandi, l'eterno ragazzo della musica italiana, uno {{dei}} più {{amati}}, perché ha dato tanto alla nostra storia musicale! Adesso siamo al quinto posto: incontriamo la splendida voce di Carmen Consoli, che ha realizzato la {{colonna}} {{sonora}} del film {{più}} {{visto}} del cinema italiano degli ultimi anni, *L'ultimo bacio*.",
          },
          {
            boxed: true,
            image: { src: "images/u7/p131-vasco.jpg", alt: "Vasco Rossi", side: "right", width: 38 },
            text: "In quarta posizione, ecco uno dei miei cantanti preferiti, Lucio Battisti, il {{maggior|maggiore}} {{autore}} e {{interprete}} di tutta la musica {{melodica}} italiana. Siamo alla fine: al terzo posto Antonello Venditti, il cuore di Roma, il cantante che mette veramente una grande passione nelle sue canzoni! Al secondo posto il nostro Claudio Baglioni, il cantante {{più}} {{seguito}} nei concerti, che dal 1971 accompagna ogni nostra storia sentimentale. Ma il primo, il {{migliore}} {{di}} {{tutti}}, quello che ascoltiamo sempre, che riempie gli stadi e ci fa venire i brividi è sempre lui, Vasco Rossi, l'{{interprete}} {{più}} {{originale}} della nostra musica rock.",
          },
        ],
      },
    },
    {
      type: "exercise",
      ex: {
        id: "p131-ex7c",
        label: "C",
        icons: ["speak"],
        kind: "speak",
        skill: "speaking",
        instruction: "Parliamo.",
        tr: { vi: "Cùng nói.", en: "Let's talk." },
        items: [{ id: "1", prompt: "Quali sono i cantanti più amati nel vostro paese? Fate una classifica e presentatela alla classe.", sample: "Nel mio paese il cantante più amato è… Al secondo posto c'è…, la cantante con la voce più bella di tutte. Al terzo posto…" }],
      },
    },
  ],
};

export default page;
