module.exports = {
  // Test environment
  testEnvironment: 'jsdom',

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Test file patterns
  testMatch: [
    '<rootDir>/tests/**/*.test.js'
  ],

  // Coverage configuration
  collectCoverageFrom: [
    '**/script.js',
    '!tests/**',
    '!node_modules/**',
    '!coverage/**',
    '!jest.config.js'
  ],

  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Module configuration
  moduleFileExtensions: ['js', 'json'],

  // Transform configuration (no transforms needed for vanilla JS)
  transform: {},

  // Clear mocks between tests
  clearMocks: true,

  // Verbose output
  verbose: true,

  // Error handling
  errorOnDeprecated: true,

  // Test timeout (10 seconds)
  testTimeout: 10000,

  // Global variables
  globals: {
    'process.env': {}
  },

  // Mock patterns
  modulePathIgnorePatterns: [
    '<rootDir>/dist/'
  ],

  // Test results processor
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'coverage', outputName: 'junit.xml' }]
  ],

  // Setup files
  setupFiles: []
};