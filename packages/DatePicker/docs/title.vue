<template>
  <odos-date-picker v-model:value="datePicker" title="请选择" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const datePicker = ref('')

watch(datePicker, () => {
  console.log(datePicker.value)
})
</script>
