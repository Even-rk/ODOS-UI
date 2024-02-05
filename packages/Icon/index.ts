import type { App, Plugin } from 'vue'
import Icon from './src/index.vue'

export const IconPlugin: Plugin = {
  install(app: App) {
    app.component('OdosIcon', Icon)
  }
}

export { Icon }
