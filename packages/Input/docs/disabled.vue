<template>
  <odos-input v-model:value="inputValue" :disabled="true"/>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
