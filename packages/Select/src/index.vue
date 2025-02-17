<template>
  <div class="odos-select" :class="{ 'odos-select-disabled': disabled }" :style="{ width, height }">
    <div v-if="title" class="odos-select-title">{{ title }}</div>
    <Select
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
      :get-popup-container="getPopupContainer"
    >
      <template #suffixIcon>
        <Icon name="ArowDown" size="20px" />
      </template>
      <template #notFoundContent>
        <Empty />
      </template>
      <template v-if="slots.option" #option="{ option }">
        <slot name="option" :option="option" />
      </template>
      <template v-if="slots.dropdownRender" #dropdownRender="{ menuNode }">
        <slot name="dropdownRender" :menuNode="menuNode" />
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

const getPopupContainer = (triggerNode: Element) => {
  return triggerNode.parentElement || document.body
}
</script>

<style lang="scss" scoped>
@import '/styles/select.scss';
</style>
