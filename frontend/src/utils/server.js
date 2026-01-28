// functions for generate keys and sign

import { generateKeyPairSync, sign } from 'crypto';

export function generateEd25519KeyPair() {
  return generateKeyPairSync('ed25519', {
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
}

export function signData(privateKey, data) {
  const message = Buffer.from(data); // data deve essere una stringa o Buffer
  const signature = sign(null, message, privateKey);
  return signature.toString('base64');
}