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
  },
  {
    attribute: 'range-limit',
    default: '--',
    type: " 'fullMouth' | 'tooth' | 'bitewing' | 'all'",
    describe: '范围限制 (fullMouth: 全口牙; tooth: 全口; bitewing: 咬翼; all: 全口 + 咬翼)'
  },
  {
    attribute: 'name',
    default: '--',
    type: 'string',
    describe: '唯一标识（当一个页面使用了多个牙位选择器的情况下，需要设置），确保当前牙位选择器唯一'
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
