import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Web Analytics is loaded at runtime from src/analytics.js so
// internal/agent traffic (?internal=1 cookie) can skip the beacon. Do not
// re-introduce a build-time HTML inject here.

export default defineConfig({
  plugins: [react()],
})
