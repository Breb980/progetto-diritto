# progetto-diritto
Questa Webapp di voto elettronico simula un sistema completo di voto suddivido in tre parti:
- Il frontend rappresenta il software della cabina elettorale in cui l'utente vota in una sede specifica (non è previsto voto online).
- Il backend rappresenta il gestore delle votazioni degli utenti che si occupa di immagazzinare i voti, gestire i login ecc. (Potrebbe essere remoto come locale fisicamente).
- Le due rispettive base di dati implementate: un database e una versione semplificata blockchain.

Il sistema permette il voto di solo tre candidati per semplicità ma 

## Funzionamento generale
Gli utenti possono votare una volta sola accedendo tramite codice fiscale e password registrate, chiaramente in una implementazione realistica l'autenticazione degli utenti potrebbe essere fatta tramite identità digitale.
Il sistema prevede una firma digitale per autenticare gli utenti nella blockchain, pertanto:
- ogni utente ha una chiave privata per firmare il proprio blocco.
- ogni utente ha una chiave pubblica usata dal backend per verificare la firma.

In questo modo il backend, teoricamente, non può inventarsi i voti perché non può firmare i blocchi. Tuttavia, non è impossibile truccare i voti.

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

## Docker images
 **Frontend:** node:18-alpine
- **Backend:** node:18-alpine
- **Database:** postgres:14

## Ports
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Database:** PostgreSQL on port 5432

## Truccare i voti
- **Modificare la base dati:** Nel caso venga usato un database è possibile aggiungere voti a piacimento senza che nessuno se ne accorga. Il risultato può essere ottenuto avendo a disposizione un accesso speciale alla piattaforma, via query non autorizzata oppure da persone che hanno l'accesso per manutenzione. 
Per questo progetto è stata implementata una struttura dati alternativa più realistica, ossia una blockchain, ma il problema persiste: aggiungere blocchi in modo non autorizzato diventa possibile se il sistema permette l'uso di molteplici token anonimi (indispensabili per firmare il blocco) allora l'utente malevolo potrà votare più volte in modo lecito senza essere rintracciabile.
Nel caso specifico, nel file init.sql sono stati aggiunti dei voti alla creazione del database giusto per non essere imparziale.
Come alternativa è stata implementa una blockchain che rende impossibile al sistema inventare nuovi voti a causa della impossibilità di firmare il blocco.

- **Permettere molteplici voti:** Un sistema truccato potrebbe permettere a certe persone di votare più volte, ci potrebbero essere svariati modi per farlo. In questo progetto, nel file layout.jsx viene modificato il pulsante di voto del signor Mastrazzi. 
Ora premendo il pulsante verrà reidirizzato verso una pagina di voto diversa ma appartentemente uguale all'altra. La pagina voteCheat permette a chi vi naviga di votare tutte le volte che si vuole.
Un'altro modo per permettere questo senza creare pagine extra (e quindi essere più difficile da notare) consiste nel effetuare il controllo dell'utente privileggiato (Mastrazzi) durante la fase del submit del voto (nel voteForm.jsx oppure in submit.jsx senza dover duplicare codice) che può essere manipolato come si vuole. Nel caso specifico il voto viene reindirizzato su un endpoint http diverso.

- **Alterare il conteggio dei voti dopo averli estratti:** Senza controlli troppo rigidi, i voti estratti dalla struttura dati potrebbero essere modificati in fase di conteggio, ad esempio raddoppiando i voti per un candidato e dimezzarli per un'altro.Ovviamente la manipolazione deve essere fatta con cautela per non insospettire i cittadini.
Questo modo di alterazione funziona a prescindere dalla struttura dati utilizzata.
In questo progetto c'è il grafico "cheat" che non attinge alla fonte sicura.