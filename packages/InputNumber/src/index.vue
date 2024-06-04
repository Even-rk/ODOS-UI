<template>
  <div class="odos-input-number" :class="{ 'odos-input-number-disabled': disabled }" :style="{ width: WidthSize }">
    <input
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

const { value, width, placeholder, disabled } = defineProps<{
  value?: number
  width?: string | number
  placeholder?: string
  disabled?: boolean
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
@import '/styles/inputNumber.scss';
</style>
