<template>
  <div class="odos-input" :class="{ disabled }" :style="{ width: WidthSize }">
    <input
      type="text"
      :value="value"
      :disabled="disabled"
      @change="emit('change', $event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @input="handleInput"
      :placeholder="placeholder || '请输入'"
    />
    <div class="odos-input-text-number"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const emit = defineEmits<{
  (e: 'update:value', data: string): void
  (e: 'input' | 'focus' | 'change' | 'blur', data: Event): void
}>()

const { value, width, placeholder, disabled } = defineProps<{
  value?: string
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
  emit('update:value', (e.target as HTMLInputElement).value)
}
</script>

<style lang="scss">
@import '/styles/input.scss';
</style>
