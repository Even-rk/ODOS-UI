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
import { Empty } from 'ant-design-vue'
import { computed, type CSSProperties } from 'vue'

const { description, image, width } = defineProps<{
  width?: string
  height?: string
  description?: string
  image?: 'SIMPLE' | 'DEFAULT' | string
  imageStyle?: CSSProperties
}>()

const Image = computed(() => {
  if (image === 'DEFAULT') {
    return Empty.PRESENTED_IMAGE_DEFAULT
  } else if (image === 'SIMPLE') {
    return Empty.PRESENTED_IMAGE_SIMPLE
  } else {
    return image
  }
})
</script>

<style scoped lang="scss">
@import '/styles/empty.scss';
</style>
