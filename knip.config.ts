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
  treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
