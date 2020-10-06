// const InternalTimeoutError = require('../exceptions/InternalTimeoutError');

// const defaultTimeout = config.get('general.httpRequests.defaultTimeout');

class RequestWrapper {
    async request({ httpClientInstance, requestOptions, cancelToken }) {
        const requestUrl = `${httpClientInstance.defaults.baseURL}${requestOptions.url}`;
        const requestTimeout = httpClientInstance.defaults.timeout || 3000;

        const timeoutPromise = new Promise((resolve, reject) => {
            const id = setTimeout(() => {
                clearTimeout(id);
                cancelToken.cancel();
                reject({
                    message: `Request timed out in ${requestTimeout}ms`,
                    url: requestUrl,
                });
            }, requestTimeout);
        });

        const responsePromise = httpClientInstance(requestOptions);

        return Promise.race([responsePromise, timeoutPromise]);
    }
}

module.exports = new RequestWrapper();
