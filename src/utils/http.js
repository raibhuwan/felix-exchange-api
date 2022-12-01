const axios = require('axios');

/**
 * Http Utility.
 */
const http = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

module.exports = http;
