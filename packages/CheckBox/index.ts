import type { App, Plugin } from 'vue'
import CheckBox from './src/index.vue'
import CheckBoxItem from './src/item.vue'

export const CheckBoxPlugin: Plugin = {
  install(app: App) {
    app.component('OdosCheckBox', CheckBox)
    app.component('OdosCheckBoxItem', CheckBoxItem)
  }
}

export { CheckBox, CheckBoxItem }
