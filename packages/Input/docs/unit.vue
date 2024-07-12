<template>
  <odos-input v-model:value="inputValue" unit="元" />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
