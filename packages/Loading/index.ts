import type { App, Plugin } from 'vue'
import { Loading } from './utils/loading'
export * from './utils/loading'

export const LoadingPlugin: Plugin = {
  install(app: App) {
    app.component('OdosLoading', Loading)
  }
}
