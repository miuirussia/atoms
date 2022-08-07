/// <reference types="vitest" />
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

import child_process from 'child_process';
import path from 'path';

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
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
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
