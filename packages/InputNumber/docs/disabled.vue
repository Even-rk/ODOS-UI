<template>
  <odos-input-number v-model:value="inputNumberValue" :disabled="true" />
</template>

<script setup>
import { ref } from 'vue'

const inputNumberValue = ref()
</script>
