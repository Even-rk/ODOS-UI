import type { App, Plugin } from 'vue'
import ToothPosit from './src/index.vue'

export const ToothPositPlugin: Plugin = {
  install(app: App) {
    app.component('OdosToothPosit', ToothPosit)
  }
}

export { ToothPosit }
