// Archivo: pages/api/create-transaction.js

import { createTransaction } from '../../lib/webpay';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await createTransaction(10000); // Monto fijo de 10000 por ahora
      res.status(200).json(response);
    } catch (error) {
      console.error('Error al crear la transacción:', error);
      res.status(500).json({ error: 'Error al crear la transacción' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
