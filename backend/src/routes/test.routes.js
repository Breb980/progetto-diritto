const express = require('express');
const router = express.Router();
const { Pool, pool, PORT } = require("../pool");

// route test
router.get('/', (req, res) => {
  res.send('Backend funzionante!');
});

// endpoint of test DB, TEST
router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`DB OK! Server time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection failed");
  }
});

// endpoint users
router.get("/users", async (req, res) => {
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
router.get("/vote/stat", async (req, res) => {
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

module.exports = router;