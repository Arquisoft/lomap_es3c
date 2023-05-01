export default {
    rootDir: './',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    testPathIgnorePatterns: [
        "src/"
    ],
    collectCoverageFrom: [
        "api.ts",
    ]
}