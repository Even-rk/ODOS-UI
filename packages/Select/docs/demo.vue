<template>
  <odos-select
    placeholder="请进行选择"
    :options="[]"
    v-model:value="selectValue"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectValue = ref()
</script>
