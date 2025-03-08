const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');
const eslintPluginJsxA11y = require('eslint-plugin-jsx-a11y');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginTs = require('@typescript-eslint/eslint-plugin');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['next/core-web-vitals'],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'prettier',
    '@typescript-eslint',
    'import',
  ],
  overrides: [
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      rules: {
        ...eslintPluginReact.configs.recommended.rules,
        ...eslintPluginReactHooks.configs.recommended.rules,
        ...eslintPluginJsxA11y.configs.recommended.rules,
        ...eslintPluginTs.configs.recommended.rules,
        '@typescript-eslint/no-unused-expressions': 'off',
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'import/order': [
          'error',
          {
            groups: [
              'external',
              'internal',
              ['parent', 'sibling', 'index'], // Relative imports
              'object', // Imports using `import * as X`
              'type',
            ],
            pathGroups: [
              {
                pattern: '{react,react-*}',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '@/actions/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/service/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/queries/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/stores/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/utils/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/helpers/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/hooks/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/components/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/app/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
      runtime: 'automatic',
    },
  },
};
