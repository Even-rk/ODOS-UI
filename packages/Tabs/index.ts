import type { App, Plugin } from 'vue'
import Tabs from './src/index.vue'
import Tab from './src/item.vue'

export const TabsPlugin: Plugin = {
  install(app: App) {
    app.component('OdosTabs', Tabs)
    app.component('OdosTab', Tab)
  }
}

export { Tabs, Tab }
