<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'v-model:current',
    default: '--',
    type: 'number',
    describe: '当前页码'
  },
  {
    attribute: 'v-model:pageSize',
    default: '10',
    type: 'number',
    describe: '每页条数'
  },
  {
    attribute: 'total',
    default: '--',
    type: 'number',
    describe: '数据总数'
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
