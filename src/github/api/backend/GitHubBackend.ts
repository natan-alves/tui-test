const axios = require("axios");
const newHttpClient = require("../../../utils/httpClient");
const RequestWrapper = require("../../../utils/requestWrapper/RequestWrapper");
const {
    isValidArray,
    isValidObject,
    promisifyRequest,
} = require("../../../utils/helperFunctions");

const cancelToken = axios.CancelToken.source();

class GitHubBackend {
    protected readonly instance: any;

    public constructor() {
        this.instance = newHttpClient({
            name: "github",
            baseUrl: "https://api.github.com/",
            timeout: 3000,
        });
    }

    public async getRepositories(userId: string) {
        try {
            const requestOptions = {
                method: "GET",
                url: `users/${userId}/repos?type=owner`,
            };

            const fullListRepositories = await RequestWrapper.request({
                httpClientInstance: this.instance,
                requestOptions,
                cancelToken,
            });

            const repositoriesRequest = promisifyRequest({
                request: fullListRepositories,
                requestName: "Repositories",
            });

            const requestsResponses = await Promise.all([repositoriesRequest]);

            const repositories = this.getSingleResponse({
                requestsResponses,
                serviceName: "Repositories",
            }).filter((repository) => {
                return repository.fork === false;
            });

            if (!isValidObject(repositories)) return {};

            const branchesRequests = this.buildBranchesRequests(
                userId,
                repositories
            );
            const branches = await this.getBranchesResponse(branchesRequests);

            return {
                data: [repositories, branches],
                code: 200,
            };
        } catch (error) {
            return {
                data: [
                    {
                        message:
                            error.response.statusText ||
                            "Internal Server Error",
                    },
                ],
                code: error.response.status || 500,
            };
        }
    }

    private buildBranchesRequests(userId: string, repositories: Array<any>) {
        let branches: Array<any> = [];
        for (const repository of repositories) {
            const branchPromise = this.getBranch(userId, repository.name);

            branches.push(
                promisifyRequest({
                    request: branchPromise,
                    requestName: repository.name,
                })
            );
        }
        return branches;
    }

    private async getBranch(userId: string, repositoryName: string) {
        const requestOptions = {
            method: "GET",
            url: `repos/${userId}/${repositoryName}/branches`,
        };

        const branchPromise = await RequestWrapper.request({
            httpClientInstance: this.instance,
            requestOptions,
            cancelToken,
        });

        return branchPromise;
    }

    private async getBranchesResponse(requests) {
        const requestsResponses = await Promise.all(requests);

        let branchesResponses = {};

        requestsResponses.map((branch: any) => {
            if (!branchesResponses[branch.name]) {
                branchesResponses[branch.name] = {};
            }
            branchesResponses[branch.name] = branch.serviceResponse.data;
        });

        return branchesResponses;
    }

    private getSingleResponse({ requestsResponses, serviceName }) {
        return requestsResponses
            .filter((value) => {
                return this.isResponseValid(value, serviceName);
            })
            .reduce((accumulator, response) => {
                return response.serviceResponse.data;
            }, {});
    }

    private isResponseValid(response, name) {
        return (
            response.name === name &&
            response.serviceResponse &&
            this.statusCodeValidator(response.serviceResponse) &&
            isValidObject(response.serviceResponse.data)
        );
    }

    private statusCodeValidator(serviceResponse) {
        const responseStatusCode =
            serviceResponse.status || serviceResponse.statusCode;

        return this.isStatusCodeValid(responseStatusCode);
    }

    private isStatusCodeValid(statusCode) {
        if (!statusCode) return false;

        const statusCodeRegex = /^[2][0-9][0-9]$/;

        return statusCodeRegex.test(statusCode);
    }
}

export default GitHubBackend;
