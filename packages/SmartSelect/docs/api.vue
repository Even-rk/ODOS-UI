<template>
  <div>
    <h3>SmartSelect 属性</h3>
    <odos-table :columns="propsColumns" :data="propsData"></odos-table>
    
    <h3>SmartSelect 事件</h3>
    <odos-table :columns="eventsColumns" :data="eventsData"></odos-table>
    
    <h3>SmartSelect 插槽</h3>
    <odos-table :columns="slotsColumns" :data="slotsData"></odos-table>
    
    <h3>Option 数据结构</h3>
    <odos-table :columns="optionColumns" :data="optionData"></odos-table>
  </div>
</template>

<script setup lang="ts">
const propsData = [
  {
    attribute: 'value / v-model',
    default: '--',
    type: 'string | number | string[] | number[]',
    describe: '选中的值，支持单选和多选'
  },
  {
    attribute: 'options',
    default: '[]',
    type: 'Option[]',
    describe: '选项数据，Option 结构见下表'
  },
  {
    attribute: 'placeholder',
    default: '--',
    type: 'string',
    describe: '输入框占位符'
  },
  {
    attribute: 'disabled',
    default: 'false',
    type: 'boolean',
    describe: '是否禁用'
  },
  {
    attribute: 'width',
    default: '--',
    type: 'string | number',
    describe: '组件宽度'
  },
  {
    attribute: 'title',
    default: '--',
    type: 'string',
    describe: '标题文本，显示在输入框左侧'
  },
  {
    attribute: 'multiple',
    default: 'false',
    type: 'boolean',
    describe: '是否支持多选'
  },
  {
    attribute: 'allowClear',
    default: 'false',
    type: 'boolean',
    describe: '是否显示清空按钮'
  },
  {
    attribute: 'showSearch',
    default: 'false',
    type: 'boolean',
    describe: '是否支持搜索'
  },
  {
    attribute: 'maxTagCount',
    default: '--',
    type: 'number',
    describe: '多选时最多显示的标签数量，超出部分会折叠显示'
  },
  {
    attribute: 'filterProp',
    default: 'label',
    type: 'string',
    describe: '搜索时过滤的属性名'
  },
  {
    attribute: 'mutex',
    default: 'false',
    type: 'boolean',
    describe: '是否启用互斥选择模式'
  },
  {
    attribute: 'mutexOptionValue',
    default: '--',
    type: 'string[] | number[]',
    describe: '互斥选择的选项值'
  },
  {
    attribute: 'position',
    default: 'bottom',
    type: "'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'",
    describe: '下拉框弹出位置'
  }
]

const eventsData = [
  {
    attribute: 'update:value',
    params: 'value: string | number | string[] | number[]',
    describe: '选中值变化时触发，用于 v-model 双向绑定'
  },
  {
    attribute: 'change',
    params: 'value: string | number | string[] | number[]',
    describe: '选中值变化时触发'
  },
  {
    attribute: 'select',
    params: 'option: Option',
    describe: '选中某个选项时触发'
  },
  {
    attribute: 'deselect',
    params: 'option: Option',
    describe: '取消选中某个选项时触发（多选模式）'
  },
  {
    attribute: 'focus',
    params: 'event: FocusEvent',
    describe: '输入框获得焦点时触发'
  },
  {
    attribute: 'blur',
    params: 'event: BlurEvent',
    describe: '输入框失去焦点时触发'
  },
  {
    attribute: 'search',
    params: 'query: string',
    describe: '搜索时触发，返回搜索关键词'
  },
  {
    attribute: 'ime-status',
    params: 'status: boolean',
    describe: '输入法状态变化时触发'
  }
]

const slotsData = [
  {
    attribute: 'option',
    params: '{ option: Option, index: number, selected: boolean }',
    describe: '自定义选项内容，可以自定义每个选项的显示方式'
  },
  {
    attribute: 'dropdownRender',
    params: '{ options: Option[], empty: boolean }',
    describe: '自定义下拉框内容，可以完全自定义下拉框的渲染内容'
  },
  {
    attribute: 'suffixIcon',
    params: '{ visible: boolean }',
    describe: '自定义后缀图标，可以替换默认的下拉箭头图标'
  }
]

const optionData = [
  {
    attribute: 'label',
    type: 'string',
    describe: '选项显示的文本'
  },
  {
    attribute: 'value',
    type: 'string | number',
    describe: '选项的值'
  },
  {
    attribute: 'disabled',
    type: 'boolean',
    describe: '是否禁用该选项（可选）'
  }
]

const propsColumns = [
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

const eventsColumns = [
  {
    title: '事件名',
    dataIndex: 'attribute'
  },
  {
    title: '描述',
    dataIndex: 'describe'
  },
  {
    title: '参数',
    dataIndex: 'params'
  }
]

const slotsColumns = [
  {
    title: '插槽名',
    dataIndex: 'attribute'
  },
  {
    title: '描述',
    dataIndex: 'describe'
  },
  {
    title: '参数',
    dataIndex: 'params'
  }
]

const optionColumns = [
  {
    title: '属性',
    dataIndex: 'attribute'
  },
  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '描述',
    dataIndex: 'describe'
  }
]
</script>