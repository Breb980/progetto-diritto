const express = require('express');
const router = express.Router();
const { hometext, options, informations } = require("../data");

router.get("/candidates", async (req, res) => {
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

router.get("/home", async (req, res) => {
  try {
   
    // return
    res.status(201).json({
      success: true,
      options: hometext,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server durante l'estrazione delle opzioni" });
  }
});

router.get("/informations", async (req, res) => {
  try {
   
    // return
    res.status(201).json({
      success: true,
      options: informations,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore server durante l'estrazione delle opzioni" });
  }
});

module.exports = router;