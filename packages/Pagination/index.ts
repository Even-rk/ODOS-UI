import type { App, Plugin } from 'vue'
import Pagination from './src/index.vue'

export const PaginationPlugin: Plugin = {
  install(app: App) {
    app.component('OdosPagination', Pagination)
  }
}

export { Pagination }
