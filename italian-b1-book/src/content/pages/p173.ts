import type { BookPage } from "../../types";

/** Unità 9 · Facciamo un'intervista! — trang 173 (Osserviamo bene, bài 10: Dove andranno gli italiani in vacanza). */
const page: BookPage = {
  id: "p173",
  number: 173,
  unit: "9",
  unitTitle: "Facciamo un'intervista!",
  addedOn: "2026-10-08",
  sideTab: { unit: "U9", title: "Facciamo un'intervista!" },
  title: "Osserviamo bene · Le vacanze degli italiani",
  runningHead: "Osserviamo bene",
  blocks: [
    {
      type: "exercise",
      ex: {
        id: "p173-ex10",
        number: "10",
        icons: ["read", "write"],
        kind: "cloze",
        skill: "grammar",
        instruction: "Leggiamo e completiamo il testo con le parole indicate.",
        intro: "sebbene • basta che • a meno che • chiunque • a patto che • benché • nonostante",
        tr: { vi: "Đọc và hoàn thành đoạn văn với các từ cho sẵn.", en: "Let's read and complete the text with the words given." },
        parts: [
          {
            boxed: true,
            title: "Dove andranno gli italiani in vacanza",
            image: { src: "images/u9/p173-vela.jpg", alt: "Due ragazzi in barca a vela sul mare", side: "right", width: 42 },
            text: "Rispetto all'anno scorso gli italiani hanno già deciso la meta delle loro vacanze: {{=sebbene}} sognino l'America e le Maldive, nel 2007 affolleranno spesso le località italiane, {{a patto che}} garantiscano pulizia e buon cibo. Eviteranno destinazioni rischiose, {{benché}} siano affascinanti.\nAbbiamo chiesto alla Trademark Italia quanto spenderanno gli italiani nelle prossime ferie. Ecco quello che ci hanno risposto:\n“Esistono due categorie di turisti italiani: quelli che hanno denaro da spendere, ma poco tempo per le vacanze (in Italia almeno 9 milioni di persone hanno un reddito superiore ai 40 mila euro l'anno) e quelli che, {{nonostante}} abbiano più tempo, purtroppo hanno meno soldi. Questi ultimi cercano di organizzarsi da soli: ormai solo un italiano su dieci si rivolge",
          },
          {
            boxed: true,
            image: { src: "images/u9/p173-padova.jpg", alt: "Padova, terra madre di storia e arte; Liguria, Cinque Terre", side: "left", width: 45 },
            text: "all'agenzia di viaggi, {{a meno che}} questa non offra proposte vantaggiose. Complessivamente gli italiani spenderanno 18,2 miliardi di euro, pari a un costo medio, per vitto, alloggio e viaggio, di circa 590 euro a testa: il 6,8% in più del 2006. Il periodo preferito per le ferie resta come sempre agosto, {{basta che}} non sia però più di una settimana; quando sono due settimane, molto raramente sono nella stessa località. {{Chiunque}} poi voglia approfittare dei numerosi ponti e week-end lunghi proposti dal calendario, organizzerà brevi gite soprattutto nelle città d'arte.\nPer quanto riguarda le destinazioni, gli italiani non rinunciano al mare: quello delle località nazionali, come la Sicilia (in particolare le isole) o quello della Riviera Ligure. Inoltre oggi è aumentato notevolmente l'interesse per i viaggi fuori dall'Europa.”",
          },
        ],
      },
    },
    { type: "photo", src: "images/u9/p173-cinqueterre.jpg", alt: "Liguria, Cinque Terre" },
  ],
};

export default page;
