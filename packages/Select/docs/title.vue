<template>
  <odos-select
    placeholder="请进行选择"
    title="选择器"
    :options="[
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' }
    ]"
    v-model:value="selectValue"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectValue = ref()
</script>
