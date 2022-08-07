import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    include: ['**/*.spec.{js,ts,jsx,tsx}'],
  },
});
