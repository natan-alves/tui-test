async function gitHubPreHandler(request, reply) {
    let requestHeaders = request.headers;

    if (
        !requestHeaders.accept ||
        requestHeaders.accept !== "application/json"
    ) {
        reply.code(406).send({
            status: 406,
            message: "Not Acceptable",
        });
    }
}

module.exports = gitHubPreHandler;
