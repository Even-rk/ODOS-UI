import type { App, Plugin } from 'vue'
import TextDisplay from './src/index.vue'

export const TextDisplayPlugin: Plugin = {
  install(app: App) {
    app.component('OdosTextDisplay', TextDisplay)
  }
}

export { TextDisplay } 