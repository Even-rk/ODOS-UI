import type { App, Plugin } from 'vue'
import Popover from './src/index.vue'

export const PopoverPlugin: Plugin = {
  install(app: App) {
    app.component('OdosPopover', Popover)
  }
}

export { Popover }
