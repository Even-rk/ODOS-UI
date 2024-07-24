<template>
  <div class="odos-select" :class="{ 'odos-select-disabled': disabled }" :style="{ width, height }">
    <div class="odos-select-title" v-if="title">{{ title }}</div>
    <Select
      :class="{ 'odos-select-isTitle': title }"
      @change="selectChange($event as string | number)"
      showArrow
      :optionFilterProp="filterProp || 'label'"
      :value="value"
      :style="{ width, height }"
      :placeholder="placeholder || '请选择'"
      :options="options"
      :allowClear="allowClear"
      :bordered="false"
      :disabled="disabled"
      :mode="mode"
      :max-tag-count="maxTagCount"
      :show-search="showSearch"
      :defaultActiveFirstOption="false"
      :getPopupContainer="getPopupContainer"
    >
      <template #suffixIcon>
        <slot name="suffixIcon">
          <Icon name="ArowDown" size="20px" />
        </slot>
      </template>
      <template #dropdownRender="{ menuNode }">
        <slot name="dropdownRender" :menu="menuNode">
          <VNodes :vnodes="menuNode" />
        </slot>
      </template>
      <template #notFoundContent>
        <slot name="notFoundContent">
          <Empty />
        </slot>
      </template>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'packages/Icon'
import { Empty, Select } from 'ant-design-vue'
import { computed, defineComponent } from 'vue'
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
  filterProp
} = defineProps<{
  value?: string | number | string[] | number[]
  title?: string
  width?: string
  height?: string
  placeholder?: string
  options?: { value: string | number; label: string }[]
  allowClear?: boolean
  disabled?: boolean
  multiple?: boolean
  maxTagCount?: number
  showSearch?: boolean
  dropdown?: boolean
  filterProp?: string
}>()

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true
    }
  },
  render() {
    return this.vnodes
  }
})

const emit = defineEmits<{
  (e: 'update:value' | 'change', data?: string | number | string[] | number[]): void
}>()

const selectChange = (value?: string | number | string[] | number[]) => {
  emit('update:value', value)
  emit('change', value)
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
