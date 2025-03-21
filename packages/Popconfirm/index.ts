import type { App, Plugin } from 'vue'
import Popconfirm from './src/index.vue'

export const PopconfirmPlugin: Plugin = {
  install(app: App) {
    app.component('OdosPopconfirm', Popconfirm)
  }
}

export { Popconfirm }
