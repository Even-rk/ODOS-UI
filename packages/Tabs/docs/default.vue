<template>
  <odos-tabs v-model:currentTab="currentTab">
    <odos-tab :value="i.value" :tab="i.label" v-for="i in list">tab2</odos-tab>
  </odos-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = [
  {
    label: '选择1',
    value: '1'
  },
  {
    label: '选择2',
    value: '2'
  }, {
    label: '选择3',
    value: '3'
  }
]
const currentTab = ref('1')
</script>
