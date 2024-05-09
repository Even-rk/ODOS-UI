<template>
  <div class="odos-select" :style="{ width }">
    <Select
      @change="selectChange"
      showArrow
      :style="{ width }"
      :placeholder="placeholder || '请选择'"
      :options="options"
    >
    </Select>
  </div>
</template>

<script setup lang="ts">
import { Select } from 'ant-design-vue'
const { width, placeholder, options } = defineProps<{
  width?: string
  placeholder?: string
  options: { value: string; label: string }[]
}>()

const selectChange = () => {}
</script>

<style lang="scss">
@import '/styles/select.scss';
</style>
