<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'content/data',
    default: '--',
    type: '(string | VNode) / string',
    describe: '消息内容'
  },
  {
    attribute: 'time',
    default: '3000',
    type: 'number',
    describe: '显示时间，单位为毫秒。 设为 0 则不会自动关闭'
  }
]

const columns = [
  {
    title: '属性',
    dataIndex: 'attribute'
  },
  {
    title: '描述',
    dataIndex: 'describe'
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '默认值',
    dataIndex: 'default'
  }
]
</script>
