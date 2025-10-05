import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: '/teste-tecnico-react-ambev-tech/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Code splitting por feature/página
          if (id.includes('/src/pages/Tasks/')) {
            if (id.includes('List')) return 'tasks-list';
            if (id.includes('Edit')) return 'tasks-edit';
            if (id.includes('New')) return 'tasks-new';
            return 'tasks-common';
          }
        },
      },
    },
    sourcemap: false,
  },
});
