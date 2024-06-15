<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'type',
    default: 'default',
    type: 'default | dark | light | line',
    describe: '类型'
  },
  {
    attribute: 'icon',
    default: '--',
    type: 'string | slot ',
    describe: '设置图标'
  },
  {
    attribute: 'color',
    default: '#1D2129',
    type: 'string',
    describe: '字体和icon颜色'
  },
  {
    attribute: 'borderColor',
    default: '--',
    type: 'string',
    describe: 'tag边框颜色'
  },
  {
    attribute: 'backgroundColor',
    default: '--',
    type: 'string',
    describe: 'tag背景颜色色'
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
