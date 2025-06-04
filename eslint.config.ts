// @ts-expect-error Currently does not include a type-declaration file
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import react from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import markdown from '@eslint/markdown';
// @ts-expect-error Currently does not include a type-declaration file
import next from '@next/eslint-plugin-next';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import deMorgan from 'eslint-plugin-de-morgan';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginJsonSchemaValidator from 'eslint-plugin-json-schema-validator';
import eslintPluginJsonc from 'eslint-plugin-jsonc';
// @ts-expect-error Currently does not include a type-declaration file
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginMath from 'eslint-plugin-math';
import moduleInterop from 'eslint-plugin-module-interop';
import nodePlugin from 'eslint-plugin-n';
import packageJsonPlugin from 'eslint-plugin-package-json';
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

import packageJson from './package.json' with { type: 'json' };

const GLOB_JS = '**/*.?([cm])js';
const GLOB_PACKAGE_JSON = '**/package.json';
const GLOB_TS = '**/*.?([cm])ts?(x)';

const { name: PROJECT_NAME } = packageJson;

export default typegen(
  defineConfig([
    gitignore(),
    globalIgnores([
      /* Auto-generated files/directories that are not included in .gitignore */
      'pnpm-lock.yaml',

      /* Dot files/directories which should NOT be ignored */
      '!.dependency-cruiser.js',
      '!.vscode',
    ]),
    {
      extends: ['js/recommended'],
      files: [GLOB_JS, GLOB_TS],
      name: `${PROJECT_NAME}/javascript`,
      plugins: { js },
      rules: {
        'no-console': ['error', { allow: ['error'] }],
      },
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        tseslint.configs.strictTypeChecked,
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        tseslint.configs.stylisticTypeChecked,
      ],
      files: [GLOB_JS, GLOB_TS],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      } satisfies ConfigArray[number]['languageOptions'],
      name: `${PROJECT_NAME}/typescript`,
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
      name: `${PROJECT_NAME}/jsdoc-typescript`,
      rules: {
        'jsdoc/require-jsdoc': 'off', // Too restrictive
      },
    },
    {
      extends: [jsdoc.configs['flat/recommended-typescript-flavor-error']],
      files: [GLOB_JS],
      name: `${PROJECT_NAME}/jsdoc-javascript`,
      rules: {
        'jsdoc/require-jsdoc': 'off', // Too restrictive
      },
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- No type declaration
      extends: [comments.recommended],
      name: `${PROJECT_NAME}/comments`,
      rules: {
        '@eslint-community/eslint-comments/require-description': 'error',
      },
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginJsonc.configs['flat/recommended-with-jsonc'],
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginJsonc.configs['flat/prettier'],
        {
          ignores: [GLOB_PACKAGE_JSON],
          name: `${PROJECT_NAME}/json/sort-keys`,
          rules: {
            'jsonc/sort-keys': 'error',
          },
        },
      ],
      name: `${PROJECT_NAME}/json`,
    },
    {
      extends: [eslintPluginJsonSchemaValidator.configs['flat/recommended']],
      name: `${PROJECT_NAME}/json-schema-validator`,
    },
    {
      extends: [markdown.configs.recommended],
      name: `${PROJECT_NAME}/markdown`,
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- No type declaration
      extends: [
        nodePlugin.configs['flat/recommended'],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
        pluginSecurity.configs.recommended,
      ],
      name: `${PROJECT_NAME}/node`,
      rules: {
        'n/no-missing-import': 'off', // This is already enforced either by TypeScript or by `import-x/no-unresolved`
        'security/detect-object-injection': 'off', // Too restrictive
      },
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- No type declaration
      extends: [pluginPromise.configs['flat/recommended']],
      name: `${PROJECT_NAME}/promise`,
    },
    {
      extends: [perfectionist.configs['recommended-natural']],
      name: `${PROJECT_NAME}/perfectionist`,
      rules: {
        'perfectionist/sort-imports': ['error', { tsconfigRootDir: '.' }],
      },
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginYml.configs['flat/recommended'],
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginYml.configs['flat/prettier'],
      ],
      name: `${PROJECT_NAME}/yaml`,
    },
    {
      extends: [
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginImportX.flatConfigs.recommended,
        // @ts-expect-error Config type is currently incompatible with official eslint `Linter.Config` type
        eslintPluginImportX.flatConfigs.typescript,
      ],
      name: `${PROJECT_NAME}/import`,
      rules: {
        'import-x/default': 'off', // TypeScript already enforces this
        'import-x/named': 'off', // TypeScript already enforces this
        'import-x/namespace': 'off', // TypeScript already enforces this
        'import-x/newline-after-import': 'error',
        'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
        'import-x/no-named-as-default-member': 'off', // TypeScript already enforces this
      },
      settings: {
        'import-x/resolver-next': createTypeScriptImportResolver(),
      },
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- No type declaration
      extends: [
        reactHooks.configs.recommended,
        react.configs['recommended-type-checked'],
        reactPlugin.configs.flat.recommended,
        reactPlugin.configs.flat['jsx-runtime'],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- No type declaration
        jsxA11y.flatConfigs.recommended,
        reactRefresh.configs.vite,
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
      ],
      files: [GLOB_JS, GLOB_TS],
      name: `${PROJECT_NAME}/react`,
      rules: {
        'react-hooks/react-compiler': 'error',
      },
    },
    {
      extends: [eslintPluginUnicorn.configs.recommended],
      name: `${PROJECT_NAME}/unicorn`,
      rules: {
        'unicorn/no-null': 'off', // Too restrictive
        'unicorn/prevent-abbreviations': [
          'error',
          {
            ignore: [/env/i, /props$/i, /params$/i],
          },
        ],
      },
    },
    {
      extends: [sonarjs.configs.recommended],
      name: `${PROJECT_NAME}/sonarjs`,
    },
    {
      extends: [regexpPlugin.configs['flat/recommended']],
      name: `${PROJECT_NAME}/regexp`,
    },
    {
      extends: [deMorgan.configs.recommended],
      name: `${PROJECT_NAME}/demorgan`,
    },
    {
      extends: [eslintPluginMath.configs.recommended],
      name: `${PROJECT_NAME}/math`,
    },
    {
      extends: [moduleInterop.configs.recommended],
      name: `${PROJECT_NAME}/module-interop`,
    },
    {
      extends: [packageJsonPlugin.configs.recommended],
      name: `${PROJECT_NAME}/package-json`,
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- No type declaration
      extends: [next.flatConfig.coreWebVitals],
      name: `${PROJECT_NAME}/next`,
    },
    {
      linterOptions: {
        reportUnusedInlineConfigs: 'error',
      },
      name: `${PROJECT_NAME}/linter-options`,
    },
    {
      extends: [eslintConfigPrettier],
      name: `${PROJECT_NAME}/prettier`,
    },
  ]),
);
