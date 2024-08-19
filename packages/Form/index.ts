import type { App, Plugin } from 'vue'
import Form from './src/index.vue'
import FormItem from './src/item.vue'

export const FormPlugin: Plugin = {
  install(app: App) {
    app.component('OdosForm', Form)
    app.component('OdosFormItem', FormItem)
  }
}

export { Form, FormItem }
