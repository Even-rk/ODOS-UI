import type { App, Plugin } from 'vue'
import { Loading } from './src/index'
export * from './src/index'

export const LoadingPlugin: Plugin = {
  install(app: App) {
    app.component('OdosLoading', Loading)
  }
}

export { Loading }
