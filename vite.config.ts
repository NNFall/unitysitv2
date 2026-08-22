import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  // Vite's dev server stays rooted for local QA; production assets are served
  // below the reverse-proxy mount requested for the public landing.
  base: mode === 'production' ? '/site/unity/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    globals: true
  },
  server: {
    port: 4173,
    strictPort: true
  },
  preview: {
    port: 4173,
    strictPort: true
  }
}))
