module.exports = {
    preset: 'ts-jest',  // Use ts-jest to handle TypeScript files
    testEnvironment: 'node',  // Set the environment to Node.js
    transform: {
      '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest to transpile .ts and .tsx files
    },
    testMatch: ['**/?(*.)+(spec|test).ts'],  // Find all files with .test.ts or .spec.ts extensions
  };
  