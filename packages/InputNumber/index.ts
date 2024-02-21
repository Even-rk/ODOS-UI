import type { App, Plugin } from 'vue'
import InputNumber from './src/index.vue'

export const InputNumberPlugin: Plugin = {
  install(app: App) {
    app.component('OdosInputNumber', InputNumber)
  }
}

export { InputNumber }
