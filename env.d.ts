/// <reference types="vite/client" />
import 'types/components'
declare module 'prismjs'
declare module '*.md'
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
