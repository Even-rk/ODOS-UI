<template>
  <div class="odos-select" :class="{ 'odos-select-disabled': disabled }" :style="{ width: WidthSize }">
    <div class="odos-select-title" v-if="title">{{ title }}</div>
    <Select
      :class="{ 'odos-select-isTitle': title }"
      @change="selectChange($event as string | number)"
      showArrow
      :value="value"
      :style="{ width: WidthSize }"
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
      <template #dropdownRender v-if="dropdown">
        <slot name="dropdownRender" />
      </template>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'packages/Icon'
import { Select } from 'ant-design-vue'
import { computed, ref } from 'vue'
const { value, width, placeholder, options, title, allowClear, disabled, multiple, maxTagCount, showSearch } =
  defineProps<{
    value?: string | number | string[] | number[]
    title?: string
    width?: string | number
    placeholder?: string
    options?: { value: string; label: string }[]
    allowClear?: boolean
    disabled?: boolean
    multiple?: boolean
    maxTagCount?: number
    showSearch?: boolean
    dropdown?: boolean
  }>()

const WidthSize = computed(() => {
  const widthSize = ref('')
  if (typeof width === 'number') {
    widthSize.value = `${width}px`
  } else if (typeof width === 'string') {
    widthSize.value = width
  }
  return widthSize.value
})

const emit = defineEmits<{
  (e: 'update:value', data: string | number | undefined): void
}>()

const selectChange = (value?: string | number) => {
  emit('update:value', value)
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
