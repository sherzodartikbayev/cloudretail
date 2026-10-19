import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import safeql from '@ts-safeql/eslint-plugin/config';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
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
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
);
