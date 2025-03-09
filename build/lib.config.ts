import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'vite-plugin-md'

export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, '../packages/index.ts'),
      name: 'ODOSUI',
      formats: ['es', 'umd']
    },
    cssCodeSplit: false, // Unified CSS bundling
    rollupOptions: {
      external: ['vue', 'ant-design-vue', '@vueuse/core', 'dayjs', 'vue-router'],
      output: [
        {
          format: 'es',
          dir: 'lib/es',
          preserveModules: true,
          preserveModulesRoot: 'packages',
          entryFileNames: '[name].js'
        },
        {
          format: 'umd',
          dir: 'lib/umd',
          name: 'ODOSUI',
          globals: {
            vue: 'Vue',
            'ant-design-vue': 'antd',
            '@vueuse/core': 'VueUse',
            dayjs: 'dayjs',
            'vue-router': 'VueRouter'
          },
          entryFileNames: 'odos-ui.umd.js',
          assetFileNames: 'style.css' // Unified CSS file
        }
      ]
    },
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      packages: resolve(__dirname, '../packages'),
      styles: resolve(__dirname, '../styles')
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown(),
    vuejsx(),
    dts({
      include: ['packages/**/*'],
      outDir: 'lib/es',
      staticImport: true,
      insertTypesEntry: true
    })
  ]
})