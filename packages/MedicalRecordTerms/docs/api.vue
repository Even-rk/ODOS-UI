<template>
  <div>
    <h3>MedicalRecordTerms 属性</h3>
    <odos-table :columns="propsColumns" :data="propsData" />

    <h3>MedicalRecordTerms 事件</h3>
    <odos-table :columns="eventsColumns" :data="eventsData" />

    <h3>VerticalEntryData 数据结构</h3>
    <odos-table :columns="dataColumns" :data="verticalData" />

    <h3>HorizontalEntryData 数据结构</h3>
    <odos-table :columns="dataColumns" :data="horizontalData" />
  </div>
  
</template>

<script setup lang="ts">
const propsData = [
  {
    attribute: 'type',
    default: 'horizontal',
    type: "'vertical' | 'horizontal'",
    describe: '显示布局模式：vertical 使用竖排组件，其余为横排'
  },
  {
    attribute: 'projectType',
    default: '--',
    type: 'string',
    describe: '竖排模式主类筛选（如：主诉、现病史、口腔检查、影像、处置、计划、医嘱）'
  },
  {
    attribute: 'verticalEntryData',
    default: '[]',
    type: 'VerticalEntryData[]',
    describe: '竖排数据源（结构见下方 VerticalEntryData）'
  },
  {
    attribute: 'HorizontalEntryData',
    default: '[]',
    type: "{ itemType: string; items: { itemName: string }[] }[]",
    describe: '横排数据源（结构见下方 HorizontalEntryData）'
  }
]

const eventsData = [
  {
    attribute: 'add-word（子组件事件）',
    params: 'sub: { itemName: string }',
    describe: '点击词条时触发。仅直接使用 Horizontal/Vertical 子组件时可用'
  }
]

const verticalData = [
  {
    attribute: 'mainType',
    type: 'string',
    describe: '主类（如：主诉/现病史/口腔检查/影像/处置/计划/医嘱）'
  },
  {
    attribute: 'itemTypes',
    type: 'Array<{ itemType: string; items: Array<{ fromLj: boolean; itemName: string; itemOrder: number; id: number }> }>',
    describe: '分类列表及其词条集合'
  },
  {
    attribute: 'itemTypes[].itemType',
    type: 'string',
    describe: '分类名称'
  },
  {
    attribute: 'itemTypes[].items',
    type: 'Array<{ fromLj: boolean; itemName: string; itemOrder: number; id: number }>',
    describe: '该分类下的词条集合'
  }
]

const horizontalData = [
  {
    attribute: 'itemType',
    type: 'string',
    describe: '分类名称'
  },
  {
    attribute: 'items',
    type: 'Array<{ fromLj: boolean; itemName: string; itemOrder: number; id: number }>',
    describe: '该分类下的词条集合'
  }
]

const propsColumns = [
  { title: '属性', dataIndex: 'attribute' },
  { title: '描述', dataIndex: 'describe' },
  { title: '类型', dataIndex: 'type' },
  { title: '默认值', dataIndex: 'default' }
]

const eventsColumns = [
  { title: '事件名', dataIndex: 'attribute' },
  { title: '描述', dataIndex: 'describe' },
  { title: '参数', dataIndex: 'params' }
]

const dataColumns = [
  { title: '属性', dataIndex: 'attribute' },
  { title: '类型', dataIndex: 'type' },
  { title: '描述', dataIndex: 'describe' }
]
</script>
