<template>
  <div class="odos-select" :class="{ 'odos-select-disabled': disabled }" :style="{ width, height }">
    <div v-if="title" class="odos-select-title">{{ title }}</div>
    <Select
      v-bind="$attrs"
      :class="{ 'odos-select-isTitle': title }"
      @change="selectChange($event as string | number | string[] | number[])"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @deselect="$emit('deselect', $event)"
      @select="$emit('select', $event)"
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
      :get-popup-container="getPopupContainer || GetPopupContainer"
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
import { computed, useSlots, type SetupContext } from 'vue'
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
  mutexOptionValue
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
  getPopupContainer?: (triggerNode: Element) => HTMLElement
}>()

const slots = useSlots() as SetupContext['slots']
interface Emit {
  (e: 'update:value' | 'change', data?: string | number | string[] | number[]): void
  (e: 'blur' | 'focus' | 'deselect' | 'select', data?: Event): void
}

const emit = defineEmits<Emit>()

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

const GetPopupContainer = (triggerNode: Element) => {
  return triggerNode.parentElement || document.body
}
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
}
</style>
