<template>
  <div class="odos-popover">
    <Popover :placement="position" :trigger="trigger">
      <template #content>
        <slot name="content"></slot>
      </template>
      <slot></slot>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover } from 'ant-design-vue'
const { position, trigger } = defineProps<{
  position?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
  trigger?: 'hover' | 'click'
}>()
</script>

<style lang="scss">
.odos-popover {
  cursor: pointer;
}
</style>
