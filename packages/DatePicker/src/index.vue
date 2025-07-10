<template>
  <!-- 根据mode属性选择使用哪个子组件 -->
  <SingleDatePicker
    v-if="mode !== 'range'"
    :title="title"
    :value="value as string"
    :width="width"
    :disabled="disabled"
    :mode="mode as 'date' | 'month' | 'datetime'"
    :disabledDate="disabledDate"
    :placeholder="placeholder"
    :format="format"
    :shortcuts="shortcuts as Array<{text: string, value: () => string}>"
    @update:value="handleSingleUpdate"
  />
  
  <RangeDatePicker
    v-else
    :title="title"
    :value="value as string[]"
    :width="width"
    :disabled="disabled"
    :disabledDate="disabledDate"
    :placeholder="placeholder"
    :format="format"
    :shortcuts="shortcuts as Array<{text: string, value: () => string[]}>"
    @update:value="handleRangeUpdate"
  />
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import SingleDatePicker from './SingleDatePicker.vue'
import RangeDatePicker from './RangeDatePicker.vue'

const props = defineProps<{
  title?: string
  value?: string | string[]
  width?: string | number
  disabled?: boolean
  mode?: 'date' | 'month' | 'datetime' | 'range'
  disabledDate?: (date: Date) => boolean
  placeholder?: string
  format?: string
  shortcuts?: Array<{
    text: string
    value: () => string | string[]
  }>
}>()

const { value, title, width, disabled, disabledDate, placeholder, format, shortcuts } = toRefs(props)
const mode = computed(() => props.mode || 'date')

const emit = defineEmits<{
  (e: 'update:value', data: string | string[]): void
}>()

// 处理单日期更新事件
const handleSingleUpdate = (data: string) => {
  emit('update:value', data)
}

// 处理区间日期更新事件
const handleRangeUpdate = (data: string[]) => {
  emit('update:value', data)
}
</script>
