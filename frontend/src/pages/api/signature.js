import { signData } from '@/utils/server';

export default function handler(req, res) {
  if (req.method !== 'POST') {
     return res.status(405).json({ error: 'Method Not Allowed' });
   }
 
   const { data, privateKey } = req.body;

   //const message = Buffer.from(data, 'utf8');

   //console.log("chiave privata:", privateKey);
   const signature = signData(privateKey, data);
 
   res.status(200).json(signature);
}
