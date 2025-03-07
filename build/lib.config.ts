import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'vite-plugin-md'
import path from 'path'

// 获取 packages 目录下的所有组件

export default defineConfig({
  build: {
    outDir: 'odos-ui',
    lib: {
      entry: path.resolve(__dirname, '../packages/index.ts'),
      name: 'ODOSUI',
      fileName: (format) => `odos-ui.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'odos-ui/es',
          preserveModules: true,
          preserveModulesRoot: 'packages',
          entryFileNames: 'packages/[name].js'
        },
        {
          format: 'cjs',
          dir: 'odos-ui/lib',
          preserveModules: true,
          preserveModulesRoot: 'packages',
          entryFileNames: 'packages/[name].js'
        }
      ]
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
      entryRoot: 'packages',
      outDir: ['odos-ui/es/packages', 'odos-ui/lib/packages'],
      tsconfigPath: path.resolve(__dirname, '../tsconfig.json')
    })
  ]
})
