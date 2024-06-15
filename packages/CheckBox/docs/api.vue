<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'v-model:value',
    default: '--',
    type: 'string[] | number[]',
    describe: '关联选中的值'
  },
  {
    attribute: 'size',
    default: 'large',
    type: 'small | medium | large',
    describe: '多选按钮大小'
  },
  {
    attribute: 'itemWidth',
    default: 'auto',
    type: 'string',
    describe: '设置多选按钮固定宽度'
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
