const { generateKeyPairSync, sign } = require('crypto');

export function generateEd25519KeyPair() {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519', {
    publicKeyEncoding: { type: 'spki', format: 'pem' },  
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });

  return { publicKey, privateKey };
}

export function signData(privateKey, data) {
  const message = Buffer.from(data); // data deve essere una stringa o Buffer
  const signature = sign(null, message, privateKey);
  return signature.toString('base64');
}


// const kp = generateEd25519KeyPair();
// console.log(kp.publicKey);
// console.log(kp.privateKey);

// TODO: firmare il voto da mandare
// TODO: cifrare voto + firma prima di fare il submit
// TODO: gestire i casi precedenti dal backend
// TODO: truccare la firma
/*
Il server riceve un messaggio cifrato con voto + firma_voto + chiave_pubblica
(la chiave pubblica serve per validare la firma del client)
Il server sarà vincolato: 
1. non può generare una firma perché non possiede la chiave privata
2. non può alterare il voto perché la firma lo protegge
3. non può generare voti falsi (a meno che il conteggio venga fatto fuori dalla blockchain)
4. non può eliminare voti (la blockchain è immutabile)

ma puo:
1. ignorare la richiesta di voto (o bloccare voti)
2. votare più volte a piaciamento
3. sapere cosa ha votato un utente
*/