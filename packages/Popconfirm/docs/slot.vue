<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    slotName: 'reference',
    describe: '	触发 Popconfirm 显示的 HTML 元素',
    type: '—'
  },
  {
    slotName: 'actions',
    describe: '页脚的内容',
    type: 'Object : ({ confirm: (e: MouseEvent) => void, cancel: (e: MouseEvent) => void })'
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
  },
  {
    title: '类型',
    dataIndex: 'type'
  }
]
</script>
