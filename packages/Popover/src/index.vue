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
:where(.css-dev-only-do-not-override-1hsjdkk).ant-popover-placement-topRight .ant-popover-arrow,
:where(.css-dev-only-do-not-override-1hsjdkk).ant-popover-placement-bottomRight .ant-popover-arrow {
  right: 16px;
}
:where(.css-dev-only-do-not-override-1hsjdkk)[class^='ant-popover-placement-topRight'],
:where(.css-dev-only-do-not-override-1hsjdkk)[class*=' ant-popover-placement-topRight'],
:where(.css-dev-only-do-not-override-1hsjdkk)[class^='ant-popover-placement-bottomRight'],
:where(.css-dev-only-do-not-override-1hsjdkk)[class*=' ant-popover-placement-bottomRight'] {
  left: 260px !important;
}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-popover-placement-topLeft .ant-popover-arrow,
:where(.css-dev-only-do-not-override-1hsjdkk).ant-popover-placement-bottomLeft .ant-popover-arrow {
  left: 16px;
}
:where(.css-dev-only-do-not-override-1hsjdkk)[class^='ant-popover-placement-topLeft'],
:where(.css-dev-only-do-not-override-1hsjdkk)[class*=' ant-popover-placement-topLeft'],
:where(.css-dev-only-do-not-override-1hsjdkk)[class^='ant-popover-placement-bottomLeft'],
:where(.css-dev-only-do-not-override-1hsjdkk)[class*=' ant-popover-placement-bottomLeft'] {
  left: 406px !important;
}
</style>
