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
    attribute: 'dropdown',
    default: 'false',
    type: 'boolean',
    describe: '是否自定义下拉框内容，设置为true，下拉框内容就会被替换为插槽dropdownRender'
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
    dataIndex: 'default'
  }
]
</script>
