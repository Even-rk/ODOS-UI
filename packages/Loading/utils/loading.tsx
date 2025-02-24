// 全局loading
import { createApp, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import '../../../styles/loading.scss'

// 组件
export const Loading = () => {
  return <div class="odos-loader" />
}

const LoadingView = defineComponent({
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const index = ref(0)
    const tips = props.text.split('\n').filter((tip) => tip.trim())
    let timer: number

    onMounted(() => {
      // 设置初始值
      index.value = Math.floor(Math.random() * tips.length)
      timer = window.setInterval(() => {
        index.value = Math.floor(Math.random() * tips.length)
      }, 5000)
    })

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    return () => (
      <div class="odos-loading">
        <Loading />
        <div class="odos-loading-text">{tips[index.value]}</div>
      </div>
    )
  }
})
export const useLoadingHide = () => {
  const target = document.querySelector('.odos-modal-loading')
  target?.remove()
}

export const useLoadingShow = async (time?: number) => {
  const tipUrl = 'https://orange-odos.oss-cn-hangzhou.aliyuncs.com/assets/file/loading_tips.txt'
  const response = await fetch(tipUrl)
  const text = await response.text()
  // 创建
  const loader = createApp(LoadingView, { text })
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
