import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '')
  const backendURL = (env.backend_URL || env.VITE_BACKEND_URL || 'http://localhost:5800')
    .trim()
    .replace(/\/+$/, '')

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __BACKEND_URL__: JSON.stringify(backendURL),
    },
  }
})
