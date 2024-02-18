import type { App, Plugin } from 'vue'
import Radio from './src/index.vue'
import RadioItem from './src/item.vue'

export const RadioPlugin: Plugin = {
  install(app: App) {
    app.component('OdosRadio', Radio)
    app.component('OdosRadioItem', RadioItem)
  }
}

export { Radio, RadioItem }
