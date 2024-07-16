// Archivo: lib/webpay.js

import { WebpayPlus } from 'transbank-sdk';
import { Options, IntegrationCommerceCodes, IntegrationApiKeys, Environment } from 'transbank-sdk';

const commerceCode = IntegrationCommerceCodes.WEBPAY_PLUS;
const apiKey = IntegrationApiKeys.WEBPAY;
const environment = Environment.Integration;

export const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKey, environment));

export const createTransaction = async (amount) => {
    const buyOrder = 'O-' + Math.floor(Math.random() * 10000) + 1;
    const sessionId = 'S-' + Math.floor(Math.random() * 10000) + 1;
    const returnUrl = 'http://localhost:3000/resultado-transaccion';

    try {
        const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
        return response;
    } catch (error) {
        console.error('Error al crear la transacción:', error);
        throw error;
    }
};

export const commitTransaction = async (token) => {
    try {
        const response = await tx.commit(token);
        return response;
    } catch (error) {
        console.error('Error al confirmar la transacción:', error);
        throw error;
    }
};