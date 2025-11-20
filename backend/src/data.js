// dovrebbe essere nel db, ma anche in una struttura dati a parte (una risorsa che fa da validante)

const hometext = [
  { label: "Modificare la base dati", 
    text: `Nel caso venga usato un database è possibile aggiungere voti a piacimento senza che nessuno se ne accorga. Il risultato può essere ottenuto avendo a disposizione un accesso speciale alla piattaforma, via query non autorizzata oppure da persone che hanno l'accesso per manutenzione. 
        In caso venga implementata una struttura dati più realistica per questo progetto, come ad esempio una blockchain, il problema persiste: aggiungere blocchi in modo non autorizzato diventa possibile se il sistema permette l'uso di molteplici token anonimi (indispensabili per firmare il blocco) allora l'utente malevolo potrà votare più volte in modo lecito senza essere rintracciabile.
        Nel caso specifico, nel file init.sql sono stati aggiunti dei voti alla creazione del database giusto per non essere imparziale.`},
  { label: "Permettere molteplici voti", 
    text: `Un sistema truccato potrebbe permettere a certe persone di votare più volte, ci potrebbero essere svariati modi per farlo. In questo progetto, nel file layout.jsx viene modificato il pulsante di voto del signor Rossi. Ora premendo il pulsante verrà reidirizzato verso una pagina di voto diversa ma appartentemente uguale all'altra. La pagina voteCheat permette a chi vi naviga di votare tutte le volte che si vuole.
        Un'altro modo per permettere questo senza creare pagine extra (e quindi essere più difficile da notare) consiste nel effetuare il controllo dell'utente privileggiato (Rossi) durante la fase del submit del voto (nel voteForm.jsx oppure in submit.jsx senza dover duplicare codice) che può essere manipolato come si vuole. Nel caso specifico il voto viene reindirizzato su un endpoint http diverso.` },
  { label: "Alterare il conteggio dei voti dopo averli estratti", 
    text: `Senza controlli troppo rigidi, i voti estratti dalla struttura dati potrebbero essere modificati in fase di conteggio, ad esempio raddoppiando i voti per un candidato e dimezzarli per un'altro. Ovviamente la manipolazione deve essere fatta con cautela per non insospettire i cittadini.
        In questo progetto c'è il grafico "cheat" che non attinge alla fonte sicura.` },
];

const options = [
  { value: "A", label: "Candidato A", text: "Merita di vincere, dovreste votarlo tutti." },
  { value: "B", label: "Candidato B", text: "Non è nulla di che, ma ha un bel pappagallo." },
  { value: "C", label: "Candidato C", text: "Ma che ci fa qui?" },
];

const seed = [
  { cf: "RSSMRA80A01H501U", name: "Mario", surname: "Rossi",   psw: "password1", vote: null },
  { cf: "VRDLGI85B12H501T", name: "Luigi", surname: "Verdi",   psw: "password2", vote: null },
  { cf: "BNCLRA90C23H501Q", name: "Laura", surname: "Bianchi", psw: "password3", vote: null },
  { cf: "MSTGTN90A01H501A", name: "Giantino", surname: "Mastrazzi", psw: "password4", vote: null },
  { cf: "FRZGVN90A01H501F", name: "Giovanni", surname: "Frizzigoni", psw: "password5", vote: null },
];

module.exports = { hometext, options, seed };