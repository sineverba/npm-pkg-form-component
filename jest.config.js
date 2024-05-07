/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  reporters: ["default", ["jest-junit", { outputDirectory: ".test_report" }]],
  setupFilesAfterEnv: ['<rootDir>/src/setupTest.js'],
  testEnvironment: "jsdom",
};