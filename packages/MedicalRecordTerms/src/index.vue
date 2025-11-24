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
  // 水平方向的词条数据
  HorizontalEntryData?: {
    itemType: string
    items: {
      itemName: string
    }[]
  }[]
  // 垂直方向的词条数据
  verticalEntryData?: VerticalEntryData
  // 水平方向还是垂直方向
  type?: string
  // 项目类型（垂直方向才有）
  projectType?: string
}>()
</script>

<style lang="scss" scoped></style>
