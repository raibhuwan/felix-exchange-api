const http = require("../utils/http");
const { generateSignature } = require("../utils/request");
const { config } = require("../config");

/**
 * Get felix withdrawals.
 *
 * @param { Object } query
 * @returns
 *
 */
const fetchWithdrawals = async (query)  => {
    try {
        let str_query = '';
        if ( Object.keys(query).length > 0 ) {
            let query_arr = [];
            for (let q in query)
                query_arr.push(encodeURIComponent(q) + "=" + encodeURIComponent(query[q]));
            str_query = query_arr.join("&");
        }

        const signature = generateSignature(str_query);

        str_query += ( str_query !== '' ? '&' : '' ) + 'signature=' + signature;

        let request_url = config.api_url + '/open/v1/withdraws?' + str_query;

        const response = await http.get(request_url);

        if (!response.data) {
            return false;
        }

        const data = response.data;

        if (data.code > 0) {
            return false;
        }

        return data.data.list;
    } catch (e) {
        return false;
    }

}

/**
 * Get felix deposit history.
 *
 * @param { Object } query
 * @returns
 *
 */
const fetchDeposits = async (query)  => {
    try {
        let str_query = '';
        if ( Object.keys(query).length > 0 ) {
            let query_arr = [];
            for (let q in query)
                query_arr.push(encodeURIComponent(q) + "=" + encodeURIComponent(query[q]));
            str_query = query_arr.join("&");
        }

        const signature = generateSignature(str_query);

        str_query += ( str_query !== '' ? '&' : '' ) + 'signature=' + signature;

        let request_url = config.api_url + '/open/v1/deposits?' + str_query;

        const response = await http.get(request_url);

        if (!response.data) {
            return false;
        }

        const data = response.data;

        if (data.code > 0) {
            return false;
        }

        return data.data.list;
    } catch (e) {
        return false;
    }

}

/**
 * Get felix transactions.
 *
 * @param { Object } query
 * @returns
 *
 */
const fetchTransactions = async (query = {})  => {
    const withdrawals = await fetchWithdrawals(query);
    const deposits  = await fetchDeposits(query);

    return {
        withdrawals,
        deposits
    };
}

module.exports = { fetchTransactions, fetchWithdrawals, fetchDeposits };
