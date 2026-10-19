import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import safeql from '@ts-safeql/eslint-plugin/config';

export default defineConfig(
  {
    files: ['**/*.{js,ts}'],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  safeql.configs.connections({
    databaseUrl: 'postgres://postgres:postgres@localhost:5434/postgres',
    overrides: { types: { uuid: 'string' } },
    targets: [{ wrapper: 'client.query' }],
  }),
);
