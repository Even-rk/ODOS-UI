<template>
  <svg class="icon" :style="{ width: IconSize, height: IconSize, fill: color }" aria-hidden="true">
    <use :xlink:href="IconName"></use>
  </svg>
</template>

<script setup lang="ts">
import './iconfont'
import { computed } from 'vue'
const { name, size } = defineProps<{
  name?: string
  size?: number
  color?: string
}>()

const IconName = computed(() => `#icon-${name}`)
const IconSize = computed(() => `${size}px`)
</script>

<style lang="scss">
@import '/styles/icon.scss';
</style>
