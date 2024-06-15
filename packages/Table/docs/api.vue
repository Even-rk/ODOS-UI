<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'data',
    default: '--',
    type: 'Object[]',
    describe: '数据数组'
  },
  {
    attribute: 'columns',
    default: '--',
    type: 'array',
    describe: '表格列的配置描述'
  },
  {
    attribute: 'loading',
    default: 'false',
    type: 'boolean',
    describe: '表格是否加载中'
  },
  {
    attribute: 'scroll',
    default: '--',
    type: '{ x: number, y: number }',
    describe: '表格是否可滚动，也可以指定滚动区域的宽、高'
  },
  {
    attribute: 'isSelection',
    default: 'false',
    type: 'boolean',
    describe: '是否开始多选模式'
  },
  {
    attribute: 'emptyText',
    default: '--',
    type: 'string',
    describe: '自定义空数据时的显示文字'
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
