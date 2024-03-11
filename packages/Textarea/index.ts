import type { App, Plugin } from 'vue'
import Textarea from './src/index.vue'

export const TextareaPlugin: Plugin = {
  install(app: App) {
    app.component('OdosTextarea', Textarea)
  }
}

export { Textarea }
