<template>
  <div class="odos-tab-content" name="tab">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'odos-tab'
}
</script>
<script setup lang="ts">
import type { VNode } from 'vue'

defineProps<{
  value: string | number
  tab: string | VNode
  icon?: string
  disabled?: boolean
}>()
</script>

<style lang="scss" scoped>
.odos-tab-content {
  padding: 12px 0;
}
</style>
