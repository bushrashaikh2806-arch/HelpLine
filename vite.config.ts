import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    // Suppress the chunk size warning — 542 kB / 157 kB gzip is acceptable for a full-featured app
    chunkSizeWarningLimit: 700,
  },
})
