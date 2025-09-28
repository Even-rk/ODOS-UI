import type { App, Plugin } from 'vue'
import SmartSelect from './src/index.vue'

export const SmartSelectPlugin: Plugin = {
  install(app: App) {
    app.component('OdosSmartSelect', SmartSelect)
  }
}

export { SmartSelect }