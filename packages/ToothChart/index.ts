import type { App, Plugin } from 'vue'
import ToothChart from './src/index.vue'

export const ToothChartPlugin: Plugin = {
  install(app: App) {
    app.component('OdosToothChart', ToothChart)
  }
}

export { ToothChart }
