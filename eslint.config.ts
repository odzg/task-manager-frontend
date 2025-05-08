// @ts-expect-error Currently does not include a type-declaration file
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import react from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import markdown from '@eslint/markdown';
// @ts-expect-error Currently does not include a type-declaration file
import next from '@next/eslint-plugin-next';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import cssPlugin from 'eslint-plugin-css';
import deMorgan from 'eslint-plugin-de-morgan';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginJsonSchemaValidator from 'eslint-plugin-json-schema-validator';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
// @ts-expect-error Currently does not include a type-declaration file
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginMath from 'eslint-plugin-math';
import nodePlugin from 'eslint-plugin-n';
import packageJson from 'eslint-plugin-package-json';
import perfectionist from 'eslint-plugin-perfectionist';
// @ts-expect-error Currently does not include a type-declaration file
import pluginPromise from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import regexpPlugin from 'eslint-plugin-regexp';
// @ts-expect-error Currently does not include a type-declaration file
import pluginSecurity from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginYml from 'eslint-plugin-yml';
import typegen from 'eslint-typegen';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint, { type ConfigArray } from 'typescript-eslint';

const GLOB_JS = '**/*.?([cm])js';
const GLOB_TS = '**/*.?([cm])ts?(x)';

export default typegen(
  defineConfig([
    gitignore(),
    globalIgnores([
      /* Auto-generated files/directories */
      'pnpm-lock.yaml',

      /* Specific dot-files/dot-directories which should not be auto-ignored */
      '!.dependency-cruiser.js',
      '!.vscode',
    ]),
    js.configs.recommended,
    {
      extends: [
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
        react.configs['recommended-type-checked'],
      ],
      files: [GLOB_JS, GLOB_TS],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      } satisfies ConfigArray[number]['languageOptions'],
      rules: {
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { fixStyle: 'inline-type-imports' },
        ],
        '@typescript-eslint/no-empty-object-type': [
          'error',
          { allowInterfaces: 'with-single-extends' },
        ],
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
      },
    },
    {
      extends: [jsdoc.configs['flat/recommended-typescript-error']],
      files: [GLOB_TS],
    },
    {
      extends: [jsdoc.configs['flat/recommended-typescript-flavor-error']],
      files: [GLOB_JS],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    comments.recommended,
    eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
    eslintPluginJsonc.configs['flat/prettier'],
    eslintPluginJsonSchemaValidator.configs['flat/recommended'],
    markdown.configs.recommended,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    pluginSecurity.configs.recommended,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    pluginPromise.configs['flat/recommended'],
    perfectionist.configs['recommended-natural'],
    eslintPluginYml.configs['flat/recommended'],
    eslintPluginYml.configs['flat/prettier'],
    nodePlugin.configs['flat/recommended'],
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    reactHooks.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    jsxA11y.flatConfigs.recommended,
    reactRefresh.configs.recommended,
    {
      files: ['src/app/**/*'],
      rules: {
        'react-refresh/only-export-components': [
          'error',
          {
            allowExportNames: ['metadata'],
          },
        ],
      },
    },
    eslintPluginUnicorn.configs.recommended,
    sonarjs.configs.recommended,
    regexpPlugin.configs['flat/recommended'],
    deMorgan.configs.recommended,
    eslintPluginMath.configs.recommended,
    cssPlugin.configs['flat/standard'],
    packageJson.configs.recommended,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
    next.flatConfig.coreWebVitals,
    {
      rules: {
        '@eslint-community/eslint-comments/require-description': 'error',
        'import-x/default': 'off', // TypeScript already enforces this
        'import-x/named': 'off', // TypeScript already enforces this
        'import-x/namespace': 'off', // TypeScript already enforces this
        'import-x/newline-after-import': 'error',
        'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
        'import-x/no-named-as-default-member': 'off', // TypeScript already enforces this
        'jsdoc/require-jsdoc': 'off', // Too restrictive
        'jsonc/sort-keys': 'error',
        'n/no-missing-import': 'off', // This is already enforced either by TypeScript or by `import-x/no-unresolved`
        'no-console': ['error', { allow: ['error'] }],
        'perfectionist/sort-imports': ['error', { internalPattern: ['^#'] }],
        'react-hooks/react-compiler': 'error',
        'security/detect-object-injection': 'off', // Too restrictive
        'unicorn/no-null': 'off', // Too restrictive
        'unicorn/prevent-abbreviations': [
          'error',
          {
            allowList: {
              EnvSchema: true,
            },
            ignore: [/^env$/, /props$/i, /params$/i],
          },
        ],
      },
    },
    {
      files: ['package.json'],
      rules: {
        'jsonc/sort-keys': 'off', // Sorting of keys within `package.json` is handled by `eslint-plugin-package-json`
      },
    },
    eslintConfigPrettier,
    {
      linterOptions: {
        reportUnusedInlineConfigs: 'error',
      },
    },
  ]),
);
