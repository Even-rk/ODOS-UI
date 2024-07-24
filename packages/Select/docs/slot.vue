<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    slotName: 'suffixIcon',
    describe: '自定义的选择框后缀图标'
  },
  {
    slotName: 'dropdownRender',
    describe: '自定义下拉框内容'
  }
]

const columns = [
  {
    title: '插槽名',
    dataIndex: 'slotName'
  },
  {
    title: '说明',
    dataIndex: 'describe'
  }
]
</script>
