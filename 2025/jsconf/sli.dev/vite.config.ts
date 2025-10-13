import { defineConfig } from 'vite'

export default defineConfig({
  slidev: {
    vue: {
      // Vue configuration
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
})