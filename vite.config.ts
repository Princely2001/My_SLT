import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: true,
    port: 80,
    // Add these for better HMR in development
    hmr: {
      overlay: true
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled'
    ],
    exclude: [
      // Add problematic packages here if needed
    ]
  },
  build: {
    sourcemap: true, // Required for bundle analysis
    minify: 'terser', // Better minification
    chunkSizeWarningLimit: 1600, // Increase chunk size warning limit (in kB)
    reportCompressedSize: false, // Disable compressed size reporting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: [
            '@mui/material',
            '@mui/icons-material',
            '@mui/x-charts',
            '@mui/x-date-pickers',
            '@emotion/react',
            '@emotion/styled'
          ],
          charts: ['recharts', '@mui/x-charts'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          state: ['zustand'],
          utils: ['axios', 'dayjs', 'jwt-decode'],
          // Add more chunks as needed
        },
        // Better chunk naming for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // Add these experimental features for better performance
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
      }
      return { relative: true }
    }
  }
})