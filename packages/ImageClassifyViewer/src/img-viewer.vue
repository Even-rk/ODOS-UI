<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { ImageItem } from './index.vue'
import { Image } from 'ant-design-vue'
interface Props {
  data: ImageItem
}
defineProps<Props>()
const emit = defineEmits(['dragstart', 'dragover', 'drop', 'dragenter', 'dragleave'])

const imageViewVisible = ref(false)
const setImageViewVisible = (value: boolean) => {
  imageViewVisible.value = value
}
const imageViewHandle = () => {
  setImageViewVisible(true)
}

// 平板触控拖拽支持（使用 Pointer Events 统一鼠标/触摸）
const dragging = ref(false)
let pointerId: number | null = null
const viewerRef = ref<HTMLElement | null>(null)

const onPointerDown = (e: PointerEvent) => {
  // 仅左键或触摸开始
  dragging.value = true
  pointerId = e.pointerId
  // 捕获指针，确保在拖拽中可以持续收到 move 事件
  viewerRef.value?.setPointerCapture?.(e.pointerId)
  emit('dragstart', e)
}

const onPointerMove = (e: PointerEvent) => {
  if (!dragging.value) return
  emit('dragover', e)
}

const endDrag = (e: PointerEvent) => {
  if (!dragging.value) return
  dragging.value = false
  if (pointerId !== null) {
    try {
      viewerRef.value?.releasePointerCapture?.(pointerId)
    } catch {}
    pointerId = null
  }
  emit('drop', e)
}

const onPointerCancel = (e: PointerEvent) => {
  if (!dragging.value) return
  dragging.value = false
  pointerId = null
  emit('dragleave', e)
}

const onPointerEnter = (e: PointerEvent) => {
  // 在拖拽过程中进入其他元素
  if (dragging.value) emit('dragenter', e)
}

const onPointerLeave = (e: PointerEvent) => {
  if (dragging.value) emit('dragleave', e)
}

onMounted(() => {
  // 防止浏览器默认的图片拖拽与滚动手势干扰
  if (viewerRef.value) {
    viewerRef.value.addEventListener('dragstart', (ev) => ev.preventDefault())
  }
})

onBeforeUnmount(() => {
  dragging.value = false
  pointerId = null
})
</script>

<template>
  <div class="odos-ImageClassifyViewer-img-viewer">
    <div class="odos-ImageClassifyViewer-img-viewer-img">
      <div
        ref="viewerRef"
        class="odos-ImageClassifyViewer-img-viewer-img-img"
        @click="imageViewHandle"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="endDrag"
        @pointercancel="onPointerCancel"
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
      >
        <img :src="data.thumbnailImageUrl" alt="" />
        <div :style="{ position: 'absolute', top: '1000px', left: '1000px', zIndex: -10, display: 'none' }">
          <Image
            v-if="imageViewVisible"
            width="80%"
            :preview="{
              visible: imageViewVisible,
              onVisibleChange: setImageViewVisible
            }"
            :src="data.imageUrl"
          />
        </div>
      </div>
      <p>{{ data.ljCreateDatetime }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.odos-ImageClassifyViewer-img-viewer {
  width: 146px;
  height: 118px;
  .odos-ImageClassifyViewer-img-viewer-img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .odos-ImageClassifyViewer-img-viewer-img-img {
      border-radius: 12px;
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid #e5e6eb;
      width: 100%;
      height: 97px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      /* 触控拖拽优化 */
      touch-action: none; /* 禁止默认滚动/缩放，确保拖拽顺畅 */
      user-select: none;
    }

    img {
      //   width: 100%;
      max-width: 146px;
      max-height: 97px;
      // border-radius: 12px;
      object-fit: contain;
      -webkit-user-drag: none; // 禁止图片被浏览器默认拖拽
    }
    p {
      font-family: Alibaba PuHuiTi 3;
      font-size: 12px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: normal;
      /* 文字/2级 */
      color: #4e5969;
      margin: 0;
      padding: 0;
      text-align: center;
      width: 100%;
      height: 22px;
      box-sizing: border-box;
      line-height: 22px;
    }
  }
}
</style>
