<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'v-model:value',
    default: '--',
    type: 'string',
    describe: '输入框内容'
  },
  {
    attribute: 'maxlength',
    default: '--',
    type: 'number',
    describe: '最大长度'
  },
  {
    attribute: 'disabled',
    default: 'false',
    type: 'boolean',
    describe: '是否禁用状态'
  },
  {
    attribute: 'autoSize',
    default: '--',
    type: 'boolean | { minRows: number, maxRows: number }',
    describe: '自适应内容高度'
  },
  {
    attribute: 'placeholder',
    default: '请输入',
    type: 'string',
    describe: '占位符'
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
