<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    slotName: '--',
    describe: '自定义默认内容'
  },
  {
    slotName: 'icon',
    describe: '自定义图标组件'
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
