/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,

  testEnvironment: "jsdom",

  preset: "ts-jest",

  setupFilesAfterEnv: ["<rootDir>/src/testUtils/testSetup.ts"],

  moduleNameMapper: {
    "\\.(png)$": "<rootDir>/__mocks__/fileMock.ts",
  },
};
