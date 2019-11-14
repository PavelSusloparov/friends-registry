const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./jest.tsconfig.json');

module.exports = {
    preset: 'ts-jest',
    testResultsProcessor: 'jest-junit-reporter',
    testEnvironment: 'node',
    moduleNameMapper: compilerOptions.paths
        ? pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' })
        : {},
    transform: {},
    verbose: false,
    globals: {
        'ts-jest': {
            diagnostics: true,
            tsConfig: 'jest.tsconfig.json',
        },
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: ['src/client/constants/*'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
};
