const axios = require("axios");
const httpAdapter = require("axios/lib/adapters/http");

function newHttpClient({ baseUrl, headers, name, params, timeout }) {
    const client = axios.create({
        adapter: httpAdapter,
        baseURL: baseUrl,
        headers,
        name,
        params,
        timeout,
    });

    return client;
}

module.exports = newHttpClient;
