<script setup>
import demo from './demo.vue'
import Disabled from './disabled.vue'
import SuffixIcon from './suffixIcon.vue'
import Multiple from './multiple.vue'
import FilterDemo from './filter.vue'  
import TitleDemo from './title.vue'
</script>

# Select选择框

## 基本使用

<Preview comp-name="Select" demo-name="demo">
  <demo />
</Preview>

## 禁用

<Preview comp-name="Select" demo-name="disabled">
  <Disabled />
</Preview>

## 多选

<Preview comp-name="Select" demo-name="multiple">
  <Multiple />
</Preview>

## 设置title

<Preview comp-name="Select" demo-name="title">
  <TitleDemo />
</Preview>

## 筛选

<Preview comp-name="Select" demo-name="filter">
  <FilterDemo />
</Preview>

## 后缀图标

<Preview comp-name="Select" demo-name="suffixIcon">
  <SuffixIcon />
</Preview>



## Select Api

### Select 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model:value | 指定当前选中的条目 | string \| string[] \| number \| number[] | -- |
| options | 选项列表 | Array<{ label: string, value: string, [key:string]: string }> | -- |
| allowClear | 支持清除 | boolean | false |
| title | label标题 | string | -- |
| width | 宽度 | string | 100% |
| height | 高度 | string | 40px |
| placeholder | 占位字符 | string | 请选择 |
| disabled | 是否禁用 | boolean | false |
| maxTagCount | 最多显示多少个 tag | number | -- |
| multiple | 设置 Select 的模式为多选或标签 | boolean | false |
| showSearch | 配置是否可搜索 | boolean | false |
| filterProp | 搜索时过滤对应的 option 属性 | string | label |
| mutex | 设置 Select 的模式为互斥模式 | boolean | false |
| mutexOptionValue | 互斥选项的值（互斥的内容为单选) | string[] | [] |


### Select event

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| change | 选中内容改变后触发 | Function($event) |
| select | 选择后触发 | Function(value) |
| blur | 失去焦点时触发 | Function($event) |
| focus | 获得焦点时触发 | Function($event) |
| select | 清除后触发 | Function(value) |


### Select 插槽

| 插槽名 | 说明 |
| ---- | ---- |
| suffixIcon | 自定义的选择框后缀图标 |
| dropdownRender | 自定义下拉框内容 |
| option | 自定义下拉框选项内容 |

