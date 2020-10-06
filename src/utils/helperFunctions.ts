function isValidArray(array) {
    return array !== undefined && Array.isArray(array) && array.length > 0;
}

function isValidObject(object) {
    return (
        object &&
        Object.keys(object).length > 0 &&
        (object.constructor === Object || typeof object === "object")
    );
}

function promisifyRequest({ request, requestName }) {
    return new Promise((resolve, reject) => {
        resolve(request);
    })
        .then((response) => {
            return Promise.resolve({
                serviceResponse: response,
                name: requestName,
            });
        })
        .catch((error) => {
            return Promise.resolve({
                serviceResponse: error.errorObject || error.response,
                name: requestName,
            });
        });
}

module.exports = {
    isValidArray,
    isValidObject,
    promisifyRequest,
};
