# progetto-diritto
Webapp di voto elettronico

## Dependencies
[Docker](https://www.docker.com/)

## How to use
Use following command for enviroment composition:

- _docker compose build_

You can build and run simultaneously:

- _docker compose up --build_

## run webapp
- _docker compose up_

## stop webapp
- _docker compose down_

## stop webapp and clean docker images 
- _docker compose down -v_

## Architetture
- **Frontend:** [Next.js](https://nextjs.org/) (React) → user interface
- **Backend:** [Express.js](https://expressjs.com/) (Node.js with CommonJS) → API REST
- **Database:** [PostgreSQL](https://www.postgresql.org/) → data persistence
- **Containerization:** [Docker](https://www.docker.com/) → service isolation

## Ports
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Database:** PostgreSQL on port 5432

## Truccare i voti
- **Modificare la base dati:** Nel caso venga usato un database è possibile aggiungere voti a piacimento senza che nessuno se ne accorga. Il risultato può essere ottenuto avendo a disposizione un accesso speciale alla piattaforma, via query non autorizzata oppure da persone che hanno l'accesso per manutenzione. 
In caso venga implementata una struttura dati più realistica per questo progetto, come ad esempio una blockchain, il problema persiste: aggiungere blocchi in modo non autorizzato diventa possibile se il sistema permette l'uso di molteplici token anonimi (indispensabili per firmare il blocco) allora l'utente malevolo potrà votare più volte in modo lecito senza essere rintracciabile.
Nel caso specifico, nel file init.sql sono stati aggiunti dei voti alla creazione del database giusto per non essere imparziale.

- **Permettere molteplici voti:** Un sistema truccato potrebbe permettere a certe persone di votare più volte, ci potrebbero essere svariati modi per farlo. In questo progetto, nel file layout.jsx viene modificato il pulsante di voto del signor Mastrazzi. 
Ora premendo il pulsante verrà reidirizzato verso una pagina di voto diversa ma appartentemente uguale all'altra. La pagina voteCheat permette a chi vi naviga di votare tutte le volte che si vuole.
Un'altro modo per permettere questo senza creare pagine extra (e quindi essere più difficile da notare) consiste nel effetuare il controllo dell'utente privileggiato (Mastrazzi) durante la fase del submit del voto (nel voteForm.jsx oppure in submit.jsx senza dover duplicare codice) che può essere manipolato come si vuole. Nel caso specifico il voto viene reindirizzato su un endpoint http diverso.

- **Alterare il conteggio dei voti dopo averli estratti:** Senza controlli troppo rigidi, i voti estratti dalla struttura dati potrebbero essere modificati in fase di conteggio, ad esempio raddoppiando i voti per un candidato e dimezzarli per un'altro.Ovviamente la manipolazione deve essere fatta con cautela per non insospettire i cittadini.
In questo progetto c'è il grafico "cheat" che non attinge alla fonte sicura.