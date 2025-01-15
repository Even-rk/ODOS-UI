<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    eventName: 'change',
    type: 'Function($event)',
    describe: '选中内容改变后触发'
  },
  {
    eventName: 'select',
    type: 'Function(value)',
    describe: '选择后触发'
  },
  {
    eventName: 'blur',
    type: 'Function($event)',
    describe: '失去焦点时触发'
  },
  {
    eventName: 'focus',
    type: 'Function($event)',
    describe: '获得焦点时触发'
  },
  {
    eventName: 'select',
    type: 'Function(value)',
    describe: '清除后触发'
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
