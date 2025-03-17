// 全局loading
import { createApp, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import './loading.scss'

// 组件
export const Loading = defineComponent({
  props: {
    showTip: {
      type: Boolean,
      default: false
    },
    tipColor: {
      type: String,
      default: '#1d2129'
    }
  },
  setup(props) {
    const tips = ref<string[]>([])
    const index = ref(0)
    let timer: number
    onMounted(async () => {
      if (props.showTip) {
        const tipUrl = 'https://orange-odos.oss-cn-hangzhou.aliyuncs.com/assets/file/loading_tips.txt'
        const response = await fetch(tipUrl, {
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        const text = await response.text()
        tips.value = text.split('\n').filter((tip) => tip.trim())
        // 设置初始值
        index.value = Math.floor(Math.random() * tips.value.length)
        timer = window.setInterval(() => {
          index.value = Math.floor(Math.random() * tips.value.length)
        }, 5000)
      }
    })
    return () => (
      <div class="odos-loading-container">
        <div class="odos-loader" />
        {props.showTip && (
          <div
            class="odos-loading-loader-text"
            style={{
              color: props.tipColor
            }}
          >
            {tips.value[index.value]}
          </div>
        )}
      </div>
    )
  }
})
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
  const response = await fetch(tipUrl, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    }
  )
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
