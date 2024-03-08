<template>
  <svg class="icon" :style="{ width: IconSize, height: IconSize, fill: color }" aria-hidden="true">
    <use :xlink:href="IconName"></use>
  </svg>
</template>

<script setup lang="ts">
import './iconfont'
import { computed, ref } from 'vue'
const { name, size, color } = defineProps<{
  name?: string
  size?: number | string
  color?: string
}>()

const IconName = computed(() => `#icon-${name}`)
const IconSize = computed(() => {
  const iconSize = ref('')
  if (typeof size === 'number') {
    iconSize.value = `${size}px`
  } else if (typeof size === 'string') {
    iconSize.value = size
  }
  return iconSize.value
})
</script>

<style lang="scss">
@import '/styles/icon.scss';
</style>
