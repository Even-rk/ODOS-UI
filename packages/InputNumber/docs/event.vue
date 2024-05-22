<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    eventName: 'input',
    type: 'Function',
    describe: '在 InputNumber 值改变时触发'
  },
  {
    eventName: 'change',
    type: 'Function',
    describe: '当绑定值变化时触发'
  },
  {
    eventName: 'focus',
    type: 'Function',
    describe: '当选择器的输入框获得焦点时触发'
  },
  {
    eventName: 'blur',
    type: 'Function',
    describe: '当选择器的输入框失去焦点时触发'
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
