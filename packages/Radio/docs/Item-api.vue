<template>
  <odos-table :columns="itemColumns" :data="itemData"></odos-table>
  <h2>RadioItem slot</h2>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const itemData = [
  {
    attribute: 'label',
    default: '--',
    type: 'string | number',
    describe: '单选按钮的内容'
  },
  {
    attribute: 'value',
    default: '--',
    type: 'string | number',
    describe: 'modul:value 绑定的值'
  },
  {
    attribute: 'alarm',
    default: 'false',
    type: 'boolean',
    describe: '是否设定当前按钮为警示按钮'
  }
]

const itemColumns = [
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

const data = [
  {
    slotName: '--',
    describe: '自定义默认内容'
  }
]

const columns = [
  {
    title: '插槽名',
    dataIndex: 'slotName'
  },
  {
    title: '说明',
    dataIndex: 'describe'
  }
]
</script>
