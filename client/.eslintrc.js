// Prefer using a JavaScript over .eslintrc file - better support for comments
module.exports = {
    parser: "babel-eslint",
    extends: [
        // 'plugin:@typescript-eslint/recommended', // uses typescript-specific linting rules
        'plugin:react/recommended', // uses react-specific linting rules
        'plugin:prettier/recommended', // enables eslint-plugin-prettier and eslint-config-prettier
        'prettier/react', // disables react-specific linting rules that conflict with prettier
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // Default rules https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    overrides: [
        {
            files: ['src/*', 'lib/*.js'],
            excludedFiles: 'node_m',
        },
    ],
};
