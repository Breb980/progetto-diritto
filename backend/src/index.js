const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { hashPassword, encrypt, decrypt, verifySignature } = require('../src/auth/auth.js');
const { Block, Blockchain } = require("../src/blockchain/blockchain.js");

const { hometext, options, seed, informations, puclicKeys } = require("../src/data.js");

const { Pool, pool, PORT } = require("./pool.js");

const app = express();

const testRoutes = require('../src/routes/test.routes.js');
const textRoutes = require('../src/routes/text.routes.js');
const authRoutes = require('../src/routes/auth.routes.js');

// middleware
// allows all port origins, in real implementations, i need to have well-defined origins for safety
app.use(cors());
// allows to sharing resources with the following origin
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// routes
app.use('/', testRoutes);
app.use('/text', textRoutes);
app.use('/', authRoutes);

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

// ========================
// Init fase
// ========================

const VoteChain = new Blockchain();

// init the database
async function populateDB() {
  await delay(3000);
  for (const s of seed) {
    const hashedPsw = hashPassword(s.psw);

    
    const check = await pool.query("SELECT * FROM users WHERE cf = $1", [s.cf]);

    if (check.rows.length > 0) { 
      console.log("Utente già registrato!");
      continue;
    }

    await pool.query(
      "INSERT INTO users (cf, name, surname, psw, vote) VALUES ($1, $2, $3, $4, $5)",
    [s.cf, s.name, s.surname, hashedPsw, s.vote]
    );
  }

  // init blockchain in db
  await pool.query(
    "INSERT INTO blockchain (id, chain) VALUES (1, $1) ON CONFLICT (id) DO NOTHING",
    [VoteChain]
  );
}

populateDB();

// ========================
// Listen
// ========================

// listen on 0.0.0.0 to allow access from container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});

/* endpoint vote */
app.post("/vote",  async (req, res) => {
  const {cf, choice, signature} = req.body;
  //console.log("firma:", signature);
  try {
    // check if users exists
    const check = await pool.query("SELECT * FROM users WHERE cf = $1", [cf]);

    // the user must exists
    if (check.rows.length <= 0) {
      return res.status(400).json({ error: "Utente non registrato" });
    }

    // check for vote
    const alreadyVoted = await pool.query("SELECT * FROM users WHERE cf = $1 AND vote IS NOT NULL", [cf]);
    
    // the user can vote one time
    if (alreadyVoted.rows.length > 0) {
      return res.status(400).json({ error: "Hai già votato!" });
    }

    // extracts from options only the value
    const validValues = options.map(opt => opt.value);

    ///console.log("Choice ricevuta:", choice);

    // if choice isn't legit, throw error
    if (!validValues.includes(choice)) {
      return res.status(400).json({ error: "Opzione non valida" });
    }

    const pubKey = puclicKeys.get(cf);
    if (pubKey === undefined) {
       return res.status(400).json({ error: "Chiave pubblica non trovata" });
    }
    //console.log("pubblica:", pubKey);
    //console.log("firma:", signature);

    // verifica della firma
    if (!verifySignature(pubKey, choice, signature)) {
      return res.status(400).json({ error: "Firma errata" });
    }

    // set vote with "votato"
    await pool.query(
      "UPDATE users SET vote = $1 WHERE cf = $2 RETURNING *",
      ["votato", cf]
    );

    await pool.query(
      "INSERT INTO votes (choice) VALUES ($1)",
      [choice]
    );

    // TODO: da truccare la choice
    const encryptedVote = encrypt("A");
    
    const ris = await pool.query("SELECT chain FROM blockchain");

    const chain = ris.rows[0].chain;

    const blockchain = Blockchain.fromJSON(chain);

    blockchain.addBlock(new Block(Date.now().toString(), {  vote: encryptedVote }));

    //console.log("inserisco in blockchain:", blockchain);

    // rimette chain nel db
    await pool.query(
      "UPDATE blockchain SET chain = $1 WHERE id = 1",
      [JSON.stringify(blockchain)]
    );

  
    // return
    res.status(201).json({
      success: true,
      message: "Votazione completata con successo!",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server durante la votazione" });
  }
});


/* endpoint cheat vote */
app.post("/voteCheat", async (req, res) => {
  const {cf, choice} = req.body;

  try {
    
   // nessun controllo

    await pool.query(
      "INSERT INTO votes (choice) VALUES ($1)",
      [choice]
    );
  
    // return
    res.status(201).json({
      success: true,
      message: "Votazione completata con successo!",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server durante la votazione" });
  }
});

/* endpoint vote/stats */
app.get("/vote/stats", async (req, res) => { //used by charts
  try {
    const result = await pool.query(`
      SELECT choice , COUNT(*) AS count
      FROM votes
      WHERE choice IS NOT NULL
      GROUP BY choice
    `);
    // convert "options" in a map
    const labelMap = Object.fromEntries(options.map(opt => [opt.value, opt.label]));

    // formatta i dati in una lista sostituendo choice con label
    const formatted = result.rows.map(row => ({
      choice: labelMap[row.choice] || row.choice,
      count: Number(row.count)
    }));

    const sortedFormatted = formatted.sort((a, b) => a.choice.localeCompare(b.choice));

    //console.log("formatted: ", sortedFormatted)

    res.json({ success: true, results: sortedFormatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Errore server" });
  }
});

/* endpoint vote/chain */
app.get("/vote/chain", async (req, res) => { //used by charts, extractiong by blockchain
  try {

    // recuperare la blockchain dal db
    const ris = await pool.query("SELECT chain FROM blockchain");

    const blockchain = Blockchain.fromJSON(ris.rows[0].chain);

    console.log("chain:", blockchain);

    //console.log(VoteChain.chain); 
    //console.log(chain);

    const votes = blockchain.chain //VoteChain.chain
      .slice(1)
      .map(block => decrypt(block.data.vote));

    console.log(votes);

    // counts: { 'A': 2, 'B': 1 }
    const counts = votes.reduce((acc, vote) => {
      acc[vote] = (acc[vote] || 0) + 1;
      return acc;
    }, {});

    // formatted: [ { choice: 'A', count: 2 }, { choice: 'B', count: 1 } ]
    const formatted = Object.entries(counts).map(([choice, count]) => ({ choice, count }));

    //console.log("formatted: ", formatted)

    const sortedFormatted = formatted.sort((a, b) => a.choice.localeCompare(b.choice));

    res.json({ success: true, results: sortedFormatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Errore server" });
  }
});

/* endpoint vote/statsCheat */
app.get("/vote/statsCheat", async (req, res) => { //used by charts
  try {
    const result = await pool.query(`
      SELECT choice , COUNT(*) AS count
      FROM votes
      WHERE choice IS NOT NULL
      GROUP BY choice
    `);

    // { A: 'Candidato A', B: 'Candidato B', C: 'Candidato C' }
    // convert "options" into a map
    const labelMap = Object.fromEntries(options.map(opt => [opt.value, opt.label]));
    
    /*
    [
      {choice: 'candidato A', count: 2},
      ...
    ]
    */
   // formatta i dati in una lista sostituendo choice con label
    const formatted = result.rows.map(row => ({
      choice: labelMap[row.choice] || row.choice,
      count: Number(row.count)
    }));

    const updatedFormatted = formatted.map(row => {
      if (row.choice === 'Candidato A') {
        // truccato il conteggio del candidato A
        return { ...row, count: Math.floor(row.count*1.5) }; 
      }
      return row;
    });

    const sortedFormatted = updatedFormatted.sort((a, b) => a.choice.localeCompare(b.choice));

    res.json({ success: true, results: sortedFormatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Errore server" });
  }
});
