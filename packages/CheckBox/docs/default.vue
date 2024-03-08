<template>
  <odos-check-box v-model:value="checkBox">
    <odos-check-box-item :value="1" label="选项1" />
    <odos-check-box-item :value="2" label="选项2" />
    <odos-check-box-item :value="3" label="选项3" />
  </odos-check-box>
</template>

<script setup>
import { ref, watch } from 'vue'

const checkBox = ref()
</script>
