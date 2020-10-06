const gitHubSchema = {
    description:
        "Get a list of Repositories from a user and branches with the last commit and name",
    tags: ["github"],
    params: {
        type: "object",
        properties: {
            userId: {
                type: "string",
            },
        },
        required: ["userId"],
    },
    response: {
        "200": {
            type: "object",
            properties: {
                repositories: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            repository_name: {
                                type: "string",
                            },
                            owner_login: {
                                type: "string",
                            },
                            branches: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        branch_name: {
                                            type: "string",
                                        },
                                        commit_sha: {
                                            type: "string",
                                        },
                                    },
                                },
                            },
                        },
                        additionalProperties: false,
                    },
                },
            },
            additionalProperties: false,
        },
        "404": {
            type: "object",
            properties: {
                status: {
                    type: "integer",
                },
                message: {
                    type: "string",
                },
            },
            additionalProperties: false,
        },
        "406": {
            type: "object",
            properties: {
                status: {
                    type: "integer",
                },
                message: {
                    type: "string",
                },
            },
            additionalProperties: false,
        },
        "500": {
            type: "object",
            properties: {
                status: {
                    type: "integer",
                },
                message: {
                    type: "string",
                },
            },
            additionalProperties: false,
        },
    },
};

module.exports = gitHubSchema;
