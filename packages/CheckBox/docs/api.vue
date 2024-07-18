<template>
  <h2>CheckBox 属性</h2>
  <odos-table :columns="apiColumns" :data="apiData"></odos-table>
  <h2>CheckBox event</h2>
  <odos-table :columns="eventcolumns" :data="eventdata"></odos-table>
  <h2>CheckBoxItem 属性</h2>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const apiData = [
  {
    attribute: 'v-model:value',
    default: '--',
    type: 'string[] | number[]',
    describe: '关联选中的值'
  },
  {
    attribute: 'size',
    default: 'large',
    type: 'small | medium | large',
    describe: '多选按钮大小'
  },
  {
    attribute: 'itemWidth',
    default: 'auto',
    type: 'string',
    describe: '设置多选按钮固定宽度'
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
// item属性
const data = [
  {
    attribute: 'label',
    default: '--',
    type: 'string | number',
    describe: '多选按钮的内容'
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
// 事件
const eventdata = [
  {
    eventName: 'change',
    type: 'Function($event)',
    describe: '选中内容改变后触发'
  }
]

const eventcolumns = [
  {
    title: '事件名',
    dataIndex: 'eventName'
  },
  {
    title: '说明',
    dataIndex: 'describe'
  },
  {
    title: '类型',
    dataIndex: 'type'
  }
]
</script>
