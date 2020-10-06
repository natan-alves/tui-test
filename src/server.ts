import { swaggerOptions } from "./swagger";

const fastify = require("fastify")({
    ignoreTrailingSlash: true,
});
const gitHubRoutes = require("./github/routes");

export async function startServer() {
    try {
        fastify.register(require("fastify-swagger"), swaggerOptions);
        fastify.register(gitHubRoutes);

        await fastify.listen(8080, "0.0.0.0", (error, address) => {
            if (error) {
                console.log(error);
            }
            if (process.env.NODE_ENV !== "test") {
                console.log(`Server listening at ${address}`);
            }
        });

        return fastify;
    } catch (error) {
        throw new Error(`Error while trying to start server! ${error}`);
    }
}

export async function closeServer() {
    await fastify.close();
}
