
const hometext = [
  { label: "Modificare la base dati", 
    text: `Nel caso venga usato un database è possibile aggiungere voti a piacimento senza che nessuno se ne accorga. Il risultato può essere ottenuto avendo a disposizione un accesso speciale alla piattaforma, via query non autorizzata oppure da persone che hanno l'accesso per manutenzione. 
        Per questo progetto è stata implementata una struttura dati alternativa più realistica, ossia una blockchain, ma il problema persiste: aggiungere blocchi in modo non autorizzato diventa possibile se il sistema permette l'uso di molteplici token anonimi (indispensabili per firmare il blocco) allora l'utente malevolo potrà votare più volte in modo lecito senza essere rintracciabile.
        Nel caso specifico, nel file init.sql sono stati aggiunti dei voti alla creazione del database giusto per non essere imparziale.
        Come alternativa è stata implementa una blockchain che rende impossibile al sistema inventare nuovi voti a causa della impossibilità di firmare il blocco.`},
  { label: "Permettere molteplici voti", 
    text: `Un sistema truccato potrebbe permettere a certe persone di votare più volte, ci potrebbero essere svariati modi per farlo. In questo progetto, nel file layout.jsx viene modificato il pulsante di voto del signor Rossi. Ora premendo il pulsante verrà reidirizzato verso una pagina di voto diversa ma appartentemente uguale all'altra. La pagina voteCheat permette a chi vi naviga di votare tutte le volte che si vuole.
        Un'altro modo per permettere questo senza creare pagine extra (e quindi essere più difficile da notare) consiste nel effetuare il controllo dell'utente privileggiato (Rossi) durante la fase del submit del voto (nel voteForm.jsx oppure in submit.jsx senza dover duplicare codice) che può essere manipolato come si vuole. Nel caso specifico il voto viene reindirizzato su un endpoint http diverso.` },
  { label: "Alterare il conteggio dei voti dopo averli estratti", 
    text: `Senza controlli troppo rigidi, i voti estratti dalla struttura dati potrebbero essere modificati in fase di conteggio, ad esempio raddoppiando i voti per un candidato e dimezzarli per un'altro. Ovviamente la manipolazione deve essere fatta con cautela per non insospettire i cittadini.
        In questo progetto c'è il grafico "cheat" che non attinge alla fonte sicura.` },
];

// dovrebbe essere nel db, ma anche in una struttura dati a parte (una risorsa che fa da validante)
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

const informations = [
   {label: "Generalità", 
    text:`La webapp offre la possibilità agli utenti di votare elettronicamente, per farlo l'utente deve registrarsi e accedere.
    Il voto è singolo ed è possibile consultare gli esiti dei voti in tempo reale (vìola il principio di lealtà di un buon sistema di voto).`
  },
  {label: "Architettura", 
    text:`Il progetto usa docker per garantire portabilità, nello specifico è diviso in tre servizi: frontend, backend e db (il database).
      Nel file compose.yml vengono definiti i servizi docker.
      Essendo un protopipo, il sistema non offre misure di sicurezza e strutture dati realistiche. 
      Un riassunto sulle specifiche è disponibile nel file Readme del progetto.`
  },
  {label: "Backend", 
    text:`L'immagine usata è node:18-alpine (non è considerata sicura, ma è leggera e buona per la fase di sviluppo o prototipi).
    La porta 5000 è stata aperta per testarne il funzionamento, nel file 'backend/src/index.js' è possibile consultare tutti gli endpoint disponibili.
    Questo componente si interfaccia tra database e frontend.`
  },
  {label: "Frontend", 
    text:`L'immagine usata è node:18-alpine.
    La webapp viene hostata sulla porta 3000, le pagine sono disponibili in  'frontend/src/pages'.
    Questo componente rappresenta l'interfaccia navigabile dall'utente.`
  },
   {label: "Db", 
    text:`L'immagine usata è postgres:14, possiede un volume per garantire persistenza dei dati.
    Il database è interrogabile dal backend dalla porta 5432, nel file 'db/init.sql' è gestista l'inizializzazione del database.
    Questo componente funge da struttura dati, inoltre nel db viene memorizzata una blockchain.`
  },
];

const puclicKeys = new Map();


module.exports = { hometext, options, seed, informations, puclicKeys };