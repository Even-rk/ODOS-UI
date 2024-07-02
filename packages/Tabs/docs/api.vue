<template>
  <h2>Tabs 属性</h2>
  <odos-table :columns="columns" :data="tabsdata"></odos-table>
  <h2>Tab 属性</h2>
  <odos-table :columns="columns" :data="tabdata"></odos-table>
</template>

<script setup lang="ts">
const tabsdata = [
  {
    attribute: 'v-model:currentTab',
    default: '--',
    type: 'string | number',
    describe: '当前激活的 tab 面板'
  },
  {
    attribute: 'type',
    default: 'btn',
    type: 'btn | line',
    describe: '面板类型'
  }
]
const tabdata = [
  {
    attribute: 'value',
    default: '--',
    type: 'string | number',
    describe: '对应 currentTab'
  },
  {
    attribute: 'tab',
    default: '--',
    type: 'string',
    describe: '选项卡头显示文字'
  },
  {
    attribute: 'icon',
    default: '--',
    type: 'string',
    describe: '选项卡头显示 icon'
  },
  {
    attribute: 'disabled?',
    default: '--',
    type: 'boolean',
    describe: '当前 tab 是否禁用'
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
