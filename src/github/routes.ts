const gitHubHandler = require("./api/handlers/gitHubHandler");
const gitHubPreHandler = require("./api/handlers/gitHubPreHandler");

const scheme = require("./api/schemas/gitHubSchema");

async function gitHubRoutes(fastify) {
    fastify.route({
        handler: gitHubHandler,
        method: "GET",
        path: "/v1/github/:userId/repositories",
        preHandler: gitHubPreHandler,
        schema: scheme,
    });
}

export default gitHubRoutes;
