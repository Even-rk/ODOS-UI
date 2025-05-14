<script setup>
import demo from './demo.vue'
import Disabled from './disabled.vue'


import TitleDemo from './title.vue'
</script>

# InputNumber数字输入框

## 基础使用

<Preview comp-name="Input" demo-name="demo">
  <demo />
</Preview>

## 禁用

<Preview comp-name="Input" demo-name="disabled">
  <Disabled />
</Preview>

## 设置title

<Preview comp-name="Input" demo-name="title">
  <TitleDemo />
</Preview>

## InputNumber API

### InputNumber 属性

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| v-model:value | 输入框内容 | string | -- |
| width | 输入框的宽度 | string \| number | 100% |
| title | 用于设置title | string | -- |
| placeholder | 输入框占位描述 | string | 请输入 |
| disabled | 是否禁用 | boolean | false |
| unit | 设置单位 | string | -- |


### InputNumber 事件

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| input | 在 InputNumber 值改变时触发 | Function |
| change | 当绑定值变化时触发 | Function |
| focus | 当选择器的输入框获得焦点时触发 | Function |
| blur | 当选择器的输入框失去焦点时触发 | Function |

