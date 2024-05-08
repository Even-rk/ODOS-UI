<template>
  <div class="odos-check_box-item-content" />
</template>

<script setup lang="ts">
defineProps<{
  label?: string | number
  value?: string | number
  alarm?: boolean
}>()
</script>
