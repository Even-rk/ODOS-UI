<template>
  <odos-radio v-model:value="radio">
    <odos-radio-item :disabled="i.disabled" v-for="i in list" :value="i.value" :label="i.label" />
  </odos-radio>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const list = [
  {
    label: '选择1',
    value: '1',
    disabled: false
  },
  {
    label: '选择2',
    value: '2',
    disabled: true
  }, {
    label: '选择3',
    value: '3',
    disabled: false
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
