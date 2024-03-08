<template>
  <div class="odos-popover">
    <Popover :position="position">
      <template #content>
        <slot name="content"></slot>
      </template>
      <slot></slot>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover } from 'ant-design-vue'
const { position } = defineProps<{
  position: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br' | 'left' | 'lt' | 'lb' | 'right' | 'rt' | 'rb'
}>()
</script>
