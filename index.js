const http = require('./utils/http')
const API_URL = 'https://trade.felix.com';

/**
 * Get felix spot balance
 *
 * @returns
 *
 */
const spotBalance = async ()  => {
    try {
        const data = await http.get(API_URL + '/open/v1/account/spot');

        if (!data.data) {
            return false;
        }

        if (data.data.code > 0) {
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
 * @param { String } signature
 */
const FelixExchangeApi =  (api_key, signature) => {

    http.interceptors.request.use(request => {
        request.headers["X-MBX-APIKEY"] = api_key;
        request.params = {
            ...request.params,
            signature: signature
        };
        return request;
    });

    return {
        spotBalance
    }
}

module.exports = FelixExchangeApi;
