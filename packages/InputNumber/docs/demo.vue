<template>
  <odos-input-number v-model:value="inputNumberValue"/>
</template>

<script setup>
import { ref, watch } from 'vue'

const inputNumberValue = ref()
watch(
  () => inputNumberValue.value,
  () => {
    console.log(inputNumberValue.value)
  }
)
</script>
