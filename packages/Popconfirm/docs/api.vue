<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'width',
    default: '200',
    type: 'number',
    describe: '	弹层宽度，最小宽度 200px'
  },
  // | topLeft | topRight | bottomLeft | bottomRight | leftTop | leftBottom | rightTop | rightBottom
  {
    attribute: 'position',
    default: 'top',
    type: 'top| left | right | bottom ',
    describe: '位置方向'
  },
  {
    attribute: 'teleported',
    default: 'false',
    type: 'boolean',
    describe: '	是否将 popover 的下拉列表插入至 body 元素'
  },
  {
    attribute: 'persistent',
    default: 'false',
    type: 'boolean',
    describe: '当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除'
  },
  {
    attribute: 'hide-after',
    default: '200',
    type: 'number',
    describe: '关闭时的延迟'
  },
  {
    attribute: 'persistent',
    default: 'false',
    type: 'boolean',
    describe: '当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除'
  },
  {
    attribute: 'css-bind',
    default: "{ padding: '4px', borderRadius: '4px'}",
    type: '{padding?: string,borderRadius?: string}',
    describe: '方便改变弹出框部分最外层样式'
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
