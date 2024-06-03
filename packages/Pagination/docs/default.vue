<template>
  <odos-pagination v-model:current="current" :total="150" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const current = ref(3)
</script>
