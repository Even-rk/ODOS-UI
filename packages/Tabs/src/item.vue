<template>
  <div class="odos-tab-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from 'vue'

defineProps<{
  value: string | number
  tab: string | VNode
  icon?: string
}>()
</script>

<style lang="scss" scoped>
.odos-tab-content {
  padding: 12px 0;
}
</style>
