// .eslintrc.js (with ES Module syntax)
import { defineConfig } from 'eslint';

export default {
  parser: '@typescript-eslint/parser',  // Use TypeScript parser
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,  // Support ES2020 syntax
    sourceType: 'module',  // Use modules
  },
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
