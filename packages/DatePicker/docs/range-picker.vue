<template>
  <OdosDatePicker v-model:value="dateRange" mode="range" title="日期区间" />
</template>

<script setup>
import { ref } from 'vue'
const dateRange = ref(['', ''])
</script>
