<template>
  <OdosDatePicker v-model:value="date" mode="datetime" />
</template>

<script setup>
import { ref } from 'vue'
const date = ref('2025-05-01 12:00:00')
</script>
