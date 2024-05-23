import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// md文档样式
import './assets/markdown.css'
// 组件全局挂载
import OrangeODOS from '../packages'
// 源码组件
import Preview from './components/Preview.vue'
// global.scss
import './global.scss'
const app = createApp(App)
app.component('Preview', Preview)
app.use(OrangeODOS)
app.use(router)
app.mount('#app')
