export default {
    rootDir: './',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "src/*Schema.ts",
        "api.ts",  
    ],
    
}