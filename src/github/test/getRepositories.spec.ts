import { startServer, closeServer } from "../../server";

let server;

beforeAll(async () => {
    server = await startServer();
});

afterAll(async () => {
    await closeServer();
});

jest.setTimeout(5000);

describe("Get Repositories", () => {
    describe("When request have valid header", () => {
        describe("When user has GitHub account", () => {
            it("Should reply with 200 OK", async () => {
                const payload = await server.inject({
                    url: `/v1/github/natan-alves/repositories`,
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });

                const response = JSON.parse(payload.payload);

                expect(payload.statusCode).toEqual(200);

                expect(response.repositories.length).toBeGreaterThan(0);
                expect(response.repositories[0].repository_name).toBeDefined();
                expect(response.repositories[0].owner_login).toBeDefined();
                expect(
                    response.repositories[0].branches.length
                ).toBeGreaterThan(0);
                expect(
                    response.repositories[0].branches[0].branch_name
                ).toBeDefined();
                expect(
                    response.repositories[0].branches[0].commit_sha
                ).toBeDefined();
            });
        });
        describe("When user does not have GitHub account", () => {
            it("Should reply with 404 Not Found", async () => {
                const payload = await server.inject({
                    url: `/v1/github/user-that-does-not-exist/repositories`,
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });

                const response = JSON.parse(payload.payload);

                expect(payload.statusCode).toEqual(404);

                expect(response.status).toEqual(404);
                expect(response.message).toEqual("Not Found");
            });
        });
    });

    describe("When request have invalid/missing header", () => {
        it("Should reply with 406 Not Acceptable", async () => {
            const payload = await server.inject({
                url: `/v1/github/natan-alves/repositories`,
                method: "GET",
                headers: {
                    Accept: "application/xml",
                },
            });

            const response = JSON.parse(payload.payload);

            expect(payload.statusCode).toEqual(406);

            expect(response.status).toEqual(406);
            expect(response.message).toEqual("Not Acceptable");
        });
    });
});
