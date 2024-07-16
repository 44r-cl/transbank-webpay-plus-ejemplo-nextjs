// Archivo: pages/resultado-transaccion.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ResultadoTransaccion() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const mensajeFlujo2 = 'El pago fue anulado por tiempo de espera.';
    const mensajeFlujo3 = 'El pago fue anulado por el usuario.';
    const mensajeFlujo4 = 'El pago es inválido.';

//  Flujos:
//  1. Flujo normal (OK): solo llega token_ws
//  2. Timeout (más de 10 minutos en el formulario de Transbank): llegan TBK_ID_SESION y TBK_ORDEN_COMPRA
//  3. Pago abortado (con botón anular compra en el formulario de Webpay): llegan TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
//  4. Caso atipico: llega todos token_ws, TBK_TOKEN, TBK_ID_SESION, TBK_ORDEN_COMPRA
    useEffect(() => {
        if (router.isReady) {
            const { token_ws, TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION} = router.query;
            console.log('token_ws: ' + token_ws + ' TBK_TOKEN: ' + TBK_TOKEN + ' TBK_ORDEN_COMPRA: ' + TBK_ORDEN_COMPRA+ ' TBK_ID_SESION: ' + TBK_ID_SESION);
            if (token_ws && !TBK_TOKEN) {
                fetch('/api/commit-transaction', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token_ws }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la respuesta del servidor');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setResult(data);
                    })
                    .catch(err => {
                        setError('Error al procesar la transacción');
                        console.error(err);
                    });
            }
            else if (!token_ws && !TBK_TOKEN) {
                console.log(mensajeFlujo2);
                setResult({mensaje: mensajeFlujo2, data: router.query});
            } else if (!token_ws && TBK_TOKEN) {
                console.log(mensajeFlujo3);
                setResult({mensaje: mensajeFlujo3, data: router.query});
            } else if (condition) {
                console.log(mensajeFlujo4);
                setResult({mensaje: mensajeFlujo4, data: router.query});
            }
        }
    }, [router.query]);

    if (!result && !error) {
        return <div>Procesando resultado...</div>;
    }

    return (
        <div className="container">
            <h1>Resultado de la Transacción</h1>
            {error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    <p className={result.status === 'AUTHORIZED' ? 'success' : 'error'}>
                        {result.status === 'AUTHORIZED' ? 'Transacción exitosa' : 'La transacción no fue autorizada'}
                    </p>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </>
            )}
            <a href="/">Volver a la página principal</a>
            <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        pre {
          background-color: #f4f4f4;
          padding: 10px;
          border-radius: 5px;
          max-width: 600px;
          overflow-x: auto;
        }
        .success { color: #4CAF50; }
        .error { color: #f44336; }
        a {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
      `}</style>
        </div>
    );
}