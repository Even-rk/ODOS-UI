<template>
  <div class="odos-empty" :style="{ width, height }">
    <Empty :description="description || '暂无数据'" :image="Image" :image-style="imageStyle">
      <template #description>
        <slot name="description"></slot>
      </template>
      <slot></slot>
    </Empty>
  </div>
</template>

<script setup lang="ts">
import empty from './undraw_city_life_gnpr.svg'
import { Empty } from 'ant-design-vue'
import { computed, type CSSProperties } from 'vue'

const { description, imageType, width, url } = defineProps<{
  width?: string
  height?: string
  description?: string
  imageType?: 'COMPLEX' | 'SIMPLE'
  url?: string
  imageStyle?: CSSProperties
}>()

const Image = computed(() => {  
  if (url) {
    return url
  } else {
    if (imageType === 'COMPLEX') {
      return Empty.PRESENTED_IMAGE_DEFAULT
    } else if (imageType === 'SIMPLE') {
      return Empty.PRESENTED_IMAGE_SIMPLE
    } else {
      return empty
    }
  }
})
</script>

<style scoped lang="scss">
.odos-empty {
  width: 100%;
  :deep .ant-empty {
    .ant-empty-description {
      color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
