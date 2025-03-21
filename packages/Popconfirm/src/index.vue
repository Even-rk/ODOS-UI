<template>
  <div class="odos-popconfirm">
    <ElPopconfirm
      class="odos-popconfirm"
      style="background-color: red"
      :teleported="teleported"
      :placement="position"
      :title="title"
      :width="width"
      :hide-after="hideAfter"
      :persistent="persistent"
      :hide-icon="true"
    >
      <slot name="content"></slot>
      <template #reference>
        <slot name="reference"> <odos-button>Default</odos-button></slot>
      </template>
      <template #actions="{ confirm, cancel }">
        <div class="odos-popconfirm-actions">
          <odos-button @click="cancel">取消</odos-button>
          <odos-button type="primary" @click="confirm">删除</odos-button>
        </div>
      </template>
    </ElPopconfirm>
  </div>
</template>

<script setup lang="ts">
import { ElPopconfirm } from 'element-plus'
import 'element-plus/es/components/popconfirm/style/css'
import { toRefs, withDefaults } from 'vue'
const props = withDefaults(
  defineProps<{
    width?: number | string
    title?: string
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
    teleported?: boolean
    persistent?: boolean
    hideAfter?: number
  }>(),
  {
    width: 200,
    position: 'top',
    title: null,
    teleported: false,
    persistent: false,
    hideAfter: 200
  }
)
const { position, title, width, teleported, persistent, hideAfter } = toRefs(props)
</script>
<style scoped lang="scss">
.odos-popconfirm {
  position: relative;
  cursor: pointer;
}

.odos-popconfirm-actions {
  display: flex;
  justify-content: end;
  gap: 8px;
}
// el-popper is-light el-popover

// .el-popper.el-popover {
//   background-color: red !important;
// }
// :deep(.el-popper.el-popover) {
//   background-color: red !important;
// }
</style>
