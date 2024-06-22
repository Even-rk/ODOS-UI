import type { App, Plugin } from 'vue'
import Empty from './src/index.vue'

export const EmptyPlugin: Plugin = {
  install(app: App) {
    app.component('OdosEmpty', Empty)
  }
}

export { Empty }
