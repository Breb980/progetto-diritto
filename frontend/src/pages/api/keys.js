// for server
import { generateEd25519KeyPair } from '@/utils/server';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { publicKey, privateKey } = generateEd25519KeyPair();

  res.status(200).json({ publicKey, privateKey });
}
