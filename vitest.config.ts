import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    css: true,
    include: ['**/*.spec.{js,ts,jsx,tsx}'],
  },
});
