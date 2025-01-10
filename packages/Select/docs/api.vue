<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'v-model:value',
    default: '--',
    type: 'string | string[] | number | number[]',
    describe: '指定当前选中的条目'
  },
  {
    attribute: 'options',
    default: '--',
    type: 'Array<{ label: string, value: string, [key:string]: string }>',
    describe: '选项列表'
  },
  {
    attribute: 'allowClear',
    default: 'false',
    type: 'boolean',
    describe: '支持清除'
  },
  {
    attribute: 'title',
    default: '--',
    type: 'string',
    describe: 'label标题'
  },
  {
    attribute: 'width',
    default: '100%',
    type: 'string',
    describe: '宽度'
  },
  {
    attribute: 'height',
    default: '40px',
    type: 'string',
    describe: '高度'
  },
  {
    attribute: 'placeholder',
    default: '请选择',
    type: 'string',
    describe: '占位字符'
  },
  {
    attribute: 'disabled',
    default: 'false',
    type: 'boolean',
    describe: '是否禁用'
  },
  {
    attribute: 'maxTagCount',
    default: '--',
    type: 'number',
    describe: '最多显示多少个 tag'
  },
  {
    attribute: 'multiple',
    default: 'false',
    type: 'boolean',
    describe: '设置 Select 的模式为多选或标签'
  },
  {
    attribute: 'showSearch',
    default: 'false',
    type: 'boolean',
    describe: '配置是否可搜索'
  },
  {
    attribute: 'filterProp',
    default: 'label',
    type: 'string',
    describe: '搜索时过滤对应的 option 属性'
  },
  {
    attribute: 'mutex',
    default: 'false',
    type: 'boolean',
    describe: '设置 Select 的模式为互斥模式'
  },
  {
    attribute: 'mutexOptionValue',
    default: '[]',
    type: 'string[]',
    describe: '互斥选项的值（互斥的内容为单选)'
  }
]

const columns = [
  {
    title: '属性',
    dataIndex: 'attribute',
    width: '150px'
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
    dataIndex: 'default',
    width: '150px'
  }
]
</script>
