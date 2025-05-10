import type { KnipConfig } from 'knip';

export default {
  compilers: {
    // Detect dependencies imported through `@import` statements within CSS files
    css: (text) =>
      text
        .matchAll(/(?<=@)import[^;]+/g)
        .toArray()
        .join('\n'),
  },
  ignoreDependencies: [
    // Used implicitly by `eslint-plugin-import-x`
    'eslint-import-resolver-typescript',
  ],
  treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
