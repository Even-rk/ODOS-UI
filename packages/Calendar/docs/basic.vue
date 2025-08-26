<template>
  <div>
    <Calendar v-model:value="date" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Calendar from '../src/index.vue'

const date = ref('2024-07-15')
</script>
