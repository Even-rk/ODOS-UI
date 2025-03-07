<template>
  <div
    class="odos-input-number"
    :class="{ 'odos-input-number-disabled': disabled }"
    :style="{ width: WidthSize }"
  >
    <div class="odos-input-number-title" v-if="title">{{ title }}</div>
    <input
      :class="{ 'odos-input-number-isTitle': title }"
      type="number"
      :value.prop="value"
      :disabled="disabled"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      onkeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
      @input="handleInput"
      :placeholder="placeholder || '请输入'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const emit = defineEmits<{
  (e: 'update:value', data: number): void
  (e: 'input' | 'focus' | 'change' | 'blur', data: Event): void
}>()

const { value, width, placeholder, disabled, title } = defineProps<{
  value?: number
  width?: string | number
  placeholder?: string
  disabled?: boolean
  title?: string
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

const handleInput = (e: Event) => {
  emit('input', e)
  emit('update:value', +(e.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.odos-input-number {
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  input {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: 8px;
    padding: 10px 16px;
    background: #f2f3f5;
    width: 100%;
    height: 100%;
    border: 1px solid #f2f3f5;
    outline: none;
    &:focus-within {
      border: 1px solid #2e6ce4;
    }
    &::placeholder {
      color: #86909c;
    }
    &.odos-input-number-isTitle {
      padding-left: 88px;
    }
  }

  .odos-input-number-title {
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

  &.odos-input-number-disabled {
    background: #f2f3f5;
    border-radius: 8px;
    input:hover {
      cursor: not-allowed;
      background: #f2f3f5;
    }
  }
}
</style>
