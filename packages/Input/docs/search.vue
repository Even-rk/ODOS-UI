<template>
  <odos-input type="search" v-model:value="inputValue" />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
