import type { App, Plugin } from 'vue'
import Tooltip from './src/index.vue'

export const TooltipPlugin: Plugin = {
  install(app: App) {
    app.component('OdosTooltip', Tooltip)
  }
}

export { Tooltip }
