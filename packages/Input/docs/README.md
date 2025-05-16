<script setup>
import demo from './demo.vue'
import PassWord from './password.vue'
import Search from './search.vue'
import Disabled from './disabled.vue'
import TitleDemo from './title.vue'
import Unit from './unit.vue'
import Slots from './slots.vue'

</script>

# Input输入框

## 基础使用

<Preview comp-name="Input" demo-name="demo">
  <demo />
</Preview>

## 密码输入框

<Preview comp-name="Input" demo-name="password">
  <PassWord />
</Preview>

## Search搜索框

<Preview comp-name="Input" demo-name="search">
  <Search />
</Preview>

## 禁用

<Preview comp-name="Input" demo-name="disabled">
  <Disabled />
</Preview>

## 设置title

<Preview comp-name="Input" demo-name="title">
  <TitleDemo />
</Preview>

## 设置unit

<Preview comp-name="Input" demo-name="unit">
  <Unit />
</Preview>

## 使用插槽

<Preview comp-name="Input" demo-name="slots">
  <Slots/>  
</Preview>

## Input API

### Input 属性

| 属性          | 描述           | 类型             | 默认值 |
| ------------- | -------------- | ---------------- | ------ |
| v-model:value | 输入框内容     | string           | --     |
| width         | 输入框的宽度   | string \| number | 100%   |
| title         | 用于设置title  | string           | --     |
| placeholder   | 输入框占位描述 | string           | 请输入 |
| disabled      | 是否禁用       | boolean          | false  |
| isFocus       | 初始化获取焦点 | boolean          | false  |
| unit          | 设置单位       | string           | --     |
| maxlength     | 最大输入长度   | number           | --     |
| prefix        | 设置前缀       | slot             | --     |
| suffix        | 设置后缀       | slot             | --     |

### Input 事件

| 事件名 | 说明                           | 类型     |
| ------ | ------------------------------ | -------- |
| input  | 在 Input 值改变时触发          | Function |
| change | 当绑定值变化时触发             | Function |
| focus  | 当选择器的输入框获得焦点时触发 | Function |
| blur   | 当选择器的输入框失去焦点时触发 | Function |
