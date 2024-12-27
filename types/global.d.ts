declare module '*.md'
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// window
declare interface Window {
  _iconfont: string
}
