<template>
  <div class="odos-radio-item-content">
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
