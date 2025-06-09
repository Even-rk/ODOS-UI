<template>
  <odos-ImageClassifyViewer
    style="width: 502px; height: 512px"
    title="患者影像"
    show-sync
    show-upload
    :data="imgData"
    @change="changeHandler"
    default-type="category"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dateClassifyData, categoryClassifyData } from '../src/index'

const imgData = ref<any>(dateClassifyData)
const changeHandler = (type: string) => {
  if (type === 'date') {
    imgData.value = dateClassifyData
  } else {
    imgData.value = categoryClassifyData
  }
}
</script>

<style scoped lang="scss"></style>
