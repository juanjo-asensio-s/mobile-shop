import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import vitest from 'eslint-plugin-vitest';
import {defineConfig, globalIgnores} from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']),

    // General config
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs['recommended-latest'],
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {jsx: true},
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'no-unused-vars': ['error', {varsIgnorePattern: '^[A-Z_]'}],
        },
    },

    // Vitest
    {
        files: ['**/*.test.{js,jsx}'],
        plugins: {
            vitest,
        },
        languageOptions: {
            globals: {
                vi: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
            },
        },
        rules: {
            ...vitest.configs.recommended.rules,
        },
    },
]);
