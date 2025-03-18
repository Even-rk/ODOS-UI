import type { App, Plugin } from 'vue'
import Drawer from './src/index.vue'

export const DrawerPlugin: Plugin = {
  install(app: App) {
    app.component('OdosDrawer', Drawer)
  }
}

export { Drawer }
