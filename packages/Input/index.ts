import type { App, Plugin } from 'vue'
import Input from './src/index.vue'

export const InputPlugin: Plugin = {
  install(app: App) {
    app.component('OdosInput', Input)
  }
}

export { Input }
