<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'src',
    default: '--',
    type: 'string',
    describe: '音频链接'
  },
  {
    attribute: 'autoPlay',
    default: 'false',
    type: 'boolean',
    describe: '是否自动播放'
  },
  {
    attribute: 'currentTime',
    default: '0',
    type: 'number',
    describe: '指定什么起点开始播放'
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
