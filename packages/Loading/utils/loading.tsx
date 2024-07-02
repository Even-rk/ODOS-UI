// 全局loading
import { createApp } from 'vue'
import '../../../styles/loading.scss'

// 组件
export const Loading = () => {
  return <div class="odos-loader" />
}
const LoadingView = () => {
  return (
    <div class="odos-loading">
      <Loading />
    </div>
  )
}

export const useLoadingHide = () => {
  const target = document.querySelector('.odos-modal-loading')
  target?.remove()
}

export const useLoadingShow = (time?: number) => {
  // 创建
  const loader = createApp(LoadingView)
  const mountNode = document.createElement('div')
  mountNode.className = 'odos-modal-loading'
  document.body.appendChild(mountNode)
  loader.mount(mountNode)
  if (time) {
    setTimeout(() => {
      useLoadingHide()
    }, time)
  }
}
