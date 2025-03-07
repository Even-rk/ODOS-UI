<template>
  <div class="odos-textarea">
    <Textarea
      v-bind="$attrs"
      :placeholder="placeholder || '请输入'"
      :value="value"
      @input="$input($event)"
      @change="$change($event)"
      @blur="$blur($event)"
      @focus="$focus($event)"
      :auto-size="autoSize"
      :disabled="disabled"
      :maxlength="maxlength"
      :show-count="false"
    />
    <div class="length" v-if="maxlength && showCount">{{ value?.length || 0 }}/{{ maxlength }}</div>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from 'ant-design-vue'
const { value, maxlength, autoSize, disabled, placeholder, showCount } = defineProps<{
  value?: string
  maxlength?: number
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  disabled?: boolean
  placeholder?: string
  showCount?: boolean
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
.odos-textarea {
  width: 100%;
  height: 100%;
  position: relative;

  .length {
    position: absolute;
    line-height: 17px;
    right: 0;
    bottom: -20px;
    font-size: 12px;
    color: #86909c;
  }

  textarea {
    border-color: transparent;
    background: #f2f3f5;
    height: 100%;

    &:hover {
      background: #e5e6eb;
      border-color: transparent;
    }

    &:focus-within {
      border: 1px solid #2e6ce4;
      background: #fff;
    }

    &:focus {
      box-shadow: none;
    }

    &::placeholder {
      color: #86909c;
    }
  }
}
</style>
