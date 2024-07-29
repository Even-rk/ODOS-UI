<template>
  <odos-check-box v-model:value="checkBox" mutex :mutex-option-value="[2, 3]">
    <odos-check-box-item :value="1" label="选项1" />
    <odos-check-box-item :value="2" label="选项2" />
    <odos-check-box-item :value="3" label="选项3" />
    <odos-check-box-item :value="4" label="选项4" />
    <odos-check-box-item :value="5" label="选项5" />
    <odos-check-box-item :value="6" label="选项6" />
  </odos-check-box>
</template>

<script setup>
import { ref } from 'vue'

const checkBox = ref()
</script>
