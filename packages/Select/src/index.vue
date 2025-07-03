<template>
  <div class="odos-select" :class="{ 'odos-select-disabled': disabled }" :style="{ width, height }" ref="selectRef">
    <div v-if="title" class="odos-select-title">{{ title }}</div>
    <Select
      v-bind="$attrs"
      :class="{ 'odos-select-isTitle': title }"
      @change="selectChange($event as string | number | string[] | number[])"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @deselect="$emit('deselect', $event)"
      @select="$emit('select', $event)"
      @dropdown-visible-change="handleDropdownVisibleChange"
      :show-arrow="true"
      :option-filter-prop="filterProp || 'label'"
      :value="value"
      :virtual="false"
      :style="{ width, height }"
      :placeholder="placeholder || '请选择'"
      :options="options"
      :allow-clear="allowClear"
      :bordered="false"
      :disabled="disabled"
      :mode="mode"
      :max-tag-count="maxTagCount"
      :show-search="showSearch"
      :default-active-first-option="false"
      :get-popup-container="getPopupContainer"
      :dropdown-style="dropdownStyles || {}"
    >
      <template #suffixIcon>
        <Icon name="ArowDown" size="20px" />
      </template>
      <template #notFoundContent>
        <Empty />
      </template>
      <template v-for="(_, name) in slots" #[name]="SlotProps">
        <slot :name="name" v-bind="SlotProps"></slot>
      </template>
    </Select>
  </div>
</template>

<script setup lang="ts">
import Icon from '../../Icon/src/index.vue'
import { Empty, Select } from 'ant-design-vue'
import { computed, useSlots, ref, nextTick, onUnmounted, watch, type SetupContext } from 'vue'
import { useFloating, autoUpdate, offset, flip, shift, size } from '@floating-ui/vue'

const {
  value,
  width,
  placeholder,
  options,
  title,
  allowClear,
  disabled,
  multiple,
  maxTagCount,
  showSearch,
  height,
  filterProp,
  mutex,
  mutexOptionValue,
  placement = 'bottom-start',
  offsetValue = 4
} = defineProps<{
  value?: string | number | string[] | number[]
  title?: string
  width?: string
  height?: string
  placeholder?: string
  options?: { [key: string]: string | number }[]
  allowClear?: boolean
  disabled?: boolean
  multiple?: boolean
  maxTagCount?: number
  showSearch?: boolean
  dropdown?: boolean
  filterProp?: string
  mutex?: boolean
  mutexOptionValue?: string[] | number[]
  placement?: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'
  offsetValue?: number
}>()

const slots = useSlots() as SetupContext['slots']
interface Emit {
  (e: 'update:value' | 'change', data?: string | number | string[] | number[]): void
  (e: 'blur' | 'focus' | 'deselect' | 'select', data?: Event): void
  (e: 'dropdown-visible-change', visible: boolean): void
}

const emit = defineEmits<Emit>()

// 引用和状态
const selectRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()
const isDropdownVisible = ref(false)

