<template>
  <odos-radio v-model:value="radio">
    <odos-radio-item v-for="i in list" :value="i.value" :label="i.label" />
  </odos-radio>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

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


const radio = ref()
watch(
  () => radio.value,
  () => {
    console.log(radio.value)
  }
)
</script>
