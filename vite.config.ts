import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

const pathResolve = (path: string): string => resolve(process.cwd(), path);

export default defineConfig({
  base: '/',
  plugins: [react()],
   resolve: {
    alias: {
      '@': pathResolve('src'),
      '#': pathResolve('types'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
   server: {
    host: '0.0.0.0',
    // port: 5173,
    proxy: {
      '/wei/api/v1': {
        target: 'https://www.miaominshuzi.com',
        changeOrigin: true,
      },
      '/contractView/v2': {
        target: 'https://www.miaominshuzi.com',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use 'sass:math';
        @import "@/assets/styles/mixin.scss";
        `,
      },
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})