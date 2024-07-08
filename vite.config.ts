import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import vuejsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8001
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      packages: fileURLToPath(new URL('./packages', import.meta.url))
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    vuejsx(),
    Markdown()
  ]
})
