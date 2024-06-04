<template>
  <div class="odos-textarea">
    <Textarea
      :value="value"
      @input="$input($event)"
      :auto-size="autoSize"
      :show-count="showCount"
      :maxlength="maxlength"
    />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from 'ant-design-vue'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
const { value, maxlength, autoSize } = defineProps<{
  value?: string
  maxlength?: number
  showCount?: boolean
  autoSize?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:value', data: string): void
}>()
const $input = (e: ChangeEvent) => {
  const target = e.target as HTMLInputElement
  emit('update:value', target.value)
}
</script>

<style lang="scss" scoped>
@import '/styles/textarea.scss';
</style>
