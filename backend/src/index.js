const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// esempio route
app.get('/', (req, res) => {
  res.send('Backend funzionante!');
});

// ascolta su 0.0.0.0 per permettere accesso dal container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
