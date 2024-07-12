<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'type',
    default: 'default',
    type: 'primary | default | line | text',
    describe: '类型'
  },
  {
    attribute: 'size',
    default: 'large',
    type: 'small | medium | large',
    describe: '大小'
  },
  {
    attribute: 'disabled',
    default: 'false',
    type: 'boolean',
    describe: '按钮是否为禁用状态'
  },
  {
    attribute: 'icon',
    default: '--',
    type: 'string',
    describe: '图标组件'
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
