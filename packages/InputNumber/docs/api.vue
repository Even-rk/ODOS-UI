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
    attribute: 'width',
    default: '100%',
    type: 'string | number',
    describe: '输入框的宽度'
  },
  {
    attribute: 'title',
    default: '--',
    type: 'string',
    describe: '用于设置title'
  },
  {
    attribute: 'placeholder',
    default: '请输入',
    type: 'string',
    describe: '输入框占位描述'
  },
  {
    attribute: 'disabled',
    default: 'false',
    type: 'boolean',
    describe: '是否禁用'
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
