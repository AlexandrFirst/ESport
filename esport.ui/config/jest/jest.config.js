// import nextJest from "next/jest";
//
// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: "./",
// });
//
// // Add any custom config to be passed to Jest
// /** @type {import('jest').Config} */
// const customJestConfig = {
//   // Add more setup options before each test is run
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
//   moduleDirectories: ["node_modules", "<rootDir>/"],
//
//   // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
//   // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
//   // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
//   // For example:
//
//   moduleNameMapper: {
//     // '^@components/(.*)$': '<rootDir>/components/$1',
//     "^@shared/(.*)$": "<rootDir>/shared/$1",
//     "^@app/(.*)$": "<rootDir>/app/$1",
//     "^@entities/(.*)$": "<rootDir>/entities/$1",
//     "^@features/(.*)$": "<rootDir>/features/$1",
//     "^@layouts/(.*)$": "<rootDir>/layouts/$1",
//     "^@pages/(.*)": "<rootDir>/pages/$1",
//     "^@widgets/(.*)$": "<rootDir>/widgets/$1",
//   },
//   setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
//   rootDir: "./",
//   testEnvironment: "jest-environment-jsdom",
// };
//
// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(customJestConfig);

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],

  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  // For example:

  moduleNameMapper: {
    // '^@components/(.*)$': '<rootDir>/components/$1',
    "^@shared/(.*)$": "<rootDir>/shared/$1",
    "^@app/(.*)$": "<rootDir>/app/$1",
    "^@entities/(.*)$": "<rootDir>/entities/$1",
    "^@features/(.*)$": "<rootDir>/features/$1",
    "^@layouts/(.*)$": "<rootDir>/layouts/$1",
    "^@pages/(.*)": "<rootDir>/pages/$1",
    "^@widgets/(.*)$": "<rootDir>/widgets/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/config/jest/setupTests.ts"],
  rootDir: "../../",
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
