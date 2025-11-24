<template>
  <template v-if="type === 'vertical'">
    <Vertical :type="projectType as string" :entryData="verticalEntryData as VerticalEntryData" />
  </template>
  <template v-else>
    <Horizontal :entryData="HorizontalEntryData as { itemType: string; items: { itemName: string }[] }[]" />
  </template>
</template>

<script setup lang="ts">
import Horizontal from './horizontal.vue'
import Vertical from './vertical.vue'

type VerticalEntryData = {
  itemTypes: {
    itemType: string
    items: { fromLj: boolean; itemName: string; itemOrder: number; id: number }[]
  }[]
  mainType: string
}[]

defineProps<{
  HorizontalEntryData?: {
    itemType: string
    items: {
      itemName: string
    }[]
  }[]
  verticalEntryData?: VerticalEntryData
  type?: string
  projectType?: string
}>()
</script>

<style lang="scss" scoped></style>
