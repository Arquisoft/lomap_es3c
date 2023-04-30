export default {
    collectCoverage: true,
    collectCoverageFrom: ["src/components/*.{tsx}"],
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    transform: {
        "^.+\\.tsx$": "ts-jest"
    },
    testTimeout:150000,
}