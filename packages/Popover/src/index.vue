<template>
  <div class="odos-popover">
    <Popover
      :placement="position"
      @open-change="openChange"
      :trigger="trigger"
      :getPopupContainer="getPopupContainer"
    >
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

const emit = defineEmits<{
  (e: 'openChange', data: boolean): void
}>()

const openChange = (isShow: boolean) => {
  emit('openChange', isShow)
}

const getPopupContainer = (triggerNode: Element) => {
  return triggerNode.parentElement || document.body
}
</script>
<style scoped lang="scss">
@import '/styles/popover.scss';
</style>
