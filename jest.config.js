/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node", // Use Node.js test environment
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // Handle .ts and .tsx files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"], // Ensure it recognizes .ts and .tsx files
  testMatch: [
    "**/test/**/*.test.ts", // Match all .ts test files in the tests directory
  ],
  watchman: false,
  // rootDir: './', // Root directory of the project (if needed)
  // modulePaths: ["<rootDir>/src"],
};