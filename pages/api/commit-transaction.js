// Archivo: pages/api/commit-transaction.js

import { commitTransaction } from '../../lib/webpay';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token_ws } = req.body;
        if (!token_ws) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }

        try {
            const response = await commitTransaction(token_ws);
            res.status(200).json(response);
        } catch (error) {
            console.error('Error al confirmar la transacción:', error);
            res.status(500).json({ error: 'Error al confirmar la transacción' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
