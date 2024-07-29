<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'model',
    default: '--',
    type: 'Object',
    describe: '表单数据对象'
  },
  {
    attribute: 'rules',
    default: '--',
    type: 'Object',
    describe: '表单验证规则'
  },
  {
    attribute: 'scrollToFirstError',
    default: 'false',
    type: 'boolean',
    describe: '提交失败自动滚动到第一个错误字段'
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
