<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'align',
    default: 'left',
    type: 'left | right | center',
    describe: '设置列的对齐方式'
  },
  {
    attribute: 'title',
    default: '--',
    type: 'string',
    describe: '列头显示文字'
  },
  {
    attribute: 'width',
    default: '--',
    type: 'string | number',
    describe: '列宽度'
  },
  {
    attribute: 'fixed',
    default: 'false',
    type: 'boolean | string',
    describe: `列是否固定，可选 true(等效于 left) 'left' 'right' 需配合scroll属性使用`
  },
  {
    attribute: 'headerSlotName',
    default: '--',
    type: 'string',
    describe: '当前列自定义表头插槽名'
  },
  {
    attribute: 'slotName',
    default: '--',
    type: 'string',
    describe: '当前列自定义表格内容插槽名 v-slot:[slotName]="{ record }"'
  },
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
