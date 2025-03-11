<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'showTip',
    default: 'false',
    type: 'boolean',
    describe: '是否显示提示文本'
  },
  {
    attribute: 'tipColor',
    default: '#1d2129',
    type: 'string',
    describe: '提示文本颜色'
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
