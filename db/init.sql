CREATE TABLE IF NOT EXISTS users (
  cf CHAR(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  psw VARCHAR(100) NOT NULL CHECK (LENGTH(psw) >= 6),
  vote VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS votes (
  choice VARCHAR(50) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS blockchain (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  chain JSONB NOT NULL
);

INSERT INTO votes (choice)
VALUES 
('A'),
('A'),
('A'),
('B'),
('B'),
('C');

-- Test output
SELECT 'init.sql eseguito correttamente' AS message;
