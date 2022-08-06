import child_process from 'child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const hash = child_process.execSync('git describe --always --dirty=-dirty', { encoding: 'utf8' }).replace(/\n$/, '');

const hashify = (name: string): string => name.replace('[hash]', hash);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: hashify('assets/[name].[hash].js'),
        chunkFileNames: hashify('assets/[name].[hash].js'),
        assetFileNames: hashify('assets/[name].[hash].[ext]'),
      },
    },
  }
})
