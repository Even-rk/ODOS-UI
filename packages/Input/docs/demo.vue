<template>
  <odos-input v-model:value="inputValue" />
</template>

<script setup>
import { ref, watch } from 'vue'

const inputValue = ref('')
watch(
  () => inputValue.value,
  () => {
    console.log(inputValue.value)
  }
)
</script>
