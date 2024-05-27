<template>
  <div class="odos-select" :style="{ width }">
    <div class="title" v-if="title">{{ title }}</div>
    <Select
      :class="{ 'odos-select-isTitle': title }"
      @change="selectChange"
      showArrow
      v-model:value="selectValue"
      :style="{ width }"
      :placeholder="placeholder || '请选择'"
      :options="options"
      :allowClear="allowClear"
      :bordered="false"
    >
    </Select>
  </div>
</template>

<script setup lang="ts">
import { Select } from 'ant-design-vue'
import { ref } from 'vue'
const selectValue = ref()
const { value, width, placeholder, options, title, allowClear } = defineProps<{
  value: string | number
  title?: string
  width?: string
  placeholder?: string
  options: { value: string; label: string }[]
  allowClear?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:value', data: string | number): void
}>()

const selectChange = () => {
  emit('update:value', selectValue.value)
}
</script>

<style lang="scss">
@import '/styles/select.scss';
</style>
