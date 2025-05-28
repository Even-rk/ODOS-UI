<template>
  <OdosDatePicker 
    v-model:value="date" 
    title="选择日期"
  />
</template>

<script setup>
import { ref } from 'vue'
const date = ref('')
</script> 