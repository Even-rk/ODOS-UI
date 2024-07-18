<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    eventName: 'change',
    type: 'Function($event)',
    describe: '选中内容改变后触发'
  }
]

const columns = [
  {
    title: '事件名',
    dataIndex: 'eventName'
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
