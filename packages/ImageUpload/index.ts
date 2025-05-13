import type { App, Plugin } from 'vue'
import ImageUpload from './src/index.vue'

export const ImageUploadPlugin: Plugin = {
  install(app: App) {
    app.component('OdosImageUpload', ImageUpload)
  }
}

export { ImageUpload }