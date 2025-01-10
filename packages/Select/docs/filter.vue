<template>
  <odos-select
    placeholder="请进行选择"
    title="选择器"
    show-search
    filter-prop="quickSearch"
    :options="[
      { value: '1', label: '1', quickSearch: 'wagdawkjdiu' },
      { value: '2', label: '2', quickSearch: 'sawfdwavaklwda' },
      { value: '3', label: '3', quickSearch: 'iiiiiiiiii' }
    ]"
    v-model:value="selectValue"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectValue = ref()
</script>
