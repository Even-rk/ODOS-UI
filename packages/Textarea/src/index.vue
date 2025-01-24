<template>
  <div class="odos-textarea">
    <Textarea
      :placeholder="placeholder || '请输入'"
      :value="value"
      @input="$input($event)"
      @change="$change($event)"
      @blur="$blur($event)"
      @focus="$focus($event)"
      :auto-size="autoSize"
      :disabled="disabled"
      :maxlength="maxlength"
    />
    <div class="length" v-if="maxlength">{{ value?.length || 0 }}/{{ maxlength }}</div>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from 'ant-design-vue'
const { value, maxlength, autoSize, disabled, placeholder } = defineProps<{
  value?: string
  maxlength?: number
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  disabled?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:value' | 'change' | 'blur' | 'input' | 'focus', data: string): void
}>()
const $input = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:value', target.value)
  emit('input', target.value)
}
const $change = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('change', target.value)
}
const $focus = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('focus', target.value)
}
const $blur = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('blur', target.value)
}
</script>

<style lang="scss" scoped>
@import '/styles/textarea.scss';
</style>
