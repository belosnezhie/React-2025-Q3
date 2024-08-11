import { vitePlugin as remix } from '@remix-run/dev';
import reactVitest from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // plugins: [remix({ ignoredRouteFiles: ['**/*.css'] }), tsconfigPaths()],
  plugins: [
    process.env.VITEST
      ? reactVitest()
      : remix({ ignoredRouteFiles: ['**/*.css'] }),
    tsconfigPaths(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
