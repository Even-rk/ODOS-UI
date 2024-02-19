import type { App, Plugin } from 'vue'
import Checkbox from './src/index.vue'
import CheckboxItem from './src/item.vue'

export const CheckboxPlugin: Plugin = {
  install(app: App) {
    app.component('OdosCheckbox', Checkbox)
    app.component('OdosCheckboxItem', CheckboxItem)
  }
}

export { Checkbox, CheckboxItem }
