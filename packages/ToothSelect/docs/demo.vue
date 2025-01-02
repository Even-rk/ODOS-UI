<template>
  <OdosToothSelect v-model:value="value" :multiple-tooth-list="multipleToothList" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const multipleToothList = ref([
  {
    label: '12近中',
    value: '12.1'
  },
  {
    label: '12近中',
    value: '12.1'
  }
])
</script>

<style scoped lang="scss"></style>
