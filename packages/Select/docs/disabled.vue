<template>
  <odos-select
    v-model:value="selectValue"
    :options="[
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' }
    ]"
    disabled
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectValue = ref()
</script>
