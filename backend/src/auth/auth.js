const bcrypt = require('bcryptjs');

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

module.exports = {
  hashPassword,
  verifyPassword
};
 