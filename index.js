const http = require('./src/utils/http');
const { fetchBalance } = require("./src/resources/Account");
const { fetchTransactions, fetchWithdrawals, fetchDeposits } = require("./src/resources/Transaction");
const { config } = require("./src/config");

/**
 * felix exchange api
 *
 * @returns
 *
 * @param { String } api_key
 * @param { String } private_key
 */
const FelixExchangeApi =  (api_key, private_key) => {
    config.secret_key = private_key;
    http.interceptors.request.use(request => {
        request.headers["X-MBX-APIKEY"] = api_key;
        return request;
    });

    return {
        fetchBalance,
        fetchTransactions,
        fetchDeposits,
        fetchWithdrawals
    }
}

module.exports = FelixExchangeApi;
