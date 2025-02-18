<template>
  <odos-textarea v-model:value="textarea" :maxlength="100" show-count />
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

<style scoped lang="scss">
.odos-textarea {
  margin-bottom: 14px;
}
</style>
