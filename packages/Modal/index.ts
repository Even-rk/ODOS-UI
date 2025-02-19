import type { App, Plugin } from 'vue'
import Modal from './src/index.vue'

export const ModalPlugin: Plugin = {
  install(app: App) {
    app.component('OdosModal', Modal)
  }
}

export { Modal }