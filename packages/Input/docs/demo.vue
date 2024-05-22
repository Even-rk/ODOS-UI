<template>
  <odos-input v-model:value="inputValue" />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
