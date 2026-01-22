const { Pool } = require('pg');
//use the port defined in Dockerfile ENV
const PORT = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = { Pool, PORT, pool};