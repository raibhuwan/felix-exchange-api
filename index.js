const http = require('./utils/http');
const crypto = require('crypto');
const API_URL = 'https://trade.felix.com';
let secret_key = '';

/**
 * Generate signature
 *
 * @param { String } query
 * @returns
 *
 */
const generateSignature = ( query = '' ) => {
    return crypto.createHmac('sha256', secret_key).update(query).digest('hex');
}

/**
 * Get felix spot balance
 *
 * @returns
 *
 */
const spotBalance = async ()  => {
    try {

        const signature = generateSignature();

        const response = await http.get(API_URL + '/open/v1/account/spot?signature=' + signature);

        if (!response.data) {
            return false;
        }

        const data = response.data;

        if (data.code > 0) {
            return false;
        }

        return data.data;
    } catch (e) {
        return false;
    }

}

/**
 * felix exchange api
 *
 * @returns
 *
 * @param { String } api_key
 * @param { String } private_key
 */
const FelixExchangeApi =  (api_key, private_key) => {

    secret_key = private_key;
    http.interceptors.request.use(request => {
        request.headers["X-MBX-APIKEY"] = api_key;
        return request;
    });

    return {
        spotBalance
    }
}

module.exports = FelixExchangeApi;
