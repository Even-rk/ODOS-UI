<template>
  <odos-popover trigger="click" v-model="isVisible">
    <template #content>
      <div>这是一个 popover 组件</div>
      <odos-button @click="isVisible = false">close</odos-button>
    </template>
    <odos-button>open</odos-button>
  </odos-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)
</script>
