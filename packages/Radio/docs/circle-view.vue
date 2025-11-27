<template>
  <odos-radio v-model:value="radio" circle>
    <odos-radio-item :value="1" label="选项1" :alarm="true" />
    <odos-radio-item :value="2" label="选项2" :alarm="true" />
    <odos-radio-item :value="3" label="选项3" :alarm="true" />
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
