import type { NextConfig } from 'next';

// Validate environment variables during build time
import './src/env.ts';

export default {
  experimental: {
    reactCompiler: true,
  },
} satisfies NextConfig;
