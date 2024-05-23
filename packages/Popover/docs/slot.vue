<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    slotName: '--',
    describe: '触发 Popover 显示的 HTML 元素'
  },
  {
    slotName: 'content',
    describe: 'Popover 内容'
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
