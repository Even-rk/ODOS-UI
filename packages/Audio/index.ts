import type { App, Plugin } from 'vue'
import Audio from './src/index.vue'

export const AudioPlugin: Plugin = {
  install(app: App) {
    app.component('OdosAudio', Audio)
  }
}

export { Audio }
