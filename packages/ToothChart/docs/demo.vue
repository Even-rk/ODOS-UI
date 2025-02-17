<template>
  <OdosToothChart :tooth-list="toothList" />
  <OdosToothSelect v-model:value="toothList" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toothList = ref([])
</script>

<style scoped lang="scss"></style>
