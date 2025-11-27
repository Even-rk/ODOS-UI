import type { App, Plugin } from 'vue'
import DropdownPanel from './src/index.vue'

export const DropdownPanelPlugin: Plugin = {
  install(app: App) {
    app.component('OdosDropdownPanel', DropdownPanel)
  }
}

export { DropdownPanel }
