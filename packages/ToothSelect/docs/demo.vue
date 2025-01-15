<template>
  <OdosToothSelect name="dome" v-model:value="value" :multiple-tooth-list="multipleToothList" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const value = ref([])
const multipleToothList = ref([
  {
    label: '12近中',
    value: '12.2'
  },
  {
    label: '12近远',
    value: '12.1'
  }
])

watch(value, () => {
  console.log(value.value)
})
</script>

<style scoped lang="scss"></style>
