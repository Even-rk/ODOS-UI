import type { App, Plugin } from 'vue'
import Steps from './src/index.vue'

export const StepsPlugin: Plugin = {
  install(app: App) {
    app.component('OdosSteps', Steps)
  }
}

export { Steps }
