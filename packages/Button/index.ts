// import type { App, Plugin } from 'vue'
// import Button from './src/index.vue'

// export const ButtonPlugin: Plugin = {
//   install(app: App) {
//     app.component('OdosButton', Button)
//   }
// }

// export { Button }

import { App } from 'vue'
import Button from './src/index.vue'

export default {
  install(app:App) {
    app.component('OdosButton', Button)
  }
}
