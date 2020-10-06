const pkgJson = require("../package.json");

export const swaggerOptions = {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
        consumes: ["application/json"],
        host: "localhost:8080",
        info: {
            description: "GitHub integration",
            title: "TUI Backend test",
            version: pkgJson.version,
        },
        produces: ["application/json"],
        schemes: ["http", "https"],
    },
};
