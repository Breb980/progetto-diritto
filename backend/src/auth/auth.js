const bcrypt = require('bcryptjs'); // for hashing
const crypto = require("crypto"); // for chipher

const algorithm = "aes-256-ctr";
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

/**
 * Generate an hash from a password in an hash
 * @param {string} psw - plaintext psw
 * @returns {string} - hash
 */
function hashPassword(psw) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(psw, salt);
}

/**
 * compare plaintext password  with the hash saved
 * @param {string} psw - plaintext password insert by user
 * @param {string} hashedPsw - hash in db
 * @returns {boolean} true if it matches, false otherwise
 */
function verifyPassword(psw, hashedPsw) {
  return bcrypt.compareSync(psw, hashedPsw);
}

/**
 * 
 * @param {string} text - plaintext vote choice insert by user
 * @returns 
 */
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return { iv: iv.toString("hex"), content: encrypted.toString("hex") };
}

function decrypt(hash) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final()
  ]);

  return decrypted.toString();
}

function verifySignature(publicKey, data, signatureBase64) {
  const message = Buffer.from(data);
  const signature = Buffer.from(signatureBase64, 'base64');
  return crypto.verify(null, message, publicKey, signature); // true/false
}

// aggiungere firma digitale per autenticità
// ogni utente ha una chiave privata per firmare il proprio blocco
// ogni utente ha una chiave pubblica usata dal backend per verificare la firma
// in questo modo il backend non può inventarsi i voti perché non può firmare i voti
// può truccare i voti? sostituire la choice prima di firmare
module.exports = {
  hashPassword,
  verifyPassword,
  encrypt,
  decrypt,
  verifySignature
};
 