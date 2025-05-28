<template>
  <OdosDatePicker 
    v-model:value="datetime" 
    mode="datetime"
  />
</template>

<script setup>
import { ref } from 'vue'
const datetime = ref('')
</script> 