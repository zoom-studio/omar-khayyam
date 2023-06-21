const jestConfig = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/docs/', '<rootDir>/dist/'],
  moduleNameMapper: {
    '^@/source/(.*)$': '<rootDir>/source/$1',
  },
  modulePaths: ['<rootDir>/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}

module.exports = jestConfig
