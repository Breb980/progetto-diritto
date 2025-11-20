// dovrebbe essere nel db, ma anche in una struttura dati a parte (una risorsa che fa da validante)

const hometext = [
  { label: "Titolo 1", text: "descrizione1" },
  { label: "Titolo 2", text: "descrizione2" },
  { label: "Titolo 3", text: "descrizione3" },
];

const options = [
  { value: "A", label: "Candidato A", text: "descrizione1" },
  { value: "B", label: "Candidato B", text: "descrizione2" },
  { value: "C", label: "Candidato C", text: "descrizione3" },
];

const seed = [
  { cf: "RSSMRA80A01H501U", name: "Mario", surname: "Rossi", psw: "password1", vote: null },
  { cf: "VRDLGI85B12H501T", name: "Luigi", surname: "Verdi", psw: "password2", vote: null },
  { cf: "BNCLRA90C23H501Q", name: "Laura", surname: "Bianchi", psw: "password3", vote: null },
];

module.exports = { hometext, options, seed };