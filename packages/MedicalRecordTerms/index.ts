import type { App, Plugin } from 'vue'
import MedicalRecordTerms from './src/index.vue'

export const MedicalRecordTermsPlugin: Plugin = {
  install(app: App) {
    app.component('OdosMedicalRecordTerms', MedicalRecordTerms)
  }
}

export { MedicalRecordTerms }