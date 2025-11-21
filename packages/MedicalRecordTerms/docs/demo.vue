<template>
  <odos-MedicalRecordTerms :entryData="entryData" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import data from './data.json'

interface EntryData {
  itemType: string
  items: { fromLj: boolean; itemName: string; itemOrder: number; id: number }[]
}

const entryData = ref([] as EntryData[])

onMounted(() => {
  const dataList = data.data.filter((item) => {
    return item.mainType.includes('主诉')
  })
  entryData.value = dataList.length > 0 ? dataList[0].itemTypes || [] : []
})
</script>

<style scoped lang="scss"></style>
