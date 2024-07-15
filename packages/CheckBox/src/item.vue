<template>
  <div class="odos-check_box-item-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string | number
  value?: string | number
  alarm?: boolean
  disabled?: boolean
}>()
</script>
