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
    onUnmounted(() => {
      if (timer) {
        clearInterval(timer)
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
      required: false
    }
  },
  setup(props) {
    const index = ref(0)
    const tips = ref<string[]>([])
    let timer: number

    onMounted(() => {
      if (props.text) {
        tips.value = props?.text.split('\n').filter((tip) => tip.trim())
        // 设置初始值
        index.value = Math.floor(Math.random() * tips.value.length)
        timer = window.setInterval(() => {
          index.value = Math.floor(Math.random() * tips.value.length)
        }, 5000)
      }
    })

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    return () => (
      <div class="odos-loading">
        <Loading />
        {tips.value[index.value] && <div class="odos-loading-text">{tips.value[index.value]}</div>}
      </div>
    )
  }
})
export const useLoadingHide = () => {
  const target = document.querySelectorAll('.odos-modal-loading')
  if (target) {
    target.forEach((item) => {
      item.remove()
    })
  }
}

export const useLoadingShow = async (time?: number) => {
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
