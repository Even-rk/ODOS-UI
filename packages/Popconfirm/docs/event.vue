<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    eventName: 'confirm',
    type: 'Function:(e: MouseEvent) => void',
    describe: '点击确认按钮时触发'
  },
  {
    eventName: 'cancel',
    type: 'Function:(e: MouseEvent) => void',
    describe: '点击取消按钮时触发'
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
