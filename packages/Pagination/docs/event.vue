<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    eventName: 'change',
    type: 'Function(page,pageSize)',
    describe: 'current 或 pageSize 改变的回调，参数是改变后的页码及每页条数'
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
