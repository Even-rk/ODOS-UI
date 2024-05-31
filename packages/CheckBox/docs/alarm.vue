<template>
  <odos-check-box v-model:value="checkBox">
    <odos-check-box-item :value="1" label="选项1" :alarm="true" />
    <odos-check-box-item :value="2" label="选项2" :alarm="true" />
    <odos-check-box-item :value="3" label="选项3" :alarm="true" />
  </odos-check-box>
</template>

<script setup>
import { ref } from 'vue'

const checkBox = ref()
</script>
