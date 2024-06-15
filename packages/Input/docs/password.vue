<template>
  <odos-input type="password" v-model:value="inputValue" />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
