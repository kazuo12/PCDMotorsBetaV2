import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: o mesmo build funciona no GitHub Pages (subcaminho /repo/)
// e em qualquer servidor estático. A saída vai direto para ../docs, que é a
// pasta que o Pages publica.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    target: 'es2020',
    assetsInlineLimit: 0,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        entryFileNames: 'app-[hash].js',
        assetFileNames: 'a/[name]-[hash][extname]',
      },
    },
  },
});
