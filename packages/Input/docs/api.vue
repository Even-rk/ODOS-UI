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
  },
  {
    attribute: 'isFocus',
    default: 'false',
    type: 'boolean',
    describe: '初始化获取焦点'
  },
  {
    attribute: 'unit',
    default: '--',
    type: 'string',
    describe: '设置单位'
  },
  {
    attribute: 'maxlength',
    default: '--',
    type:'number',
    describe: '最大输入长度'
  },
  {
      attribute:'prefix',
      default: '--',
      type:'slot',
      describe: '设置前缀'
  },
  {
      attribute:'suffix',
      default: '--',
      type:'slot',
      describe:'设置后缀'
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
