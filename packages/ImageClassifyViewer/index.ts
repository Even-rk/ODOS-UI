import type { App, Plugin } from 'vue'
import ImageClassifyViewer from './src/index.vue'

export const ImageClassifyViewerPlugin: Plugin = {
  install(app: App) {
    app.component('OdosImageClassifyViewer', ImageClassifyViewer)
  }
}

export { ImageClassifyViewer }