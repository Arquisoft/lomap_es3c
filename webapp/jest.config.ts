export default {
    collectCoverage: true,
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    collectCoverageFrom: ["src/**/*.{tsx}"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testTimeout:150000,
}