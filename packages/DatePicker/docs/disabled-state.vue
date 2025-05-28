<template>
  <OdosDatePicker 
    v-model:value="disabledDate" 
    title="禁用状态"
    disabled
  />
</template>

<script setup>
import { ref } from 'vue'
const disabledDate = ref('2024-01-01')
</script>