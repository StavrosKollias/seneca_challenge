module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.js',
      'src/**/*.jsx',
      '!src/index.jsx',
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    testPathIgnorePatterns: [
      '<rootDir>/build/',
      '<rootDir>/node_modules/',
      '<rootDir>/src/tests/utils/',
      '<rootDir>/src/tests/setupTests.ts',
    ],
    transform: {
      '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
        'jest-transform-stub',
      '^.+\\.(js|jsx)?$': 'babel-jest',
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
  
    // Module file extensions for importing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };