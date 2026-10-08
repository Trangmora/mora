import type { BookPage } from "../../types";

/** Unità 10 · Tradizioni popolari — trang 192 (Osserviamo bene, bài 8: La festa dei Ceri a Gubbio). */
const page: BookPage = {
  id: "p192",
  number: 192,
  unit: "10",
  unitTitle: "Tradizioni popolari",
  addedOn: "2026-10-08",
  sideTab: { unit: "U10", title: "Tradizioni popolari" },
  title: "Osserviamo bene · La festa dei Ceri a Gubbio",
  runningHead: "Osserviamo bene",
  blocks: [
    { type: "audio", src: "audio/u10-p192-ex8.mp3", title: "8", autoTranscript: true, transcript: "La festa dei Ceri a Gubbio.\n• Intervistiamo il professor Cardini sulle tradizioni religiose più antiche in Italia: allora, professore, quando si vuole partecipare a una festa veramente unica, si può andare alla festa dei Ceri di Gubbio?\n○ Certo, questa manifestazione ha una storia antichissima. Si dice che sia la festa folcloristica più antica d'Italia. Qualcuno crede che sia nata nel 1160 per ringraziare il vescovo della città, Ubaldo Baldassini, che aveva fatto moltissime cose per aiutare il popolo; alcuni invece sostengono che sia una rievocazione della festa per Cerere, la divinità dei raccolti.\n• E quali sono le celebrazioni particolari di questa festa?\n○ Beh, fino al 1600 c'era una grande processione di ceri e candele nelle vie della città: si partecipava di notte, con un piccolo candelotto di cera in mano, e si arrivava fino al monte Ingino, che si trova proprio sopra la città, per visitare la tomba del Vescovo. In epoca più moderna i candelotti sono diventati a poco a poco dei grossi ceri.\n• Chi sono i protagonisti della festa?\n○ Sono i ceraioli, alcuni fra i cittadini nati a Gubbio. In quei giorni si è molto orgogliosi di appartenere a questa comunità. Prima il ceraiolo era un mestiere e ogni padre lo insegnava ai figli maschi; anche oggi, comunque, è molto importante il rispetto di questa tradizione familiare: spesso si è ceraioli perché il padre o il nonno era ceraiolo.\n• Ma che fanno i ceraioli durante la festa?\n○ Corrono! Devono portare nel più breve tempo possibile questi ceri pesantissimi nella chiesa di Sant'Ubaldo senza che si rompano.\n• E ci sono delle regole?\n○ Sì: per esempio, non ci si può superare; se un cero cade, i ceraioli che seguono devono aspettare che gli altri lo rialzino. Inoltre, il cero si può fermare solo in posti già stabiliti. In pratica i ceraioli devono fare una bella figura, evitare le cadute, avere una corsa veloce, superare le difficoltà delle strade strette e in salita…\n• Davvero una fatica incredibile!\n○ Beh, sì… ma abbiamo capito che ne vale la pena: si parla di una grande festa e di una tradizione speciale!" },
    {
      type: "exercise",
      ex: {
        id: "p192-ex8",
        number: "8",
        icons: ["listen", "write"],
        kind: "cloze",
        skill: "listening",
        refText: "audio",
        instruction: "Ascoltiamo e completiamo il testo con le parole giuste.",
        tr: { vi: "Nghe và hoàn thành đoạn văn với các từ đúng.", en: "Let's listen and complete the text with the right words." },
        parts: [
          {
            boxed: true,
            title: "La festa dei Ceri a Gubbio",
            image: { src: "images/u10/p192-ceri.jpg", alt: "La folla dei ceraioli con i Ceri vista dall'alto", side: "right", width: 22 },
            text: "• Intervistiamo il professor Cardini sulle tradizioni religiose più antiche in Italia: allora, professore, quando {{si}} {{vuole}} {{partecipare}} a una festa veramente unica, {{si}} {{può}} {{andare}} alla festa dei Ceri di Gubbio?\n○ Certo, questa {{manifestazione}} ha una storia antichissima. {{Si}} {{dice}} che sia la festa folcloristica più antica d'Italia. Qualcuno crede che {{sia}} {{nata}} nel 1160 per ringraziare il vescovo della città, Ubaldo Baldassini, che aveva fatto moltissime cose per aiutare il popolo; alcuni invece sostengono che sia una {{rievocazione}} della festa per Cerere, la {{divinità}} dei raccolti.\n• E quali sono le {{celebrazioni}} particolari di questa festa?\n○ Beh, fino al 1600 c'era una grande {{processione}} di ceri e {{candele}} nelle vie della città: {{si}} {{partecipava}} di notte, con un piccolo candelotto di cera in mano, e {{si}} {{arrivava}} fino al monte Ingino, che {{si}} {{trova}} proprio sopra la città, per visitare la tomba del Vescovo. In epoca più moderna i candelotti sono diventati a poco a poco dei grossi ceri.\n• Chi sono i protagonisti della festa?\n○ Sono i {{ceraioli}}, alcuni fra i cittadini nati a Gubbio. In quei giorni {{si}} {{è}} {{molto}} {{orgogliosi}} di appartenere a questa comunità. Prima il ceraiolo era un mestiere e ogni padre lo insegnava ai figli maschi; anche oggi, comunque, è molto importante il rispetto di questa tradizione familiare: spesso {{si}} {{è}} {{ceraioli}} perché il padre o il nonno era ceraiolo.\n• Ma che fanno i ceraioli durante la festa?\n○ Corrono! Devono portare nel più breve tempo possibile questi ceri {{pesantissimi}} nella chiesa di Sant'Ubaldo senza che {{si}} {{rompano}}.\n• E ci sono delle {{regole}}?",
          },
          {
            boxed: true,
            image: { src: "images/u10/p192-gubbio.jpg", alt: "I Ceri portati tra la folla nella piazza di Gubbio", side: "left", width: 42 },
            text: "○ Sì: per esempio, non {{ci}} {{si}} {{può}} {{superare}}; se un cero cade, i ceraioli che seguono devono aspettare che gli altri lo rialzino. Inoltre, il cero {{si}} {{può}} {{fermare}} solo in posti già stabiliti. In pratica i ceraioli devono fare una {{bella}} {{figura}}, evitare le cadute, avere una corsa veloce, superare le difficoltà delle strade strette e in salita…\n• Davvero una {{fatica}} incredibile!\n○ Beh, sì… ma abbiamo capito che ne vale la pena: {{si}} {{parla}} di una grande festa e di una tradizione speciale!",
          },
        ],
      },
    },
  ],
};

export default page;
