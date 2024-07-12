<template>
  <FormItem :label="label" :name="name">
    <slot />
  </FormItem>
</template>

<script setup lang="ts">
import { FormItem } from 'ant-design-vue'

const { label, name } = defineProps<{
  label: string
  name: string
}>()
</script>

<style scoped>

</style>