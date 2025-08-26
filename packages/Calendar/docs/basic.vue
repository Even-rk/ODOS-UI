<template>
  <OdosCalendar v-model:value="date" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref('2024-07-15')
</script>
