export default {
    collectCoverage: true,
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    collectCoverageFrom: ["src/components/*.{tsx}"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testTimeout:150000,
}