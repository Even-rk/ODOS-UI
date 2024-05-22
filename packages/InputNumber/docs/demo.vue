<template>
  <odos-input-number v-model:value="inputNumberValue" />
</template>

<script setup>
import { ref } from 'vue'

const inputNumberValue = ref()
</script>
