<template>
  <div class="odos-popconfirm">
    <ElPopconfirm
      class="odos-popconfirm"
      :teleported="teleported"
      :placement="position"
      :width="width"
      :hide-after="hideAfter"
      :persistent="persistent"
      :hide-icon="true"
    >
      <template #reference>
        <slot name="reference"> <odos-button>Default</odos-button></slot>
      </template>
      <template #actions="{ confirm, cancel }">
        <div class="odos-popconfirm-container">
          <div class="odos-popconfirm-content">
            <slot name="content"> </slot>
          </div>
          <div class="odos-popconfirm-actions">
            <slot name="actions" v-bind="{ confirm, cancel }">
              <odos-button @click="cancel">取消</odos-button>
              <odos-button type="primary" @click="confirm">删除</odos-button>
            </slot>
          </div>
        </div>
      </template>
    </ElPopconfirm>
  </div>
</template>

<script setup lang="ts">
import { ElPopconfirm } from 'element-plus'
import 'element-plus/es/components/popconfirm/style/css'
import { ref, toRefs, withDefaults } from 'vue'

// 定义 cssBind 的类型
interface CssBindType {
  padding?: string
  borderRadius?: string
}

// 定义组件 props，默认值修正拼写错误
const props = withDefaults(
  defineProps<{
    width?: number | string
    cssBind?: CssBindType
    position?: 'top' | 'left' | 'right' | 'bottom'
    // | 'topLeft'
    // | 'topRight'
    // | 'bottomLeft'
    // | 'bottomRight'
    // | 'leftTop'
    // | 'leftBottom'
    // | 'rightTop'
    // | 'rightBottom'
    teleported?: boolean
    persistent?: boolean
    hideAfter?: number
  }>(),
  {
    width: 200,
    position: 'top',
    teleported: false,
    persistent: false,
    hideAfter: 200,
    cssBind: () => ({
      padding: '10px',
      borderRadius: '4px'
    })
  }
)

// 将 props 解构为响应式引用
const padding = ref(props.cssBind?.padding || '3px')
const borderRadius = ref(props.cssBind?.borderRadius || '4px')

// 解构 props
const { position, width, teleported, persistent, hideAfter } = toRefs(props)
</script>

<style scoped lang="scss">
.odos-popconfirm {
  position: relative;
  cursor: pointer;
}
.odos-popconfirm-content {
  text-align: left;
}
.odos-popconfirm-actions {
  display: flex;
  justify-content: end;
  gap: 8px;
}
:deep(.el-popconfirm__action) {
  margin-top: 0px;
}
// 使用 v-bind 动态绑定样式
:deep(.el-popper.el-popover) {
  // padding: v-bind(padding);
  border-radius: v-bind(borderRadius);
}
</style>
