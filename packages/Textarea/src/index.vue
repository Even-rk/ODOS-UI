<template>
  <div class="odos-textarea">
    <Textarea :value="value" @input="$input($event)" show-count :maxlength="100"></Textarea>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from 'ant-design-vue'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
const { value } = defineProps<{
  value: string
}>()

const emit = defineEmits<{
  (e: 'update:value', data: string): void
}>()
const $input = (e: ChangeEvent) => {
  const target = e.target as HTMLInputElement
  emit('update:value', target.value)
}
</script>

<style lang="scss">
@import '/styles/textarea.scss';
</style>
