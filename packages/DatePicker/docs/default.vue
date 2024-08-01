<template>
  <odos-date-picker v-model:value="datePicker" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const datePicker = ref('')

onMounted(() => {
  datePicker.value = '2024-08-01'
})

watch(datePicker, () => {
  console.log(datePicker.value)
})
</script>
