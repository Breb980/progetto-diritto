const express = require('express');
const router = express.Router();
const { puclicKeys } = require("../data");
const { pool, PORT } = require("../pool");
const { hashPassword, verifyPassword } = require("../auth/auth");

/* endpoint login */
router.post("/login", async (req, res) => {
  const {cf, psw, publicKey} = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE cf = $1",
      [cf]
    );
    if (result.rows.length > 0 && verifyPassword(psw, result.rows[0].psw)) {
      puclicKeys.set(cf, publicKey);
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
router.post("/signin", async (req, res) => {
  const {cf, name, surname, psw, publicKey} = req.body;

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

    puclicKeys.set(cf, publicKey);

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

router.post("/logout", async (req, res) => {
  const { cf } = req.body;

  try {
    puclicKeys.delete(cf);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server" });
  }
});

module.exports = router;