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

--INSERT INTO users (name) VALUES ('Mario'), ('Paolo'), ('Luisa');
--INSERT INTO users (cf, name, surname, psw, vote)
--VALUES 
--('RSSMRA80A01H501U', 'Mario', 'Rossi', 'password1', NULL),
--('VRDLGI85B12H501T', 'Luigi', 'Verdi', 'password2', NULL),
--('BNCLRA90C23H501Q', 'Laura', 'Bianchi', 'password3', NULL);

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

--UPDATE users
--SET vote = 'Candidato A'
--WHERE cf = 'RSSMRA80A01H501U';
--VALUES ('MSTGTN90A01H501A', 'Giantino', 'Mastrazzi', 'giantino123');
