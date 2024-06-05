<template>
  <odos-date-picker v-model:value="datePicker" :disabled="true" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const datePicker = ref('')

watch(datePicker, () => {
  console.log(datePicker.value)
})
</script>
