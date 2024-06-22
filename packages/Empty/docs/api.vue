<template>
  <h1>Empty API</h1>
  <h2>Empty 属性</h2>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'width',
    default: '--',
    type: 'string',
    describe: '空状态的宽'
  },
  {
    attribute: 'height',
    default: '--',
    type: 'string',
    describe: '空状态的高'
  },
  {
    attribute: 'description',
    default: '暂无数据',
    type: 'string | v-slot',
    describe: '自定义文本内容'
  },
  {
    attribute: 'image',
    default: 'DEFAULT',
    type: 'DEFAULT | SIMPLE | string',
    describe: '设置显示图片，为 string 时表示自定义图片地址'
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
