import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  test: {
    environment: 'jsdom',
  },
});
