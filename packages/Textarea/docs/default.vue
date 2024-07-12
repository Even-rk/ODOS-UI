<template>
  <odos-textarea v-model:value="textarea" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const textarea = ref()
watch(
  () => textarea.value,
  () => {
    console.log(textarea.value)
  }
)
</script>
