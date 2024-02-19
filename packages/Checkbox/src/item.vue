<template>
  <div class="odos-checkbox-item-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string | number
  value?: string | number
  alarm?: boolean
}>()
</script>

<style lang="scss" scoped></style>
