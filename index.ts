import { startServer } from "./src/server";

(async function runServer() {
    try {
        const fastify = await startServer();

        fastify.ready(() => {
            console.log(fastify.printRoutes());
        });
    } catch (error) {
        throw error;
    }
})();
