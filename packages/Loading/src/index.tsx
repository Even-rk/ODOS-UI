// 全局loading
import { createApp, ref } from 'vue'
import '../../../styles/loading.scss'

// 组件
const Loading = () => {
  return <div class="odos-loader" />
}
const LoadingView = () => {
  return (
    <div class="odos-loading">
      <Loading />
    </div>
  )
}
// 创建

const loader = ref()
const loading = {
  show: (time?: number) => {
    loader.value = createApp(LoadingView)
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    loader.value.mount(mountNode)
    if (time) {
      setTimeout(() => {
        loading.hide()
      }, time)
    }
  },
  hide: () => {
    loader.value.unmount()
    loader.value = null
  }
}

export default Loading
export { loading }