// 使用 floating-ui 配置
const { floatingStyles, update } = useFloating(selectRef, dropdownRef, {
  placement: placement,
  middleware: [
    offset(offsetValue),
    flip({
      fallbackPlacements: ['top', 'bottom', 'left', 'right']
    }),
    shift({
      padding: 8
    }),
    size({
      apply({ availableWidth, availableHeight, elements }) {
        if (elements.floating) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${Math.min(availableHeight, 300)}px`
          })
        }
      }
    })
  ],
  whileElementsMounted: autoUpdate
})

// 计算下拉框样式
const dropdownStyle = computed(() => {
  if (!isDropdownVisible.value) {
    return {}
  }
  
  const minWidth = selectRef.value?.offsetWidth || 200
  const styles = {
    minWidth: `${minWidth}px`,
    zIndex: 1050
  }
  
  // 应用 floating-ui 的样式
  if (floatingStyles.value) {
    return {
      ...styles,
      ...floatingStyles.value,
    }
  }
  return {
    ...styles,
  }
})

const dropdownStyles = computed(() => {
  if (JSON.stringify(dropdownStyle.value) == '{}') {
    return {
      left: '-999999px',
      top: '-999999px',
      opacity: '0',
    }
  }
  setTimeout(()=>{
    return dropdownStyle.value
  },100)
})

// 处理下拉框显示/隐藏
const handleDropdownVisibleChange = (visible: boolean) => {
  isDropdownVisible.value = visible
  emit('dropdown-visible-change', visible)
  
  if (visible) {
    nextTick(() => {
      // 查找下拉框元素并设置为 dropdownRef
      setTimeout(() => {
        const dropdownElement = document.querySelector('.ant-select-dropdown:last-child') as HTMLElement
        if (dropdownElement) {
          dropdownRef.value = dropdownElement
          update()
        }
      }, 50)
    })
  }
}

// 监听下拉框状态变化
watch(isDropdownVisible, (visible) => {
  if (visible) {
    nextTick(() => {
      setTimeout(() => {
        update()
      }, 100)
    })
  }
})

const selectChange = (Val?: string | number | string[] | number[]) => {
  // 多选且是互斥
  if (multiple && mutex) {
    if (mutexOptionValue?.includes((Val as string)[(Val as string[]).length - 1] as never)) {
      emit('update:value', (Val as string)[(Val as string[]).length - 1])
      emit('change', (Val as string)[(Val as string[]).length - 1])
    } else {
      const target = (Val as string[]).filter((i) => !mutexOptionValue?.includes(i as never))
      emit('update:value', target)
      emit('change', target)
    }
  } else {
    emit('update:value', Val)
    emit('change', Val)
  }
}

const mode = computed(() => {
  return multiple ? 'multiple' : undefined
})

const getPopupContainer = () => {
  // 返回 body，让 floating-ui 来处理定位
  return document.body
}

// 清理
onUnmounted(() => {
  if (dropdownRef.value) {
    dropdownRef.value = undefined
  }
})
</script>

<style lang="scss" scoped>
@mixin wh($h) {
  width: 100%;
  min-height: $h;
}

.odos-select {
  @include wh(40px);
  position: relative;
  background: #f2f3f5;
  border: 1px solid #f2f3f5;
  border-radius: 8px;
  display: flex;
  align-items: center;

  &:hover {
    background: #e5e6eb;
    border-radius: 8px;
  }

  &:focus-within {
    border: 1px solid #2e6ce4;
    background: #fff;
    border-radius: 8px;
  }

  &.odos-select-disabled:hover {
    background: #fff;
  }

  .odos-select-title {
    position: absolute;
    width: 80px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 14px;
    color: #4e5969;
    border-right: 1px solid #c9cdd4;
    z-index: 1;
  }

  :deep .ant-select {
    &.ant-select-focused .ant-select-selector {
      box-shadow: none !important;
    }

    @include wh(40px);

    .ant-select-selector {
      border: none !important;
      display: flex;
      align-items: center;
      box-shadow: none;
      background: transparent;
      padding-left: 16px;
      @include wh(40px);

      .ant-select-selection-placeholder {
        color: #86909c;
      }
    }

    &.odos-select-isTitle .ant-select-selector {
      padding-left: 88px !important;

      .ant-select-selection-search input {
        padding-left: 77px;
      }
    }

    .ant-select-selection-search-input {
      @include wh(100%);
      background: transparent;
    }
  }

  :deep .ant-select-multiple {
    .ant-select-selection-item {
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid #e5e6eb;
    }
    &.odos-select-isTitle {
      .ant-select-selection-placeholder {
        padding-left: 77px;
      }
    }
  }
}

:deep .ant-select-dropdown {
  .ant-select-item-option-selected {
    background: transparent !important;
    color: #2e6ce4 !important;
  }

  .ant-select-item {
    &:hover {
      background: #f7f8fa !important;
    }
  }
  
  // 为 floating-ui 增强的样式
  &[data-floating-ui] {
    position: fixed !important;
    z-index: 1050 !important;
  }
  
  // 确保下拉框在使用 floating-ui 时正确显示
  transition: opacity 0.2s, transform 0.2s;
  
  &.ant-select-dropdown-slide-up-enter-active,
  &.ant-select-dropdown-slide-up-leave-active {
    transition: all 0.2s ease;
  }
  
  &.ant-select-dropdown-slide-up-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  
  &.ant-select-dropdown-slide-up-leave-to {
    opacity: 0;
    transform: scaleY(0.8);
  }
}
</style>
