import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: undefined
      },
      onwarn(warning, warn) {
        // Skip warnings to avoid build failures
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      }
    }
  },
  preview: {
    port: parseInt(process.env.PORT) || 4173,
    host: '0.0.0.0'
  }
})