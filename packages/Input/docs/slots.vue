<template>
  <odos-input v-model:value="inputValue" :maxLength="15" >
    <template #prefix>
      prefix
    </template>
    <template #suffix>
      suffix
    </template>
  </odos-input>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
