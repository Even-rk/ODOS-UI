<template>
  <div
    class="odos-tag"
    :class="className"
    :style="{
      color,
      border: `1px solid ${borderColor}`,
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
.odos-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  font-size: 12px;
  border-radius: 6px;
  padding: 0 8px;
  box-sizing: border-box;
  &.odos-default-tag {
    border: 1px solid #c9cdd4;
    color: #1d2129;
  }
  &.odos-dark-tag {
    background: #2e6ce4;
    color: #fff;
  }
  &.odos-light-tag {
    background: #eaf0fc;
    color: #2e6ce4;
  }
  &.odos-line-tag {
    border: 1px solid #2e6ce4;
    color: #2e6ce4;
  }

  .odos-icon {
    width: 12px;
    height: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
  }
}
</style>
