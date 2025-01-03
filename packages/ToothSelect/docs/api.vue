<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'v-model:value',
    default: '[]',
    type: 'string[]',
    describe: '指定当前选中的条目'
  },
  {
    attribute: 'multipleToothList',
    default: '[]',
    type: '{ label: string; value: string; }[]',
    describe: '多生牙列options'
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
