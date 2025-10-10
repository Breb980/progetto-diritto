const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

// route test
app.get('/', (req, res) => {
  res.send('Backend funzionante!');
});

// endpoint of test DB
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

/* endpoint login */
app.post("/login", async (req, res) => {
  const { cf, psw} = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE cf = $1 AND psw = $2",
      [cf, psw]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: "Credenziali non valide" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server" });
  }
});
