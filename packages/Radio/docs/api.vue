<template>
  <h2>Radio 属性</h2>
  <odos-table :columns="apiColumns" :data="apiData"></odos-table>
  <h2>RadioItem 属性</h2>
  <odos-table :columns="itemColumns" :data="itemData"></odos-table>
</template>

<script setup lang="ts">
const apiData = [
  {
    attribute: 'v-model:value',
    default: '--',
    type: 'string',
    describe: '关联选中的值'
  },
  {
    attribute: 'size',
    default: 'large',
    type: 'small | medium | large',
    describe: '单选按钮大小'
  },
  {
    attribute: 'itemWidth',
    default: 'auto',
    type: 'string',
    describe: '设置单选按钮固定宽度'
  }
]

const apiColumns = [
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
  },
  {
    attribute: 'disabled',
    default: 'false',
    type: 'boolean',
    describe: '禁用'
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
</script>
