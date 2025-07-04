<template>
  <div class="odos-popover" ref="referenceRef">
    <!-- 触发元素 -->
    <div
      class="popover-trigger"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot></slot>
    </div>

    <!-- 弹出内容 -->
    <Teleport to="body">
      <div
        v-show="isVisible"
        ref="floatingRef"
        class="odos-popover-content"
        :class="{ 'popover-show': isVisible }"
        :style="floatingStyles"
        @mouseenter="handleContentMouseEnter"
        @mouseleave="handleContentMouseLeave"
      >
        <!-- 标题 -->
        <div v-if="$slots.title" class="popover-title">
          <slot name="title"></slot>
        </div>
        
        <!-- 内容 -->
        <div class="popover-body">
          <slot name="content"></slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift, type Placement } from '@floating-ui/vue'

const props = withDefaults(defineProps<{
  position?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
  trigger?: 'hover' | 'click'
}>(), {
  trigger: 'hover'
})

const emit = defineEmits<{
  (e: 'openChange', data: boolean): void
}>()

// 引用
const referenceRef = ref<HTMLElement>()
const floatingRef = ref<HTMLElement>()

// 状态
const isVisible = ref(false)
const hoverTimer = ref<NodeJS.Timeout>()
const cleanupAutoUpdate = ref<(() => void) | null>(null)

// 位置映射
const placementMap: Record<string, Placement> = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
  topLeft: 'top-start',
  topRight: 'top-end',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  leftTop: 'left-start',
  leftBottom: 'left-end',
  rightTop: 'right-start',
  rightBottom: 'right-end'
}

// 获取 placement
const placement = computed((): Placement => {
  return placementMap[props.position || 'top'] || 'top'
})

// 使用 floating-ui
const { floatingStyles, update } = useFloating(referenceRef, floatingRef, {
  placement: placement.value,
  middleware: [
    offset(8),
    flip({
      fallbackPlacements: ['top', 'bottom', 'left', 'right']
    }),
    shift({
      padding: 8
    })
  ]
})

// 设置自动更新
const setupAutoUpdate = () => {
  if (referenceRef.value && floatingRef.value) {
    cleanupAutoUpdate.value = autoUpdate(
      referenceRef.value,
      floatingRef.value,
      update,
      {
        // 配置更新选项
        elementResize: true,
        animationFrame: false
      }
    )
  }
}

// 清理自动更新
const cleanupUpdate = () => {
  if (cleanupAutoUpdate.value) {
    cleanupAutoUpdate.value()
    cleanupAutoUpdate.value = null
  }
}

// 显示弹窗
const show = async () => {
  if (isVisible.value) return
  
  // 先显示元素但不透明，预先计算位置
  isVisible.value = true
  
  await nextTick()
  
  // 立即更新位置
  await update()
  
  // 设置自动更新
  setupAutoUpdate()
  
  // 添加滚动监听
  addScrollListeners()
  
  emit('openChange', true)
}

// 隐藏弹窗
const hide = () => {
  if (!isVisible.value) return
  
  isVisible.value = false
  emit('openChange', false)
  
  // 清理更新和监听器
  cleanupUpdate()
  removeScrollListeners()
}

// 滚动监听器
const scrollListeners: (() => void)[] = []

const addScrollListeners = () => {
  // 添加window滚动监听
  const windowScrollHandler = () => {
    if (isVisible.value) {
      update()
    }
  }
  
  window.addEventListener('scroll', windowScrollHandler, { passive: true })
  window.addEventListener('resize', windowScrollHandler, { passive: true })
  
  scrollListeners.push(() => {
    window.removeEventListener('scroll', windowScrollHandler)
    window.removeEventListener('resize', windowScrollHandler)
  })
  
  // 添加所有父级滚动监听
  let element = referenceRef.value?.parentElement
  while (element && element !== document.body) {
    const scrollHandler = () => {
      if (isVisible.value) {
        update()
      }
    }
    
    element.addEventListener('scroll', scrollHandler, { passive: true })
    
    const currentElement = element
    scrollListeners.push(() => {
      currentElement.removeEventListener('scroll', scrollHandler)
    })
    
    element = element.parentElement
  }
}

const removeScrollListeners = () => {
  scrollListeners.forEach(cleanup => cleanup())
  scrollListeners.length = 0
}

// 延迟隐藏
const delayHide = (delay = 100) => {
  clearTimeout(hoverTimer.value)
  hoverTimer.value = setTimeout(() => {
    hide()
  }, delay)
}

// 取消延迟隐藏
const cancelDelayHide = () => {
  clearTimeout(hoverTimer.value)
}

// 点击处理
const handleClick = () => {
  if (props.trigger === 'click') {
    if (isVisible.value) {
      hide()
    } else {
      show()
    }
  }
}

// 鼠标进入触发元素
const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    cancelDelayHide()
    show()
  }
}

// 鼠标离开触发元素
const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    delayHide()
  }
}

// 鼠标进入弹窗内容
const handleContentMouseEnter = () => {
  if (props.trigger === 'hover') {
    cancelDelayHide()
  }
}

// 鼠标离开弹窗内容
const handleContentMouseLeave = () => {
  if (props.trigger === 'hover') {
    delayHide()
  }
}

// 点击外部关闭
const handleClickOutside = (event: MouseEvent) => {
  if (props.trigger === 'click' && isVisible.value) {
    const target = event.target as Node
    if (
      referenceRef.value &&
      floatingRef.value &&
      !referenceRef.value.contains(target) &&
      !floatingRef.value.contains(target)
    ) {
      hide()
    }
  }
}

// 监听位置变化
watch(() => props.position, async () => {
  if (isVisible.value) {
    await nextTick()
    update()
  }
})

// 挂载和卸载事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  clearTimeout(hoverTimer.value)
  cleanupUpdate()
  removeScrollListeners()
})

// 暴露方法
defineExpose({
  show,
  hide,
  isVisible
})
</script>

<style scoped lang="scss">
.odos-popover {
  display: inline-block;
  
  .popover-trigger {
    cursor: pointer;
    display: inline-block;
  }
}

.odos-popover-content {
  position: fixed;
  z-index: 1050;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 
              0 6px 16px 0 rgba(0, 0, 0, 0.08), 
              0 9px 28px 8px rgba(0, 0, 0, 0.05);
  max-width: 250px;
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.15s ease, transform 0.15s ease;
  
  &.popover-show {
    opacity: 1;
    transform: scale(1);
  }
  
  .popover-title {
    padding: 5px 16px 4px;
    border-bottom: 1px solid #d9d9d9;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    background: #fff;
    border-radius: 6px 6px 0 0;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1.5715;
  }
  
  .popover-body {
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }
}
</style>
