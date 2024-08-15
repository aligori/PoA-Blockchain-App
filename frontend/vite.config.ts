import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/constants': path.resolve(__dirname, './src/constants'),
      '@/contracts': path.resolve(__dirname, './src/contracts'),
      '@/core': path.resolve(__dirname, './src/core'),
      '@/hoc': path.resolve(__dirname, './src/hoc'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/redux': path.resolve(__dirname, './src/redux'),
      '@/router': path.resolve(__dirname, './src/router'),
      '@/utils': path.resolve(__dirname, './src/utils')
    }
  },
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3000",
  },
});
