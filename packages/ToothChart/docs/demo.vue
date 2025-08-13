<template>
  <OdosPopover position="bottomLeft" trigger="click">
    <template #content>
      <OdosToothSelect v-model:value="toothList" />
    </template>
    <OdosToothChart :tooth-list="toothList" />
  </OdosPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toothList = ref([])
</script>

<style scoped lang="scss"></style>
