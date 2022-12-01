const http = require("../utils/http");
const { generateSignature } = require("../utils/request");
const { config } = require("../config");

/**
 * Get felix spot balance
 *
 * @returns
 *
 */
const fetchBalance = async ()  => {
    try {

        const signature = generateSignature();

        const response = await http.get(config.api_url + '/open/v1/account/spot?signature=' + signature);

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

module.exports = { fetchBalance };
