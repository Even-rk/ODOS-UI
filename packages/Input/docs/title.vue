<template>
  <odos-input v-model:value="inputValue" title="输入器" />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
