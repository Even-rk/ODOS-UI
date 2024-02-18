<template>
  <odos-radio v-model:value="radio" size="medium">
    <odos-radio-item :value="1" label="aa" alarm />
    <odos-radio-item :value="2" label="bb" />
    <odos-radio-item :value="3" label="cc" />
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
