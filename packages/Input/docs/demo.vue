<template>
  <odos-input v-model:value="inputValue" :maxLength="10" />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
