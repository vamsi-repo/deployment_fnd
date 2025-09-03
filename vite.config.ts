import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [react()],
    root: './',
    publicDir: 'public',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3001,
      host: 'localhost',
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: parseInt(process.env.PORT) || 4173,
      host: '0.0.0.0'
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    define: {
      // Define environment variables for production
      __API_URL__: isProduction 
        ? JSON.stringify(process.env.VITE_API_URL || '/api')
        : JSON.stringify('/api')
    }
  }
})