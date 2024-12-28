import type { App, Plugin } from 'vue'
import ToothSelect from './src/index.vue'

export const ToothSelectPlugin: Plugin = {
  install(app: App) {
    app.component('OdosToothSelect', ToothSelect)
  }
}

export { ToothSelect }
