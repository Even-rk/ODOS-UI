import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'vite-plugin-md'

let nodeList = []
export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, '../packages/index.ts'),
      name: 'ODOSUI',
      formats: ['es', 'umd']
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue', 'ant-design-vue', '@vueuse/core', 'dayjs', 'vue-router'],
      output: [
        {
          format: 'es',
          dir: 'lib/es',
          preserveModules: true,
          preserveModulesRoot: 'packages',
          entryFileNames: (chunk) => {
            if (chunk.name.includes('node_modules')) {
              const list = chunk.name.split('@')
              if (list[list.length - 1].includes('node_modules')) {
                const Path = list[list.length - 1].replace(/^[\d._]+_/g, '')
                return `${Path.replace(/^\//g, '')}.js`
              }
              return `${list[list.length - 1]}.js`
            }
            if (nodeList.includes(chunk.name)) {
              return `module/${chunk.name}.js`
            } else {
              nodeList.push(chunk.name)
              if (chunk.name.includes('vue')) {
                return `${chunk.name.split('.')[0]}.js`
              } else {
                return `${chunk.name}.js`
              }
            }
          },
          exports: 'named'
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
          assetFileNames: 'style.css',
          exports: 'named'
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
      packages: resolve(__dirname, '../packages')
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