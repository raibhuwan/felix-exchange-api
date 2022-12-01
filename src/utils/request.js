const crypto  = require("crypto");
const { config } = require("../config");

/**
 * Generate signature
 *
 * @param { String } query
 * @returns
 *
 */
const generateSignature = ( query = '' ) => {
    return crypto.createHmac('sha256', config.secret_key).update(query).digest('hex');
}

module.exports = { generateSignature };
