<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'prop',
    default: '--',
    type: 'string',
    describe: '属性描述'
  },
  {
    attribute: 'data',
    default: '--',
    type: 'array',
    describe: '数据'
  },
  {
    attribute: 'title',
    default: '--',
    type: 'string',
    describe: '标题'
  },
  {
    attribute: 'showSync',
    default: '--',
    type: 'boolean',
    describe: '是否显示同步按钮'
  },
  {
    attribute: 'showUpload',
    default: '--',
    type: 'boolean',
    describe: '是否显示上传按钮'
  },
  {
    attribute: 'change',
    default: '--',
    type: 'function',
    describe: '切换事件'
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
