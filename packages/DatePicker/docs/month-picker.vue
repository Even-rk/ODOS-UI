<template>
  <OdosDatePicker 
    v-model:value="month" 
    mode="month"
    title="选择月份"
    format="YYYY年MM月"
  />
</template>

<script setup>
import { ref } from 'vue'
const month = ref('')
</script> 