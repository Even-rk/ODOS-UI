<script setup lang="ts">
import { ref, onBeforeUpdate, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

type VerticalEntryData = {
  itemTypes: {
    itemType: string
    items: { fromLj: boolean; itemName: string; itemOrder: number; id: number }[]
  }[]
  mainType: string
}

const props = defineProps<{
  type: string
  entryData: VerticalEntryData[]
  textareaElement?: HTMLTextAreaElement | HTMLInputElement | null
}>()
const typeMap: Record<string, string> = {
  主诉: '主诉',
  现病史: '现病史',
  口腔检查: '检查',
  影像: '检查',
  处置: '处置',
  计划: '计划',
  医嘱: '医嘱'
}
const bottomItems = ref<any[]>([])
onBeforeUpdate(() => {
  bottomItems.value = []
})
const activeEntry = ref(0)

const rightPanelRef = ref<HTMLElement | null>(null)
const isClickScrolling = ref(false)
const entryData = ref<any[]>([])
let scrollTimeout: number | undefined

const changeActiveEntry = (index: number) => {
  activeEntry.value = index
  if (bottomItems.value[index] && rightPanelRef.value) {
    isClickScrolling.value = true

    // 计算目标元素相对于容器的位置
    const targetElement = bottomItems.value[index]
    const container = rightPanelRef.value
    const targetOffsetTop = targetElement.offsetTop

    // 直接设置容器的scrollTop，而不是使用scrollIntoView
    container.scrollTo({
      top: targetOffsetTop,
      behavior: 'smooth'
    })

    clearTimeout(scrollTimeout)
    scrollTimeout = window.setTimeout(() => {
      isClickScrolling.value = false
    }, 1000) // Wait for smooth scroll to finish
  }
}

const handleScroll = () => {
  if (isClickScrolling.value || !rightPanelRef.value) {
    return
  }

  const container = rightPanelRef.value
  const scrollTop = container.scrollTop
  const containerHeight = container.clientHeight

  // Find the first item from the top that is visible inside the container
  for (let i = 0; i < bottomItems.value.length; i++) {
    const itemEl = bottomItems.value[i]
    if (itemEl) {
      // 使用相对于容器的偏移量而不是页面坐标
      const itemOffsetTop = itemEl.offsetTop

      // 检查元素是否在容器的可视区域内
      if (itemOffsetTop >= scrollTop && itemOffsetTop < scrollTop + containerHeight) {
        activeEntry.value = i
        return // Found the topmost visible item, so we can stop.
      }
    }
  }
}

watch(
  () => props.entryData,
  (newVal) => {
    if (newVal && newVal.length) {
      const filterData = newVal.filter((item: VerticalEntryData) => {
        return item.mainType.includes(props.type)
      })
      entryData.value = filterData[0].itemTypes || []
    }
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {
  rightPanelRef.value?.addEventListener('scroll', handleScroll, {
    passive: true
  })
})

onBeforeUnmount(() => {
  rightPanelRef.value?.removeEventListener('scroll', handleScroll)
  clearTimeout(scrollTimeout)
})

const emit = defineEmits(['add-word'])

/**
 * 在光标位置插入文本到父组件的textarea
 * @param text 要插入的文本
 * @param maxLength 最大长度限制，默认500
 */
const insertAtCursor = (text: string, maxLength: number = 500) => {
  // 使用props传入的textareaElement
  const textareaElement = props.textareaElement

  if (textareaElement) {
    const currentValue = textareaElement.value || ''
    const cursorPosition = textareaElement.selectionStart ?? currentValue.length

    // 在光标位置插入文本（根据需要添加空格分隔）
    const insertText =
      cursorPosition > 0 && !currentValue[cursorPosition - 1]?.match(/\s/) ? ' ' + text : text
    const newContent = currentValue.slice(0, cursorPosition) + insertText + currentValue.slice(cursorPosition)

    // 如果超过最大长度，则截取
    const finalContent = newContent.length > maxLength ? newContent.substring(0, maxLength) : newContent

    // 更新textarea的值
    textareaElement.value = finalContent

    // 触发input事件以更新v-model
    const inputEvent = new Event('input', { bubbles: true })
    textareaElement.dispatchEvent(inputEvent)

    // 保持焦点并设置新的光标位置
    nextTick(() => {
      textareaElement.focus()
      const newCursorPosition = cursorPosition + insertText.length
      textareaElement.setSelectionRange(newCursorPosition, newCursorPosition)
    })

    return true
  }

  return false
}

const addWordToDescHandle = (sub: { itemName: string }) => {
  // 点击词条添加到描述
  emit('add-word', sub)
}

// 暴露方法给父组件使用
defineExpose({
  insertAtCursor
})
</script>
<template>
  <div class="recommended-entries-container">
    <div class="entries-part-left">
      <div
        class="entries-part-left-item"
        v-for="(item, index) in entryData"
        :class="{ active: activeEntry === index }"
        :key="item"
        @click="changeActiveEntry(index)"
      >
        {{ item.itemType }}
      </div>
    </div>
    <div class="entries-part-right scrollbar" ref="rightPanelRef">
      <div
        class="entries-part-right-item"
        :class="{ active: index === 0 }"
        v-for="(item, index) in entryData"
        :key="item"
        :ref="(el) => (bottomItems[index] = el)"
      >
        <div
          class="entries-part-right-item-left"
          :class="{ activeLeftTitle: index === activeEntry }"
          :style="{
            color: index === activeEntry ? '#2E6CE4' : '#4E5969'
          }"
        >
          {{ item.itemType }}
        </div>
        <div class="entries-part-right-item-right">
          <div v-for="ele in item.items" :key="ele" @click="addWordToDescHandle(ele)">
            {{ ele.itemName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.recommended-entries-container {
  width: 100%;
  border-radius: 8px;
  opacity: 1;
  position: relative;
  overflow: hidden; /* 防止内容溢出 */
  /* 自动布局 */
  display: flex;
  background: #ffffff;
  border: 1px solid #2e6ce4;
  .entries-part-left {
    width: 109px !important;
    padding: 12px 0;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-direction: column;
    align-items: center;
    // padding: 8px 16px;
    gap: 12px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-content: flex-start;
    align-self: stretch;
    /* 填充/浅色 */
    background: #f7f8fa;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    .entries-part-left-item {
      width: 90%;
      box-sizing: border-box;
      height: 25px;
      border-radius: 32px;
      opacity: 1;
      cursor: pointer;
      /* 自动布局 */
      display: flex;
      flex-direction: column;
      padding: 4px 8px;
      gap: 10px;
      // 文字
      font-family: Alibaba PuHuiTi 3;
      font-size: 12px;
      font-weight: normal;
      line-height: normal;
      align-items: center;
      justify-content: center;
      letter-spacing: 0px;
      margin-left: 5%;
      font-variation-settings: 'opsz' auto;
      font-feature-settings: 'kern' on;
    }
    .active {
      color: #2e6ce4;
      background-color: #fff;
    }
  }
  .entries-part-right {
    position: absolute;
    left: 109px; /* left part width */
    top: 0; /* 从顶部开始 */
    bottom: 0; /* 到底部结束 */
    right: 0;
    padding: 12px 24px; /* 调整内边距 */
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-top-right-radius: 12px;
    .entries-part-right-item {
      display: flex;
      flex-direction: column;
      align-items: self-start;
      gap: 4px;
      padding-top: 4px;
      .activeLeftTitle {
        padding-left: 10px;
        padding-bottom: 3px;
        position: relative;
        &::before {
          content: '';
          /* 自动布局子元素 */
          width: 4px;
          height: 16px;
          z-index: 0;
          position: absolute;
          top: 1px;
          left: 0;
          border-radius: 153.02px;
          /* 渐变 */
          background: linear-gradient(167deg, #649dff 5%, #1b81fd 116%);
        }
      }
      .entries-part-right-item-left {
        font-family: Alibaba PuHuiTi 3;
        font-size: 12px;
        font-weight: normal;
        line-height: normal;
        display: flex;
        align-items: center;
        letter-spacing: 0px;
        font-variation-settings: 'opsz' auto;
        font-feature-settings: 'kern' on;
        /* 文字/2级 */
        color: #4e5969;
        font-weight: 500;
      }
      .entries-part-right-item-right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
        div {
          cursor: pointer;
          /* 自动布局子元素 */
          position: static;
          left: 0px;
          top: 0px;
          min-height: 25px;
          border-radius: 4px;
          opacity: 1;
          /* 自动布局 */
          display: flex;
          flex-direction: column;
          padding: 4px 8px;
          gap: 10px;
          /* 填充/浅色 */
          background: #f7f8fa;
          gap: 6px;
          // 文字
          font-family: Alibaba PuHuiTi 3;
          font-size: 12px;
          font-weight: normal;
          line-height: normal;
          display: flex;
          align-items: center;
          letter-spacing: 0px;
          font-variation-settings: 'opsz' auto;
          font-feature-settings: 'kern' on;
          /* 文字/3级 */
          color: #86909c;
          &:hover {
            background: #eaf0fc;
            color: #4e5969;
          }
          &:active {
            background: #dce7f8;
          }
        }
      }
    }
  }
}
.scrollbar {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #f4f7fd;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e0e6f3;
    border-radius: 3px;
  }
}
</style>
