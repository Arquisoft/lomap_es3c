export default {
    rootDir: './',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    testPathIgnorePatterns: [
        "/restapi/src/"
    ],
    collectCoverageFrom: [
        "api.ts",
    ]
}