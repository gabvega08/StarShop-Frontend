const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });
module.exports = createJestConfig({
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
});
