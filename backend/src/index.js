const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { hashPassword, verifyPassword } = require('../src/auth/auth.js');

const app = express();

//use the port defined in Dockerfile ENV
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// middleware
// allows all port origins, in real implementations, i need to have well-defined origins for safety
app.use(cors());
// allows to sharing resources with the following origin
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const options = [
  { value: "A", label: "Candidato A" },
  { value: "B", label: "Candidato B" },
  { value: "C", label: "Candidato C" },
];

const seed = [
  { cf: "RSSMRA80A01H501U", name: "Mario", surname: "Rossi", psw: "password1", vote: null },
  { cf: "VRDLGI85B12H501T", name: "Luigi", surname: "Verdi", psw: "password2", vote: null },
  { cf: "BNCLRA90C23H501Q", name: "Laura", surname: "Bianchi", psw: "password2", vote: null },
];

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

async function populateDB() {
  let delayres = await delay(3000);
  for (const s of seed) {
    const hashedPsw = hashPassword(s.psw);

    await pool.query(
      "INSERT INTO users (cf, name, surname, psw, vote) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [s.cf, s.name, s.surname, hashedPsw, s.vote]
    );
  }
}

//populateDB();

// route test
app.get('/', (req, res) => {
  res.send('Backend funzionante!');
});

// endpoint of test DB, TEST
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`DB OK! Server time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});

// listen on 0.0.0.0 to allow access from container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});

/* endpoint login */
app.post("/login", async (req, res) => {
  const {cf, psw} = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE cf = $1",
      [cf]
    );
    if (result.rows.length > 0 && verifyPassword(psw, result.rows[0].psw)) {
      res.status(200).json({ success: true , user: result.rows[0]});
    } else {
      res.status(401).json({ error: "Credenziali non valide" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server" });
  }
});


/* endpoint signin */
app.post("/signin", async (req, res) => {
  const {cf, name, surname, psw} = req.body;

  try {
    //check if users exists
    const check = await pool.query("SELECT * FROM users WHERE cf = $1", [cf]);

    // several checks
    if (check.rows.length > 0) {
      return res.status(400).json({ error: "Utente già registrato" });
    }
    if (cf.length == 0 || name.length == 0  || surname.length == 0  || psw.length == 0 ) {
      return res.status(400).json({ error: "Tutti i campi devono essere riempiti" });
    }

    if (cf.length != 16) {
      return res.status(400).json({ error: "Codice fiscale non valido" });
    }

    if (psw.length < 6 && psw.length > 0) {
      return res.status(400).json({ error: "Password troppo debole" });
    }
    
    // hash the psw
    const hashedPsw = hashPassword(psw);

    // insert the new user
    const result = await pool.query(
      "INSERT INTO users (cf, name, surname, psw) VALUES ($1, $2, $3, $4) RETURNING *",
      [cf, name, surname, hashedPsw]
    );

    // return
    res.status(201).json({
      success: true,
      message: "Registrazione completata con successo!",
      user: result.rows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server durante la registrazione" });
  }
});

/* endpoint vote */
app.post("/vote", async (req, res) => {
  const {cf, choice} = req.body;

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

    ////console.log("Choice ricevuta:", choice);

    // if choice isn't legit, throw error
    if (!validValues.includes(choice)) {
      return res.status(400).json({ error: "Opzione non valida" });
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

    // formatta i dati sostituendo choice con label
    const formatted = result.rows.map(row => ({
      choice: labelMap[row.choice] || row.choice,
      count: Number(row.count)
    }));


    res.json({ success: true, results: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Errore server" });
  }
});

/* endpoint options */
app.get("/options", async (req, res) => {
  try {

    // return
    res.status(201).json({
      success: true,
      options: options,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server durante l'estrazione delle opzioni" });
  }
});


//----------- TESTS -----------

// endpoint users
app.get("/users", async (req, res) => {
  try {
    //const result = await pool.query("SELECT id, name FROM users");
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

/* endpoint vote/stats */
app.get("/vote/stat", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT choice , COUNT(*) AS count
      FROM votes
      WHERE choice IS NOT NULL
      GROUP BY choice
    `);
    
    console.log("test", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Errore server" });
  }
});