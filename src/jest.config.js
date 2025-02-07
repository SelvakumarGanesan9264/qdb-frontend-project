module.exports = {
    preset: 'ts-jest', // Use ts-jest for TypeScript support
    testEnvironment: 'jsdom', // Use jsdom for browser-like environment
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
    },
    moduleNameMapper: {
      '^axios$': require.resolve('axios'), // Resolve axios properly
    },
    transformIgnorePatterns: [
      // Allow Jest to transform specific node_modules
      '/node_modules/(?!axios)/',
    ],
  };