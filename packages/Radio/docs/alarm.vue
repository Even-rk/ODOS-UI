<template>
  <odos-radio v-model:value="radio">
    <odos-radio-item :value="1" label="选项1" alarm />
    <odos-radio-item :value="2" label="选项2" alarm />
    <odos-radio-item :value="3" label="选项3" alarm />
  </odos-radio>
</template>

<script setup>
import { ref, watch } from 'vue'

const radio = ref()
watch(
  () => radio.value,
  () => {
    console.log(radio.value)
  }
)
</script>
