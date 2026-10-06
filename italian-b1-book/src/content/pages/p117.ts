import type { BookPage } from "../../types";

/** Unità 6 · Cultura e società — trang 117 (Lessico: società, università, ospedale). */
const page: BookPage = {
  id: "p117",
  number: 117,
  unit: "6",
  unitTitle: "Cultura e società",
  addedOn: "2026-10-08",
  sideTab: { unit: "U6", color: "#d8333a" },
  title: "Lessico · Società, università, ospedale",
  blocks: [
    { type: "sectionTitle", text: "Lessico" },
    {
      type: "columns",
      cols: [
        [
          { type: "photo", src: "images/u6/p117-societa.jpg", alt: "Una ragazza povera e una signora ricca con la pelliccia" },
          { type: "theory", text: "## Società\n> classe sociale\n> disuguaglianza sociale\n> essere asociale\n> essere escluso dalla società\n> essere pericoloso per la società\n> essere un rifiuto della società\n> essere utile alla società\n> far parte della società\n> fare una società\n> fare vita di società\n> farsi una posizione\n> giustizia sociale\n> mobilità sociale\n> piramide sociale\n> presentarsi in società\n> sociale\n> sociologia\n> sociologo\n> status sociale\n> vivere in società" },
        ],
        [
          { type: "photo", src: "images/u6/p117-universita.jpg", alt: "Il rettore consegna il diploma di laurea a uno studente" },
          { type: "theory", text: "## Università\n> ateneo\n> aula magna\n> corso\n> dipartimento\n> diploma\n> esame\n> facoltà\n> iscrizione\n> laurea\n> lezione\n> libretto\n> materia\n> matricola\n> professore\n> rettore\n> ricercatore\n> studente\n> studio\n> tassa\n> titolo di studio" },
        ],
        [
          { type: "photo", src: "images/u6/p117-ospedale.jpg", alt: "Un infermiere con una siringa" },
          { type: "theory", text: "## Ospedale\n> ambulatorio\n> chirurgia\n> clinica\n> corsia\n> day-hospital\n> degenza / ricovero\n> esame\n> infermeria\n> infermiere\n> medicina\n> medico\n> paziente\n> policlinico\n> posto letto\n> primario\n> pronto soccorso\n> reparto\n> ricetta\n> sala operatoria\n> terapia" },
        ],
      ],
    },
  ],
};

export default page;
