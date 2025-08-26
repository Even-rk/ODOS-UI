import type { App, Plugin } from 'vue'
import Calendar from './src/index.vue'

export const CalendarPlugin: Plugin = {
  install(app: App) {
    app.component('OdosCalendar', Calendar)
  }
}

export { Calendar }