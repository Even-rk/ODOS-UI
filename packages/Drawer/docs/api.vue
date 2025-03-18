<template>
  <odos-table :columns="columns" :data="data"></odos-table>
</template>

<script setup lang="ts">
const data = [
  {
    attribute: 'open',
    default: 'false',
    type: 'boolean',
    describe: '抽屉是否可见'
  },
  {
    attribute: 'title',
    default: '""',
    type: 'string',
    describe: '抽屉标题'
  },
  {
    attribute: 'width',
    default: '"30%"',
    type: 'string | number',
    describe: '抽屉宽度'
  },
  {
    attribute: 'height',
    default: '"30%"',
    type: 'string | number',
    describe: '抽屉高度，在 placement 为 top 或 bottom 时使用'
  },
  {
    attribute: 'placement',
    default: '"right"',
    type: '"left" | "right" | "top" | "bottom"',
    describe: '抽屉的方向'
  },
  {
    attribute: 'closable',
    default: 'true',
    type: 'boolean',
    describe: '是否显示右上角的关闭按钮'
  },
  {
    attribute: 'keyboard',
    default: 'true',
    type: 'boolean',
    describe: '是否支持键盘 esc 关闭'
  },
  {
    attribute: 'mask',
    default: 'true',
    type: 'boolean',
    describe: '是否显示遮罩'
  },
  {
    attribute: 'maskClosable',
    default: 'true',
    type: 'boolean',
    describe: '点击遮罩是否允许关闭'
  },
  {
    attribute: 'destroyOnClose',
    default: 'false',
    type: 'boolean',
    describe: '关闭时销毁 Drawer 里的子元素'
  },
  {
    attribute: 'zIndex',
    default: '1000',
    type: 'number',
    describe: '设置 Drawer 的 z-index'
  },
  {
    attribute: 'class',
    default: '""',
    type: 'string',
    describe: '设置 Drawer 的类名'
  },
  {
    attribute: 'rootClassName',
    default: '""',
    type: 'string',
    describe: '设置 Drawer 的根类名'
  },
  {
    attribute: 'rootStyle',
    default: '""',
    type: 'object',
    describe: '设置 Drawer 的根样式'
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