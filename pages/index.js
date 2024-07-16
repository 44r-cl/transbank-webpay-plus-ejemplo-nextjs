// Archivo: pages/index.js

import { useState } from 'react';

export default function Home() {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/create-transaction', { method: 'POST' });
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const data = await response.json();
            console.log("data.url: " + data.url);
            window.location.href = `${data.url}?token_ws=${data.token}`;
        } catch (error) {
            console.error('Error al iniciar el pago:', error);
            alert('Error al iniciar el pago. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Ejemplo Webpay Plus</h1>
            <p>Haz clic en el botón para realizar un pago de $10.000 CLP con Webpay Plus</p>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Procesando...' : 'Pagar con Webpay'}
            </button>
            <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
}