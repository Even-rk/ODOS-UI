<template>
  <div
    class="odos-tag"
    :class="className"
    :style="{
      color,
      border: type == 'line' ? `1px solid ${borderColor}` : 'none',
      backgroundColor
    }"
  >
    <slot name="icon">
      <div class="odos-icon" v-if="icon">
        <Icon :name="icon" :color="iconColor" />
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Icon from 'packages/Icon/src/index.vue'
import { computed } from 'vue'

const { type, icon, color, borderColor, backgroundColor } = defineProps<{
  type?: 'dark' | 'light' | 'line'
  icon?: string
  color?: string
  borderColor?: string
  backgroundColor?: string
}>()

const iconColor = computed(() => {
  switch (type) {
    case 'dark':
      return '#fff'
    case 'light':
      return '#2e6ce4'
    case 'line':
      return '#2e6ce4'
    default:
      return color
  }
})
const className = computed(() => {
  return type ? `odos-${type}-tag` : 'odos-default-tag'
})
</script>

<style lang="scss" scoped>
@import url('/styles/tag.scss');
</style>
