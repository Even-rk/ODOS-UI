<template>
  <div
    class="odos-tooltip"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <div ref="triggerRef" class="odos-tooltip-trigger">
      <slot></slot>
    </div>
    <Teleport to="body">
      <div v-show="visible" ref="tooltipRef" class="odos-tooltip-content" :style="tooltipStyle">
        <div class="odos-tooltip-inner">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useEventListener } from '@vueuse/core'

const props = defineProps<{
  title?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click'
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  open?: boolean
  defaultOpen?: boolean
  overlayClassName?: string
  overlayStyle?: object
  arrowPointAtCenter?: boolean
  autoAdjustOverflow?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'openChange', value: boolean): void
}>()

const visible = ref(props.defaultOpen || false)
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
let mouseEnterTimer: NodeJS.Timeout | null = null
let mouseLeaveTimer: NodeJS.Timeout | null = null

const tooltipStyle = computed(() => ({
  ...props.overlayStyle
}))

const placement = computed(() => props.placement || 'top')

type Position = { left: number; top: number }
type Placement = 'top' | 'bottom' | 'left' | 'right'

const getAdjustedPosition = (preferredPlacement: Placement, triggerRect: DOMRect, tooltipRect: DOMRect) => {
  const margin = 8
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset

  // 计算各个位置的坐标，考虑滚动位置
  const positions: Record<Placement, Position> = {
    top: {
      left: scrollX + triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
      top: scrollY + triggerRect.top - tooltipRect.height - margin
    },
    bottom: {
      left: scrollX + triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
      top: scrollY + triggerRect.bottom + margin
    },
    left: {
      left: scrollX + triggerRect.left - tooltipRect.width - margin,
      top: scrollY + triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
    },
    right: {
      left: scrollX + triggerRect.right + margin,
      top: scrollY + triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
    }
  }

  // 检查位置是否溢出
  const isOverflow = (pos: Position) => {
    return (
      pos.left < margin ||
      pos.top < margin ||
      pos.left + tooltipRect.width > viewportWidth - margin ||
      pos.top + tooltipRect.height > viewportHeight - margin
    )
  }

  // 优先使用首选位置
  const preferredPos = positions[preferredPlacement]
  if (!isOverflow(preferredPos)) {
    return { position: preferredPos, placement: preferredPlacement }
  }

  // 尝试其他位置
  const placements: Placement[] = ['top', 'bottom', 'left', 'right']
  for (const placement of placements) {
    const pos = positions[placement]
    if (!isOverflow(pos)) {
      return { position: pos, placement }
    }
  }

  // 如果所有位置都溢出，使用首选位置但确保在视口内
  const adjustedPos = {
    left: Math.min(Math.max(margin, preferredPos.left), viewportWidth - tooltipRect.width - margin),
    top: Math.min(Math.max(margin, preferredPos.top), viewportHeight - tooltipRect.height - margin)
  }

  return { position: adjustedPos, placement: preferredPlacement }
}

const updatePosition = async () => {
  if (!triggerRef.value || !tooltipRef.value) return

  await nextTick()
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  const { position, placement: adjustedPlacement } = getAdjustedPosition(
    placement.value,
    triggerRect,
    tooltipRect
  )

  if (tooltipRef.value) {
    tooltipRef.value.style.left = `${position.left}px`
    tooltipRef.value.style.top = `${position.top}px`
    tooltipRef.value.dataset.placement = adjustedPlacement
  }
}

const showTooltip = () => {
  visible.value = true
  emit('update:open', true)
  emit('openChange', true)
  nextTick(() => updatePosition())
}

const hideTooltip = () => {
  visible.value = false
  emit('update:open', false)
  emit('openChange', false)
}

const handleMouseEnter = () => {
  // 默认使用 hover 触发，只有明确指定为 click 时才不使用 hover
  if (props.trigger === 'click') return
  if (mouseLeaveTimer) {
    clearTimeout(mouseLeaveTimer)
    mouseLeaveTimer = null
  }
  mouseEnterTimer = setTimeout(() => {
    showTooltip()
  }, props.mouseEnterDelay || 100)
}

const handleMouseLeave = () => {
  // 默认使用 hover 触发，只有明确指定为 click 时才不使用 hover
  if (props.trigger === 'click') return
  if (mouseEnterTimer) {
    clearTimeout(mouseEnterTimer)
    mouseEnterTimer = null
  }
  mouseLeaveTimer = setTimeout(() => {
    hideTooltip()
  }, props.mouseLeaveDelay || 100)
}

const handleClick = () => {
  if (props.trigger !== 'click') return
  if (visible.value) {
    hideTooltip()
  } else {
    showTooltip()
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    props.trigger === 'click' &&
    visible.value &&
    !triggerRef.value?.contains(event.target as Node) &&
    !tooltipRef.value?.contains(event.target as Node)
  ) {
    hideTooltip()
  }
}

// 使用节流函数来优化滚动和调整窗口大小时的性能
const throttledUpdatePosition = () => {
  let ticking = false
  return () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updatePosition()
        ticking = false
      })
      ticking = true
    }
  }
}

const throttledUpdate = throttledUpdatePosition()

onMounted(() => {
  if (props.open !== undefined) {
    visible.value = props.open
  }
  useEventListener(document, 'click', handleClickOutside)
  window.addEventListener('scroll', throttledUpdate, { passive: true })
  window.addEventListener('resize', throttledUpdate, { passive: true })
  // 监听父元素的滚动事件
  const parents = []
  let parent = triggerRef.value?.parentElement
  while (parent) {
    if (parent.scrollHeight > parent.clientHeight) {
      parents.push(parent)
      parent.addEventListener('scroll', throttledUpdate, { passive: true })
    }
    parent = parent.parentElement
  }
})

onBeforeUnmount(() => {
  if (mouseEnterTimer) clearTimeout(mouseEnterTimer)
  if (mouseLeaveTimer) clearTimeout(mouseLeaveTimer)
  window.removeEventListener('scroll', throttledUpdate)
  window.removeEventListener('resize', throttledUpdate)
  // 移除父元素的滚动事件监听
  const parents = []
  let parent = triggerRef.value?.parentElement
  while (parent) {
    if (parent.scrollHeight > parent.clientHeight) {
      parents.push(parent)
      parent.removeEventListener('scroll', throttledUpdate)
    }
    parent = parent.parentElement
  }
})
</script>

<style scoped lang="scss">
.odos-tooltip {
  display: inline-block;
  position: relative;
}

.odos-tooltip-content {
  position: fixed;
  z-index: 1000;
  max-width: 250px;
  padding: 8px 12px;
  color: #fff;
  text-align: left;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;
}

.odos-tooltip-inner {
  min-width: 30px;
  color: #fff;
  text-align: left;
  text-decoration: none;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.5;
}
</style>
