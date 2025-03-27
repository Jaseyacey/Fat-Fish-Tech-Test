module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for transforming TS files
    '^.+\\.js$': 'babel-jest',  // If using Babel for JavaScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testMatch: ['**/tests/**/*.test.ts'],  // Adjust if needed
  transformIgnorePatterns: ['node_modules/(?!aws-sdk)'], // Ignore node_modules except aws-sdk
};
