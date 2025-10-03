CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO users (name) VALUES ('Mario'), ('Paolo'), ('Luisa');

-- Test output
SELECT 'init.sql eseguito correttamente' AS message;