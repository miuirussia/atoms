import child_process from 'child_process';
import { splitVendorChunkPlugin } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

const hash = child_process.execSync('git describe --always --dirty=-dirty', { encoding: 'utf8' }).replace(/\n$/, '');

const hashify = (name: string): string => name.replace('[hash]', hash);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['last 2 versions', 'IE >= 11'],
    }),
    splitVendorChunkPlugin(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: hashify('assets/[name].[hash].js'),
        chunkFileNames: hashify('assets/[name].[hash].js'),
        assetFileNames: hashify('assets/[name].[hash].[ext]'),
      },
    },
  },
  test: {
    environment: 'happy-dom',
    css: true,
    include: ['**/*.spec.{js,ts,jsx,tsx}'],
  },
})
