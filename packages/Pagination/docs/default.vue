<template>
  <odos-pagination v-model:current="current" :total="50" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const current = ref(1)
</script>
