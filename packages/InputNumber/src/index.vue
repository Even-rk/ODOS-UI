<template>
  <div class="odos-input-number" :style="{ width: WidthSize }">
    <input
      type="number"
      :value.prop="value"
      onkeypress="return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))"
      @input="$emit('update:value', +($event.target as HTMLInputElement).value)"
      :placeholder="placeholder || '请输入'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const { value, width, placeholder } = defineProps<{
  value?: number
  width?: string | number
  placeholder?: string
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
</script>

<style lang="scss">
@import '/styles/inputNumber.scss';
</style>
