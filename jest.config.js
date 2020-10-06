module.exports = {
    clearMocks: true,
    resetMocks: true,
    verbose: true,
    testEnvironment: "node",
    testMatch: ["**/*.spec.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    collectCoverageFrom: ["src/**/*.ts"],
    coveragePathIgnorePatterns: ["/node_modules/"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
