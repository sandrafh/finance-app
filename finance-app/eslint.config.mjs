import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jest from 'eslint-plugin-jest'
import checkFile from 'eslint-plugin-check-file'
import stylistic from '@stylistic/eslint-plugin-js'
import importPlugin from 'eslint-plugin-import'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'check-file': checkFile,
      prettier,
      react,
      'react-hooks': reactHooks,
      jest,
      '@stylistic/js': stylistic,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      parser: typescriptEslintParser,
    },
  },
  {
    rules: {
      semi: ['error', 'never'],
      '@typescript-eslint/semi': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      // Since React 17 and typescript 4.1 you can safely disable the rule
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': 'off',
      // We do mostly func. comps. and default props will be deprecated in the future.
      'react/require-default-props': 'off',
      'no-console': ['error', { allow: ['warn', 'info', 'error', 'group', 'groupEnd'] }],
      '@typescript-eslint/no-unused-vars': [
        'warn', // or "error"
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': ['error', { semi: false, singleQuote: true, trailingComma: 'es5', printWidth: 120 }],
      '@stylistic/js/keyword-spacing': [
        'error',
        {
          overrides: {
            if: { after: true },
            for: { after: true },
            while: { after: true },
            static: { after: true },
            as: { after: true },
          },
        },
      ],
      'import/no-relative-packages': 'error',
      'import/no-relative-parent-imports': 'error',
      'import/no-unresolved': 'error',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: ['../*'],
        },
      ],
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
]
