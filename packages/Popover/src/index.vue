<template>
  <div class="odos-popover">
    <Popover
      :placement="position"
      @open-change="openChange"
      :trigger="trigger"
      :getPopupContainer="getPopupContainer"
    >
      <template v-for="(_, name) in slots" #[name]="SlotProps">
        <slot :name="name" v-bind="SlotProps"></slot>
      </template>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover } from 'ant-design-vue'
import { useSlots, type SetupContext } from 'vue'
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

const slots = useSlots() as SetupContext['slots']

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
