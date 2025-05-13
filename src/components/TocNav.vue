<template>
  <div class="toc-container" v-if="toc.length > 0">
    <div class="toc-title">目录</div>
    <div class="toc-list">
      <div
        v-for="(item, index) in toc"
        :key="index"
        class="toc-item"
        :class="{
          'level-1': item.level === 1,
          'level-2': item.level === 2,
          'level-3': item.level === 3,
          'level-4': item.level === 4,
          active: activeId === item.id
        }"
        @click="scrollToAnchor(item.id)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const toc = ref<{ id: string; text: string; level: number }[]>([])
const activeId = ref('')

const emit = defineEmits(['tocChange'])

const generateToc = async () => {
  await nextTick()

  // 等待 markdown-it-anchor 处理完成
  setTimeout(() => {
    // 不包含一级标题在内的查询选择器

    // 包含一级标题在内的查询选择器
    const headersNoLevel1 = document.querySelectorAll('h2, h3, h4')
    if (!headersNoLevel1 || headersNoLevel1.length === 0) {
      toc.value = []
      emit('tocChange', false)
      return
    }

    // 包含一级标题在内的查询选择器
    const headers = document.querySelectorAll('h1, h2, h3, h4')
    const newToc = Array.from(headers).map((header) => {
      // 处理 markdown-it-anchor 生成的 id
      let id = header.id
      if (!id) {
        // 如果没有 id，尝试从 anchor 标签获取
        const anchor = header.querySelector('.header-anchor')
        if (anchor) {
          id = anchor.getAttribute('href')?.substring(1) || ''
        } else {
          // 如果还是没有，自己生成一个
          id = header.textContent?.toLowerCase().replace(/\s+/g, '-') || ''
          header.id = id
        }
      }

      // 清理标题文本，移除 anchor 符号
      let text = header.textContent || ''
      text = text.replace(/^#\s*/, '')

      return {
        id,
        text,
        level: parseInt(header.tagName.charAt(1))
      }
    })

    // 更新目录
    toc.value = newToc

    // 只有在确实有目录时才发送通知
    emit('tocChange', newToc.length > 0)

    // 初始化激活状态
    if (newToc.length > 0) {
      updateActiveHeading()
    }
  }, 300)
}

// 安全滚动到元素
const safeScrollToElement = (element: HTMLElement | null) => {
  if (!element) return

  try {
    element.scrollIntoView({ behavior: 'smooth' })
  } catch (error) {
    // 降级处理：如果平滑滚动失败，尝试直接滚动
    try {
      element.scrollIntoView()
    } catch (fallbackError) {
      console.error('滚动失败:', fallbackError)
    }
  }
}

const scrollToAnchor = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    // 使用安全滚动方法
    safeScrollToElement(element)

    // 仅更新激活状态，不修改URL
    activeId.value = id
  }
}

// 监听滚动，更新当前激活的标题
const updateActiveHeading = () => {
  const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
  const scrollPosition = window.scrollY + 150 // 添加偏移量以提前激活

  for (let i = headers.length - 1; i >= 0; i--) {
    const header = headers[i] as HTMLElement
    if (header.offsetTop <= scrollPosition) {
      activeId.value = header.id
      break
    }
  }
}

// 添加滚动监听
const scrollHandler = () => {
  if (toc.value.length > 0) {
    updateActiveHeading()
  }
}

// 处理初始路由和哈希
const handleInitialHash = () => {
  // 检查URL中是否有有效的路由路径
  if (route.path && route.path !== '/') {
    return // 有有效路由，不处理
  }

  // 检查是否有哈希，但注意不要处理/#/类型的路由哈希
  if (location.hash && !location.hash.startsWith('#/')) {
    const id = location.hash.substring(1)
    // 查找所有标题中是否有匹配的ID，包括一级标题
    const allHeaders = document.querySelectorAll('h1, h2, h3, h4')
    const targetElement = Array.from(allHeaders).find((h) => h.id === id) as HTMLElement | undefined

    if (targetElement) {
      setTimeout(() => {
        safeScrollToElement(targetElement)
        activeId.value = id
      }, 300) // 延迟确保内容渲染完成
    }
  }
}

onMounted(() => {
  generateToc()

  // 处理初始路由和哈希
  nextTick(() => {
    handleInitialHash()
  })

  window.addEventListener('scroll', scrollHandler)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})

watch(
  () => route.fullPath,
  () => {
    // 重置激活状态
    activeId.value = ''

    // 当完整路径变化时（包括路由和参数），重新生成目录
    // 延迟处理，确保内容已更新
    setTimeout(() => {
      toc.value = [] // 先清空目录
      generateToc() // 然后重新生成
    }, 300)
  }
)
</script>

<style lang="scss" scoped>
.toc-container {
  position: fixed;
  right: 20px;
  top: 120px;
  width: 200px;
  background-color: #fff;
  border-left: 1px solid #eaeaea;
  padding: 15px 0 15px 20px;
  border-radius: 3px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;

  .toc-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 15px;
    color: #333;
  }

  .toc-list {
    .toc-item {
      padding: 6px 0;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color 0.1s;

      &:hover {
        color: #3f6bdc;
      }

      &.active {
        color: #3f6bdc;
        font-weight: bold;
      }

      &.level-1 {
        font-weight: bold;
        font-size: 15px;
        color: #333;
        margin-bottom: 5px;
        padding-left: 0px;
      }

      &.level-2 {
        font-weight: bold;
        padding-left: 12px;
      }

      &.level-3 {
        padding-left: 24px;
        font-size: 13px;
      }

      &.level-4 {
        padding-left: 36px;
        font-size: 12px;
      }
    }
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 1em;
    background-color: #dddfe5;
  }
}
</style>
