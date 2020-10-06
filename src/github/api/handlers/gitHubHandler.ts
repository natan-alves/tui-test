// const helper = require("../../../RequestHelper");
// const GitHubBackend = require("../backend/GitHubBackend");
import GitHubBackend from "../backend/GitHubBackend";
import RepositoriesParser from "../parser/RepositoriesParser";

async function gitHubHandler(request, reply) {
    const { userId } = request.params;
    const response = await new GitHubBackend().getRepositories(userId);

    if (response.code === 200) {
        const parsedResponse = new RepositoriesParser().parseRepository(
            response.data[0],
            response.data[1]
        );
        reply.code(200).send({
            repositories: parsedResponse,
        });
    }

    reply.code(response.code).send({
        status: response.code,
        message: response.data[0].message,
    });
}

module.exports = gitHubHandler;
